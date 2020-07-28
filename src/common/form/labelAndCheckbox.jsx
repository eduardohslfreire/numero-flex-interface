import React from 'react'

export default props => {


    return (
        <div className='checkbox'>
            <label>
                <input {...props.input}
                    readOnly={props.readOnly}
                    checked={props.input.value}
                    type='checkbox'
                    />
                {props.label}
            </label>

        </div>

    )
}