import React from 'react'

export default props => (
    <div className={`box box-${props.boxClass}`}>
        <div className='box-header with-border'>
        
            <h3  className='box-title btn-center'> {props.title}</h3>

        </div>
        <div className='box-body box-profile'>
            {props.children}
        </div>
    </div>
)