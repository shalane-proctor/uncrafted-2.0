import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMessages = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/messages.json`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createMessages = (messageObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/messages.json`, messageObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/messages/${response.data.name}.json`, payload).then(resolve);
    })
    .catch(reject);
});

const updateMessages = (postObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/messages/${postObj.firebaseKey}.json`, postObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getMessages, getSingleMessage, createMessages, updateMessages, deleteMessage,
};
