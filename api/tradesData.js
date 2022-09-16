import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTrades = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/trades.json`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getMyTrades = (profileFirebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/trades.json?orderBy="uid"&equalTo="${profileFirebaseKey}"`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
const getMyRequestedTrades = (profileFirebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/trades.json?orderBy="offeredFrom"&equalTo="${profileFirebaseKey}"`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getSingleTrade = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/trades/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createTrades = (tradeObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/trades.json`, tradeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name, pending: true };
      axios.patch(`${dbUrl}/trades/${response.data.name}.json`, payload).then(resolve);
    })
    .catch(reject);
});

const updateTrades = (tradeObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/trades/${tradeObj.firebaseKey}.json`, tradeObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteTrade = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/trades/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getTrades, getMyTrades, getMyRequestedTrades, getSingleTrade, createTrades, updateTrades, deleteTrade,
};
