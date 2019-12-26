import React from 'react';
import './quiz.css';
import Activequiz from '../../components/activequiz/activequiz.js';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js';
import {withRouter} from 'react-router-dom';
// import axios from '../../axios/url';
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../Redux/Actions/quiz'


class Quiz extends React.Component {

    // state = {
    //     results: {}, 
    //     isFinished: false,
    //     activeQuiz: 0,
    //     answerState: null, 
    //     quiz: [],
    //     loading: true
    // }

    // onAnswerClickHandler = (answerId) => {
    //     console.log(answerId, this.props.activeQuiz);
        
    //     if (this.props.answerState && this.props.answerState[answerId] === 'success') {
    //         return
    //     }        
        
    //     const isQuizFinished =()=>(this.props.activeQuiz >= this.props.quiz.length-1);

    //     const question = this.props.quiz[this.props.activeQuiz];
    //     const results = this.props.results;
        
    //     if (question.rightAnswerId === answerId) {
    //         if (!results[this.props.activeQuiz]) {
    //             results[this.props.activeQuiz] = 'success';
    //         }
    //          this.setState(
    //             { answerState: {[answerId]: 'success',
    //             results }
    //         });
    //         const timeout = window.setTimeout(()=>{
    //             if (isQuizFinished()) {
    //                 this.setState({isFinished: true});
    //                 console.log('Finish...');    
    //             } else {
    //                 this.setState({
    //                     activeQuiz: this.state.activeQuiz+1,
    //                     answerState: null
    //                 });   
    //             }
    //             window.clearTimeout(timeout)
    //         },500);
            
    //     } else {
    //         results[this.props.activeQuiz] = 'error';
    //         this.setState({
    //             answerState: {[answerId]: 'error',
    //             results
    //         }})
    //     }    
    // }

    // RetryHandler = () => this.setState({
    //     results: {}, 
    //     isFinished: false,
    //     activeQuiz: 0,
    //     answerState: null 
    // })

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {          
        return (
            <div className={'Quiz'}>

                <div className={'QuizWrapper'}>
                    <h1>Would you answer these questions?</h1>

                    { this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished ? 
                            <FinishedQuiz 
                                results = {this.props.results}
                                quiz = {this.props.quiz}
                                onRetry = {this.props.retryQuiz}
                            /> :
                            <Activequiz 
                                quiz = {this.props.quiz[this.props.activeQuiz]}
                                // TODO how to send answerId
                                onAnswerClick = {this.props.quizAnswerClick}
                                quizLength = {this.props.quiz.length}
                                currentQuiz = {this.props.activeQuiz + 1}
                                state = {this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        answerState: state.quiz.answerState, 
        activeQuiz: state.quiz.activeQuiz,
        quiz: state.quiz.quiz,
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {        
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz))