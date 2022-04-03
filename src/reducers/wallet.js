// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  INFO_WALLET,
  LIST_EXPENSE,
  DELET_EXPENSE,
  BTN_EDIT,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  btnForm: true,
  id: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INFO_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  case LIST_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELET_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case BTN_EDIT:
    return {
      ...state,
      btnForm: false,
      id: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      btnForm: true,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
