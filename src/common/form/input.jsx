import React from 'react'

export default props => (
    
    <input {...props.input}
        className='form-control'
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        type={props.type} 
        //onChange={props.onChange}
         onKeyUp={props.onKeyUp}
         maxLength={props.maxLength}
        />
)