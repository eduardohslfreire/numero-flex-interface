import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './clientActions'
import LabelAndInput from '../common/form/labelAndInput'
import Select from '../common/form/select'
import SelectOperation from '../common/form/selectOperation'

class ClientForm extends Component {
    render() {
        const { handleSubmit, readOnly } = this.props;

        const status = [

            {value: 'ATIVO', label: 'ATIVO'},
            {value: 'INATIVO', label: 'INATIVO'}
        ]
       
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='numero' component={LabelAndInput} readOnly={readOnly}
                     maxLength={11} label='Número' cols='12 5' placeholder='Informe número' />
                    <Field name='descricao' component={LabelAndInput} type='text' readOnly={readOnly}
                        label='Descrição' cols='12 5' placeholder='Informe uma descrição' />
                  <Field name='status' component={SelectOperation} readOnly={readOnly}
                        options={status} 
                        label='Status' cols='12 2' />                               
                </div>
                <div className='box-footer'>
                    <button type='submit'  className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

ClientForm = reduxForm({ form: 'clientForm', destroyOnUnmount: false })(ClientForm)
const selector = formValueSelector('clientForm')
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClientForm)