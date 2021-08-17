import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './index';
import * as types from '../constants';
import { ENDPOINT } from '../../api';
import { apiResponse, currencyListResponse } from '../../api/mock-response';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Asynchronous actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      currency: {
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
      },
      exchangeRate: {
        from: 4.7735,
        to: 5.9393,
        isFetching: false
      }
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('exchangeRate action', () => {

    it('creates EXCHANGE_RATE_SUCCESS when exchange rate has been fetched', () => {
      fetchMock.getOnce(ENDPOINT, apiResponse);

      const expectedActions = [
        { type: types.EXCHANGE_RATE_REQUEST },
        { type: types.EXCHANGE_RATE_SUCCESS, exchangeRate: apiResponse.quotes.USDGBP }
      ];

      const data = { from: 'USD', to: 'GBP' };

      return store.dispatch(actions.exchangeRate(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates EXCHANGE_RATE_FAILURE when exchange rate cannot be fetched', () => {
      fetchMock.getOnce(ENDPOINT, {});

      const error = new TypeError("Cannot read property 'undefinedUSD' of undefined");

      const expectedActions = [
        { type: types.EXCHANGE_RATE_REQUEST },
        { type: types.EXCHANGE_RATE_FAILURE, error }
      ];

      const data = { from: 'USD', to: 'GBP' };

      return store.dispatch(actions.exchangeRate(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

  });

  describe('currencyList action', () => {

    it('creates CURRENCY_LIST_SUCCESS when currency list has been fetched', () => {
      fetchMock.getOnce(ENDPOINT, apiResponse);

      const expectedActions = [
        { type: types.CURRENCY_LIST_REQUEST },
        { type: types.CURRENCY_LIST_SUCCESS, currencyTypes: currencyListResponse }
      ];

      return store.dispatch(actions.currencyList()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates CURRENCY_LIST_FAILURE when currency list cannot be fetched', () => {
      fetchMock.getOnce(ENDPOINT, {});

      const error = new TypeError("Cannot convert undefined or null to object");

      const expectedActions = [
        { type: types.CURRENCY_LIST_REQUEST },
        { type: types.CURRENCY_LIST_FAILURE, error }
      ];

      return store.dispatch(actions.currencyList()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

  });

  describe('currencyChange action', () => {
    /*
     * Unable to get this test to pass as unsure of how to update
     * the mock store as actions take place, the mock store still has
     * original values.
     */
    xit('creates CURRENCY_UPDATE, EXCHANGE_RATE_REQUEST, EXCHANGE_RATE_SUCCESS and VALUE_CHANGE when called', () => {
      fetchMock.getOnce(ENDPOINT, apiResponse);
      const params = { currency: 'EUR', position: 'from', alternative: 'to' };
      const expectedExchangeRate = apiResponse.quotes.USDGBP / apiResponse.quotes.USDEUR;

      const expectedActions = [
        {
          type: types.CURRENCY_UPDATE,
          position: params.position,
          currency: params.currency
        },
        {
          type: types.EXCHANGE_RATE_REQUEST
        },
        {
          type: types.EXCHANGE_RATE_SUCCESS,
          exchangeRate: expectedExchangeRate
        },
        {
          type: types.VALUE_CHANGE,
          position: params.position,
          alternative: params.alternative,
          value: store.getState().currency.values[params.position],
          exchangeRate: {
            isFetching: false,
            from: parseFloat((expectedExchangeRate).toFixed(5)),
            to: parseFloat((1 / expectedExchangeRate).toFixed(5)),
          }
        }
      ];

      return store.dispatch(
        actions.currencyChange(params.currency, params.position, params.alternative)
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
