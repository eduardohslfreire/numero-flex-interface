import React from 'react'

export default props => (
    
    <input {...props.input}
        className='form-control'
        name={props.name}
        readOnly={props.readOnly}
        type={props.type} 
         value={props.value}
        />
)