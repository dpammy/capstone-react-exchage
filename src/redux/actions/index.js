import * as types from '../constants';
import * as api from '../../api';

import store from '../store';

/* ---------------------- Currency actions ---------------------- */

export function reverseCurrency() {
  return {
    type: types.CURRENCY_REVERSE
  };
}

export function toggleCurrencyMenu(position) {
  return {
    type: types.TOGGLE_CURRENCY_MENU,
    position
  };
}

export function closeCurrencyMenu(position) {
  return {
    type: types.CLOSE_CURRENCY_MENU,
    position
  };
}

export function updateCurrency(currency, position) {
  return {
    type: types.CURRENCY_UPDATE,
    position,
    currency
  };
}

export function requestCurrencyList() {
  return {
    type: types.CURRENCY_LIST_REQUEST,
  };
}

export function receiveCurrencyList(currencyTypes) {
  return {
    type: types.CURRENCY_LIST_SUCCESS,
    currencyTypes
  };
}

export function currencyListFailure(error) {
  return {
    type: types.CURRENCY_LIST_FAILURE,
    error
  };
}

// Async ------------------------------------

export function currencyList() {
  return dispatch => {
    dispatch(requestCurrencyList())
    return api.fetchCurrencyTypes()
      .then(currencyTypes => dispatch(receiveCurrencyList(currencyTypes)))
      .catch(error => {
        console.log('ERROR: ', error);
        dispatch(currencyListFailure(error))
      });
  }
}

export function currencyChange(currency, position, alternative) {
  return dispatch => {
    dispatch(updateCurrency(currency, position));
    const curencyState = store.getState().currency;
    const newCurrencies = {
      [position]: curencyState[position],
      [alternative]: curencyState[alternative]
    };
    return dispatch(exchangeRate({
      from: newCurrencies.from,
      to: newCurrencies.to,
      position,
      alternative
    }));
  };
}

/* ---------------------- Exchange rate actions ---------------------- */

export function requestExchangeRate() {
  return {
    type: types.EXCHANGE_RATE_REQUEST,
  };
}

export function receiveExchangeRate(exchangeRate) {
  return {
    type: types.EXCHANGE_RATE_SUCCESS,
    exchangeRate
  };
}

export function exchangeRateFailure(error) {
  return {
    type: types.EXCHANGE_RATE_FAILURE,
    error
  };
}

// Async ------------------------------------

export function exchangeRate(data) {
  return dispatch => {
    dispatch(requestExchangeRate())
    return api.fetchExchangeRate(data.from, data.to)
      .then(exchangeRate => {
        dispatch(receiveExchangeRate(exchangeRate))

        if (data.position) {
          dispatch(
            valueChange(
              data.position,
              data.alternative,
              store.getState().currency.values[data.position]
            )
          );
        }

      })
      .catch(error => {
        console.log('ERROR: ', error);
        dispatch(exchangeRateFailure(error))
      });
  }
}

/* ---------------------- Value actions ---------------------- */

export function valueChange(position, alternative, value) {
  return {
    type: types.VALUE_CHANGE,
    position,
    alternative,
    value,
    exchangeRate: store.getState().exchangeRate
  };
}
