import React, { useState } from 'react';
import { Container, Col, Form, Button, Row, Card } from 'react-bootstrap';
import { searchCity, getSevenDayWeatherInfo, getBackgroundImage } from '../utils/API';

const HomePage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedCity, setSearchedCity] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [cityImage, setBackgroundImage] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!searchInput) {
            return false;
        }

        try {
            const searchResponse = await searchCity(searchInput);
            
            if (!searchResponse.ok) {
                throw new Error('something went wrong!');
            }

            const searchData = await searchResponse.json();
            const cityData = ({
                cityId: searchData.id,
                cityName: searchData.name,
                lat: searchData.coord.lat,
                lon: searchData.coord.lon,
            });
            const todayForecast = ([{
                day: new Date(searchData.dt * 1000).toLocaleDateString("en-US", {weekday: 'long'}),
                date: new Date(searchData.dt * 1000).toLocaleDateString("en-US"),
                temp: searchData.main.temp,
                humidity: searchData.main.humidity,
                weatherDescription: searchData.weather[0].description,
                weatherIcon: searchData.weather[0].icon,
            }])
            setSearchedCity(cityData);
            setSearchInput('')

            getSevenDayWeatherInfo(cityData.lat, cityData.lon)
                .then(response => response.json())
                .then(data => {
                    const { daily } = data
                    const sevenDayForecast = daily.slice(1).map((day) => ({
                        day: new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: 'long'}),
                        date: new Date(day.dt *1000).toLocaleDateString("en-US"),
                        tempMin: day.temp.min,
                        tempMax: day.temp.max,
                        humidity: day.humidity,
                        weatherDescription: day.weather[0].description,
                        weatherIcon: day.weather[0].icon
                    }));
                    const forecast = todayForecast.concat(sevenDayForecast)
                    console.log(forecast)
                    setForecastData(forecast);
                });

            getBackgroundImage(cityData.cityName)
                .then(response => response.json())
                .then(data => {
                    const { results } = data
                    const imageResult = results.slice(0, 1)
                    const cityPic = imageResult[0].urls.raw
                    setBackgroundImage(cityPic)
                });
                
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container className='py-4'>
            <div className='p-5 mb-4 bg-light rounded-3'>
                <Container fluid={true} className='py-5'>
                    <h1 className='display-5 fw-bold'> Search for a city: </h1>
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col xs={12} md={8}>
                                <Form.Group className="mb-3 py-3" controlId="formBasicEmail">
                                <Form.Control 
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="text" 
                                    placeholder="Search for a city" 
                                />
                                </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                <Button className='mt-3' type='submit' variant='primary'>
                                    Submit Search
                                </Button>
                                </Col>
                            </Row>
                        </Form>
                </Container>
            </div>
            <div className="logo" style={{backgroundImage: `url(${cityImage})`}}>
                <Container className='py-5'>
                <h2 className='display-5 fw-bold'> {searchedCity.cityName} </h2>
                <h3 className='display-5 fw-bold'> {searchedCity.currentTemp} </h3>
                    <Row>
                    {forecastData.slice(0,5).map((day) => {
                        return (
                        <Col key={day.date}>
                            <Card>
                                <Card.Title>
                                {day.date === new Date().toLocaleDateString("en-US") ? 'Today' : day.date} <br></br> {day.day}
                                </Card.Title>
                                <Card.Body>
                                    {day.tempMin ? `Low: ${day.tempMin}` : `Right Now: ${day.temp}`}
                                    <br></br>
                                    {day.tempMax ? `High: ${day.tempMax}` : ''}
                                </Card.Body>
                            </Card>
                        </Col>
                        )
                    })}
                    </Row>
            </Container>
            </div>
        </Container>
    )
};


export default HomePage;