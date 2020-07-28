import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, change } from 'redux-form'
import ReactModal from 'react-modal';
import { showModal, setContent, hideModal, name } from '../widget/modal/modalActions'
import { customStylesModal } from '../utils/utils'
import { loadAudio, prepareUploadFile } from '../../client/clientActions'


class InputFileAudio extends Component {

    
    render() {

        const props = this.props;

        const payload = {
            user: 'nomeDoUsuario',
            idNumber: this.props.idNumber,
            type: this.props.typeAudio,
            audio: {
                audio: this.props.audio,
                id: null}
        }

        
        return (
            <div>

                <div className='input-group'>
                    <span onClick={() => { this.props.loadAudio(props.audio) }} className={`input-group-addon ${props.classIcon}`}><i className={`fa fa-${props.icon}`}></i>{props.content}</span>
                    <input
                        onChange={(e) => { this.props.prepareUploadFile('treeForm', `${props.field}.id`, e.target, payload) }}
                        className='form-control'
                        placeholder={props.placeholder}
                        type='file'
                        disabled={props.disabled}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ isOpen: state.modals.modals.isShowing, content_modal: state.modals.modals.message })
const mapDispatchToProps = dispatch => bindActionCreators({change, hideModal, loadAudio, prepareUploadFile }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(InputFileAudio)

