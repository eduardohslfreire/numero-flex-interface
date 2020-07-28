import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { arrayInsert, arrayRemove } from 'redux-form'
import Row from '../../../common/layout/row'
import Grid from '../../../common/layout/grid'
import ItemListDia from '../components/itemDate'
import ItemList from '../components/itemDDD'
import { init, menuTreeForm } from '../../clientActions'

class Route extends Component {

    add(index, item = { numeros: [{}] }) {
        if (!this.props.readOnly) {
            this.props.arrayInsert('treeForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treeForm', this.props.field, index)
        }
    }

    render() {
        const { transfers, route } = this.props;
        return (
            <div>
                <Row>
                    <Grid cols='6'>
                    <ItemList legend='Faixa Numérica'
                                list={route.efaixa}
                                enabled={route.efaixaToggle}
                                transfers={transfers}
                                field={`encaminhamentos.efaixa`} />
                    </Grid>

                    <Grid cols='6'>
                        <ItemListDia className='form-control' legend='Dia da semana/hora'
                            list={route.edia}
                            enabled={route.ediaToggle}
                            isRoute={true}
                            transfers={transfers}
                            field={`encaminhamentos.edia`} />
                    </Grid>
                </Row>

                <div className='box-footer pull-right'>
                    <button
                        type='button'
                        className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                    <button type='submit'
                        className={`btn btn-success`}>
                        Salvar
                    </button>               
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, init, menuTreeForm }, dispatch)
export default connect(null, mapDispatchToProps)(Route)