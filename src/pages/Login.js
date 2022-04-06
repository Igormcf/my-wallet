import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginInfos } from '../actions';
import '../css/Login.css';
import img1 from '../images/img1.png';

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
    const { email, senha, isEnterButtonDisabled } = this.state;
    return (
      <div>
        <header></header>
        <main className="container-login">
          <h1>Login</h1>
          <form className="form-login">
            <label htmlFor="email">
              E-mail
              <input
                data-testid="email-input"
                name="email"
                id="email"
                type="text"
                value={ email }
                placeholder="E-mail"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="senha">
              Senha
              <input
                data-testid="password-input"
                name="senha"
                id="senha"
                type="password"
                value={ senha }
                placeholder="Senha"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <button
              id="btn-login"
              type="button"
              disabled={ isEnterButtonDisabled }
              onClick={ this.onSubmitBtn }
            >
              Entrar
            </button>
            </form>
            <img src={ img1 } alt="porquinho-login" className="img-login" />
        </main>
      </div>
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
