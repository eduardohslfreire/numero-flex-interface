import React from 'react'

export default props => {

    const payload = {
        user: 'nomeDoUsuario',
        idNumber: props.idNumber,
        type: props.typeAudio,
        audio: props.audio
    }   

    
    return (
        <div className='checkbox'>
            <label>
                <input 
                    readOnly={props.readOnly}
                    checked={props.checked}
                    type='checkbox'
                    onChange={(e) => { props.onChange('treeForm', props.field, e.target, payload) }} />
                {props.label}
            </label>
        </div>
    )
}