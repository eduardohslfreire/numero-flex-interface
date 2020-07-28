import React, { Component } from 'react'
import Client from './client'

class BoxClient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <Client />
      </div>
    )
  }
}

export default BoxClient;