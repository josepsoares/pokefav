import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getInfoPokemonPage, getYoutubeVideo } from '../../store/actions/apiActions';
import Tooltip from '@material-ui/core/Tooltip';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import pokemon from 'pokemon';
import string from 'lodash/string';

class pokemonPageEvChain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth,
        }
    }

    objectWithoutKey = (object, key) => {
        const { [key]: deletedKey, ...otherKeys } = object;
        return otherKeys;
    }

    getPokemonEvolutionMethodsAndNames = (item, index, arrayPokemonName, arrayMethodName, arrayMethod) => {
        let url = item.species.url.trim()
        let pokemonNumber = url.split('/')[6];
        let pokemonName = pokemon.getName(pokemonNumber)
        const checkConditions = []
        const NewEvolutionObject = this.objectWithoutKey(item.evolution_details[0], 'trigger');
        Object.entries(NewEvolutionObject).forEach((val) => {
            if (val[1] !== null && val[1] !== '' && val[1] !== false) {
                checkConditions.push(val);
            }
        })

        if (index !== false && index >= 1) {
            arrayPokemonName[arrayPokemonName.length - 1].push([pokemonName, pokemonNumber])
            arrayMethodName[arrayPokemonName.length - 1].push([item.evolution_details[0].trigger.name])
            arrayMethod[arrayPokemonName.length - 1].push([...checkConditions]);
        } else if (index !== false) {
            arrayPokemonName.push([[pokemonName, pokemonNumber]])
            arrayMethodName.push([[item.evolution_details[0].trigger.name]])
            arrayMethod.push([checkConditions]);
        } else {
            arrayPokemonName.push([pokemonName, pokemonNumber])
            arrayMethodName.push(item.evolution_details[0].trigger.name)
            arrayMethod.push([...checkConditions]);
        }
    }

    conditionsEvolution = (item, index) => {
        if (typeof item === 'string' || typeof item === 'number') {
            return <p className='m-0' key={index}>{string.startCase(item)}</p>
        } else if (Array.isArray(item)) {
            return item.map((secondItem, key) => {
                if (typeof secondItem === 'object') {
                    return <p className='m-0' key={key}>{string.startCase(secondItem.name)}</p>
                } else {
                    return <p className='m-0' key={key}>{string.startCase(secondItem)}</p>
                }
            })
        } else {
            return <p className='m-0' key={index}>{string.startCase(item.name)}</p>
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        var url;
        const { getInfoPokemonPage, getYoutubeVideo, evChainData } = this.props;
        const { width } = this.state;
        let evolutionMethod = [''];
        let evolutionMethodName = [''];
        let pokemonChainEvolutionNames = [];

        url = evChainData.chain.species.url.trim()
        pokemonChainEvolutionNames.push([pokemon.getName(url.split('/')[6]), url.split('/')[6]])
        if (evChainData.chain.evolves_to[0] !== undefined) {
            if (evChainData.chain.evolves_to.length !== 1) {
                for (let [index, item] of evChainData.chain.evolves_to.entries()) {
                    this.getPokemonEvolutionMethodsAndNames(item, index, pokemonChainEvolutionNames, evolutionMethodName, evolutionMethod)
                }
            } else {
                this.getPokemonEvolutionMethodsAndNames(evChainData.chain.evolves_to[0], false, pokemonChainEvolutionNames, evolutionMethodName, evolutionMethod)
            }

            if (evChainData.chain.evolves_to[0].evolves_to[0] !== undefined) {
                if (evChainData.chain.evolves_to[0].evolves_to.length !== 1) {
                    for (let [index, item] of evChainData.chain.evolves_to[0].evolves_to.entries()) {
                        this.getPokemonEvolutionMethodsAndNames(item, index, pokemonChainEvolutionNames, evolutionMethodName, evolutionMethod)
                    }
                } else {
                    this.getPokemonEvolutionMethodsAndNames(evChainData.chain.evolves_to[0].evolves_to[0], false, pokemonChainEvolutionNames, evolutionMethodName, evolutionMethod)
                }
            }
        }

        const printPokemonEvContent = (pokemonEvName, pokemonEvNumber, key, secondKey) => {
            const editedPokemonName = pokemonEvName.toLowerCase();
            const pokemonNumber = pokemonEvNumber;

            const getTooltipEvolutionMessage = () => {
                if (evolutionMethodName.length > 1 && evolutionMethodName[key] !== '') {
                    if (evolutionMethod[key].length > 1) {
                        if (secondKey === undefined) {
                            return evolutionMethod[key].map((specificItem) => {
                                return specificItem.map((specificInfo, index) =>
                                    this.conditionsEvolution(specificInfo, index)
                                )
                            })
                        } else {
                            return evolutionMethod[key][secondKey].map((item, key) =>
                                this.conditionsEvolution(item, key)
                            )
                        }
                    } else {
                        return evolutionMethod[key].map((item, key) =>
                            this.conditionsEvolution(item, key)
                        )
                    }
                } else {
                    return 'This the first or the only pokémon in this evolution chain';
                }
            }

            const arrowRight = (width >= 768 && key > 0) &&
                <ForwardRoundedIcon className='mx-3' style={{ fontSize: '3rem' }} />
            const arrowDown = (width < 768 && key < pokemonChainEvolutionNames.length - 1) &&
                <ArrowDownwardRoundedIcon className='col-12 pt-3' style={{ fontSize: '3.50rem' }} />

            return (
                <div className='row d-flex align-items-center'>
                    {arrowRight}
                    <Tooltip key={key} arrow title={
                        key >= 1 ?
                            <div className="align-items-center justify-content-center text-center">
                                <p className='m-0 font-weight-bold'>Trigger:</p>
                                {Array.isArray(evolutionMethodName[key]) ?
                                    (<p className='mb-1'>{string.startCase(evolutionMethodName[key][secondKey])}</p>)
                                    :
                                    (<p className='mb-1'>{string.startCase(evolutionMethodName[key])}</p>)}
                                <p className='m-0 font-weight-bold'>Requirement:</p>
                                {getTooltipEvolutionMessage()}
                            </div> :
                            <div className='m-0 p-2'>{getTooltipEvolutionMessage()}</div>
                    }>
                        <Link
                            className='h-100 col-12 col-md-auto'
                            to={`/pokemon-list/national/pokemon-page/${editedPokemonName}`}
                            onClick={() => {
                                getInfoPokemonPage(pokemonNumber);
                                getYoutubeVideo(editedPokemonName);
                            }}>
                            <div className='text-center'>
                                {Array.isArray(pokemonChainEvolutionNames[key][0]) ? (
                                    <img alt={editedPokemonName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonChainEvolutionNames[key][secondKey][1]}.png`} />)
                                    :
                                    (<img alt={editedPokemonName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonChainEvolutionNames[key][1]}.png`} />)
                                }
                            </div>
                        </Link>
                    </Tooltip>
                    {arrowDown}
                </div>
            )
        }

        return (
            <Col xs='12' className='py-4'>
                <Row className='justify-content-center'>
                    <h3 className='col-12 text-center'>Evolution Chain</h3>
                    <Row className='d-flex flex-wrap align-items-center justify-content-center h-100 my-3 my-md-0 mx-md-2'>
                        {pokemonChainEvolutionNames.map((pokeEvName, key) => {
                            if (typeof pokeEvName[0] !== 'string') {
                                return (
                                    <Row key={key} className='d-flex d-md-block align-items-center justify-content-center w-md-auto'>
                                        {pokeEvName.map((alternativeEvName, index) =>
                                            <div className='text-center col-6 col-md-12 py-1' key={index}>
                                                {printPokemonEvContent(
                                                    alternativeEvName[0],
                                                    alternativeEvName[1],
                                                    key,
                                                    index
                                                )}
                                            </div>
                                        )}
                                    </Row>
                                )
                            } else {
                                return (
                                    <Row key={key} className='col-12 col-md-auto d-flex flex-wrap align-items-center justify-content-center h-100 my-3 my-md-0 mx-md-2'>
                                        {printPokemonEvContent(
                                            pokemonChainEvolutionNames[key][0],
                                            pokemonChainEvolutionNames[key][1],
                                            key
                                        )}
                                    </Row>
                                )
                            }
                        })}
                    </Row>
                </Row>
            </Col>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        getYoutubeVideo: (pokemon) => dispatch(getYoutubeVideo(pokemon))
    }
}

export default connect(null, mapDispatchToProps)(pokemonPageEvChain)

