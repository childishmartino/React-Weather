const { REACT_APP_APIKEY, REACT_APP_APIKEY2 } = process.env;

export const searchCity = (city) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${REACT_APP_APIKEY}`
    return fetch(endpoint);
};

export const getSevenDayWeatherInfo = (lat, lon) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${REACT_APP_APIKEY}`
    return fetch(endpoint);
};

export const getBackgroundImage = (city) => {
    const endpoint = `https://api.unsplash.com/photos?query=${city}&client_id=${REACT_APP_APIKEY2}`
    return fetch(endpoint);
}