import * as actions from './index';
import * as types from '../constants';
import store from '../store';
import { currencyListResponse } from '../../api/mock-response';

describe('Currency actions', () => {

  describe('Update currency action', () => {
    it('should create an action that updates the selected currency', () => {
      const currency = 'EUR';
      const position = 'from';
      const expectedAction = {
        type: types.CURRENCY_UPDATE,
        position,
        currency
      };
      expect(actions.updateCurrency(currency, position)).toEqual(expectedAction);
    });
  });

  describe('reverse currency action', () => {
    it('should create an action that reverses the selected currencies', () => {
      const expectedAction = { type: types.CURRENCY_REVERSE };
      expect(actions.reverseCurrency()).toEqual(expectedAction);
    });
  });

  describe('request currency list action', () => {
    it('should create a CURRENCY_LIST_REQUEST action', () => {
      const expectedAction = { type: types.CURRENCY_LIST_REQUEST };
      expect(actions.requestCurrencyList()).toEqual(expectedAction);
    });
  });

  describe('receive currency list action', () => {
    it('should create a CURRENCY_LIST_SUCCESS action', () => {
      const expectedAction = { type: types.CURRENCY_LIST_SUCCESS, currencyTypes: currencyListResponse };
      expect(actions.receiveCurrencyList(currencyListResponse)).toEqual(expectedAction);
    });
  });

  describe('currency list failure action', () => {
    it('should create a CURRENCY_LIST_FAILURE action', () => {
      const error = 'Some error';
      const expectedAction = { type: types.CURRENCY_LIST_FAILURE, error };
      expect(actions.currencyListFailure(error)).toEqual(expectedAction);
    });
  });

});

describe('Menu actions', () => {

  describe('close menu action', () => {
    it('should create an action that closes the currency menu', () => {
      const position = "from";
      const expectedAction = { type: types.CLOSE_CURRENCY_MENU, position };
      expect(actions.closeCurrencyMenu(position)).toEqual(expectedAction);
    });
  });

  describe('toggle menu action', () => {
    it('should create an action that closes the currency menu', () => {
      const position = "from";
      const expectedAction = { type: types.TOGGLE_CURRENCY_MENU, position };
      expect(actions.toggleCurrencyMenu(position)).toEqual(expectedAction);
    });
  });

});

describe('Exchange rate actions', () => {

  describe('Reverse exchange rate action', () => {
    it('should create an action that reverses the exchange rate', () => {
      const expectedAction = { type: types.CURRENCY_REVERSE };
      expect(actions.reverseCurrency()).toEqual(expectedAction);
    });
  });

  describe('Request exchange rate action', () => {
    it('should create an action that requests the exchange rate', () => {
      const expectedAction = { type: types.EXCHANGE_RATE_REQUEST };
      expect(actions.requestExchangeRate()).toEqual(expectedAction);
    });
  });

  describe('Receive exchange rate action', () => {
    it('should create an action that receives the exchange rate', () => {
      const exchangeRate = { from: 1, to: 0.8 };
      const expectedAction = {
        type: types.EXCHANGE_RATE_SUCCESS,
        exchangeRate: {
          from: exchangeRate.from,
          to: exchangeRate.to
        }
      };
      expect(actions.receiveExchangeRate(exchangeRate)).toEqual(expectedAction);
    });
  });

  describe('Fail exchange rate action', () => {
    it('should create an action that signals exchange rate request failure', () => {
      const error = 'Some error';
      const expectedAction = { type: types.EXCHANGE_RATE_FAILURE, error };
      expect(actions.exchangeRateFailure(error)).toEqual(expectedAction);
    });
  });

});

describe('Value change action', () => {
  it('creates VALUE_CHANGE action', () => {
    const value = '10',
          position = 'from',
          alternative = 'to';
    const expectedAction = {
      type: types.VALUE_CHANGE,
      position,
      alternative,
      value,
      exchangeRate: store.getState().exchangeRate
    };
    expect(actions.valueChange(position, alternative, value)).toEqual(expectedAction);
  });
});
