import React, { Component } from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios'

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMsg: 'Your input is not email...',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMsg: 'Your should input proper password...',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }               
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBs0PT2ifFJV6tPuYLrD_qIzhOP2e_eH2o',authData)
            console.log(response.data)
        } catch (e) {
            console.log(e);   
        }
    }

    signUpHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBs0PT2ifFJV6tPuYLrD_qIzhOP2e_eH2o',authData)
            console.log(response.data)
        } catch (e) {
            console.log(e);   
        }
        
    }

    submitHandler(event) {
        event.preventDefault();
    }

    validateControl(value, validation) {
        if (!validation) { return true }
        let isValid = true;
        if (validation.required) { isValid = value.trim() !== '' && isValid}
        if (validation.minLength) { isValid = value.trim().length >= validation.minLength && isValid}
        if (validation.email) { isValid = validateEmail(value) && isValid }
        return isValid
    }

    onChangeHandler(event, controlName) {
        console.log(`${controlName}: `, event.target.value);
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((item)=>isFormValid = formControls[item].valid && isFormValid)      

        this.setState({formControls, isFormValid});
        
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            
            
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key = {controlName + index}
                    type = {control.type}
                    value = {control.value}
                    label = {control.label}
                    errorMsg = {control.errorMsg}
                    valid = {control.valid}
                    touched = {control.touched}
                    shouldValidate = {!!control.validation}
                    onChange = {(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })
         
    }

    render() {
        return (
            <div className={'Auth'}>
                <div>
                    <h1>Authorization:</h1>
                    <form onSubmit={this.submitHandler} className={'AuthForm'}>

                        {this.renderInputs()}
                        {/* <Input 
                            label='Email'
                            // errorMsg = 'Error'
                        />
                        <Input label='Password'/> */}
                        <Button 
                            type = 'success' 
                            onClick = {this.loginHandler}
                            disabled = {!this.state.isFormValid}

                        >Log in</Button>
                        <Button 
                            type='primary' 
                            onClick={this.signUpHandler}
                            disabled = {!this.state.isFormValid}
                        >Sign up</Button>
                    </form>
                </div>
            </div>
        )
    }
}
