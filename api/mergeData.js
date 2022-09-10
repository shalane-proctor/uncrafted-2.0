import { getSinglePost } from './itemsData';
import { getMyProfile, getProfilePosts, getSingleProfile } from './profileData';

const viewPostDetails = (postFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePost(postFirebaseKey).then((postObj) => {
    getSingleProfile(postObj.ownerProfileID).then((profileObj) => {
      resolve({ profileObj, ...postObj });
    });
  }).catch((error) => reject(error));
});

const viewProfileDetails = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfilePosts(profileFirebaseKey)])
    .then(([profileObject, profilePostsArray]) => {
      resolve({ ...profileObject, posts: profilePostsArray });
    })
    .catch((error) => reject(error));
});

const sendMessage = (profileFirebaseKey, uid) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getMyProfile(uid)])
    .then((response) => {
      resolve((response.data));
    }).catch((error) => reject(error));
});

export { viewProfileDetails, viewPostDetails, sendMessage };
