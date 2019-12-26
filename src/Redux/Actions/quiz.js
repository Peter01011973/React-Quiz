import axios from '../../axios/url'
import {
    FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, 
    SET_ANSWER_STATE, FINISH_QUIZ,
    QUIZ_NEXT_QUESTION, RETRY_QUIZ
} from './ActionTypes'

export function fetchQuizes() {
    return async dispatch => {        
        dispatch(fetchQuizesStart())             
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index+1}`
                })
            } )            
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))  
        }
    }

}

export function fetchQuizesStart() {
    return {type: FETCH_QUIZES_START}
}

export function fetchQuizesSuccess(quizes) {
    return { type: FETCH_QUIZES_SUCCESS, quizes}
}

export function fetchQuizesError(e) {
    return {type: FETCH_QUIZES_ERROR, error: e}
}

export function fetchQuizById(quizId) {
    return async dispatch => {        
        dispatch(fetchQuizesStart())
        try {            
            const response = await axios.get(`quizes/${quizId}.json`)  
            const quiz = response.data            
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))   
        } 
    }
}

export function fetchQuizSuccess(quiz) {
    return {type: FETCH_QUIZ_SUCCESS, quiz}
}

export function quizSetAnswerState( answerState, results ) {
    return {type: SET_ANSWER_STATE, answerState, results }
}

export function finishQuiz() {
    return {type: FINISH_QUIZ}
}

export function quizNextQuestion(nextQuestion) {
    return {type: QUIZ_NEXT_QUESTION, nextQuestion}
}

export function quizAnswerClick(answerId) {  
    return (dispatch, getState) => {
        const state = getState().quiz
        console.log('State:', state);
        console.log('answerId', answerId);
        
        if (state.answerState && state.answerState[answerId] === 'success') {
            return
        }        
        
        const isQuizFinished =()=>(state.activeQuiz >= state.quiz.length-1);

        const question = state.quiz[state.activeQuiz];
        const results = state.results;
        
        if (question.rightAnswerId === answerId) {
            if (!results[state.activeQuiz]) {
                results[state.activeQuiz] = 'success';
            }

            dispatch(quizSetAnswerState({[answerId]: 'success'}, results ))
            const timeout = window.setTimeout(()=>{
                if (isQuizFinished()) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuiz+1))
                }
                window.clearTimeout(timeout)
            },500);
            
        } else {
            results[state.activeQuiz] = 'error';
            dispatch(quizSetAnswerState({[answerId]: 'error'}, results ))
        }        
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}