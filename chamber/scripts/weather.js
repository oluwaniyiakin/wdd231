const apiKey = 'your_openweathermap_api_key';
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
    weatherContainer.innerHTML = `
        <p><strong>Temperature:</strong> ${Math.round(current.main.temp)}°C</p>
        <p><strong>Description:</strong> ${capitalizeWords(current.weather[0].description)}</p>
    `;
}

function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
