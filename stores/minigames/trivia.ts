import { defineStore } from "pinia";
import { add } from "~/utils/math";

interface IMinigameTriviaStoreState {
  isGameReadyToStart: boolean;
  isGameOngoing: boolean;
  didGameFinish: boolean;
  showAnswerFeedback: boolean;
  questionsRepository: {
    question: string;
    answers: { answer: string; isCorrect: boolean }[];
  }[];
  questions: {
    question: string;
    answers: { answer: string; isCorrect: boolean }[];
  }[];
  currentQuestion: {
    question: string;
    answers: { answer: string; isCorrect: boolean }[];
  };
  currentQuestionNum: number;
  numberOfQuestions: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
}

const initState = {
  isGameReadyToStart: false,
  isGameOngoing: false,
  didGameFinish: false,
  showAnswerFeedback: false,
  allQuestions: [],
  questions: [],
  currentQuestion: null,
  currentQuestionNum: 0,
  numberOfQuestions: 10,
  /* answers */
  totalCorrectAnswers: 0,
  totalIncorrectAnswers: 0,
};

export const useMinigameTriviaStore = defineStore({
  id: "minigame-trivia-store",
  state: () => {
    return {
      isGameReadyToStart: false,
      isGameOngoing: false,
      didGameFinish: false,
      showAnswerFeedback: false,
      allQuestions: [],
      questions: [],
      currentQuestion: null,
      currentQuestionNum: 0,
      numberOfQuestions: 10,
      /* answers */
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
    };
  },
  actions: {
    restartTrivia() {
      this.$state = initState;
    },
    startTrivia() {
      this.$state = initState;
      this.isGameOngoing = true;

      setTimeout(() => {
        const getRndQuestionsForRound = [];

        this.isGameReadyToStart = true;
        this.questions = getQuestions;
        this.currentQuestion = getQuestions[0];
      }, 500);
    },
    handleAnswer(answer: boolean) {
      this.showAnswerFeedback = true;

      setTimeout(() => {
        const nextQuestionNum = add(this.currentQuestionNum, 1);

        if (nextQuestionNum === 10) {
          this.didGameFinish = true;
        } else {
          this.currentQuestion = this.questions[nextQuestionNum];
          this.currentQuestionNum = nextQuestionNum;
          this.showAnswerFeedback = false;
          this.totalCorrectAnswers = answer
            ? add(this.totalCorrectAnswers, 1)
            : this.totalCorrectAnswers;
          this.totalIncorrectAnswers = !answer
            ? add(this.totalIncorrectAnswers, 1)
            : this.totalIncorrectAnswers;
        }
      }, 3000);
    },
  },
});
