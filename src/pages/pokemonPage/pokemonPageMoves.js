import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

class pokemonPageMoves extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            error: null,
            move: null,
            modal: false
        }
    }

    getSpecificMove = async (move) => {
        this.setState({ isLoading: true })
        try {
            const request = await fetch(`https://pokeapi.co/api/v2/move/${move}/`)
            const data = await request.json();
            this.setState({ isLoading: false, move: data })
        } catch (err) {
            this.setState({ isLoading: false, error: err })
        }
    }

    conditionMove = (firstName, firstString, firstCondition) => {
        if (firstName !== firstCondition) {
            return (
                <Col className='py-1' xs='6'>
                    <h5>{firstString}:</h5>
                    <p>{firstName}{firstCondition !== 0 && ('%')}</p>
                </Col>
            )
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        var string = require('lodash/string')
        var orderedMovesArray = [];
        const { isLoading, error, modal, move } = this.state
        const { pokemonMoves, method } = this.props;

        for (var itemMove of pokemonMoves) {
            for (let itemMoveSpecifics of itemMove.version_group_details) {
                (itemMoveSpecifics.version_group.name === `sun-moon` && itemMoveSpecifics.move_learn_method.name === `${method}`) &&
                    orderedMovesArray.push({ name: itemMove.move.name, level_learned_at: itemMoveSpecifics.level_learned_at })
            }
            method === 'level-up' && orderedMovesArray.sort((a, b) => a.level_learned_at - b.level_learned_at)
        }

        if (move) {
            var conditions = [
                [move.meta.crit_rate, 'Crit Chance', 0],
                [move.meta.flinch_chance, 'Flinch Chance', 0],
                [move.priority, 'Priority', 0],
                [move.meta.stat_chance, 'Status Chance', 0],
                [move.meta.max_hits, 'Max Hits', null],
                [move.meta.max_turns, 'Max Turns', null],
                [move.meta.min_hits, 'Min Hits', null],
                [move.meta.min_turns, 'Min Turns', null],
                [move.meta.drain, 'Drain Amount', 0],
                [move.meta.healing, 'Healing Amount', 0]
            ]
        }

        return (
            <>
                <Col xs='12'>
                    <Row className='justify-content-center text-center'>
                        {method === 'level-up' &&
                            <>
                                <h5 className='col-3'>Level</h5>
                                <h5 className='col-9'>Name</h5>
                            </>
                        }
                        {orderedMovesArray.length ? (orderedMovesArray.map((moveItem, key) => {
                            return method === 'level-up' ?
                                (<Col className='moveButton' xs='12' key={key}
                                    onClick={() => { this.toggle(); this.getSpecificMove(moveItem.name); }}>
                                    <Row>
                                        <p className='col-3'>{moveItem.level_learned_at}</p>
                                        <p className='col-9'>{string.startCase(moveItem.name)}</p>
                                    </Row>
                                </Col>) :
                                (<p
                                    className='col-12 col-md-6 m-0 py-2 moveButton' key={key}
                                    onClick={() => { this.toggle(); this.getSpecificMove(moveItem.name); }}
                                >{string.startCase(moveItem.name)}
                                </p>)
                        })) :
                            (<div><p>There weren't found any moves that this pokémon can learn by this method</p></div>)}
                    </Row>
                </Col>

                <Modal size='lg' isOpen={modal} toggle={this.toggle}>
                    <ModalBody>
                        {isLoading ? (<Loading height='25vh' />) : error ? (<Error error={error} />) :
                            (move &&
                                <Row className='justify-content-center text-center'>
                                    <h3 className='col-12'>{move.names[2].name}</h3>
                                    <p className='col-12 px-4'>{move.flavor_text_entries[2].flavor_text}
                                    </p>
                                    <Col className='py-2' xs='12' sm='6'>
                                        <h5 className='col-12'>Power</h5>
                                        {move.power === null ? (<p>None</p>) : (<p>{move.power}</p>)}
                                    </Col>
                                    <Col className='py-2' xs='12' sm='6'>
                                        <h5 className='col-12'>Type</h5>
                                        <Col xs='4' className={`mx-auto text-center typeIcon type-${move.type.name}`}>
                                            {move.type.name}
                                        </Col>
                                    </Col>
                                    <Col className='py-2' xs='12' sm='4'>
                                        <h5>PP</h5>
                                        <p>{move.pp}</p>
                                    </Col>
                                    <Col className='py-2' xs='12' sm='4'>
                                        <h5>Accuracy</h5>
                                        {move.accuracy === null ? (<p>100%</p>) : (<p>{move.accuracy}%</p>)}
                                    </Col>
                                    <Col className='py-2' xs='12' sm='4'>
                                        <h5>Move Type</h5>
                                        <p>{string.startCase(move.damage_class.name)}</p>
                                    </Col>
                                    <Col xs='12'>
                                        <Row className='justify-content-center'>
                                            {conditions.map((item, key) =>
                                                <React.Fragment key={key}>
                                                    {this.conditionMove(item[0], item[1], item[2])}
                                                </React.Fragment>
                                            )}
                                        </Row>
                                    </Col>
                                    <Button className="btn-warning mx-auto w-50 my-2" onClick={this.toggle}>
                                        Close
                                    </Button>
                                </Row>
                            )
                        }
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default pokemonPageMoves