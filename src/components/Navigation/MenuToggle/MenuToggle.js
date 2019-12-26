import React from 'react';
import './MenuToggle.css';

const MenuToggle = props => {
    // const _class = props.isOpen ? "MenuToggle fa fa-times" : "MenuToggle fa fa-bars";
    // console.log(_class);
           //<div className = {'MenuToggle'}>
            //<button onClick = {props.onToggle}><i className = {_class}/></button> 
            //<p>{_class}</p>
      //  </div> 

    if (!props.isOpen) {
    return( 
        <div onClick = {props.onToggle}>
            <i className = {'MenuToggle fa fa-bars'} />
        </div>
    )} else return (null)
}

export default MenuToggle