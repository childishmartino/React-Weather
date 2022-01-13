const { REACT_APP_APIKEY } = process.env;

export const searchCity = (city) => {
    var endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${REACT_APP_APIKEY}`
    return fetch(endpoint);
};

export const searchUv = (lat, lon) => {
    var getUV = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${REACT_APP_APIKEY}`
    return fetch(getUV);
}