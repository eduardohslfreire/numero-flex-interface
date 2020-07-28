import React from 'react'
import MenuItem from './menuItem'

var Config = require('Config')

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='dashboard' label='Dashboard' icon='dashboard' />
        <MenuItem path='/' label='Numeros' icon='tty' />        
        <MenuItem path='logout' label='Sair' icon='close' />
    </ul>
)