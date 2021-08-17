import * as types from '../constants';

const defaultState = {
  from: 4.7735,
  to: 5.9393,
  isFetching: false
}

export const exchangeRate = (state = defaultState, action) => {
  switch (action.type) {
    case types.EXCHANGE_RATE_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.EXCHANGE_RATE_SUCCESS:
      return {
        from: parseFloat((action.exchangeRate).toFixed(5)),
        to: parseFloat((1 / action.exchangeRate).toFixed(5)),
        isFetching: false
      }
    case types.EXCHANGE_RATE_FAILURE:
      return {
        error: action.error,
        isFetching: false
      }
    default:
      return state;
  }
};
