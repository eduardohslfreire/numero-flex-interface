import React from 'react';



export const Select = props => {  
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
        <select {...props.input}
        
        className='form-control'>
          <option value=''>Selecione</option>
          {Object.keys(props.options).map(renderSelectOptions)}

        </select>
    )
  }
  return <div></div>
}

export default Select;  