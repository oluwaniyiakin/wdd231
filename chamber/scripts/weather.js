const apiKey = "YOUR_API_KEY";
const city = "Lagos";

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        const weatherContainer = document.getElementById("weather-container");
        weatherContainer.innerHTML = `
            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
            <p>${data.weather.map(w => w.description).join(", ").toUpperCase()}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        console.error("Failed to fetch weather data", error);
    }
}

getWeather();
