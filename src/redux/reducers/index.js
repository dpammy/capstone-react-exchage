import { combineReducers } from 'redux';

// Reducers
import * as currencyReducers from './currency';
import * as exchangeRateReducers from './exchangeRate';

export default combineReducers({
  ...currencyReducers,
  ...exchangeRateReducers
});
