# # app.py

# import os
# import logging
# import smtplib
# from email.mime.text import MIMEText
# from flask import Flask, jsonify, request, send_from_directory
# import pickle
# import pandas as pd
# from flask_cors import CORS
# from waitress import serve
# from twilio.rest import Client

# # --- Setup ---
# app = Flask(__name__, static_folder='../frontend', static_url_path='/')
# CORS(app)

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger('waitress')
# logger.setLevel(logging.INFO)

# # --- Config from Environment Variables ---
# account_sid = os.getenv('TWILIO_ACCOUNT_SID')
# auth_token = os.getenv('TWILIO_AUTH_TOKEN')
# twilio_phone = os.getenv('TWILIO_PHONE')
# recipient_phone = os.getenv('RECIPIENT_PHONE')
# EMAIL_SENDER = os.getenv('EMAIL_SENDER')
# EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
# EMAIL_RECIPIENT = os.getenv('EMAIL_RECIPIENT')
# SMTP_SERVER = "smtp.gmail.com"
# SMTP_PORT = 587

# client = Client(account_sid, auth_token)

# # --- Load Models ---
# try:
#     monitoring_model = pickle.load(open('crop_monitoring_model.pkl', 'rb'))
#     recommendation_model = pickle.load(open('crop_recommendation_model3.pkl', 'rb'))
# except FileNotFoundError as e:
#     logger.error(f"Model loading error: {str(e)}")
#     raise

# # --- Utilities ---
# alert_history = []

# def send_sms(message):
#     try:
#         sms = client.messages.create(from_=twilio_phone, body=message, to=recipient_phone)
#         logger.info(f"✅ SMS Sent: {message} (SID: {sms.sid})")
#     except Exception as e:
#         logger.error(f"❌ SMS failed: {str(e)}")

# def send_email(subject, message):
#     try:
#         msg = MIMEText(message)
#         msg['Subject'] = subject
#         msg['From'] = EMAIL_SENDER
#         msg['To'] = EMAIL_RECIPIENT
#         with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
#             server.starttls()
#             server.login(EMAIL_SENDER, EMAIL_PASSWORD)
#             server.sendmail(EMAIL_SENDER, EMAIL_RECIPIENT, msg.as_string())
#         logger.info("✅ Email sent")
#     except Exception as e:
#         logger.error(f"❌ Email failed: {str(e)}")

# # --- Routes ---

# @app.route('/', methods=['GET'])
# def serve_frontend():
#     return send_from_directory(app.static_folder, 'index.html')

# @app.route('/<path:path>', methods=['GET'])
# def serve_static(path):
#     return send_from_directory(app.static_folder, path)

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({"error": "No data received"}), 400

#         temperature = float(data.get("temperature", 0))
#         humidity = float(data.get("humidity", 0))
#         soil_moisture = float(data.get("soil_moisture", 0))
#         light_intensity = float(data.get("light_intensity", 0))

#         input_df = pd.DataFrame([{
#             "Temperature (°C)": temperature,
#             "Humidity (%)": humidity,
#             "Soil Moisture": soil_moisture,
#             "Light Intensity": light_intensity
#         }])

#         prediction = monitoring_model.predict(input_df)[0]
#         alerts = []

#         if temperature > 40 or temperature < 10:
#             alerts.append(f"🌡️ Temperature Alert: {temperature}°C")
#         if humidity < 30 or humidity > 90:
#             alerts.append(f"💧 Humidity Alert: {humidity}%")
#         if soil_moisture < 20 or soil_moisture > 80:
#             alerts.append(f"🌱 Soil Moisture Alert: {soil_moisture}")
#         if light_intensity < 200 or light_intensity > 1000:
#             alerts.append(f"☀️ Light Intensity Alert: {light_intensity}")
#         if prediction == 1:
#             alerts.append("🚨 AI Alert: Abnormal Field Conditions Detected")

#         for alert in alerts:
#             send_sms(alert)
#             send_email("Crop Monitoring Alert", alert)
#             alert_history.append({
#                 "message": alert,
#                 "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
#             })

#         return jsonify({
#             "status": "success",
#             "alerts": alerts if alerts else ["✅ All conditions normal"]
#         })

#     except Exception as e:
#         logger.error(f"Prediction error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/get_alerts', methods=['GET'])
# def get_alerts():
#     return jsonify(alert_history)

# @app.route('/recommend_crop', methods=['POST'])
# def recommend_crop():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({"error": "No data received"}), 400

#         season_input = data.get("season", "").capitalize()
#         season_cols = [col for col in recommendation_model.feature_names_in_ if col.startswith("season_")]
#         season_data = {col: 0 for col in season_cols}
#         season_col = f"season_{season_input}"
#         if season_col not in season_data:
#             return jsonify({"error": f"Invalid season: {season_input}"}), 400
#         season_data[season_col] = 1

#         model_input = {
#             "N": float(data.get("N", 0)),
#             "P": float(data.get("P", 0)),
#             "K": float(data.get("K", 0)),
#             "temperature": float(data.get("temperature", 0)),
#             "humidity": float(data.get("humidity", 0)),
#             "ph": float(data.get("ph", 0)),
#             "rainfall": float(data.get("rainfall", 0)),
#             **season_data
#         }

#         input_df = pd.DataFrame([model_input])
#         prediction = recommendation_model.predict(input_df)[0]

#         msg = (
#             f"🌾 Recommended Crop: {prediction}\n"
#             f"N: {model_input['N']}, P: {model_input['P']}, K: {model_input['K']}, "
#             f"Temp: {model_input['temperature']}°C, Humidity: {model_input['humidity']}%, "
#             f"pH: {model_input['ph']}, Rainfall: {model_input['rainfall']}mm, "
#             f"Season: {season_input}"
#         )

#         send_sms(msg)
#         send_email("🌾 Crop Recommendation", msg)

#         return jsonify({"recommended_crop": prediction})

#     except Exception as e:
#         logger.error(f"Recommendation error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # --- Run Server ---
# if __name__ == "__main__":
#     port = int(os.environ.get('PORT', 5000))
#     logger.info(f"🌿 Unified Agriculture System API starting on port {port}...")
#     serve(app, host='0.0.0.0', port=port)
import os
import logging
import smtplib
from email.mime.text import MIMEText
from flask import Flask, jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS
from waitress import serve
from twilio.rest import Client

# --- Setup ---
app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

# --- Config from Environment Variables ---
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
twilio_phone = os.getenv('TWILIO_PHONE')
recipient_phone = os.getenv('RECIPIENT_PHONE')
EMAIL_SENDER = os.getenv('EMAIL_SENDER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_RECIPIENT = os.getenv('EMAIL_RECIPIENT')
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

client = Client(account_sid, auth_token)

# --- Load Models ---
try:
    monitoring_model = pickle.load(open('crop_monitoring_model.pkl', 'rb'))
    recommendation_model = pickle.load(open('crop_recommendation_model3.pkl', 'rb'))
except FileNotFoundError as e:
    logger.error(f"Model loading error: {str(e)}")
    raise

# --- Utilities ---
alert_history = []

def send_sms(message):
    try:
        sms = client.messages.create(from_=twilio_phone, body=message, to=recipient_phone)
        logger.info(f"✅ SMS Sent: {message} (SID: {sms.sid})")
    except Exception as e:
        logger.error(f"❌ SMS failed: {str(e)}")

def send_email(subject, message):
    try:
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = EMAIL_SENDER
        msg['To'] = EMAIL_RECIPIENT
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECIPIENT, msg.as_string())
        logger.info("✅ Email sent")
    except Exception as e:
        logger.error(f"❌ Email failed: {str(e)}")

# --- API Routes ---

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        temperature = float(data.get("temperature", 0))
        humidity = float(data.get("humidity", 0))
        soil_moisture = float(data.get("soil_moisture", 0))
        light_intensity = float(data.get("light_intensity", 0))

        input_df = pd.DataFrame([{
            "Temperature (°C)": temperature,
            "Humidity (%)": humidity,
            "Soil Moisture": soil_moisture,
            "Light Intensity": light_intensity
        }])

        prediction = monitoring_model.predict(input_df)[0]
        alerts = []

        if temperature > 40 or temperature < 10:
            alerts.append(f"🌡️ Temperature Alert: {temperature}°C")
        if humidity < 30 or humidity > 90:
            alerts.append(f"💧 Humidity Alert: {humidity}%")
        if soil_moisture < 20 or soil_moisture > 80:
            alerts.append(f"🌱 Soil Moisture Alert: {soil_moisture}")
        if light_intensity < 200 or light_intensity > 1000:
            alerts.append(f"☀️ Light Intensity Alert: {light_intensity}")
        if prediction == 1:
            alerts.append("🚨 AI Alert: Abnormal Field Conditions Detected")

        for alert in alerts:
            send_sms(alert)
            send_email("Crop Monitoring Alert", alert)
            alert_history.append({
                "message": alert,
                "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
            })

        return jsonify({
            "status": "success",
            "alerts": alerts if alerts else ["✅ All conditions normal"]
        })

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/get_alerts', methods=['GET'])
def get_alerts():
    return jsonify(alert_history)

@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        season_input = data.get("season", "").capitalize()
        season_cols = [col for col in recommendation_model.feature_names_in_ if col.startswith("season_")]
        season_data = {col: 0 for col in season_cols}
        season_col = f"season_{season_input}"
        if season_col not in season_data:
            return jsonify({"error": f"Invalid season: {season_input}"}), 400
        season_data[season_col] = 1

        model_input = {
            "N": float(data.get("N", 0)),
            "P": float(data.get("P", 0)),
            "K": float(data.get("K", 0)),
            "temperature": float(data.get("temperature", 0)),
            "humidity": float(data.get("humidity", 0)),
            "ph": float(data.get("ph", 0)),
            "rainfall": float(data.get("rainfall", 0)),
            **season_data
        }

        input_df = pd.DataFrame([model_input])
        prediction = recommendation_model.predict(input_df)[0]

        msg = (
            f"🌾 Recommended Crop: {prediction}\n"
            f"N: {model_input['N']}, P: {model_input['P']}, K: {model_input['K']}, "
            f"Temp: {model_input['temperature']}°C, Humidity: {model_input['humidity']}%, "
            f"pH: {model_input['ph']}, Rainfall: {model_input['rainfall']}mm, "
            f"Season: {season_input}"
        )

        send_sms(msg)
        send_email("🌾 Crop Recommendation", msg)

        return jsonify({"recommended_crop": prediction})

    except Exception as e:
        logger.error(f"Recommendation error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# --- Run Server ---
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    logger.info(f"🌿 Unified Agriculture System API starting on port {port}...")
    serve(app, host='0.0.0.0', port=port)
