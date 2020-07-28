import React from 'react'

export default props => (
    <div className='form-group'>
        <input {...props.input}
        //onChange={props.onChange}
        readOnly={props.readOnly}
        checked={props.input.value}
        
          type='checkbox'/>
    </div>
    
)