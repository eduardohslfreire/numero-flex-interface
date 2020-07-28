import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove, change } from 'redux-form'


import Grid from '../../../common/layout/grid'
import Input from '../../../common/form/input'
import LabelCheckbox from '../../../common/form/labelAndCheckbox'
import InputIcon from '../../../common/form/inputIcon'
import Select from '../../../common/form/select'
import SelectIcon from '../../../common/form/selectIcon'
import ItemInterval from '../components/itemInterval'
import If from '../../../common/operator/if'
import { diaSemana } from '../../../common/utils/utils'
import ToggleElem from '../../../common/form/toggleElem'
import { helpTooltip } from '../../../common/utils/utils'

class ItemDia extends Component {

   // [{recorrente: false, diaTodo: false, intervalos: [{}] }]
    add(index, item = { recorrente: false, diaTodo: false, intervalos: [{}] }) {
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
        return (list.map((item, index) => (
            {
                value: item.nome,
                label: item.nome
            }
        )))
    }

    handleIntervals(item, index){
        if(!item.intervalos){
            this.props.change('treeForm',`${this.props.field}[${index}].intervalos`, [{}])
        }

        return item.intervalos;
    }

    renderRows() {
        const list = this.props.list || []
        return list.map((item, index) => (
            <div key={item + '-' + index}>
                <table className='table_fluid' >
                    <thead>
                        <tr>
                            <th className='table-actions'></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className='table-actions'>
                                <button
                                    type='button'
                                    className='btn  btn-primary'
                                    onClick={() => this.add(index + 1)}>
                                    <i className='fa fa-plus'></i>
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-danger'
                                    onClick={() => this.remove(index)}>
                                    <i className='fa fa-trash-o'></i>
                                </button>
                            </td>
                            <td colSpan=''>
                                <If test={!this.props.isData}>
                                    <Field
                                        name={`${this.props.field}[${index}].diaSemana`}
                                        component={Select} options={diaSemana}
                                    />
                                </If>
                                <If test={this.props.isData}>
                                    <Field
                                        name={`${this.props.field}[${index}].data`}
                                        component={InputIcon} icon={'calendar'} type={'date'}
                                    />
                                </If>
                            </td>
                            <td>
                                <If test={this.props.isRoute}>
                                    <Field
                                        name={`${this.props.field}[${index}].transferencia`}
                                        disabled={!item.diaTodo}
                                        icon={'angle-double-right '}
                                        component={SelectIcon} options={this.createListTranfers()}
                                    />
                                </If>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <If test={this.props.isData}>
                                <Field
                                    name={`${this.props.field}[${index}].recorrente`}
                                    component={LabelCheckbox} label={'Recorrente'}
                                    normalize={v => !!v}
                                />
                                </If>
                            </td>
                            <td>
                                <Field
                                    name={`${this.props.field}[${index}].diaTodo`}
                                    component={LabelCheckbox} label={'Dia inteiro'}
                                    normalize={v => !!v}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <If test={!item.diaTodo}>
                    <div>
                        <ItemInterval
                            isRoute={this.props.isRoute}
                            list={this.handleIntervals(item, index)}
                            transfers={this.props.transfers}
                            field={`${this.props.field}[${index}].intervalos`}
                        />
                    </div>
                </If>
                <hr />
            </div>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <If test={this.props.isRoute}>
                        <legend>                        
                                <ToggleElem
                                    label={this.props.legend}
                                    elem={this.props.enabled}
                                    field={`${this.props.field}Toggle`}
                                    tooltip={this.props.isData ? helpTooltip.edata : helpTooltip.edia}
                                />                        
                        </legend>
                    </If>
                    <div className={(this.props.enabled && !this.props.enabled.ativo) ? 'elem-disabled' : ''}>
                        {this.renderRows()}
                    </div>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, change }, dispatch)
export default connect(null, mapDispatchToProps)(ItemDia)