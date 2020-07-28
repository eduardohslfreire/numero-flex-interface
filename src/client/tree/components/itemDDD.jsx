import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../../../common/layout/grid'
import Input from '../../../common/form/input'
import InputIcon from '../../../common/form/inputIcon'
import Select from '../../../common/form/select'
import ToggleElem from '../../../common/form/toggleElem'
import ItemPrefixo from '../components/itemCNLPrefix'
import If from '../../../common/operator/if'
import { helpTooltip } from '../../../common/utils/utils'

class ItemDDD extends Component {

    add(field, index, item = {}) {
        if (!this.props.readOnly) {

            this.props.arrayInsert('treeForm', field, index, item)
        }
    }

    remove(field, index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treeForm', field, index)
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
        const indexTransfer = this.props.indexTransfer

        let field = this.props.field

        return list.map((item, index) => (

            <tr key={item + '-' + index}>
                <td className='table-actions'>
                    <button type='button' className='btn  btn-primary'
                        onClick={() => this.add(field, index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>

                    <button type='button' className='btn btn-danger'
                        onClick={() => this.remove(field, index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
                <td>
                    <Field name={`${field}[${index}].prefixo`} component={Input}
                        placeholder='Prefixo' readOnly={this.props.readOnly}
                        maxLength={11} />
                </td>
                <td>
                    <Field
                        name={`${field}[${index}].transferencia`}
                        component={Select}
                        options={this.createListTranfers()}
                    />


                </td>
            </tr>

        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>
                        <ToggleElem
                            label={this.props.legend}
                            elem={this.props.enabled}
                            field={`${this.props.field}Toggle`}
                            // tooltip={helpTooltip.efixoddd}
                        />

                    </legend>

                    <div className={`${!this.props.enabled.ativo ? 'elem-disabled' : ''}`}>
                            <Grid cols={'12'}>
                                {/* <legend>DDD</legend> */}
                                <table className={`table`} >
                                    <thead>
                                        <tr>
                                            <th className='table-actions'>Ações</th>
                                            <th>Começa com</th>
                                            <th>Transferência</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRows()}
                                    </tbody>
                                </table>
                            </Grid>
                    </div>
                </fieldset>

            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
export default connect(null, mapDispatchToProps)(ItemDDD)