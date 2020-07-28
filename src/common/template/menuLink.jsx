import React from 'react'


export default props => (
    <li> 
        <a href={props.url}>
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
        </a>
    </li>
)