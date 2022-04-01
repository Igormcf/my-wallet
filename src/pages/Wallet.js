import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, fetchAddExchanges } from '../actions';

const alimentos = 'Alimentação';
let idIndex = 0;
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentos,
      isButtonDisabled: true,
    };
    this.handleChangeInputs = this.handleChangeInputs.bind(this);
    this.validate = this.validate.bind(this);
    this.onAddBtn = this.onAddBtn.bind(this);
  }

  componentDidMount() {
    const { coinsFetch } = this.props;
    coinsFetch();
  }

  onAddBtn() {
    const { value, currency, description, method, tag } = this.state;
    const { expensesFunc } = this.props;
    const listExpenses = {
      id: idIndex,
      value,
      description,
      currency,
      method,
      tag,
    };
    expensesFunc(listExpenses);
    idIndex += 1;
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentos,
    });
  }

  handleChangeInputs({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validate());
  }

  validate() {
    const { value, currency, description, method, tag } = this.state;
    if (value && currency && description && method && tag) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, currency, description, method, tag, isButtonDisabled } = this.state;
    const valorTotal = expenses.reduce((acc, curr) => {
      acc += curr.value * parseFloat(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0);
    return (
      <div>
        <header>
          <h2>TrybeWallet</h2>
          <b>E-mail:</b>
          { ' ' }
          <p data-testid="email-field">{ email }</p>
          <b>Despesas totais:</b>
          { ' ' }
          <p data-testid="total-field">{ valorTotal.toFixed(2) }</p>
          <b>Câmbio usado:</b>
          { ' ' }
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            <b>Valor:</b>
            <input
              type="number"
              name="value"
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleChangeInputs }
            />
          </label>
          { ' ' }
          <label htmlFor="currency">
            <b>Moeda:</b>
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChangeInputs }
            >
              { currencies.map((item) => <option key={ item }>{item}</option>) }
            </select>
          </label>
          { ' ' }
          <label htmlFor="description">
            <b>Descrição:</b>
            <input
              type="text"
              name="description"
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ this.handleChangeInputs }
            />
          </label>
          { ' ' }
          <label htmlFor="method">
            <b>Método de pagamento:</b>
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChangeInputs }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          { ' ' }
          <label htmlFor="tag">
            <b>Categoria:</b>
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChangeInputs }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.onAddBtn }
        >
          Adicionar despesa
        </button>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((item) => (
              <tr key={ item.id }>
                <td>{ item.description }</td>
                <td>{ item.tag }</td>
                <td>{ item.method }</td>
                <td>{ parseFloat(item.value).toFixed(2) }</td>
                <td>{ (item.exchangeRates[item.currency].name) }</td>
                <td>{ parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
                <td>
                  { (parseFloat(item.exchangeRates[item.currency]
                    .ask) * item.value).toFixed(2) }
                </td>
                <td>Real</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinsFetch: () => dispatch(fetchCoins()),
  expensesFunc: (listExpenses) => dispatch(fetchAddExchanges(listExpenses)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  expensesFunc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
