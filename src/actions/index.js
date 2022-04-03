// Coloque aqui suas actions
export const INFO_LOGIN = 'INFO_LOGIN';
export const INFO_WALLET = 'INFO_WALLET';
export const LIST_EXPENSE = 'LIST_EXPENSE';
export const DELET_EXPENSE = 'DELET_EXPENSE';
export const BTN_EDIT = 'BTN_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const loginInfos = (payload) => ({
  type: INFO_LOGIN,
  payload,
});

export const walletInfos = (payload) => ({
  type: INFO_WALLET,
  payload,
});

export const expensesList = (payload) => ({
  type: LIST_EXPENSE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELET_EXPENSE,
  payload,
});

export const btnEdit = (payload) => ({
  type: BTN_EDIT,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const fetchCoins = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const fetchCurrencies = Object.keys(data).filter((item) => item !== 'USDT');
  dispatch(walletInfos(fetchCurrencies));
};

export const fetchAddExchanges = (listExpenses) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  listExpenses.exchangeRates = data;
  dispatch(expensesList(listExpenses));
};
