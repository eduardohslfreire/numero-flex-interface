import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { getListCNL, getListPrefixCNL } from '../../clientActions'
import Grid from '../../../common/layout/grid'
import Input from '../../../common/form/input'
import InputIcon from '../../../common/form/inputIcon'
import Select from '../../../common/form/select'
import Select2 from '../../../common/form/select2'
import If from '../../../common/operator/if'

class ItemList extends Component {

    
    add(index, item = {prefixo: ''}) {
        if (!this.props.readOnly) {
            this.props.arrayInsert('treeForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treeForm', this.props.field, index)
        }
    }



    createListPrefix() {
        const list = this.props.list_prefix_cnl || []
        return (list.map((item, index) => (
            {
                value: item,
                label: item
            }

        )))

    }

    createListTranfers() {
        const list = this.props.transfers || []
        return (list.map((item, index) => (
            {
                value: item.nome,
                label: item.nome
            }

        )))

    }


    createListCNL() {
        const list = this.props.list_cnls || [];
        return (list.map((item, index) => (
            {
                text: item.nome,
                id: item.cnl
            }
        )))
    }





    renderRows() {
        const list = this.props.list || []

        const indexTransfer = this.props.indexTransfer
        return list.map((item, index) => (

            <tr key={item + '-' + index}>
                <td className='table-actions'>
                    <button type='button' className='btn  btn-primary'
                        onClick={() => this.add(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>

                    <button type='button' className='btn btn-danger'
                        onClick={() => this.remove(index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>


                <td>
                    <Field
                        name={`${this.props.field}[${index}].prefixo`}
                        component={Select}
                        options={this.createListPrefix()}
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
            <Grid cols={this.props.cols} classes={'div-padding-0'}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='table-actions'>Ações</th>
                                <th>Prefixo</th>
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

const mapStateToProps = state => ({ list_cnls: state.client.list_cnls, list_prefix_cnl: state.client.list_prefix_cnl })
const mapDispatchToProps = dispatch => bindActionCreators({
    arrayInsert,
    arrayRemove,
    getListCNL,
    getListPrefixCNL
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ItemList)