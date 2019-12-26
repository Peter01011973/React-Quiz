import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import './QuizList.css'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../Redux/Actions/quiz'


class QuizList extends Component {
    quizList() {  
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/'+quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    // componentDidMount() {
    //     axios.get('https://react-quiz-ec444.firebaseio.com/quiz.json').then(data => console.log(data))
    // }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {

        return (
            <div className={'QuizList'}>
                <div>
                <h1>Quiz List</h1>
                { this.props.loading && this.props.quizes.length !== 0
                    ? <Loader />
                    : <ul>
                        {this.quizList()}
                    </ul>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
