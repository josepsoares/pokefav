import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import PokemonImage from '../../components/PokemonImage';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import getStatsMessages from '../../functions/getMessageFavoritesTeam';
import { addFriend, removeFriend } from '../../store/actions/friendsActions';
import { getInfoPokemonPage, getUserAndPokemonForProfileIQ, getYoutubeVideo, getSignUpData } from '../../store/actions/apiActions';
import pokemon from 'pokemon';

class Profile extends Component {
    state = { width: window.innerWidth }

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

    displayPokemon = (username, actionName, pokemonArray, functionInfoPokemon, funtionVideoPokemon) => {
        return pokemonArray.length === 0 ?
            (<p>{username} doesn't have any Pokémon in their {actionName}!</p>) :
            (<Row className='justify-content-center'>
                {pokemonArray.map((item, key) =>
                    <React.Fragment key={key}>
                        <PokemonImage
                            pokemonName={item.name}
                            pokemonNumber={item.id}
                            pokedexSearch={'national'}
                            functionPokemon={functionInfoPokemon}
                            functionVideo={funtionVideoPokemon} lg='2'
                        />
                    </React.Fragment>
                )}
            </Row>)
    }

    render() {
        const { addFriend, removeFriend, isLoggedIn, userInfo, userPokemonIQ, profile, getUserAndPokemonForProfileIQ, loggedUserFollowers, getSignUpData } = this.props;
        const { username, avatar, gender, nationality, favoriteGame, favoriteRegion, favoritePokemons, favoriteTeam, triviaRecord, friends } = userInfo;
        const { width } = this.state;
        const isUserLoggedInProfile = userInfo.username === profile.username
        const messageFavorites = getStatsMessages(userInfo.favoritePokemons, 'favorites');
        const messageTeam = getStatsMessages(userInfo.favoriteTeam, 'team');
        var pokemonName, description;

        if (userPokemonIQ) {
            description = userPokemonIQ.flavor_text_entries.find((item) => {
                return item.language.name === 'en' && item
            })
            pokemonName = pokemon.getName(userPokemonIQ.id)
        } else {
            pokemonName = null
        }

        if (!isUserLoggedInProfile) {
            if (loggedUserFollowers) {
                var findFriends = loggedUserFollowers.find(friend => friend.username === username)
            }
        }

        if (!isLoggedIn) {
            return <Redirect to='/sign-in' />
        } else {
            return (
                <Row>
                    <Col xs='12' md='6' className='text-center'>
                        <h1>{username}</h1>
                    </Col>
                    <Col xs='12' md='6' className='text-center py-3 py-md-0'>
                        {!isUserLoggedInProfile && (
                            findFriends === undefined ?
                                (<Button className='btn-warning my-2 my-lg-0 mx-3' startIcon={<AddCircleOutlineIcon />}
                                    onClick={() => addFriend(userInfo)}>
                                    Add to Following List
                                </Button>) :
                                (<Button className='btn-danger my-2 my-lg-0 mx-3' startIcon={<DeleteIcon />}
                                    onClick={() => removeFriend(userInfo)}>
                                    Remove from Following List
                                </Button>)
                        )}
                        {isUserLoggedInProfile && <Link onClick={getSignUpData} to={`/profile/edit/${username}`}>
                            <Button className='btn-warning my-2 my-lg-0 mx-3' startIcon={<EditIcon />}>
                                Edit Profile/Lists
                            </Button>
                        </Link>}
                    </Col>
                    <Col xs='12'>
                        <Row className='text-center align-items-center justify-content-center mx-auto'>
                            {width < 768 &&
                                <Col className='d-flex justify-content-center mb-2 p-2 p-md-0' xs='12' md='2' lg='2'>
                                    <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                                </Col>
                            }
                            <Col xs='12' md='3' className='p-2 p-md-0'>
                                <h5 className='col-12'>Gender</h5>
                                <p className='col-12'>{gender}</p>
                            </Col>
                            <Col xs='12' md='2' className='p-2 p-md-0'>
                                <h5 className='col-12'>From</h5>
                                <p className='col-12'>{nationality}</p>
                            </Col>
                            {width > 768 &&
                                <Col className='d-flex justify-content-center mb-2 p-2 p-md-0' xs='12' md='2' lg='2'>
                                    <img alt={avatar} src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`} />
                                </Col>
                            }
                            <Col xs='12' md='2' className='p-2 p-md-0'>
                                <h5 className='col-12'>Favorite Game</h5>
                                <p className='col-12'>{favoriteGame}</p>
                            </Col>
                            <Col xs='12' md='3' className='p-2 p-md-0'>
                                <h5 className='col-12'>Favorite Generation</h5>
                                <p className='col-12'>{favoriteRegion}</p>
                            </Col>
                        </Row>
                    </Col>
                    <hr className='col-8 mx-auto my-4 my-lg-5' />
                    <Col xs='12'>
                        <Row className='text-center justify-content-center'>
                            <Col xs='12' md='6' lg='5'>
                                <h3>Personality</h3>
                                {favoritePokemons.length !== 0 ?
                                    (<div><h4>{messageFavorites[0]}</h4><p className='text-left'>{messageFavorites[1]}</p></div>) :
                                    (<p>{username} doesn't have any pokémons on their Favorite Pokemons List to calculate this result...</p>)}
                            </Col>
                            <Col xs='12' md='6' lg='5'>
                                <h3>Battle Personality</h3>
                                {favoriteTeam.length !== 0 ? (<div><h4>{messageTeam[0]}</h4><p className='text-left'>{messageTeam[1]}</p></div>) :
                                    (<p>{username} doesn't have any pokémons on their Favorite Team to calculate this result...</p>)}
                            </Col>
                        </Row>
                    </Col>
                    <hr className='col-10 mx-auto my-4 my-lg-5' />
                    <Col xs='12'>
                        <Row className='text-center justify-content-center'>
                            <h3 className='col-12'>Inner Pokémon IQ</h3>
                            <h4 className='col-12'>Trivia Stats</h4>
                            <p className='col-12 col-md-4'>No. Realized Trivias -
                            <span style={{ color: '#ffe066', fontWeight: 'bold' }}>{` ${triviaRecord.realizedTrivias}`}</span>
                            </p>
                            <p className='col-12 col-md-4'>No. Correct Answers -
                            <span style={{ color: '#ffe066', fontWeight: 'bold' }}>{` ${triviaRecord.correctAnswers}`}</span>
                            </p>
                            <p className='col-12 col-md-4'>No. Wrong Answers -
                            <span style={{ color: '#ffe066', fontWeight: 'bold' }}>{` ${triviaRecord.wrongAnswers}`}</span>
                            </p>
                            {!userPokemonIQ ?
                                (<p className='col-12 pt-4'>{username} still hasn't played any PokéTrivia to calculte their Inner Pokémon IQ...</p>) :
                                (<Row className='justify-content-center align-items-center pt-4'>
                                    <h4 className='col-12'>{username} is intelligent as a <b>{pokemonName}</b>!</h4>
                                    <Col xs='12' lg='3' className='py-3'>
                                        <Link to={`/pokemon-list/national/pokemon-page/${pokemonName.toLowerCase()}`}
                                            onClick={() => getInfoPokemonPage(pokemonName.toLowerCase())}>
                                            <img alt={pokemonName} src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`} />
                                        </Link>
                                    </Col>
                                    <Col xs='12' lg='5'>
                                        <p className='text-left'>{description.flavor_text}</p>
                                    </Col>
                                </Row>)
                            }
                        </Row>
                    </Col>
                    <hr className='col-10 mx-auto my-4 my-lg-5' />
                    <Col xs='12' className='py-3 py-lg-4 text-center'>
                        <h3>Favorite Pokémons</h3>
                        {this.displayPokemon(username, 'Favorite Pokémon List', favoritePokemons, getInfoPokemonPage, getYoutubeVideo)}
                    </Col>
                    <Col xs='12' className='py-3 py-lg-4 text-center'>
                        <h3>Favorite Pokémon Team</h3>
                        {this.displayPokemon(username, 'Favorite Pokémon Team', favoriteTeam, getInfoPokemonPage, getYoutubeVideo)}
                    </Col>
                    <hr className='col-10 mx-auto my-4 my-lg-5' />
                    <Col xs='12' className='pb-4'>
                        <Row className='justify-content-center text-center'>
                            <h3 className='col-12'>Following</h3>
                            {friends.length === 0 ?
                                (<p>{username} still doesn't have any Pokémon Trainers in their follow list.</p>) :
                                (friends.map((item, key) =>
                                    <Col key={key} xs='6' md='4' lg='2'>
                                        <Link className='basicLink d-block'
                                            to={`/pokemon-trainers/profile/${item.username}`}
                                            onClick={() => getUserAndPokemonForProfileIQ(item.username)}
                                        >
                                            <img
                                                alt={item.avatar}
                                                src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`}
                                            />
                                            <p>{item.username}</p>
                                        </Link>
                                    </Col>)
                                )
                            }
                        </Row>
                    </Col>
                </Row >
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        addFriend: (user) => dispatch(addFriend(user)),
        removeFriend: (user) => dispatch(removeFriend(user)),
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user)),
        getYoutubeVideo: (pokemon) => dispatch(getYoutubeVideo(pokemon)),
        getSignUpData: () => dispatch(getSignUpData())
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.firebase.auth.uid,
        profile: state.firebase.profile,
        userInfo: state.apiCalls.apiData.getLinkUserInfo,
        userPokemonIQ: state.apiCalls.apiData.getPokemonIQ,
        friendAction: state.friends.actionFriendError,
        loggedUserFollowers: state.firebase.profile.friends
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);