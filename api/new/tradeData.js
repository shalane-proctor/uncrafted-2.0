import { clientCredentials } from '../../utils/client';

const getTrades = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trade`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTradesByPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trade-post/${postId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTradeByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trade-user/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTradeByRequested = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trade-wanted/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTrade = (tradeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trade/${tradeId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        tradeByUser: data.trade_by_user,
        itemWanted: data.item_wanted,
        itemOffered: data.item_offered,
        isPending: data.is_pending,
      });
    })
    .catch((error) => reject(error));
});

const createTrade = (trade) => new Promise((resolve, reject) => {
  const tradeObj = {
    trade_by_user: trade.tradeByUser,
    item_wanted: trade.itemWanted,
    item_offered: trade.itemOffered,
    is_pending: trade.isPending,
  };
  fetch(`${clientCredentials.databaseURL}/trade`, {
    method: 'POST',
    body: JSON.stringify(tradeObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateTrade = (trade) => new Promise((resolve, reject) => {
  const tradeObj = {
    id: trade.id,
    trade_by_user: trade.tradeByUser,
    item_wanted: trade.itemWanted,
    item_offered: trade.itemOffered,
    is_pending: trade.isPending,
  };
  fetch(`${clientCredentials.databaseURL}/trade/${trade.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteTrade = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trade/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getTrades, getSingleTrade, createTrade, updateTrade, deleteTrade, getTradesByPost, getTradeByUser, getTradeByRequested,
};
