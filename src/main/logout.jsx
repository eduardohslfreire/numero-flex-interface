import React, { Component, PropTypes } from 'react';
import { logout } from '../login/loginAction'
import Login from './login'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

class Logout extends Component {

  componentDidMount(){
    //this.props.router.push('/login');
    hashHistory.push('/login');
    this.props.logout()  
    localStorage.setItem('_TOKEN','') 
    localStorage.setItem('_SESSION_ID','') 
  }

  render() {
    return (
      <Login />
    );
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(null, mapDispatchToProps)(Logout)



