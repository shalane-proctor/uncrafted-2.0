import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getProfiles = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/profiles.json`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleProfile = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/profiles/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getMyProfile = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/profiles.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createProfiles = (profileObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/profiles.json`, profileObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/profiles/${response.data.name}.json`, payload).then(resolve);
    })
    .catch(reject);
});

const updateProfile = (profileObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/profiles/${profileObj.firebaseKey}.json`, profileObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteProfile = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/profiles/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getProfilePosts = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items.json?orderBy="ownerProfileID"&equalTo="${firebaseKey}"`).then((response) => resolve(Object.values(response.data))).catch((error) => reject(error));
});

export {
  getProfiles, getMyProfile, getSingleProfile, createProfiles, updateProfile, deleteProfile, getProfilePosts,
};
