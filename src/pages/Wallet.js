import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { coinsFetch } = this.props;
    coinsFetch();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <h2>TrybeWallet</h2>
          <b>E-mail:</b>
          { ' ' }
          <p data-testid="email-field">{ email }</p>
          <b>Despesas totais:</b>
          { ' ' }
          <p data-testid="total-field">0</p>
          <b>Câmbio usado:</b>
          { ' ' }
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valor">
            <b>Valor:</b>
            <input
              type="number"
              name="valor"
              data-testid="value-input"
              id="valor"
            />
          </label>
          { ' ' }
          <label htmlFor="moeda">
            <b>Moeda:</b>
            <select
              id="moeda"
              name="moeda"
            >
              { currencies.map((item) => <option key={ item }>{item}</option>) }
            </select>
          </label>
          { ' ' }
          <label htmlFor="descrição">
            <b>Descrição:</b>
            <input
              type="text"
              name="descrição"
              data-testid="description-input"
              id="descrição"
            />
          </label>
          { ' ' }
          <label htmlFor="pagamento">
            <b>Método de pagamento:</b>
            <select
              id="pagamento"
              name="pagamento"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          { ' ' }
          <label htmlFor="tag">
            <b>Método de pagamento:</b>
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinsFetch: () => dispatch(fetchCoins()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
