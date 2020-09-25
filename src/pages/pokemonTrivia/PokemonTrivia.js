import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import PokemonTriviaStatic from './PokemonTriviaStatic';
import { PokemonTriviaResults } from './PokemonTriviaResults';
import Loading from '../../components/Loading';
import { trivia } from '../../assets/content/quizz';
import { addTriviaResult } from '../../store/actions/triviaActions';

class PokemonTrivia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            allQuestions: trivia,
            question: '',
            objectQuestion: [],
            questionNumber: 0,
            randomQuestions: [],
            answers: {
                currentAnswers: undefined,
                currentAnswersRandomize: false,
                totalCorrectAnswers: 0,
                totalIncorrectAnswers: 0,
                currentBtnColorCorrect: false,
                currentBtnColorIncorrect: false
            },
        }
    }

    printQuestionsAnswers = (type, iterations) => {
        var repeated;
        var arrayInput = [];
        for (let i = 0; i < iterations; i++) {
            if (arrayInput.length === 0) {
                arrayInput.push(type === 'questions' ? Math.floor(Math.random() * 47) : Math.floor((Math.random() * iterations)) - 1)
            } else {
                do {
                    repeated = 0;
                    var number = type === 'questions' ?
                        Math.floor(Math.random() * 47) : Math.floor((Math.random() * iterations)) - 1;
                    for (let x = 0; x < arrayInput.length; x++) {
                        number === arrayInput[x] && repeated++;
                    }
                } while (repeated !== 0) arrayInput.push(number);
            }
        }
        return arrayInput;
    }

    startTrivia = () => {
        const getQuestions = this.printQuestionsAnswers('questions', 10);
        this.setState({ ready: true, randomQuestions: getQuestions, objectQuestion: this.state.allQuestions[getQuestions[0]] });
    }

    randomizeAnswers = () => {
        const getAnswers = this.printQuestionsAnswers('answers', 4)
        var answersArray = [];
        for (var x = 0; x < getAnswers.length; x++) {
            if (getAnswers[x] === -1) {
                answersArray.push({ answer: this.state.objectQuestion.correct_answer, res: 'correct' })
            } else {
                answersArray.push({ answer: this.state.objectQuestion.incorrect_answers[getAnswers[x]], res: 'incorrect' })
            }
        }
        this.setState({
            question: this.state.objectQuestion.question,
            answers: { ...this.state.answers, currentAnswers: answersArray, currentAnswersRandomize: true }
        })
    }

    handleAnswer = (answer) => {
        this.setState({
            answers: {
                ...this.state.answers,
                currentBtnColorCorrect: true,
                currentBtnColorIncorrect: true
            }
        })
        var incorrect = answer ? this.state.correctAnswers + 1 : this.state.incorrectAnswers + 1;
        var changeQuestion = this.state.questionNumber + 1;
        if (changeQuestion === 10) {
            this.props.addTriviaResult({ correctAnswers: this.state.correctAnswers, wrongAnswers: this.state.incorrectAnswers })
        }
        setTimeout(() => {
            this.setState({
                objectQuestion: this.state.allQuestions[this.state.randomQuestions[changeQuestion]],
                questionNumber: changeQuestion,
                answers: {
                    ...this.state.answers,
                    currentAnswersRandomize: false,
                    totalIncorrectAnswers: incorrect,
                    currentBtnColorCorrect: false,
                    currentBtnColorIncorrect: false
                }
            })
        }, 3000)
    }

    render() {
        const { ready, objectQuestion, answers, question, questionNumber } = this.state;
        const { currentAnswers, currentAnswersRandomize, totalCorrectAnswers, totalIncorrectAnswers, currentBtnColorCorrect, currentBtnColorIncorrect } = answers;
        const { profileContent } = this.props;
        const changeColorCorrect = currentBtnColorCorrect ? 'success' : 'warning';
        const changeColorWrong = currentBtnColorIncorrect ? 'danger' : 'warning';
        const disabledBtn = currentBtnColorIncorrect || currentBtnColorCorrect ? true : false;

        if (ready === false) {
            return <PokemonTriviaStatic startTrivia={this.startTrivia} />;
        } else {
            if ((currentAnswersRandomize === false) && (objectQuestion !== undefined)) {
                this.randomizeAnswers();
                return <Loading height='65vh' />;
            } else {
                if ((currentAnswersRandomize === true) && (objectQuestion !== undefined)) {
                    return (
                        <Row className='justify-content-center text-center'>
                            <h1 className='col-12'>Question {questionNumber + 1}</h1>
                            <h2 className='col-11 col-md-10 pb-2 pb-md-3'>{question}</h2>
                            <Col xs='11' md='10'>
                                {currentAnswers.map((index, key) =>
                                    index.res === 'correct' ?
                                        (<Button
                                            key={key} block outline className='my-3'
                                            disabled={disabledBtn} color={changeColorCorrect}
                                            onClick={() => { this.handleAnswer(true) }}>
                                            {index.answer}
                                        </Button>) :
                                        (<Button
                                            key={key} block outline className='my-3'
                                            disabled={disabledBtn} color={changeColorWrong}
                                            onClick={() => { this.handleAnswer(false) }}>
                                            {index.answer}
                                        </Button>)
                                )}
                            </Col>
                        </Row>
                    )
                } else {
                    return <PokemonTriviaResults
                        answers={{ correct: totalCorrectAnswers, incorrect: totalIncorrectAnswers }}
                        userProfile={profileContent}
                    />
                }
            }
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTriviaResult: (currentResult) => dispatch(addTriviaResult(currentResult))
    }
}

const mapStateToProps = (state) => {
    return {
        profileContent: state.firebase.profile,
        updateTrivia: state.trivia.updateTriviaResult
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonTrivia);