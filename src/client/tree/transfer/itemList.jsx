import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove, change } from 'redux-form'

import Grid from '../../../common/layout/grid'
import InputIcon from '../../../common/form/inputIcon'
import { init, menuTreeForm } from '../../clientActions'

class ItemList extends Component {
        
    add(index, item = {}) {
        this.props.arrayInsert('treeForm', `${this.props.field}.numeros`, index, item)
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treeForm', `${this.props.field}.numeros`, index)
        }
    }

    renderRows() {
        const list = this.props.list || []
        const indexTransfer = this.props.indexTransfer
     
        return list.map((item, index) => (

            <tr key={item + '-' + index}>           
                <td>
                    <Field name={`${this.props.field}.numeros[${index}].numero`} component={InputIcon}
                      maxLength={11} content={index + 1} placeholder='Informe o número' readOnly={this.props.readOnly} />

                </td>               
            </tr>
        ))
    }

    render() {
        return (           
            <Grid cols={this.props.cols}>
                <fieldset>
                    <table className='numberTable'>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, change, init }, dispatch)
export default connect(null, mapDispatchToProps)(ItemList)