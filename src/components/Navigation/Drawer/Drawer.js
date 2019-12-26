import React, { Component } from 'react';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop.js'
import { NavLink } from 'react-router-dom'

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Authentication', exact: false},
    {to: '/quiz-creator', label: 'Quiz creator', exact: false}
];

export default class Drawer extends Component {
    renderLinks() {
        return links.map((item, index)=>{
            return (
                <li key = {index}>
                    <NavLink 
                        to={item.to} 
                        exact={item.exact}
                        activeClassName={'Drawer.active'}
                        onClick = {this.props.onClose}
                    > 
                        {item.label}
                    </NavLink>
                </li>
            )
        })  

    }
    render() {
        const _class = !this.props.isOpen ? 'Drawer close': 'Drawer';
        
        return (
            <React.Fragment>
                <nav className = {_class}>
                    <ul>
                        {this.renderLinks()}
                        
                    </ul>   
                </nav> 
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}
