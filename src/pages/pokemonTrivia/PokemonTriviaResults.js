import React from 'react'
import { Row, Col, Alert } from 'reactstrap'
import Button from '@material-ui/core/Button';
import RestoreIcon from '@material-ui/icons/Restore';

export const PokemonTriviaResults = props => {
    const { userProfile, answers } = props

    return (
        <Row>
            <h1 className='col-12 text-center'>PokéTrivia Results</h1>
            <Col xs='12' lg='6' className='pb-4'>
                <Row>
                    <h3 className='col-12 text-center'>Current Trivia Session</h3>
                    <Col xs='12' md='6' className='d-flex justify-content-center py-2 py-md-0 text-center'>
                        <Alert className='w-100' color='success'>
                            Correct Answers: <b>{answers.correct}</b>
                        </Alert>
                    </Col>
                    <Col xs='12' md='6' className='d-flex justify-content-center py-2 py-md-0 text-center'>
                        <Alert className='w-100' color='danger'>
                            Incorrect Answers: <b>{answers.incorrect}</b>
                        </Alert>
                    </Col>
                </Row>
            </Col>
            <Col xs='12' lg='6' className='pb-4'>
                <Row>
                    <h3 className='col-12 text-center'>Overall Trivia Results</h3>
                    <Col xs='12' md='6' className='d-flex justify-content-center my-2 my-md-0 text-center'>
                        <Alert className='w-100' disabled color='success'>
                            Correct Answers: <b>{userProfile.triviaRecord.correctAnswers}</b>
                        </Alert>
                    </Col>
                    <Col xs='12' md='6' className='d-flex justify-content-center my-2 my-md-0 text-center' >
                        <Alert className='w-100' disabled color='danger'>
                            Incorrect Answers: <b>{userProfile.triviaRecord.wrongAnswers}</b>
                        </Alert>
                    </Col>
                </Row>
            </Col>
            <Col className='d-flex justify-content-center py-3 mx-auto' xs='6'>
                <Button className='btn-warning w-75' startIcon={<RestoreIcon />}
                    onClick={() => window.location.reload()}>
                    Play Again
                </Button>
            </Col>
        </Row>
    )
}