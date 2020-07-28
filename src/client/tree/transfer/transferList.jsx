import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import Grid from '../../../common/layout/grid'
import Input from '../../../common/form/input'
import InputIcon from '../../../common/form/inputIcon'
import Checkbox from '../../../common/form/checkbox'
import { init, menuTreeForm } from '../../clientActions'


class TransferList extends Component {

    add(index, item = { nome: `transferencia${this.props.list.length + 1}`, numero: "", padrao: false }) {

        if (!this.props.readOnly) {
            this.props.arrayInsert('treeForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            if (!this.props.list[index].padrao)
                this.props.arrayRemove('treeForm', this.props.field, index)
            else
                toastr.error('Atenção', 'Não é possível remover a transferência padrão!');
        }
    }

    changed(e) {

        const list = this.props.list || []
        let hasDefault = false;
        for (var i in list) {
            list[i].padrao = false
        }

        e.target.value = true;

    }


    defaultTransfer() {
        const list = this.props.list || []
        let hasDefault = false;
        for (var i in list) {
            if (list[i].padrao)
                hasDefault = true;
        }
        if (!hasDefault)
            list[0].padrao = true
    }

    renderRows() {
        var list = this.props.list || []

        return list.map((item, index) => (

            <tr key={index}>
                <td>
                    <button type='button' className='btn btn-primary'
                        onClick={() => this.add(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>
                    <button type='button' className='btn btn-danger'
                        onClick={() => this.remove(index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
                <td>
                    <Field name={`${this.props.field}[${index}].padrao`}
                        component={Checkbox}
                        normalize={v => !!v}
                        readOnly={this.props.readOnly} />
                </td>
                <td className='input3-container'>
                    <Field name={`${this.props.field}[${index}].nome`} component={Input}
                        placeholder='Informe o nome' readOnly={this.props.readOnly} />
                </td>

                <td>
                    <Field name={`${this.props.field}[${index}].numero`} component={InputIcon}
                       maxLength={11} content={index + 1} placeholder='Informe o número' readOnly={this.props.readOnly} />
                </td>

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
                                <th>Ações</th>
                                <th>Padrão</th>
                                <th>Nome</th>
                                <th>Números</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>

                    <div className='box-footer pull-right'>
                        <button
                            type='button'
                            className='btn btn-default'
                            onClick={this.props.init}>Cancelar</button>

                        <button
                            type='button'
                            onClick={() => { this.props.menuTreeForm('restriction') }}
                            className={`btn btn-primary`}>
                            Próximo
                    </button>
                    </div>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    arrayInsert,
    arrayRemove,
    init,
    menuTreeForm
}, dispatch)
export default connect(null, mapDispatchToProps)(TransferList)