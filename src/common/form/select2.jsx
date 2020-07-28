import React from 'react';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


export const SelectSearch = props => {



  if (props && props.data) {
    return (
      <Select2
        value={props.value}
        className='form-control'
        data={props.data}
        onChange={props.onChange}
        options={{
          placeholder: 'Digite a cidade',
        }}
      />

    )
  }
  return <div></div>
}

export default SelectSearch;  