// const MQTT_BROKER = "wss://mqtt.eclipseprojects.io/mqtt";
// const MQTT_TOPIC = "raspberrypi/sensors";
// const API_URL = "http://127.0.0.1:5000/predict"; // Flask API URL

// const client = mqtt.connect(MQTT_BROKER);

// client.on("connect", () => {
//   console.log("✅ Connected to MQTT Broker");
//   client.subscribe(MQTT_TOPIC, (err) => {
//     if (!err) {
//       console.log(`📡 Subscribed to topic: ${MQTT_TOPIC}`);
//     }
//   });
// });

// client.on("message", async (topic, message) => {
//   try {
//     const data = JSON.parse(message.toString());

//     const temperature = parseFloat(data.temperature);
//     const humidity = parseFloat(data.humidity);
//     const soilMoisture = parseFloat(data.moisture);
//     const lightIntensity = parseFloat(data.light);

//     // 1. Update UI
//     updateBar("temperature-bar", temperature, 50, "temperature-value", "Temperature");
//     updateBar("humidity-bar", humidity, 100, "humidity-value", "Humidity");
//     updateBar("moisture-bar", soilMoisture, 1023, "moisture-value", "Moisture");
//     updateBar("light-bar", lightIntensity, 1023, "light-value", "Light");

//     // 2. Send to AI/ML Flask backend
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         temperature: temperature,
//         humidity: humidity,
//         soil_moisture: soilMoisture,
//         light_intensity: lightIntensity
//       })
//     });

//     const result = await response.json();
//     console.log("Prediction Result:", result);

//     const notificationArea = document.getElementById("notifications-list");
//     const alertMsg = result.alert;

//     // 3. Display result
//     if (alertMsg && alertMsg.includes("ALERT")) {
//       addNotification(`🚨 ${alertMsg}`, "red");
//     } else {
//       addNotification(`✅ ${alertMsg}`, "green");
//     }

//   } catch (error) {
//     console.error("Error in message handling:", error);
//   }
// });

// // Utility to update bar visuals
// function updateBar(barId, value, max, valueId, type) {
//   const bar = document.getElementById(barId).children;
//   const fillBars = Math.round((value / max) * bar.length);

//   for (let i = 0; i < bar.length; i++) {
//     bar[i].style.background = i < fillBars ? getBarColor(i, type) : "#1a1a1a";
//   }

//   document.getElementById(valueId).innerText = value.toFixed(1);
// }

// // Utility to color bars
// function getBarColor(index, type) {
//   if (type === "Moisture") return index < 5 || index >= 11 ? "#ff8c00" : "#32cd32";
//   if (type === "Temperature") return index < 5 ? "#00bfff" : index >= 11 ? "#ff4500" : "#32cd32";
//   if (type === "Humidity") return index < 5 ? "#ffa500" : index >= 11 ? "#006400" : "#32cd32";
//   if (type === "Light") return index < 5 ? "#444" : index >= 11 ? "#ffe600" : "#ffff66";
//   return "#32cd32";
// }

// // Notification UI
// function addNotification(message, color) {
//   const ul = document.getElementById("notifications-list");
//   const li = document.createElement("li");
//   li.innerText = message;
//   li.style.color = color;
//   ul.prepend(li);
// }
// const MQTT_BROKER = "wss://mqtt.eclipseprojects.io/mqtt";
// const MQTT_TOPIC = "raspberrypi/sensors";
// const API_URL = "http://127.0.0.1:5000/predict"; // Flask API URL

// const client = mqtt.connect(MQTT_BROKER);

// client.on("connect", () => {
//   console.log("✅ Connected to MQTT Broker");
//   client.subscribe(MQTT_TOPIC, (err) => {
//     if (!err) {
//       console.log(`📡 Subscribed to topic: ${MQTT_TOPIC}`);
//     }
//   });
// });

// client.on("message", async (topic, message) => {
//   try {
//     const data = JSON.parse(message.toString());

//     const temperature = parseFloat(data.temperature);
//     const humidity = parseFloat(data.humidity);
//     const soilMoisture = parseFloat(data.moisture);
//     const lightIntensity = parseFloat(data.light);

//     // 1. Update UI bars
//     updateBar("temperature-bar", temperature, 50, "temperature-value", "Temperature");
//     updateBar("humidity-bar", humidity, 100, "humidity-value", "Humidity");
//     updateBar("moisture-bar", soilMoisture, 1023, "moisture-value", "Moisture");
//     updateBar("light-bar", lightIntensity, 1023, "light-value", "Light");

//     // 2. Send to backend for AI alerts
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         temperature: temperature,
//         humidity: humidity,
//         soil_moisture: soilMoisture,
//         light_intensity: lightIntensity
//       })
//     });

//     const result = await response.json();
//     console.log("Prediction Result:", result);

//     const notificationArea = document.getElementById("notifications-list");
//     notificationArea.innerHTML = ""; // Clear previous alerts

//     const alerts = result.alerts || []; // Backend should send { alerts: [ "...", "...", ... ] }

//     if (alerts.length > 0) {
//       alerts.forEach((alertText) => {
//         addNotification(`🚨 ${alertText}`, "red");
//       });
//     } else {
//       addNotification("✅ All parameters are within safe limits.", "green");
//     }

//   } catch (error) {
//     console.error("❌ Error in message handling:", error);
//   }
// });

// // Update bar UI
// function updateBar(barId, value, max, valueId, type) {
//   const bar = document.getElementById(barId).children;
//   const fillBars = Math.round((value / max) * bar.length);

//   for (let i = 0; i < bar.length; i++) {
//     bar[i].style.background = i < fillBars ? getBarColor(i, type) : "#1a1a1a";
//   }

//   document.getElementById(valueId).innerText = value.toFixed(1);
// }

// // Bar color scheme based on parameter
// function getBarColor(index, type) {
//   if (type === "Moisture") return index < 5 || index >= 11 ? "#ff8c00" : "#32cd32";
//   if (type === "Temperature") return index < 5 ? "#00bfff" : index >= 11 ? "#ff4500" : "#32cd32";
//   if (type === "Humidity") return index < 5 ? "#ffa500" : index >= 11 ? "#006400" : "#32cd32";
//   if (type === "Light") return index < 5 ? "#444" : index >= 11 ? "#ffe600" : "#ffff66";
//   return "#32cd32";
// }

// // Add alert to notification panel
// function addNotification(message, color) {
//   const ul = document.getElementById("notifications-list");
//   const li = document.createElement("li");
//   li.innerText = message;
//   li.style.color = color;
//   li.style.fontWeight = "500";
//   ul.prepend(li);
// }
// // API Key for OpenWeatherMap
// const apiKey = "9afd8abc3856f72416463be47783bca4";

// window.onload = () => {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         const cityName = await fetchCityName(lat, lon); // Fetch city name
//         document.getElementById("locationName").innerText = cityName;
//         fetchForecast(lat, lon);
//       },
//       (error) => {
//         console.error("Location error:", error);
//         document.getElementById("forecastContainer").innerHTML =
//           "<p style='color: red;'>Location access denied. Forecast not available.</p>";
//       }
//     );
//   } else {
//     alert("Geolocation not supported by your browser.");
//   }
// };

// // Fetch the city name using Reverse Geocoding
// async function fetchCityName(lat, lon) {
//   try {
//     const url = https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey};
//     const response = await fetch(url);
//     const data = await response.json();
//     return data[0]?.name || "Unknown Location"; // Return city name or default text
//   } catch (err) {
//     console.error("Error fetching location name:", err);
//     return "Unknown Location";
//   }
// }

// // Fetch 5-Day Weather Forecast
// async function fetchForecast(lat, lon) {
//   try {
//     const url = https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;
//     const response = await fetch(url);
//     const data = await response.json();

//     const container = document.getElementById("forecastContainer");
//     container.innerHTML = "";

//     const daily = {};
//     data.list.forEach(entry => {
//       const date = entry.dt_txt.split(" ")[0];
//       if (!daily[date]) daily[date] = entry;
//     });

//     const weatherIcons = {
//         "Clear": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
//         "Rain": "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
//         "Snow": "https://cdn-icons-png.flaticon.com/512/2584/2584261.png",
//         "Clouds": "https://cdn-icons-png.flaticon.com/512/414/414927.png",
//         "Thunderstorm": "https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
//       };
      
//       const weatherBackgrounds = {
//         "Clear": "https://source.unsplash.com/600x400/?sunny,sky",
//         "Rain": "https://source.unsplash.com/600x400/?rain,cloud",
//         "Snow": "https://source.unsplash.com/600x400/?snow,winter",
//         "Clouds": "https://source.unsplash.com/600x400/?cloudy,sky",
//         "Thunderstorm": "https://source.unsplash.com/600x400/?storm,lightning"
//       };
      
//       Object.values(daily).slice(0, 5).forEach(day => {
//         const weatherCondition = day.weather[0].main; 
//         const weatherImage = weatherIcons[weatherCondition] || "https://cdn-icons-png.flaticon.com/512/869/869869.png"; 
//         const backgroundImage = weatherBackgrounds[weatherCondition] || "https://source.unsplash.com/600x400/?weather";
      
//         const card = document.createElement("div");
//         card.classList.add("forecast-item");
//         card.style.backgroundImage = url(${backgroundImage});
      
//         card.innerHTML = `
//           <h3>${new Date(day.dt * 1000).toDateString()}</h3>
//           <img src="${weatherImage}" alt="${weatherCondition} Icon">
//           <p>${day.weather[0].description}</p>
//           <ul>
//             <li>🌡 ${day.main.temp_min}°C - ${day.main.temp_max}°C</li>
//             <li>💧 Humidity: ${day.main.humidity}%</li>
//             <li>💨 Wind: ${day.wind.speed} m/s</li>
//           </ul>
//         `;
        
//         container.appendChild(card);
//       });
      
//   } catch (err) {
//     console.error("Error fetching weather:", err);
//     document.getElementById("forecastContainer").innerHTML =
//       "<p style='color: red;'>Could not fetch weather forecast.</p>";
//   }
// }
// const API_URL = "http://127.0.0.1:5000/predict"; // Flask AI/ML API
// const SENSOR_API = "https://atozagriculture-1.onrender.com/sensordata"; // Your HTTP Sensor API
// const apiKey = "9afd8abc3856f72416463be47783bca4"; // OpenWeatherMap API (optional for weather integration)

// async function fetchSensorData() {
//   try {
//     const response = await fetch(SENSOR_API);
//     const data = await response.json();

//     const temperature = parseFloat(data.temperature);
//     const humidity = parseFloat(data.humidity);
//     const rawMoisture = parseInt(data.moisture);
//     const soilMoisture = Math.max(0, ((1023 - rawMoisture) / (1023 - 300)) * 100);
//     const lightIntensity = parseFloat(data.light);

//     // Update sensor bars visually
//     updateBar("temperature-bar", temperature, 50, "temperature-value", "Temperature");
//     updateBar("humidity-bar", humidity, 100, "humidity-value", "Humidity");
//     updateBar("moisture-bar", soilMoisture, 100, "moisture-value", "Moisture");
//     updateBar("light-bar", lightIntensity, 1023, "light-value", "Light");

//     // Send to AI/ML prediction model
//     const aiResponse = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         temperature,
//         humidity,
//         soil_moisture: soilMoisture,
//         light_intensity: lightIntensity
//       })
//     });

//     const result = await aiResponse.json();
//     console.log("Prediction Result:", result);

//     const notificationArea = document.getElementById("notifications-list");
//     notificationArea.innerHTML = "";

//     const alerts = result.alerts || [];
//     if (alerts.length > 0) {
//       alerts.forEach((alertText) => addNotification(`🚨 ${alertText}`, "red"));
//     } else {
//       addNotification("✅ All parameters are within safe limits.", "green");
//     }

//   } catch (error) {
//     console.error("❌ Error fetching or processing data:", error);
//     addNotification("⚠️ Error fetching or processing sensor data.", "orange");
//   }
// }

// function updateBar(barId, value, max, valueId, type) {
//   const bar = document.getElementById(barId)?.children;
//   if (!bar) return;
  
//   const fillBars = Math.round((value / max) * bar.length);
//   for (let i = 0; i < bar.length; i++) {
//     bar[i].style.background = i < fillBars ? getBarColor(i, type) : "#1a1a1a";
//   }

//   const valueElem = document.getElementById(valueId);
//   if (valueElem) valueElem.innerText = value.toFixed(1);
// }

// function getBarColor(index, type) {
//   if (type === "Moisture") return index < 5 || index >= 11 ? "#ff8c00" : "#32cd32";
//   if (type === "Temperature") return index < 5 ? "#00bfff" : index >= 11 ? "#ff4500" : "#32cd32";
//   if (type === "Humidity") return index < 5 ? "#ffa500" : index >= 11 ? "#006400" : "#32cd32";
//   if (type === "Light") return index < 5 ? "#444" : index >= 11 ? "#ffe600" : "#ffff66";
//   return "#32cd32";
// }

// function addNotification(message, color) {
//   const ul = document.getElementById("notifications-list");
//   const li = document.createElement("li");
//   li.innerText = message;
//   li.style.color = color;
//   li.style.fontWeight = "500";
//   ul?.prepend(li);
// }

// // Auto fetch every 500 ms
// setInterval(fetchSensorData, 5000);
// fetchSensorData();


// window.onload = () => {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         const cityName = await fetchCityName(lat, lon);
//         document.getElementById("locationName").innerText = cityName;
//         fetchForecast(lat, lon);
//       },
//       (error) => {
//         console.error("Location error:", error);
//         document.getElementById("forecastContainer").innerHTML =
//           "<p style='color: red;'>Location access denied. Forecast not available.</p>";
//       }
//     );
//   } else {
//     alert("Geolocation not supported by your browser.");
//   }
// };

// async function fetchCityName(lat, lon) {
//   try {
//     const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data[0]?.name || "Unknown Location";
//   } catch (err) {
//     console.error("Error fetching location name:", err);
//     return "Unknown Location";
//   }
// }

// async function fetchForecast(lat, lon) {
//   try {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();

//     const container = document.getElementById("forecastContainer");
//     container.innerHTML = "";

//     const daily = {};
//     data.list.forEach(entry => {
//       const date = entry.dt_txt.split(" ")[0];
//       if (!daily[date]) daily[date] = entry;
//     });

//     const weatherIcons = {
//       "Clear": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
//       "Rain": "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
//       "Snow": "https://cdn-icons-png.flaticon.com/512/2584/2584261.png",
//       "Clouds": "https://cdn-icons-png.flaticon.com/512/414/414927.png",
//       "Thunderstorm": "https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
//     };

//     const weatherBackgrounds = {
//       "Clear": "https://source.unsplash.com/600x400/?sunny,sky",
//       "Rain": "https://source.unsplash.com/600x400/?rain,cloud",
//       "Snow": "https://source.unsplash.com/600x400/?snow,winter",
//       "Clouds": "https://source.unsplash.com/600x400/?cloudy,sky",
//       "Thunderstorm": "https://source.unsplash.com/600x400/?storm,lightning"
//     };

//     Object.values(daily).slice(0, 5).forEach(day => {
//       const weatherCondition = day.weather[0].main;
//       const weatherImage = weatherIcons[weatherCondition] || weatherIcons["Clear"];
//       const backgroundImage = weatherBackgrounds[weatherCondition] || "https://source.unsplash.com/600x400/?weather";

//       const card = document.createElement("div");
//       card.classList.add("forecast-item");
//       card.style.backgroundImage = `url(${backgroundImage})`;

//       card.innerHTML = `
//         <h3>${new Date(day.dt * 1000).toDateString()}</h3>
//         <img src="${weatherImage}" alt="${weatherCondition} Icon">
//         <p>${day.weather[0].description}</p>
//         <ul>
//           <li>🌡 ${day.main.temp_min}°C - ${day.main.temp_max}°C</li>
//           <li>💧 Humidity: ${day.main.humidity}%</li>
//           <li>💨 Wind: ${day.wind.speed} m/s</li>
//         </ul>
//       `;

//       container.appendChild(card);
//     });

//   } catch (err) {
//     console.error("Error fetching weather:", err);
//     document.getElementById("forecastContainer").innerHTML =
//       "<p style='color: red;'>Could not fetch weather forecast.</p>";
//   }
// }

// script.js

const API_URL = "https://striversagri.onrender.com"; // Flask API
const SENSOR_API = "https://atozagriculture-1.onrender.com/sensordata"; // Sensor API
const apiKey = "9afd8abc3856f72416463be47783bca4"; // OpenWeatherMap

setInterval(fetchSensorData, 5000);
fetchSensorData();

async function fetchSensorData() {
  try {
    const response = await fetch(SENSOR_API);
    const data = await response.json();

    const temperature = parseFloat(data.temperature);
    const humidity = parseFloat(data.humidity);
    const rawMoisture = parseInt(data.moisture);
    const soilMoisture = Math.max(0, ((1023 - rawMoisture) / (1023 - 300)) * 100);
    const lightIntensity = parseFloat(data.light);

    updateBar("temperature-bar", temperature, 50, "temperature-value", "Temperature");
    updateBar("humidity-bar", humidity, 100, "humidity-value", "Humidity");
    updateBar("moisture-bar", soilMoisture, 100, "moisture-value", "Moisture");
    updateBar("light-bar", lightIntensity, 1023, "light-value", "Light");

    const aiResponse = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ temperature, humidity, soil_moisture: soilMoisture, light_intensity: lightIntensity })
    });

    const result = await aiResponse.json();
    displayAlerts(result.alerts || []);
  } catch (error) {
    console.error("❌ Error:", error);
    addNotification("⚠️ Error fetching or processing sensor data.", "orange");
  }
}

function updateBar(barId, value, max, valueId, type) {
  const bar = document.getElementById(barId)?.children;
  if (!bar) return;
  const fillBars = Math.round((value / max) * bar.length);
  for (let i = 0; i < bar.length; i++) {
    bar[i].style.background = i < fillBars ? getBarColor(i, type) : "#1a1a1a";
  }
  const valueElem = document.getElementById(valueId);
  if (valueElem) valueElem.innerText = value.toFixed(1);
}

function getBarColor(index, type) {
  if (type === "Moisture") return index < 5 || index >= 11 ? "#ff8c00" : "#32cd32";
  if (type === "Temperature") return index < 5 ? "#00bfff" : index >= 11 ? "#ff4500" : "#32cd32";
  if (type === "Humidity") return index < 5 ? "#ffa500" : index >= 11 ? "#006400" : "#32cd32";
  if (type === "Light") return index < 5 ? "#444" : index >= 11 ? "#ffe600" : "#ffff66";
  return "#32cd32";
}

function displayAlerts(alerts) {
  const notificationArea = document.getElementById("notifications-list");
  notificationArea.innerHTML = "";
  if (alerts.length > 0) {
    alerts.forEach(alert => addNotification(`🚨 ${alert}`, "red"));
  } else {
    addNotification("✅ All parameters are within safe limits.", "green");
  }
}

function addNotification(message, color) {
  const ul = document.getElementById("notifications-list");
  const li = document.createElement("li");
  li.innerText = message;
  li.style.color = color;
  li.style.fontWeight = "500";
  ul?.prepend(li);
}

// Weather forecast on load
window.onload = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const cityName = await fetchCityName(lat, lon);
      document.getElementById("locationName").innerText = cityName;
      fetchForecast(lat, lon);
    }, (error) => {
      console.error("Location error:", error);
      document.getElementById("forecastContainer").innerHTML =
        "<p style='color: red;'>Location access denied. Forecast not available.</p>";
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
};

async function fetchCityName(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0]?.name || "Unknown Location";
  } catch (err) {
    console.error("Error fetching location name:", err);
    return "Unknown Location";
  }
}

async function fetchForecast(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById("forecastContainer");
    container.innerHTML = "";

    const daily = {};
    data.list.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0];
      if (!daily[date]) daily[date] = entry;
    });

    const weatherIcons = {
      "Clear": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
      "Rain": "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
      "Snow": "https://cdn-icons-png.flaticon.com/512/2584/2584261.png",
      "Clouds": "https://cdn-icons-png.flaticon.com/512/414/414927.png",
      "Thunderstorm": "https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
    };

    const weatherBackgrounds = {
      "Clear": "https://source.unsplash.com/600x400/?sunny,sky",
      "Rain": "https://source.unsplash.com/600x400/?rain,cloud",
      "Snow": "https://source.unsplash.com/600x400/?snow,winter",
      "Clouds": "https://source.unsplash.com/600x400/?cloudy,sky",
      "Thunderstorm": "https://source.unsplash.com/600x400/?storm,lightning"
    };

    Object.values(daily).slice(0, 5).forEach(day => {
      const weatherCondition = day.weather[0].main;
      const weatherImage = weatherIcons[weatherCondition] || weatherIcons["Clear"];
      const backgroundImage = weatherBackgrounds[weatherCondition] || "https://source.unsplash.com/600x400/?weather";

      const card = document.createElement("div");
      card.classList.add("forecast-item");
      card.style.backgroundImage = `url(${backgroundImage})`;

      card.innerHTML = `
        <h3>${new Date(day.dt * 1000).toDateString()}</h3>
        <img src="${weatherImage}" alt="${weatherCondition} Icon">
        <p>${day.weather[0].description}</p>
        <ul>
          <li>🌡 ${day.main.temp_min}°C - ${day.main.temp_max}°C</li>
          <li>💧 Humidity: ${day.main.humidity}%</li>
          <li>💨 Wind: ${day.wind.speed} m/s</li>
        </ul>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching forecast:", err);
    document.getElementById("forecastContainer").innerHTML =
      "<p style='color: red;'>Could not fetch weather forecast.</p>";
  }
}
