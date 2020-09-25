import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import HighlightText from '../../components/HighlightText';
import { firestoreConnect } from 'react-redux-firebase';
import { getUserAndPokemonForProfileIQ, getInfoPokemonPage, getYoutubeVideo } from '../../store/actions/apiActions'
import getStatsMessages from '../../functions/getMessageFavoritesTeam';
import ReactionIcons from '../../components/ReactionIcons';
import moment from 'moment';
import string from 'lodash';
import array from 'lodash';

class UserHome extends Component {
    render() {
        const { profileContent, notifications, getInfoPokemonPage, getUserAndPokemonForProfileIQ, reactionIsLoading } = this.props;
        const { username, triviaRecord, favoritePokemons, favoriteTeam, friends } = profileContent;
        const getFavoritesMessage = getStatsMessages(favoritePokemons, 'favorites');
        const getTeamMessage = getStatsMessages(favoriteTeam, 'team');
        var recentFriends = array.takeRight(friends, 6);

        const statsUser = [
            ['No. of Favorite Pokemons', favoritePokemons.length],
            ['No. of Favorite Pokemon Team', favoriteTeam.length],
            ['Personality Trait', getFavoritesMessage[0]],
            ['Battle Personality Trait', getTeamMessage[0]]
        ]

        const triviaUser = [
            ['No. of Realized Trivias', triviaRecord.realizedTrivias],
            ['No. of Correct Answers', triviaRecord.correctAnswers],
            ['No. of Wrong Answers', triviaRecord.wrongAnswers]
        ]

        if (!notifications) {
            return <Loading height='50vh' />
        } else {
            return (
                <Row>
                    <h1 className='col-12 col-md-11 col-lg-12 mx-md-auto mx-lg-0 px-0'>
                        Home - <small>Welcome {username}</small>
                    </h1>
                    <Col xs='12' md='11' lg='8' className='pl-0 mx-md-auto mx-lg-0'>
                        <h3 className='col-12 col-md-6 col-lg-8 text-md-left px-0 pb-4'>
                            All Users Activity
                        </h3>
                        {reactionIsLoading ?
                            <Loading /> :
                            notifications.length !== 0 ? notifications.map((item, key) =>
                                <Row key={key} className='p-2 text-center d-flex align-items-center'>
                                    <Link
                                        onClick={() => getUserAndPokemonForProfileIQ(item.user)}
                                        className='col-6 mx-auto mx-md-0 col-md-3 col-lg-2 text-center containerLink p-0'
                                        to={`/pokemon-trainers/profile/${item.user}`}
                                    >
                                        <Col xs='12' className='py-2 py-md-0 text-center justify-content-center'>
                                            <img src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} alt={item.avatar} />
                                        </Col>
                                        <p className='py-2 py-md-0 m-0'>{item.user}</p>
                                    </Link>
                                    <p className='col-12 col-md-7 py-2 py-md-0'>{item.content}</p>
                                    <p className='col-12 col-md-2 m-0' style={{ color: '#ffe066' }}>
                                        <small>{moment(item.time.toDate()).fromNow()}</small>
                                    </p>
                                    <ReactionIcons notificationItem={item} profile={profileContent} />
                                    <hr className='col-10 mx-auto my-3' />
                                </Row>)
                                :
                                <div>We couldn't find any notifications in our database...</div>
                        }
                    </Col>
                    <Col xs='12' md='11' lg='4' className='mx-auto py-md-3'>
                        <Row>
                            <h3 className='col-12 pb-4'>Your Stats</h3>
                            <Col xs='12' md='6' lg='12' className='py-2'>
                                <h4>Favorite Lists</h4>
                                {statsUser.map((item, key) =>
                                    <HighlightText key={key}
                                        header={item[0]}
                                        text={item[1]}
                                    />
                                )}
                            </Col>
                            <Col xs='12' md='6' lg='12' className='py-2'>
                                <h4>Trivia</h4>
                                {triviaUser.map((item, key) =>
                                    <HighlightText key={key}
                                        header={item[0]}
                                        text={item[1]}
                                    />
                                )}
                                <p>
                                    <b>Inner Pokémon IQ</b> -
                                {triviaRecord.pokemonIQ ? (
                                        <Link className='basicLink d-inline'
                                            to={`/pokemon-list/national/pokemon-page/${triviaRecord.pokemonIQ}`}
                                            onClick={() => {
                                                getInfoPokemonPage(triviaRecord.pokemonIQ);
                                                getYoutubeVideo(triviaRecord.pokemonIQ)
                                            }}>
                                            {string.startCase(triviaRecord.pokemonIQ)}
                                        </Link>) : " You still haven't played PokéTrivia to calculate this result!"
                                    }
                                </p>
                            </Col>
                        </Row>

                        <Row className='justify-content-center align-items-center py-3 m-lg-0'>
                            <h3 className='pb-4 col-12 px-3 px-lg-0'>Following List</h3>
                            {friends.length === 0 ? (
                                <p>You don't have any friends in your list, check out the <Link className='basicLink' to='/pokemon-trainers'>PokéTrainers</Link> to add fellow Pokémon Trainers.</p>) :
                                (recentFriends.map((item, key) =>
                                    <Col key={key} className='text-center mx-auto' xs='4' lg='5'>
                                        <Link onClick={() => getUserAndPokemonForProfileIQ(item.username)} className='containerLink py-2' to={`/pokemon-trainers/profile/${item.username}`}>
                                            <img
                                                alt={item.avatar}
                                                src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`}
                                            />
                                            <p className='mt-3 mb-0'>{item.username}</p>
                                        </Link>
                                    </Col>
                                ))}
                        </Row>
                    </Col>
                </Row>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        reactionIsLoading: state.notifications.isReactionLoading,
        profileContent: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user)),
        getInfoPokemonPage: (pokemon) => dispatch(getInfoPokemonPage(pokemon)),
        getYoutubeVideo: (pokemon) => dispatch(getYoutubeVideo(pokemon))
    }
}

export default compose(
    firestoreConnect([
        { collection: 'notifications', orderBy: ['time', 'desc'], limit: 6 }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(UserHome)