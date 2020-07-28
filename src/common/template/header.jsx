import React from 'react'
 

export default props => (
    <header className='main-header'>
        <a href='http://172.25.76.44:80/#/dashboard' className='logo'>
            <span className='logo-mini'>  <i className='fa fa-phone'></i></span>
            <span className='logo-lg'>
                <i className='fa fa-phone'></i>
                Numero<b>Flex</b>
            </span>        
        </a>
        <nav className='navbar navbar-static-top'>
            <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
        </nav>
    </header>
)