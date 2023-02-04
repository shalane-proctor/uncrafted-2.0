import { clientCredentials } from '../../utils/client';

const getMyProfile = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user-uid/${uid}/`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        username: data.username,
        favorite_craft: data.favorite_craft,
        email: data.email,
        about: data.about,
        profileImageUrl: data.profile_image_url,
        instagram: data.instagram,
        etsy: data.etsy,
      });
    })
    .catch((error) => reject(error));
});

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
        id: data?.id,
        uid: data?.uid,
        username: data?.username,
        favorite_craft: data?.favorite_craft,
        email: data?.email,
        about: data?.about,
        profile_image_url: data?.profile_image_url,
        instagram: data?.instagram,
        etsy: data?.etsy,
      });
    })
    .catch((error) => reject(error));
});

const createUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
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

const updateUserProfile = (user) => new Promise((resolve, reject) => {
  const userObj = {
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
  getUsers, getMyProfile, getSingleUser, createUser, updateUserProfile, deleteUser,
};
