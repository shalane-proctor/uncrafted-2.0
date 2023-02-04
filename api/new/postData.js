import { clientCredentials } from '../../utils/client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post-user/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        postedByUser: data?.posted_by_user,
        ownerProfile: data?.owner_profile,
        itemName: data?.item_name,
        color: data?.color,
        amount: data?.amount,
        imageUrl: data?.image_url,
        tradePreferences: data?.trade_preferences,
        description: data?.description,
        isDraft: data?.is_draft,
        isPending: data?.isPending,
      });
    })
    .catch((error) => reject(error));
});

const createPost = (post) => new Promise((resolve, reject) => {
  const postObj = {
    posted_by_user: post?.postedByUser,
    owner_profile: post?.ownerProfile,
    item_name: post?.itemName,
    color: post?.color,
    amount: post?.amount,
    image_url: post?.imageUrl,
    trade_preferences: post?.tradePreferences,
    description: post?.description,
    is_draft: post?.isDraft,
    is_pending: post?.isPending,
  };
  fetch(`${clientCredentials.databaseURL}/post`, {
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePost = (post) => new Promise((resolve, reject) => {
  const postObj = {
    id: post?.id,
    posted_by_user: post?.postedByUser?.id,
    owner_profile: post?.ownerProfile?.id,
    item_name: post?.itemName,
    color: post?.color,
    amount: post?.amount,
    image_url: post?.imageUrl,
    trade_preferences: post?.tradePreferences,
    description: post?.description,
    is_draft: post?.isDraft,
    is_pending: post?.isPending,
  };
  fetch(`${clientCredentials.databaseURL}/post/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateTradePost = (post) => new Promise((resolve, reject) => {
  const postObj = {
    id: post?.id,
    posted_by_user: post?.posted_by_user?.id,
    owner_profile: post?.owner_profile,
    item_name: post?.item_name,
    color: post?.color,
    amount: post?.amount,
    image_url: post?.image_url,
    trade_preferences: post?.trade_preferences,
    description: post?.description,
    is_draft: post?.is_draft,
    is_pending: post?.is_pending,
  };
  fetch(`${clientCredentials.databaseURL}/post/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPosts, getSinglePost, createPost, updatePost, deletePost, getPostsByUser, updateTradePost,
};
