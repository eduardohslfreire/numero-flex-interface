import React from 'react'

export default props => (

    <div className={`form-group has-${props.classCss}`}>
        <label className='control-label' htmlFor={`input${props.classCss}`}><i className={`fa fa-${props.icon}`}></i>{props.label}</label>
        <input
            {...props.input}
            type={props.type}
            className='form-control'
            placeholder={props.placeholder}
            onKeyUp={(e) => {props.onKeyUp(props.input.value)}} />

        <span className='help-block'>{props.message}</span>
    </div>

)