import React from 'react';
import './Button.css'

const Button = (props) => {
    const _class = [
        'Button',
        props.type
    ]
    
    return (
        <button 
            className={_class.join(' ')}
            onClick = {props.onClick}
            disabled = {props.disabled}
        >
            {props.children}
        </button>
    )
}
export default Button