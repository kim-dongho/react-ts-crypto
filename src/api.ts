const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchCoinInfo = (coinID: string | undefined) => {
  return fetch(`${BASE_URL}/coins/${coinID}`).then((response) => response.json());
};

export const fetchCoinTickers = (coinID: string | undefined) => {
  return fetch(`${BASE_URL}/tickers/${coinID}`).then((response) => response.json());
};

export const fetchCoinHistory = (coinID: string | undefined) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(`${BASE_URL}/coins/${coinID}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) => response.json());
};

export const fetchCoinPrice = (coinID: string | undefined) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate;
  return fetch(`${BASE_URL}/coins/${coinID}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) => response.json());
};
