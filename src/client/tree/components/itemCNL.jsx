import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { requestListCNL, changeFormField } from '../../clientActions'
import _isArray from 'lodash.isarray'
import Grid from '../../../common/layout/grid'
import Input from '../../../common/form/input'
import InputIcon from '../../../common/form/inputIcon'
import Select from '../../../common/form/select'
import Select2 from '../../../common/form/select2'
import If from '../../../common/operator/if'
import ItemListCNLPrefixo from '../components/itemCNLPrefix'
import ToggleElem from '../../../common/form/toggleElem'
import { helpTooltip } from '../../../common/utils/utils'



class ItemList extends Component {

    constructor(props) {

        super(props);
        this.loadCNL();
        this.renderSelectCNL = this.renderSelectCNL.bind(this);
        this.handlerOnchangeSelectCNL = this.handlerOnchangeSelectCNL.bind(this);

    }

    add(index, item = {}) {
        
        if (!this.props.readOnly) {
            this.props.arrayInsert('treeForm', `${this.props.field}.cnls`, index, item)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treeForm', `${this.props.field}.cnls`, index)
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
    createListCNL(index) {
        const routescnl = this.props.list

        const list = (this.props.list_cnls[routescnl[index].ddd] && _isArray(this.props.list_cnls[routescnl[index].ddd])) ?
            this.props.list_cnls[routescnl[index].ddd] : [];

        return (list.map(item => {
            var cnl = item.cnl.concat("-")
            var nome = cnl.concat(item.nome)
            
            return ({
                text: nome,
                id: item.cnl
            })
        }
        ))
    }
    renderSelectCNL(index) {
        
        return (
            <Select2
                value={this.props.list[index].cnl}
                onChange={(event) => { this.handlerOnchangeSelectCNL(event, index) }}
                data={this.createListCNL(index)}
            />
        )

    }
    handlerOnchangeSelectCNL(event, index) {
        let index_option = event.target.selectedIndex;
        if (index_option >= 0) {
            this.props.changeFormField('treeForm', `${this.props.field}.cnls[${index}].cnl`, event.target.value)
            this.props.changeFormField('treeForm', `${this.props.field}.cnls[${index}].nome`, event.target[index_option].text)
        }

    }

    loadCNL(){
        var field_r = 'restricoes.rfixocnl.cnls'
        var field_e = 'restricoes.efixocnl.cnls'
        const list = this.props.list || []
        
        for(let i = 0; i < list.length; i++){
            if(list[i].ddd > 9){
                this.props.requestListCNL(list[i].ddd, i, `${field_r}[${i}]`)
                this.props.requestListCNL(list[i].ddd, i, `${field_e}[${i}]`)
            }
        }
    }

    renderRows() {
        const list = this.props.list || []
        const indexTransfer = this.props.indexTransfer
        const field = `${this.props.field}.cnls`;
       // this.teste(list, field)
        return list.map((item, index) => (

            <tr key={item + '-' + index}  >
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
                    <Field component={Input} 
                        name={`${field}[${index}].ddd`}
                        maxLength={2}
                        onKeyUp={(e) => {
                        
                            if (e.target.value > 9) {
                                this.props.requestListCNL(e.target.value, index, `${field}[${index}]`)
                            }
                        }}

                        placeholder='DDD' />
                
                </td>
                
                <td>
                    {this.renderSelectCNL(index)}
                </td>
                <If test={this.props.isRoute}>
                    <td >
                        <Field
                            name={`${field}[${index}].transferencia`}
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
            <Grid cols={'12'}>
                <fieldset>
                    <If test={this.props.isRoute}>
                        <legend>
                            <ToggleElem
                                label={this.props.legend}
                                elem={this.props.enabled}
                                field={'encaminhamentos.efixocnlToggle'}
                                tooltip={helpTooltip.efixocnl}
                            />
                        </legend>
                    </If>
                    <div className={(this.props.enabled && !this.props.enabled.ativo) ? 'elem-disabled' : ''}>
                        <Grid cols='6'>
                            <ItemListCNLPrefixo
                                className='form-control'
                                legend='Prefixo 40XX/30XX'
                                isRoute={this.props.isRoute}
                                list={this.props.listPrefix}
                                transfers={this.props.transfers}
                                field={`${this.props.field}.prefixos`}
                            />
                        </Grid>
                        <Grid cols={'6'} classes={'div-padding-0'}>
                            <fieldset>
                                <legend>{'CNL'}</legend>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th className='table-actions'>Ações</th>
                                            <th className='table-ddd'>DDD</th>
                                            <th>CNL</th>
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
                    </div>
                </fieldset>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({ list_cnls: state.client.list_cnls })
const mapDispatchToProps = dispatch => bindActionCreators({
    arrayInsert,
    arrayRemove,
    requestListCNL,
    changeFormField
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ItemList)