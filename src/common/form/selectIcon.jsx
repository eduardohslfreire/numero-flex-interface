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
      <div className='input-group'>
        <span className='input-group-addon'><i className={`fa fa-${props.icon}`}></i>{props.content}</span>
        <select {...props.input}
          disabled={props.disabled}
          className='form-control'>
          <option>{props.placeholder ? props.placeholder: 'Selecione'}</option>
          {Object.keys(props.options).map(renderSelectOptions)}
        </select>
      </div>
    )
  }
  return <div></div>
}

export default Select;  