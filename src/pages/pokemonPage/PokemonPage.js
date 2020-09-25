import React, { Component } from 'react';
import { Row, Col, TabContent } from 'reactstrap';
import { connect } from 'react-redux';
import PokemonPageMoves from './pokemonPageMoves';
import PokemonPageGenericInfo from './pokemonPageGenericInfo';
import PokemonPageEvChain from './pokemonPageEvChain';
import PokemonPageNextPrevious from './pokemonPageNextPrevious';
import { addFavoritePokemon, removeFavoritePokemon, addPokemonToTeam, removePokemonFromTeam } from '../../store/actions/favoriteActions';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import string from 'lodash/string';
import pokemon from 'pokemon';

class PokePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            activeVideo: 0,
            moveMethod: 'level-up'
        }
    }

    toggleTab = (tab) => {
        this.state.activeTab !== tab[0] && this.setState({ activeTab: tab[0], moveMethod: tab[1] });
    }

    changeVideo = (video) => {
        if (isNaN(video)) {
            let videoIndex = this.state.activeVideo;
            video === 'next' ? videoIndex++ : videoIndex--;
            if (videoIndex >= 0 && videoIndex <= 2) {
                this.state.activeVideo !== videoIndex && this.setState({ activeVideo: videoIndex });
            }
        } else {
            this.state.activeVideo !== video && this.setState({ activeVideo: video });
        }
    }

    render() {
        const { auth, removePokemonFromTeam, addPokemonToTeam, removeFavoritePokemon, addFavoritePokemon, pokemonInfo, pokemonEvChainInfo, pokemonAlternateFormInfo, pokemonVideos, errorPokemonVideos } = this.props;
        const { moves, stats, id, name, sprites } = pokemonInfo[0];
        const { genera, names, flavor_text_entries, forms_switchable } = pokemonInfo[1];
        const { activeVideo } = this.state;
        let pokemonName = pokemon.getName(id)
        var uniqueNames = new Set();

        for (let item of names) {
            (item.language.name !== "en" && item.name !== pokemonName) && uniqueNames.add(item.name);
        }

        if (auth.uid) {
            var { profilePokemonTeam, profilePokemonFavorites } = this.props;
            var foundPokemonTeam = profilePokemonTeam.find(pokemon => pokemon.name === name);
            var foundPokemonFavorites = profilePokemonFavorites.find(pokemon => pokemon.name === name);
        }

        const movesArray = [
            ['level-up', 'Level-Up Moves', 0],
            ['machine', 'TMs/HMs Moves', 1],
            ['egg', 'Egg Moves', 2]
        ]

        const description = flavor_text_entries.find((item) => {
            return item.language.name === 'en' && item
        })

        return (
            <Col xs='12'>
                <Row className="justify-content-center">
                    <Col xs='12' lg={auth.uid ? ('6') : ('12')}>
                        <h1 style={{ paddingBottom: '0.80rem' }} className={auth.uid ? ('text-lg-left text-center') : ('text-center')}>
                            <img alt={`${pokemonName}Miniature`} src={`http://www.pokestadium.com/assets/img/sprites/misc/icons/${this.props.match.params.pokemon}.png`} />
                            {pokemonName}
                            <span style={{ fontSize: '55%', color: '#1688b9' }}> {genera[2].genus}</span>
                        </h1>
                    </Col>
                    {auth.uid &&
                        <Col xs='12' lg='6'>
                            <Row className='justify-content-lg-end align-items-md-center justify-content-center h-100'>
                                {foundPokemonTeam !== undefined ?
                                    (<Button className='btn-danger my-2 my-lg-0 mx-3' startIcon={<DeleteIcon />}
                                        onClick={() => removePokemonFromTeam(pokemonName)}>Remove From Favorite Team</Button>) :
                                    profilePokemonTeam.length === 6 ?
                                        (<Button className='btn-warning my-2 my-lg-0 mx-3' startIcon={<NotInterestedIcon />} disabled>
                                            Your Favorite Team is Full
                                        </Button>) :
                                        (<Button className='btn-warning my-2 my-lg-0 mx-3' startIcon={<AddCircleOutlineIcon />}
                                            onClick={() => addPokemonToTeam([name, pokemonName, stats, id])}>
                                            Add to Favorite Team
                                        </Button>)
                                }
                                {foundPokemonFavorites !== undefined ?
                                    (<Button className='btn-danger my-2 my-lg-0 mx-3' startIcon={<DeleteIcon />}
                                        onClick={() => removeFavoritePokemon(pokemonName)}>Remove From Favorites</Button>) : profilePokemonFavorites.length === 50 ?
                                        (<Button className='btn-warning my-2 my-lg-0 mx-3' startIcon={<NotInterestedIcon />} disabled>
                                            Your Favorites are Full
                                        </Button>) :
                                        (<Button className='btn-warning my-2 my-lg-0 mx-3' startIcon={<AddCircleOutlineIcon />}
                                            onClick={() => addFavoritePokemon([name, pokemonName, stats, id])}>
                                            Add to Favorites
                                        </Button>)
                                }
                            </Row>
                        </Col>}
                    <Col xs='12 pb-4'>
                        <h6 className={auth.uid ? ('col-12 text-center text-lg-left pt-3 p-lg-0') : ('col-12 text-center p-0')}>
                            {Array.from(uniqueNames).map((uniqueNameItem, key) => <span key={key} className='p-2 secondaryNames'>{uniqueNameItem}</span>)}
                        </h6>
                    </Col>

                    <Col xs='12' className='py-4'>
                        <Row className='justify-content-center text-center'>
                            <Col xs='6' lg='3' className='py-1'>
                                <img alt={pokemonName} src={sprites.front_default} />
                            </Col>
                            <Col xs='6' lg='3' className='py-1'>
                                <img alt={pokemonName} src={sprites.back_default} />
                            </Col>
                            <Col xs='6' lg='3' className='py-1'>
                                <img alt={pokemonName} src={sprites.front_shiny} />
                            </Col>
                            <Col xs='6' lg='3' className='py-1'>
                                <img alt={pokemonName} src={sprites.back_shiny} />
                            </Col>
                        </Row>
                    </Col>

                    <PokemonPageGenericInfo info={pokemonInfo} />

                    <Col xs='12' md='6' lg='5' className='py-4 pb-5 mx-lg-auto'>
                        <Row>
                            <h3 className='col-12 text-center'>Value Stat Points</h3>
                            {stats.map((statsItem, key) =>
                                <Col key={key} xs='6' sm='6' md='4' lg='2'>
                                    <Row className='d-flex text-center align-items-center justify-content-center h-100'>
                                        <h6 className='col-12'>{string.startCase(statsItem.stat.name)}</h6>
                                        <p className='col-12'>{string.startCase(statsItem.base_stat)}</p>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col xs='12' md='6' lg='5' className='py-4 pb-5 mx-lg-auto'>
                        <h3 className='col-12 text-center'>Description</h3>
                        <Col xs='12'>
                            {description.flavor_text}
                        </Col>
                    </Col>

                    <PokemonPageEvChain evChainData={pokemonEvChainInfo} />

                    {forms_switchable &&
                        <Col xs='12' className='py-5'>
                            <h3 className='col-12 text-center'>Mega Evolution/Alternate Forms</h3>
                            <Row className='justify-content-center'>
                                {pokemonAlternateFormInfo.map((item, key) =>
                                    <Col xs='12' md='6' lg='4' className='text-center' key={key}>
                                        <Row className='justify-content-center'>
                                            <h1 style={{ fontSize: '22px' }} className='col-12'>{string.startCase(item.name)}</h1>
                                            <div className='col-12 py-2'>
                                                <img alt={item.name} src={item.sprites.front_default} />
                                            </div>
                                            <Col xs='12'>
                                                <Row className='justify-content-center align-items-center'>
                                                    <Col xs='6'>
                                                        <h4>Type(s)</h4>
                                                        {item.types.map((typeItem, key) =>
                                                            <Col xs='12' key={key}>
                                                                <Col xs='12' className={`text-center typeIcon type-${typeItem.type.name}`}>
                                                                    {typeItem.type.name}
                                                                </Col>
                                                            </Col>
                                                        )}
                                                    </Col>
                                                    <Col xs='6'>
                                                        <h4>Abilities</h4>
                                                        {item.abilities.map((abilityItem, key) =>
                                                            <p key={key}>
                                                                {string.startCase(abilityItem.ability.name)}
                                                            </p>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Row className='col-12 pt-4'>
                                                {item.stats.map((statsItem, key) =>
                                                    <Col key={key} xs='6'>
                                                        <Row className='d-flex text-center align-items-center justify-content-center h-100'>
                                                            <h6 className='col-12'>{string.startCase(statsItem.stat.name)}</h6>
                                                            <p className='col-12'>{string.startCase(statsItem.base_stat)}</p>
                                                        </Row>
                                                    </Col>
                                                )}
                                            </Row>
                                        </Row>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    }

                    <Col xs='12' md='11' lg='8' className='py-5 mx-md-auto'>
                        <h3 className='col-12 text-center'>Moves</h3>
                        <Paper style={{ color: '#ebebd3' }}>
                            <Tabs
                                value={this.state.activeTab}
                                scrollButtons="on"
                                variant="scrollable"
                            >
                                {movesArray.map((item, key) =>
                                    <Tab style={{ cursor: 'pointer' }} key={key}
                                        className='mx-auto'
                                        onClick={() => { this.toggleTab([item[2], item[0]]); }}
                                        label={item[1]}
                                        value={item[2]}
                                    />
                                )}
                            </Tabs>
                            <TabContent className='py-4 px-md-2' style={{ backgroundColor: '#343a40' }} activeTab={this.state.activeTab}>
                                <PokemonPageMoves pokemonMoves={moves} method={this.state.moveMethod} />
                            </TabContent>
                        </Paper>
                    </Col>

                    <Col xs="12" className='py-5'>
                        <h3 className='col-12 text-center'>Videos</h3>
                        {errorPokemonVideos &&
                            <div className='col-12 text-center'>
                                <p className='col-12 text-center'>Ops! Something went wrong!</p>
                                <p>{errorPokemonVideos === 'Daily Limit Exceeded. The quota will be reset at midnight Pacific Time (PT). You may monitor your quota usage and adjust limits in the API Console: https://console.developers.google.com/apis/api/youtube.googleapis.com/quotas?project=788452447704' || errorPokemonVideos === 'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.' ?
                                    ('Daily Youtube API Requests Limit Exceeded') :
                                    (errorPokemonVideos)}</p>
                            </div>
                        }
                        {pokemonVideos &&
                            <Col xs="10" md='6' className='mx-auto'>
                                <div
                                    className="video"
                                    style={{
                                        position: "relative",
                                        paddingBottom: "56.25%",
                                        paddingTop: 25,
                                    }}
                                >
                                    <iframe
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        src={`https://www.youtube.com/embed/${pokemonVideos[activeVideo].id.videoId}`}
                                        frameBorder="0"
                                        title={pokemonVideos[0].snippet.title}
                                    />
                                </div>
                                <div className='d-flex justify-content-center pt-4'>
                                    <IconButton disabled={activeVideo <= 0 && true}
                                        onClick={() => this.changeVideo('previous')} >
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                    {[...Array(4).keys()].slice(1).map((item, key) =>
                                        <Button
                                            style={{ minWidth: '10px !important' }} key={key}
                                            onClick={() => this.changeVideo(item)}
                                            className={`mx-2 pt-1 ${activeVideo === key ? `btn-danger btn-video` : `btn-warning btn-video`}`}
                                        >
                                            {item}
                                        </Button>
                                    )}
                                    <IconButton disabled={activeVideo >= 2 && true}
                                        onClick={() => this.changeVideo('next')}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                </div>
                            </Col>
                        }
                    </Col>
                    <PokemonPageNextPrevious pokemonId={pokemonInfo[0].id} pokemonName={pokemonName} />
                </Row>
            </Col >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        pokemonInfo: state.apiCalls.apiData.getPokemon,
        pokemonVideos: state.apiCalls.apiData.getPokemonVideos,
        errorPokemonVideos: state.apiCalls.apiData.errorYtData,
        pokemonEvChainInfo: state.apiCalls.apiData.getEvChain,
        pokemonAlternateFormInfo: state.apiCalls.apiData.getAlternateForms,
        profilePokemonTeam: state.firebase.profile.favoriteTeam,
        profilePokemonFavorites: state.firebase.profile.favoritePokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavoritePokemon: (pokemon) => dispatch(addFavoritePokemon(pokemon)),
        removeFavoritePokemon: (pokemon) => dispatch(removeFavoritePokemon(pokemon)),
        addPokemonToTeam: (pokemon) => dispatch(addPokemonToTeam(pokemon)),
        removePokemonFromTeam: (pokemon) => dispatch(removePokemonFromTeam(pokemon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage);