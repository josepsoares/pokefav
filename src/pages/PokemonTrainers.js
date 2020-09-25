import React, { Component } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
import { getUserAndPokemonForProfileIQ } from '../store/actions/apiActions';

class PokemonTrainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 1,
            resultsPerPage: 5,
            allUsers: this.props.getAllUsers,
            currentUsers: this.props.getAllUsers,
        }
    }

    componentDidMount() {
        const { allUsers } = this.state
        this.setState({
            currentUsers: this.calculatePage(allUsers, 1)
        });
    }

    calculatePage = (caculateResults, index) => {
        const { resultsPerPage } = this.state;
        const indexOfLastResults = index * resultsPerPage;
        const indexOfFirstResults = indexOfLastResults - resultsPerPage;
        const currentResults = caculateResults.slice(indexOfFirstResults, indexOfLastResults);
        return currentResults
    }

    getMoreUsers = () => {
        let { currentIndex, allUsers } = this.state;
        currentIndex = currentIndex += 1;
        this.setState({
            currentUsers: this.state.currentUsers.concat(this.calculatePage(allUsers, currentIndex)),
            currentIndex: currentIndex
        });
    };

    handleSearchChange = (event) => {
        const { value } = event.target;
        if (value !== "") {
            var trainer = value;
            var trainerSearched = [];
            for (let user of this.state.allUsers) {
                if (user.username.startsWith(trainer) || user.username.includes(trainer)) {
                    trainerSearched.push(user)
                }
            }
            this.setState({ currentUsers: trainerSearched });
        } else {
            const { allUsers } = this.state
            this.setState({ currentUsers: allUsers });
        }
    }

    render() {
        let { ready, currentUsers, allUsers } = this.state
        let { auth, getUserAndPokemonForProfileIQ } = this.props

        console.log(currentUsers)

        if ((!auth.uid) && (ready)) {
            return <Redirect to='/sign-in' />
        } else {
            return (
                <Row>
                    <h1 className='col-12 col-md-6 col-lg-9 px-2 py-2 py-md-0'>PokéTrainers</h1>
                    <Col className='col-12 col-md-6 col-lg-3 mx-auto px-2 py-2 py-md-0'>
                        <FormGroup className='m-0'>
                            <Input type="text" placeholder='search pokémon trainer' onChange={this.handleSearchChange} />
                        </FormGroup>
                    </Col>
                    <Col xs='12' className='pt-2'>
                        {!currentUsers ? <p>Ops, something went wrong!</p> :
                            <InfiniteScroll
                                className='row col-12'
                                dataLength={allUsers.length}
                                next={this.getMoreUsers}
                                hasMore={true}
                            >
                                {currentUsers.map((item, key) =>
                                    <Col xs='12' key={key}>
                                        <Link className='containerLink py-2' onClick={() => getUserAndPokemonForProfileIQ(item.username)} to={`/pokemon-trainers/profile/${item.username}`}>
                                            <Row className='text-center d-flex align-items-md-center'>
                                                <Col xs='12' md='3' className='d-flex justify-content-center'>
                                                    <img alt={item.avatar} src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`} /></Col>
                                                <Col xs='12' md='4' className='py-2 py-md-0'>
                                                    <p className='m-0'>{item.username}</p>
                                                </Col>
                                                <Col xs='6' md='2' className='py-2 py-md-0'>
                                                    <p className='m-0'>{item.gender}</p>
                                                </Col>
                                                <Col xs='6' md='2' className='py-2 py-md-0'>
                                                    <p className='m-0'>{item.nationality}</p>
                                                </Col>

                                            </Row>
                                        </Link>
                                        <hr className='my-3' />
                                    </Col>
                                )}
                            </InfiniteScroll>
                        }
                    </Col>
                </Row>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profileContent: state.firebase.profile,
        getAllUsers: state.apiCalls.apiData.getAllUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonTrainers)