import React from 'react'

export default props => (
    <div className='input-group'>

        {/* <span className='input-group-addon'><i className={`fa fa-${props.icon}`}></i>{props.content}</span> */}
        <input {...props.input}
            className='form-control'
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type} />

    </div>
)