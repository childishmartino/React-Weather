import React, { useState } from 'react';
import { Container, Col, Form, Button, Row, Card, CardColumns } from 'react-bootstrap';
import { searchCity, searchUv } from '../utils/API';

const HomePage = () => {
    const [searchInput, setSearchInput] = useState('');

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
            const cityData = {
                cityId: searchData.id,
                cityName: searchData.name,
                lat: searchData.coord.lat,
                lon: searchData.coord.lon,
            };

            const uvResponse = await searchUv(cityData.lat, cityData.lon);
            const uvData = await uvResponse.json()
            cityData.uvi = uvData.current.uvi

            console.log(cityData)
            console.log(uvData)
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
        </Container>
    )
};


export default HomePage;