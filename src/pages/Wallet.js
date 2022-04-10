import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, fetchAddExchanges, editExpense } from '../actions';
import TableExpenses from '../components/TableExpenses';
import '../css/Wallet.css';
import logo from '../images/logomywallet.png'

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
    this.onSubmitExpenseEdited = this.onSubmitExpenseEdited.bind(this);
  }

  componentDidMount() {
    const { coinsFetch } = this.props;
    coinsFetch();
  }

  onSubmitExpenseEdited() {
    const { value, currency, description, method, tag } = this.state;
    const { expenses, id, editExpensefunc } = this.props;

    const listExpenses = [...expenses];
    const expenseItem = listExpenses[parseFloat(id)];
    expenseItem.value = value;
    expenseItem.currency = currency;
    expenseItem.description = description;
    expenseItem.method = method;
    expenseItem.tag = tag;

    editExpensefunc(listExpenses);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentos,
      isButtonDisabled: true,
    });
  }

  onAddBtn() {
    const { value, currency, description, method, tag } = this.state;
    const { expensesFunc } = this.props;
    const listExpenses = { id: idIndex, value, description, currency, method, tag };
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
    const { email, currencies, expenses, btnForm } = this.props;
    const { value, currency, description, method, tag, isButtonDisabled } = this.state;
    const valorTotal = expenses.reduce((acc, curr) => {
      acc += curr.value * parseFloat(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0);
    return (
      <div className="container-wallet">
        <header className="header-wallet">
          <img src={ logo } alt="logo" className="img-logo-wallet" />
          <section className="section-info-expenses">
            <div className="info-expense">
              <p><b>E-mail:</b></p>
              <span><p data-testid="email-field">{ email }</p></span>
            </div>
            <div className="info-expense">
              <p><b>Despesas totais:</b></p>
              <span><p data-testid="total-field">{ valorTotal.toFixed(2) }</p></span>
            </div>
            <div className="info-expense">
              <p><b>Câmbio usado:</b></p>
              <span><p data-testid="header-currency-field">BRL</p></span>
            </div>
          </section>
        </header>
        <nav className="nav-wallet">
          <form className="form-wallet">
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
                data-testid="currency-input"
                id="currency"
                name="currency"
                value={ currency }
                onChange={ this.handleChangeInputs }
              >
                { currencies.map((item) => <option key={ item } className="option">{item}</option>) }
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
                <option className="option">Dinheiro</option>
                <option className="option">Cartão de crédito</option>
                <option className="option">Cartão de débito</option>
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
                <option className="option">Alimentação</option>
                <option className="option">Lazer</option>
                <option className="option">Trabalho</option>
                <option className="option">Transporte</option>
                <option className="option">Saúde</option>
              </select>
            </label>
            <button
              id="btn-form-wallet"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ btnForm
                ? () => this.onAddBtn() : () => this.onSubmitExpenseEdited() }
            >
              { btnForm ? 'Adicionar despesa' : 'Editar despesa' }
            </button>
          </form>
        </nav>
        <main className="main-wallet">
          <TableExpenses />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinsFetch: () => dispatch(fetchCoins()),
  expensesFunc: (listExpenses) => dispatch(fetchAddExchanges(listExpenses)),
  editExpensefunc: (payload) => dispatch(editExpense(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  btnForm: state.wallet.btnForm,
  id: state.wallet.id,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  expensesFunc: PropTypes.func.isRequired,
  btnForm: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  editExpensefunc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
