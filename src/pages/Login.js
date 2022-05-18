import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginInfos } from '../actions';
import '../css/Login.css';
import img4 from '../images/img4.png';
import logo from '../images/logomywallet.png';
import fav from '../images/favicon.ico';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isEnterButtonDisabled: true,
    };
    this.handleChangeInputs = this.handleChangeInputs.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
  }

  onSubmitBtn() {
    const { history, dispatchUser } = this.props;
    const { email } = this.state;

    dispatchUser(email);
    history.push('/carteira');
  }

  handleChangeInputs({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validate());
  }

  validate() {
    const { email, senha } = this.state;
    const num = 6;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidado = validEmail.test(email);
    const validSenha = senha.length >= num;
    const formValidado = emailValidado && validSenha;
    if (formValidado) {
      this.setState({ isEnterButtonDisabled: false });
    } else {
      this.setState({ isEnterButtonDisabled: true });
    }
  }

  render() {
    <link rel='shortcut icon' href={ fav } type='image/x-icon'/>
    document.title = 'My Wallet';
    const { email, senha, isEnterButtonDisabled } = this.state;
    return (
      <body className="body-login">
        <header className="header-login">
          <img src={ logo } alt="logo" className="img-logo" />
        </header>
        <main className="container-login">
          <section className="section-form">
            <form className="form-login">
              <h1>Login</h1>
              <div className="group">
                <input
                  className="input-login"
                  required
                  data-testid="email-input"
                  name="email"
                  id="email"
                  type="text"
                  value={ email }
                  onChange={ this.handleChangeInputs }
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="email" className="label-login" >
                  E-mail
                </label>
              </div>
              <div className="group">
                <input
                  className="input-login"
                  required
                  data-testid="password-input"
                  name="senha"
                  id="senha"
                  type="password"
                  value={ senha }
                  onChange={ this.handleChangeInputs }
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="senha" className="label-login">
                  Senha
                </label>
              </div>
            </form>
            <button
              id="btn-login"
              type="button"
              disabled={ isEnterButtonDisabled }
              onClick={ this.onSubmitBtn }
            >
              Entrar
            </button>
          </section>
          <section className="section-login">
            <img src={ img4 } alt="porquinho-login" className="img-login" />
          </section>
        </main>
      </body>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (payload) => dispatch(loginInfos(payload)),
});

Login.propTypes = {
  dispatchUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
