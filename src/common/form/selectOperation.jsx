import React from 'react';
import Grid from '../layout/grid'
import If from '../operator/if'


export const SelectOperation = props => {  
  const renderSelectOptions = (key, index) => {

    return (
      <option
        key={`${index}-${props.options[key].value}`}
        value={props.options[key].value}
      >
        {props.options[key].label}
      </option>
    );
  }

  if (props && props.options) {
    return (
      <Grid cols={props.cols}>
      <div className='form-group'>
        <label htmlFor={props.name}>{props.label}</label>
          <select {...props.input}
          
          className='form-control'>
          
            <option value=''>Selecione</option>
              {Object.keys(props.options).map(renderSelectOptions)}
              
          </select>
        </div>
      </Grid>
    )
  }
  return <div></div>
}

export default SelectOperation;  