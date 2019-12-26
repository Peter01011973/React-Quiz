import React from 'react';
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props =>    
    {
        const isInvalidV = isInvalid(props)
        const inputType = props.type || 'text'
        const htmlFor = `${props.label}-${Math.random()}`;
        let _class = 'Input';
        // console.log(props);
        if (isInvalidV) {_class +=' invalid'}
        return (
            <div className={_class}>
                <label htmlFor={htmlFor}>{props.label}</label>
                <input 
                    type={inputType}
                    id = {htmlFor}
                    value = {props.value}
                    onChange = {props.onChange}
                />
                {isInvalidV? <span>{props.errorMsg}</span>: null}
            </div>
        )
    }

export default Input