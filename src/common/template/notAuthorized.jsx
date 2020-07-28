import React, { Component } from 'react'

class NotAuthorized extends Component {

  render() {
    const jsx = (
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                Você não tem autorização para acessar essa página
            </div>
        </div>
    );

    return jsx
  }
}

export default NotAuthorized;