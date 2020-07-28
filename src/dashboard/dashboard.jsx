import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <div className="container">
                        <h1 className="display-3">Seja bem vindo!</h1>
                        <p className="lead">
                            A Plataforma de Número Flexível da Algar Telecom!
            </p>
                        <hr className="my-4" />                        
                    </div>

                </Content>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(null, mapDispatchToProps)(Dashboard)