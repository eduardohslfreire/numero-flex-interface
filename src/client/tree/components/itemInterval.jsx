import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../../../common/layout/grid'
import Input from '../../../common/form/input'
import InputIcon from '../../../common/form/inputIcon'
import Select from '../../../common/form/select'
import If from '../../../common/operator/if'
class ItemIntervalo extends Component {

    add(index, item = {}) {
        if (!this.props.readOnly) {

            this.props.arrayInsert('treeForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treeForm', this.props.field, index)
        }
    }


    createListTranfers() {

        const list = this.props.transfers || [];
        const options = []
        return (list.map((item, index) => (
            {
                value: item.nome,
                label: item.nome
            }

        )))

    }




    renderRows() {
        const list = this.props.list || []
        return list.map((item, index) => (

            <tr key={item + '-' + index}>
                <td className='table-actions  btn-center'>
                    <button type='button' className='btn btn-sm  btn-primary'
                        onClick={() => this.add(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>

                    <button type='button' className='btn btn-sm btn-danger'
                        onClick={() => this.remove(index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].horaInicio`}
                        component={Input}
                        type={'time'}
                    />
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].horaFim`}
                        component={Input}
                        type={'time'}
                    />
                </td>
                <If test={this.props.isRoute}>
                    <td>
                        <Field
                            name={`${this.props.field}[${index}].transferencia`}
                            component={Select}
                            options={this.createListTranfers()}
                        />
                    </td>
                </If>
            </tr>






        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>

                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='table-actions'>Ações</th>
                                <th>Inicio</th>
                                <th>Fim</th>
                                <If test={this.props.isRoute}>
                                    <th>Transferência</th>
                                </If>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
export default connect(null, mapDispatchToProps)(ItemIntervalo)