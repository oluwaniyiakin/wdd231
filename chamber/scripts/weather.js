const apiKey = '30e4649ada8c1a934e8984ad1ed75ad4';
const city = 'Lagos';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

(async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
})();

function displayWeather(data) {
    const weatherContainer = document.querySelector('.weather-info');
    const current = data.list[0];
    const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3); // Get 3-day forecast at noon

    weatherContainer.innerHTML = `
        <p><strong>Current Temperature:</strong> ${Math.round(current.main.temp)}°C</p>
        <p><strong>Weather:</strong> ${capitalizeWords(current.weather[0].description)}</p>
        <div class="weather-forecast">
            ${forecast.map(day => `
                <div class="forecast-day">
                    <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                    <p><strong>${Math.round(day.main.temp)}°C</strong></p>
                    <p>${capitalizeWords(day.weather[0].description)}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
