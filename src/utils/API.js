const { REACT_APP_OPEN_WEATHER_APIKEY, REACT_APP_UNSPLASH_KEY } = process.env;


export const searchCity = (city) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${REACT_APP_OPEN_WEATHER_APIKEY}`
    return fetch(endpoint);
};

export const getSevenDayWeatherInfo = (lat, lon) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${REACT_APP_OPEN_WEATHER_APIKEY}`
    return fetch(endpoint);
};

export const getBackgroundImage = (city) => {
    const endpoint = `https://api.unsplash.com/search/photos?query=${city}&client_id=${REACT_APP_UNSPLASH_KEY}`
    return fetch(endpoint);
}