import { clientCredentials } from '../../utils/client';

const getUserById = (id) => fetch(`${clientCredentials.databaseURL}/users/${id}`).then((res) => res.json());

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.user,
        username: data.username,
        favorite_craft: data.favoriteCraft,
        email: data.email,
        about: data.about,
        profile_image_url: data.profileImageUrl,
        instagram: data.instagram,
        etsy: data.etsy,
      });
    })
    .catch((error) => reject(error));
});

const createUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    username: user.username,
    favorite_craft: user.favoriteCraft,
    email: user.email,
    about: user.about,
    profile_image_url: user.profileImageUrl,
    instagram: user.instagram,
    etsy: user.etsy,
  };
  fetch(`${clientCredentials.databaseURL}/user`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    id: user.id,
    uid: user.user,
    username: user.username,
    favorite_craft: user.favoriteCraft,
    email: user.email,
    about: user.about,
    profile_image_url: user.profileImageUrl,
    instagram: user.instagram,
    etsy: user.etsy,
  };
  fetch(`${clientCredentials.databaseURL}/user/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getUsers, getUserById, getSingleUser, createUser, updateUser, deleteUser,
};
