import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, ModalBody, ModalFooter } from 'reactstrap';
import SelectComponent from '../../components/SelectComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import { editProfile } from '../../store/actions/authActions';
import { removeFriend } from '../../store/actions/friendsActions';
import { removeFavoritePokemon, removePokemonFromTeam } from '../../store/actions/favoriteActions';
import { optionsGender, getNatGameRegion, femaleAvatars, maleAvatars } from '../../functions/InfoEditSignUp';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalContent: {
                modalItemName: '',
                modalAction: ''
            },
            avatar: this.props.profileContent.avatar,
            selectGender: {
                label: this.props.profileContent.gender,
                value: this.props.profileContent.gender
            },
            selectNationality: {
                label: this.props.profileContent.nationality,
                value: this.props.profileContent.nationality
            },
            selectGame: {
                label: this.props.profileContent.favoriteGame,
                value: this.props.profileContent.favoriteGame
            },
            selectRegion: {
                label: this.props.profileContent.favoriteRegion,
                value: this.props.profileContent.favoriteRegion
            }
        };
    }

    subtmitChanges = () => {
        const { avatar, selectGender, selectNationality, selectGame, selectRegion } = this.state;
        const { editProfile } = this.props;
        editProfile(avatar, selectGender.value, selectNationality.value, selectGame.value, selectRegion.value);
    }

    handleAvatarChange = (event) => {
        this.setState({
            avatar: event
        })
    }

    handleSelectChange = (value, action) => {
        if (value.value === 'Male') {
            this.setState({ [action.name]: { label: value.value, value: value.value }, avatar: maleAvatars[0] });
        } else if (value.value === 'Female') {
            this.setState({ [action.name]: { label: value.value, value: value.value }, avatar: femaleAvatars[0] });
        } else {
            this.setState({ [action.name]: { label: value.value, value: value.value } });
        }
    }

    toggleModal = (name, action) => {
        if (!name && !action) {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        } else {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
                modalContent: { modalItemName: name, modalAction: action }
            });
        }
    }

    printListText = text => {
        return <ListItem style={{ fontSize: '13px' }} className='text-left py-2'>{text}</ListItem>
    }

    render() {
        const { removeFavoritePokemon, removePokemonFromTeam, removeFriend, dataToEditProfile, profileContent } = this.props;
        const { avatar, selectNationality, selectGame, selectRegion, selectGender, isModalOpen } = this.state;
        const { username, favoritePokemons, favoriteTeam, friends } = profileContent
        const { modalItemName, modalAction } = this.state.modalContent;

        const listStyle = {
            display: 'flex',
            width: '100%',
            maxWidth: 360,
            minHeight: 110,
            maxHeight: 400,
            backgroundColor: '#343a40',
            color: '#ebebd3',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'auto'
        }

        const InfoNatGameRegion = getNatGameRegion(dataToEditProfile);
        const InfoSelects = [
            ['Gender', 'selectGender', selectGender, this.handleSelectChange, optionsGender],
            ['Nationality', 'selectNationality', selectNationality, this.handleSelectChange, InfoNatGameRegion[0]],
            ['Favorite Game', 'selectGame', selectGame, this.handleSelectChange, InfoNatGameRegion[1]],
            ['Favorite Generation', 'selectRegion', selectRegion, this.handleSelectChange, InfoNatGameRegion[2]]
        ]

        return (
            <Row className='text-center align-items-center'>
                <Col xs='12' md='6' className='text-center'>
                    <h1>{username}</h1>
                </Col>
                <Col xs='12' md='6' className='text-center mb-4 pb-md-0'>
                    <Button className='btn-warning' startIcon={<SaveIcon />}
                        onClick={this.subtmitChanges}>
                        Save Changes
                    </Button>
                </Col>
                <h4 className='col-12'>Avatar</h4>
                <Col xs='12' md='11' className='mx-md-auto'>
                    <Row>
                        {selectGender.value === 'Female' ? (femaleAvatars.map((item, key) =>
                            <Col className='p-1' sm='4' md='2' key={key}
                                onClick={() => { this.handleAvatarChange(item) }}>
                                <img alt={item} className={`avatar pb-2 ${avatar === item && `active-avatar`}`}
                                    src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`} />
                            </Col>)) :
                            (maleAvatars.map((item, key) =>
                                <Col className='p-1' sm='4' md='2' key={key}
                                    onClick={() => { this.handleAvatarChange(item) }}>
                                    <img alt={item} className={`avatar pb-2 ${avatar === item && `active-avatar`}`}
                                        src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`} />
                                </Col>)
                            )
                        }
                    </Row>
                </Col>
                <hr className='col-8 mx-auto my-4 my-lg-5' />
                <Col xs='12' md='11' className='mx-md-auto'>
                    <Row>
                        {InfoSelects.map((item, key) =>
                            SelectComponent(item[0], item[1], item[2], item[3], item[4], key)
                        )}
                    </Row>
                </Col>
                <Col xs='12' md='11' className='mx-md-auto'>
                    <Row className='text-center justify-content-center'>
                        <Col xs='12' md='6' lg='4' className='pt-5'>
                            <h5 className='pb-2'>Favorite Pokémons</h5>
                            <Paper>
                                <List style={listStyle}>
                                    {favoritePokemons.length !== 0 ? (favoritePokemons.map((item, key) =>
                                        <ListItem style={{ borderBottom: key !== friends.length - 1 ? '1px solid #ffe066' : 'none' }} key={key} className='w-75 mx-auto mb-2'>
                                            <img style={{ minHeight: '40px' }} alt={item.name}
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                                            />
                                            <p className='col-8 m-0'>{item.editedName}</p>
                                            <IconButton className='p-2' onClick={() => this.toggleModal(item.editedName, 'Favorite Pokémon List')}>
                                                <DeleteIcon style={{ color: '#f24643' }} />
                                            </IconButton>
                                        </ListItem>)) :
                                        (this.printListText("You still haven't added any Favorite Pokémons to your list yet! Search for your favorites in the PokéList!"))}
                                </List>
                            </Paper>
                        </Col>
                        <Col xs='12' md='6' lg='4' className='pt-5'>
                            <h5 className='pb-2'>Favorite Pokémon Team</h5>
                            <Paper>
                                <List style={listStyle}>
                                    {favoriteTeam.length !== 0 ? (favoriteTeam.map((item, key) =>
                                        <ListItem style={{ borderBottom: key !== friends.length - 1 ? '1px solid #ffe066' : 'none' }} key={key} className='justify-content-center align-items-center w-75 mx-auto mb-2'>
                                            <img style={{ minHeight: '40px' }} alt={item.name}
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                                            />
                                            <p className='col-8 m-0'>{item.editedName}</p>
                                            <IconButton className='p-2' onClick={() => this.toggleModal(item.editedName, 'Favorite Pokémon Team')}>
                                                <DeleteIcon style={{ color: '#f24643' }} />
                                            </IconButton>
                                        </ListItem>)) :
                                        (this.printListText("You still haven't added any Pokémon to your Favorite Team! Search for your team members in the PokéList!"))}
                                </List>
                            </Paper>
                        </Col>
                        <Col xs='12' md='6' lg='4' className='pt-5'>
                            <h5 className='pb-2'>Following</h5>
                            <Paper>
                                <List style={listStyle}>
                                    <Row>
                                        {friends.length !== 0 ? (friends.map((item, key) =>
                                            <ListItem style={{ borderBottom: key !== friends.length - 1 ? '1px solid #ffe066' : 'none' }} key={key} className='col-10 mx-auto justify-content-center align-items-center px-2'>
                                                <p className='col-8 m-0'>{item.username}</p>
                                                <IconButton className='p-2' onClick={() => this.toggleModal(item.username, 'Following List')}>
                                                    <DeleteIcon style={{ color: '#f24643' }} />
                                                </IconButton>
                                            </ListItem>)) :
                                            (this.printListText("You still haven't added any Pokémon Trainers to your follow list! Check cool trainers on the PokéTrainers tab!"))}
                                    </Row>
                                </List>
                            </Paper>
                        </Col>
                    </Row>
                </Col>
                <Modal centered={true} size='md' isOpen={isModalOpen} toggle={() => this.toggleModal()}>
                    <ModalBody className='pt-4 px-4 pb-0'>
                        <p className='text-center m-0'>
                            Are you sure you want to remove <b>{modalItemName}</b> from your {modalAction}?
                        </p>
                    </ModalBody>
                    <ModalFooter className='py-4 justify-content-center text-center'>
                        <Button className='btn-warning w-25 mx-3' onClick={() => {
                            this.toggleModal();
                            if (modalAction === 'Favorites Pokémon List') {
                                removeFavoritePokemon(modalItemName);
                            } else if (modalAction === 'Favorite Pokémon Team') {
                                removePokemonFromTeam(modalItemName);
                            } else {
                                removeFriend(modalItemName)
                            }
                        }}
                        >Yes</Button>
                        <Button className='btn-danger w-25 mx-3' onClick={() => this.toggleModal()}>No</Button>
                    </ModalFooter>
                </Modal>
            </Row >
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFavoritePokemon: (pokemon) => dispatch(removeFavoritePokemon(pokemon)),
        removePokemonFromTeam: (pokemon) => dispatch(removePokemonFromTeam(pokemon)),
        removeFriend: (user) => dispatch(removeFriend(user)),
        editProfile: (avatarForm, nationalityForm, genderForm, gameForm, regionForm) => dispatch(editProfile(avatarForm, nationalityForm, genderForm, gameForm, regionForm))
    }
}

const mapStateToProps = (state) => {
    return {
        dataToEditProfile: state.apiCalls.apiData.signUpData,
        profileContent: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);