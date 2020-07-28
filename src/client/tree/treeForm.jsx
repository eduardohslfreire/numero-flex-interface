import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, formValueSelector, Field, arrayInsert, arrayRemove } from 'redux-form'

import ReactModal from 'react-modal';
import { showModal, setContent, hideModal, name } from '../../common/widget/modal/modalActions'
import { customStylesModal } from '../../common/utils/utils'

import { init, tree, menuTreeForm, initTree } from '../clientActions'
import LabelAndInput from '../../common/form/labelAndInput'
import Row from '../../common/layout/row'
import Grid from '../../common/layout/grid'
import TransferList from './transfer/transferList'
import Route from './route/route'
import Box from '../../common/template/box'
import Restriction from './restriction/restriction'
import If from '../../common/operator/if'
import ReactTooltip from 'react-tooltip'
import ItemList from './transfer/itemList'

class TreeForm extends Component {

     addTransfer(item = {}) {
        const { transfers } = this.props
        this.props.arrayInsert('treeForm', this.props.transfer, transfers.length, item)
    }

    renderRows() {
        const { transfers } = this.props
        return transfers.map((item, index) => (
            <div key={index}>
                <Row >
                    <hr></hr>
                    <Grid cols='12'>
                        <Grid cols='3'>
                            <Field name={`transferencias[${index}].nome`} component={LabelAndInput}
                                label='Nome' placeholder='Informe o nome' readOnly={false} />
                        </Grid>
                        <Grid cols='3'>
                            <Field name={`transferencias[${index}].tipo`} component={LabelAndInput}
                                label='Tipo' placeholder='Informe o nome' readOnly={false} />
                        </Grid>
                        <Grid cols='6'>
                            <ItemList cols='12' indexTransfer={index} list={transfers[index].numeros} readOnly={false}
                                field='numeros' legend='Números' />
                        </Grid>
                    </Grid>

                </Row>
            </div>
        ));
    }
    renderButtons() {
        const menu = [
            { id: 'transfer', icon: 'exchange', label: 'Transferência', tooltip: 'Define o(s) número(s) vinculado(s) à configuração do cliente' },
            { id: 'restriction', icon: 'ban', label: 'Restrição', tooltip: 'Define os tipos, origens, datas ou horas de chamadas que são bloqueadas.'},
            { id: 'route', icon: 'share', label: 'Encaminhamento', tooltip: 'Define os tipos, origens, datas ou horários de chamadas que serão encaminhadas para números vinculados específicos.'  }          
        ];
        return menu.map((item) => (
            <a key={item.id} onClick={() => { this.props.menuTreeForm(item.id) }}
                className={`btn btn-default ${item.id == this.props.menuVisible ? 'active' : {}}`}
                data-tip={`${item.tooltip}`}>
                <i className={`fa fa-${item.icon}`}></i>
                &nbsp;{item.label}
            </a>
        ))
    }
    render() {
        const { content_modal, idNumber, handleSubmit, readOnly, transfers, numbers, routes, restrictions, menuVisible } = this.props
       
        return (
            <div>
                <form role='form' onSubmit={handleSubmit}>
                    <div className='btn-group btn-group-justified'>
                        {this.renderButtons()}
                    </div>
                    <If test={(menuVisible == 'transfer')} >
                        <Box boxClass='primary' title={'Transferências'}>
                            <TransferList cols='12' list={transfers}
                                field='transferencias' legend='Transferencias' idNumber={idNumber} />
                        </Box>
                    </If>
                    <If test={(menuVisible == 'restriction')} >
                        <Box boxClass='primary' title='Restrições'>
                            <Restriction                                
                                restrictions={restrictions}
                                idNumber={idNumber} />
                        </Box>
                    </If>
                    <If test={(menuVisible == 'route')} >
                        <Box visible={true} boxClass='primary' title='Encaminhamentos'>
                            <Route route={routes} transfers={transfers} />
                        </Box>
                    </If>                              
                </form>

                <ReactModal
                    isOpen={this.props.isOpen}
                    contentLabel='Minimal Modal Example'
                    style={{
                        ...customStylesModal, content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)'
                        }
                    }}
                    ariaHideApp={false}
                >
                    <div>
                        <div className='modal-header'>
                            <If test={content_modal.descricao}>
                                <div>
                                    
                                    <button onClick={this.props.hideModal} className='btn btn-danger pull-right'>Fechar</button>
                                    <h4 className='modal-title'>Áudio ID: {content_modal.id}</h4>
                                </div>
                            </If>
                            <If test={content_modal.body}>

                                <h4>{content_modal.body} </h4>
                            </If>
                        </div>
                        <div className='modal-body'>
                            <If test={content_modal.descricao}>
                                <audio src={content_modal.descricao} autoPlay={true} preload='auto' controls></audio>
                            </If>
                            <If test={content_modal.body}>

                                <img className={'img-responsive center-block'} src={require('../../common/utils/images/loading.gif')} width={48} />
                            </If>
                        </div>
                    </div>
                </ReactModal>

            </div>
        ) 
    }
}

TreeForm = reduxForm({ form: 'treeForm', destroyOnUnmount: false })(TreeForm)
const selector = formValueSelector('treeForm')
const mapStateToProps = state => ({
    transfers: selector(state, 'transferencias'),
    routes: selector(state, 'encaminhamentos'),
    restrictions: selector(state, 'restricoes'),
    idNumber: selector(state, 'idNumero'),
    menuVisible: state.client.menuVisible,
    isOpen: state.modals.modals.isShowing,
    content_modal: state.modals.modals.message

})
const mapDispatchToProps = dispatch => bindActionCreators({
    init, tree, arrayInsert, menuTreeForm, hideModal, initTree
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TreeForm)

