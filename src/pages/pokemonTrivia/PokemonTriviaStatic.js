import React from 'react';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const PokemonTriviaStatic = props => {
    return (
        <Row className='justify-content-between'>
            <h1 className='col-12'>PokéTrivia</h1>
            <Col xs='12' md='8' lg='6'>
                <p>Do you think you know your fair share of knowledge of the Pokémon universe? How about to play the Trivia that we provided for you in order to determine your what Pokémon you would be based on your intelligence. Are you an intellectual like Alakazam or Metagross or are you as oblivious as Slowpoke or Magikarp? To find the answer just starting playing and check out your profile when you're done to find out what pokémon are you! Good luck!</p>
                <Col xs='12' className='px-0 py-2 d-flex'>
                    <Button className='btn-warning w-50 mx-auto' startIcon={<PlayCircleFilledIcon />}
                        onClick={props.startTrivia}>
                        Start Trivia
                    </Button>
                </Col>
            </Col>
            <Col xs='12' md='4' lg='6'>
                <img className='img-fluid' src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/065_f2.png" alt='Alakazam' />
            </Col>
        </Row>
    )
}

export default PokemonTriviaStatic
