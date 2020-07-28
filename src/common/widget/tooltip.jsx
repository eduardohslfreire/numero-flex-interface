import React from 'react'
import ReactTooltip from 'react-tooltip'

export default props => (
    <i className={`fa fa-${props.icon}`}  data-tip={`${props.text}`}> 
        <ReactTooltip
            multiline={true}
            delayShow={props.delay ? props.delay: 500 }
            type={props.type ? props.type: 'dark'}
            effect={props.effect ? props.effect : 'solid'} />
    </i>
)