export const ENDPOINT = 'http://www.apilayer.net/api/live?access_key=0c8c9795c7dc626c2a9a2284aa38a11e&format=1';

export const fetchCurrencyTypes = () => {
  return fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {
      return Object.keys(data.quotes).map(currencyPair => currencyPair.slice(3));
    });
}

export const fetchExchangeRate = (currencyFrom, currencyTo) => {
  return fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const valueInSourceCurrencyFrom = data.quotes[`${data.source}${currencyFrom}`];
      const valueInSourceCurrencyTo = data.quotes[`${data.source}${currencyTo}`];
      return valueInSourceCurrencyTo / valueInSourceCurrencyFrom;
    });
};
