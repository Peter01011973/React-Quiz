import React, { Component } from 'react';
import './QuizCreator.css';
import  Button  from '../../components/UI/Button/Button';
import {createControl, validate, validateForm} from '../../Form/FormFramework';
import Input from '../../components/UI/Input/Input';
import Auxilliry from '../../HOC/Layout/Auxilliry/Auxilliry';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux'
import {finishCreateQuiz, createQuizQuestion} from '../../Redux/Actions/create'

function createOptionControls(num) {
    return createControl(
        {
            label: `Option ${num}`,
            errorMsg: "The sentance can't be empty",
            id: num
        },
        { required: true }
    )
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Input question',
                errorMsg: "Question can't be empty"
            },
            { required: true }
        ),
        option1: createOptionControls(1),
        option2: createOptionControls(2),
        option3: createOptionControls(3),
        option4: createOptionControls(4),
    }

}

class QuizCreator extends Component {
    // constructor(props) {
    //     super(props);
        
    //    // binsings
    //    this.onChangeHandler = this.onChangeHandler.bind(this)
    //  }

    state = {
        // quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)
        
        formControls[controlName] = control

        this.setState({
            formControls: formControls,
            isFormValid: validateForm(formControls)
        })    
    }

    renderControls() {           
        
        return Object.keys(this.state.formControls).map((controlName, index) =>{
            const control = this.state.formControls[controlName]
            return (
                <Auxilliry key = {index+controlName}>
                    <Input
                        key = {controlName+index}
                        label = {control.label}
                        valid = {control.valid}
                        shouldValidate = {!!control.validation}
                        touched = {control.touched}
                        value = {control.value} 
                        errorMsg = {control.errorMsg} 
                        onChange = {(event) => this.changeHandler(event.target.value, controlName)}                 
                    />
                    {(index === 0) ? <hr/> : null}
                </Auxilliry>
            )
        })
    }

    onChangeHandler = (event) => this.setState({rightAnswerId: +event.target.value})
    // onChangeHandler(event) {
    //     this.setState({rightAnswerId: +event.target.value})  
    // }

    onSubmitHendler(event) {
        event.preventDefault();
    }

    addQuestionHandler = (event) => {
        event.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: [...this.props.quiz].length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        }

        this.props.createQuizQuestion(questionItem)
        // quiz.push(questionItem)
        this.setState({
            // quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    createQuizHandler = event => {
        event.preventDefault()
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()                
        })
        finishCreateQuiz()
        // axios.post('https://react-quiz-ec444.firebaseio.com/quizes.json', this.state.quiz)
        // .then(response=>console.log(response))
        // .catch(error=>console.log(error))       
    }

    render() {
        return (
            <div className={'QuizCreator'}>
                <div>
                <h1>Quiz Creator</h1>
                
                <form onSubmit = {this.onSubmitHendler}>

                     {this.renderControls()}

                    <Select 
                        label = 'Choose the right answer'
                        value = {this.state.rightAnswerId}
                        onChange = {this.onChangeHandler}
                        options = {[
                            {text: 1, value: 1},
                            {text: 2, value: 2},
                            {text: 3, value: 3},
                            {text: 4, value: 4}
                        ]}
                    />

                    <Button 
                        type='primary' 
                        onClick = {this.addQuestionHandler}
                        disabled = {!this.state.isFormValid}
                    >Add question</Button>
                    <Button 
                        type='success' 
                        onClick = {this.createQuizHandler}
                        disabled = {this.props.quiz.length === 0}
                    >Create test</Button>
                </form>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
} 

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),  
        finishCreateQuiz: () => dispatch(finishCreateQuiz())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)