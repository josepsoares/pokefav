import React from 'react'
import LazyLoad from 'react-lazyload';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import string from 'lodash/string';

const PokemonImage = props => {
    const { pokemonNumber, pokemonName, pokedexSearch, functionPokemon, functionVideo, lg } = props;
    const pokemonNameEdited = string.startCase(pokemonName);

    if (pokemonName !== undefined) {
        return (
            <Col className='py-md-2' sm='6' md='4' lg={lg}>
                <Link className='h-100 containerLink' to={`/pokemon-list/${pokedexSearch}/pokemon-page/${pokemonName}`}
                    onClick={() => {
                        functionPokemon(pokemonNumber);
                        functionVideo(pokemonName);
                    }}
                >
                    <div className='d-flex align-items-center justify-content-center' style={{ height: '150px' }}>
                        <LazyLoad height={200} once={true}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`}
                                alt={pokemonNameEdited}
                            />
                        </LazyLoad>
                    </div>
                    <h5 className='text-center'>{pokemonNameEdited}</h5>
                </Link>
            </Col>
        )
    }
}

export default PokemonImage
