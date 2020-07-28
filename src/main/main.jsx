import '../common/template/dependencies'
import React, { Component } from 'react'
import { getToken } from '../login/loginAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../common/template/header'
import SideBar from '../common/template/sideBar'
import Footer from '../common/template/footer'
import Messages from '../common/msg/messages'
import { hashHistory } from 'react-router'
import Login from './login'


class Main extends Component {

    render() {
        const session =  localStorage.getItem('_TOKEN');      

        if (!session){   
            hashHistory.push('/login');           
            return <Login />;                        
        } else {
        return (
            <div className='wrapper'>
            <Header />
             <SideBar />
            <div className='content-wrapper'>
                {this.props.children}
            </div> 
            <Footer />
            <Messages /> 
        </div>)
        
        }
       
    }
}

const mapStateToProps = state => ({ token: state.login.token })
const mapDispatchToProps = dispatch => bindActionCreators({ getToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main)





