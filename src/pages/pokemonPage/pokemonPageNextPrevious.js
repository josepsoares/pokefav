import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { getInfoPokemonPage, getYoutubeVideo } from '../../store/actions/apiActions'
import pokemon from 'pokemon';

const pokemonPageNextPrevious = (props) => {
    let { pokemonId, getInfoPokemonPage, getYoutubeVideo } = props;
    let pokemonIds = [];
    var pokemonNextName,
        pokemonPreviousName;

    if (pokemonId === 1) {
        pokemonIds.push(pokemonId += 1)
        pokemonNextName = pokemon.getName(`${pokemonIds[0]}`)
    } else if (pokemonId === 808) {
        pokemonIds.push(pokemonId -= 1)
        pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
    } else {
        pokemonIds.push(pokemonId -= 1)
        pokemonIds.push(pokemonId += 2)
        pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`)
        pokemonNextName = pokemon.getName(`${pokemonIds[1]}`)
    }

    return (
        <Row className="col-12 justify-content-between align-items-center">
            <Col xs="12" sm='6' className='py-2 py-sm-0'>
                {props.pokemonId <= 808 && props.pokemonId !== 1 &&
                    <Row className='d-flex align-items-center justify-content-start'>
                        <Link className='basicLink'
                            to={`/pokemon-list/national/pokemon-page/${pokemonPreviousName.toLowerCase()}`}
                            onClick={(event) => {
                                getInfoPokemonPage(event.currentTarget.id);
                                getYoutubeVideo(event.currentTarget.id)
                            }}
                        >
                            <Col xs='12' className='text-center'>
                                <img alt={pokemonPreviousName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[0]}.png`} />
                            </Col>
                            <Col xs='12' className='text-center'>
                                <ArrowBackRoundedIcon className='mx-auto' />
                                <p className='py-1'>{pokemonPreviousName}</p>
                            </Col>
                        </Link>
                    </Row>
                }
            </Col>
            <Col xs="12" sm="6" lg="2" className='py-2 py-sm-0'>
                {props.pokemonId >= 1 && props.pokemonId !== 808 &&
                    <Row className='d-flex align-items-center justify-content-end'>
                        <Link className='basicLink'
                            to={`/pokemon-list/national/pokemon-page/${pokemonNextName.toLowerCase()}`}
                            onClick={(event) => {
                                getInfoPokemonPage(event.currentTarget.id);
                                getYoutubeVideo(event.currentTarget.id)
                            }}
                        >
                            <Col xs='12' className='text-center'>
                                <img alt={pokemonNextName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIds[1]}.png`} />
                            </Col>
                            <Col xs='12' className='text-center'>
                                <ArrowForwardRoundedIcon className='mx-auto' />
                                <p className='py-1'>{pokemonNextName}</p>
                            </Col>
                        </Link>
                    </Row>
                }
            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        getYoutubeVideo: (pokemon) => dispatch(getYoutubeVideo(pokemon))
    }
}

export default connect(null, mapDispatchToProps)(pokemonPageNextPrevious);