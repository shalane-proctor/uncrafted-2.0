import { clientCredentials } from '../../utils/client';

const getTradeMessage = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trademessage`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTradeMessageTrade = (tradeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trademessage-trade/${tradeId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTradeMessage = (tradeMessageId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trademessage/${tradeMessageId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        message: data.massage,
        trade: data.trade,
      });
    })
    .catch((error) => reject(error));
});

const createTradeMessage = (tradeMessage) => new Promise((resolve, reject) => {
  const tradeMessageObj = {
    message: Number(tradeMessage.massage),
    trade: Number(tradeMessage.trade),
  };
  fetch(`${clientCredentials.databaseURL}/trademessage`, {
    method: 'POST',
    body: JSON.stringify(tradeMessageObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateTradeMessage = (tradeMessage) => new Promise((resolve, reject) => {
  const tradeMessageObj = {
    id: tradeMessage.id,
    message: Number(tradeMessage.massage),
    trade: Number(tradeMessage.trade),
  };
  fetch(`${clientCredentials.databaseURL}/trademessage/${tradeMessage.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeMessageObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteTradeMessage = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trademessage/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getTradeMessage, getSingleTradeMessage, createTradeMessage, updateTradeMessage, deleteTradeMessage, getTradeMessageTrade,
};
