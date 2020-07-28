import React, { Component } from 'react'


export default props => (

    <div className='form-group'>
        <label className='control-label col-sm-2'>{props.label}:</label>
        
        <input type='date' className='form-control' placeholder={props.palceholder} name={props.name} />
        
    </div >
)