import * as types from '../constants';

const formatValue = value => parseFloat(value).toString();

const defaultState = {
  from: 'USD',
  to: 'GBP',
  isReversed: false,
  values: {
    from: '',
    to: ''
  },
  menuOpen: {
    from: false,
    to: false
  },
  types: {
    error: null,
    isFetching: false,
    list: []
  }
};

export const currency = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_CURRENCY_MENU:
      return {
        ...state,
        menuOpen: {
          ...state.menuOpen,
          [action.position]: !state.menuOpen[action.position]
        }
      };
    case types.CLOSE_CURRENCY_MENU:
      return {
        ...state,
        menuOpen: {
          ...state.menuOpen,
          [action.position]: false
        }
      };
    case types.CURRENCY_UPDATE:
      return {
        ...state,
        [action.position]: action.currency
      };
    case types.CURRENCY_REVERSE:
      return {
        ...state,
        isReversed: !state.isReversed
      };
    case types.VALUE_CHANGE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.position]: formatValue(action.value),
          [action.alternative]: formatValue((action.value * action.exchangeRate[action.position]))
        }
      }
    case types.CURRENCY_LIST_REQUEST:
      return {
        ...state,
        types: {
          ...state.types,
          isFetching: true
        }
      }
    case types.CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        types: {
          ...state.types,
          list: action.currencyTypes,
          isFetching: false
        }
      }
    case types.CURRENCY_LIST_FAILURE:
      return {
        ...state,
        types: {
          ...state.types,
          error: action.error,
          isFetching: false
        }
      }
    default:
      return state;
  }
};
