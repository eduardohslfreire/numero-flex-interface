import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { change } from 'redux-form'

import Row from '../../../common/layout/row'
import If from '../../../common/operator/if'
import ToggleElem from '../../../common/form/toggleElem'
import ItemDate from '../components/itemDate'
import ItemFaixa from '../components/itemFaixa'




class RestrictionType extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.props.change('treeForm', `${this.props.field}.ativo`, checked);
    }

    render() {
        
        const { restriction } = this.props;

        return (
            <div>
                <fieldset>
                    <legend>
                        <ToggleElem
                            label={this.props.label}
                            elem={restriction}
                            field={this.props.field}
                        />
                    </legend>
                    
                    <div className={!restriction.ativo ? 'elem-disabled' : ''}>                        
                        <If test={(this.props.type == 'rfaixa')}>
                            <ItemFaixa legend='Faixa Numérica'
                                list={restriction.faixas}
                                enabled={restriction}
                                field={`${this.props.field}.faixas`} />
                        </If>   

                        <If test={(this.props.type == 'rdia')}>
                            <ItemDate
                                list={restriction.dias}
                                field={`${this.props.field}.dias`} />
                        </If>                                           

                       </div>
                </fieldset>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ change }, dispatch)
export default connect(null, mapDispatchToProps)(RestrictionType)