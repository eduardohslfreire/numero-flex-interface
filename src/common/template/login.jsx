import React from 'react';
import { setToken } from '../../login/loginAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { validaLogin } from '../../client/clientActions'


class UserLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { usuario: '', senha: '', msg_erro: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    componentDidMount() {
        document.body.classList.remove('skin-green', 'fixed', 'sidebar-mini');
        document.body.classList.add('body-login');
    }

    async handleSubmit(event) {
        event.preventDefault()      
        const {usuario, senha, ...rest } = this.state;        
       
        const response = await validaLogin({usuario, senha})      
  

        if (response.data.status){
             localStorage.setItem('_TOKEN','SESSION')
             hashHistory.push('/dashboard');
             
             document.body.classList.add('skin-green', 'fixed', 'sidebar-mini');
             document.body.classList.remove('body-login');
             const token = { token : true }
             this.props.setToken(token)             
        }else{
            this.setState({msg_erro : true})
        }
    
    }

    render() {
        return (
            <div className='wrapper text-center'>
                <form className="form-signin" onSubmit={this.handleSubmit} >
                    <img className="mb-4" src="./algar-logo.png" alt="" width="150" height="60" />
                    <h1 className="h3 mb-3 font-weight-normal"><i className='fa fa-phone'></i>Numero<b>Flex</b></h1>
                    <label className="sr-only">Usuário</label>
                    <input type="text" id="inputEmail" className="form-control" placeholder="Usuario" name="usuario" value={this.state.usuario} onChange={this.handleChange} required />
                    <label className="sr-only">Senha</label>
                    <input type="password" id="inputsenha" className="form-control" placeholder="Senha" name="senha" value={this.state.senha} onChange={this.handleChange} required />
                    {this.state.msg_erro &&
                        <div className="erro">Usuário ou Senha Inválido!</div>
                    }
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Lembre-me
    </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                    <p className="mt-5 mb-3 text-muted">&copy; COR Algar Telecom - 2020</p>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({setToken}, dispatch)
export default connect(null,mapDispatchToProps)(UserLogin);
