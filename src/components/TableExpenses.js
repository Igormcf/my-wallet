import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, btnEdit } from '../actions';

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.onDeleteExpenseBtn = this.onDeleteExpenseBtn.bind(this);
  }

  onDeleteExpenseBtn(expenseItem) {
    const { deleteItem } = this.props;
    const { expenses } = this.props;
    const newExpensesList = expenses.filter((item) => item !== expenseItem);

    deleteItem(newExpensesList);
  }

  render() {
    const { expenses, itemForEdit } = this.props;
    return (
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
              <td>
                <button
                  type="button"
                  id="edit-btn"
                  data-testid="edit-btn"
                  onClick={ () => itemForEdit(item.id) }
                >
                  Editar
                </button>
                <button
                  id="delet-btn"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.onDeleteExpenseBtn(item) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (payload) => dispatch(deleteExpense(payload)),
  itemForEdit: (payload) => dispatch(btnEdit(payload)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteItem: PropTypes.func.isRequired,
  itemForEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
