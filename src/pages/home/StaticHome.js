import React from 'react';
import { Row, Col } from 'reactstrap';

const StaticHome = () => {

    const staticHomeContent = [
        ['PokéList', '#ffe066', 'Find all of your favorite pokémon, be it by a specific pokédex or with a certain type.'],
        ['PokéPage', '#f24643', 'Content of a specific pokémon, their moves, evolution chain, abilities, types, videos etc.'],
        ['PokéTrivia', '#1688b9', 'A trivia to test your pokémon knowledge and determine what kind pokémon you would be based in your performance.'],
        ['PokéTrainers', '#fa883c', 'A list containing all users of Pokéfav where you can access each individual profile.']
    ]

    return (
        <Row className='justify-content-between'>
            <h1 className='col-12'>Home</h1>
            <Col xs='12' md='8'>
                <Row>
                    <p className='col-12'>Hello there fellow pokémon enthusiastic, welcome to Pokéfav! A spot to share your favorite Pokémons and your predilect Pokémon Team and also see other users favorites. If you want to know more things about what we have in this website check out the information bellow, of course if you sign up you'll be able to enjoy all the features! Dont't forget to catch them all!</p>
                    {staticHomeContent.map((item, key) =>
                        <Col xs='12' md='6' className='py-1'>
                            <h4 className='text-center m-0 pb-1' style={{ color: item[1] }}>
                                {item[0]}
                            </h4>
                            <p>{item[2]}</p>
                        </Col>
                    )}
                </Row>
            </Col>
            <Col className='text-center d-flex align-items-center' xs='12' md='4'>
                <img className='img-fluid py-2 py-md-0' src='https://i.pinimg.com/originals/0a/08/af/0a08af39768d638d2e4815a3eb955dff.png' alt='PokemonFavoriteTogether' />
            </Col>
        </Row>
    )
}

export default StaticHome
