import { getMyPosts, getSinglePost } from './itemsData';
import { getMyProfile, getProfilePosts, getSingleProfile } from './profileData';
import { getMyTrades, getSingleTrade } from './tradesData';

const viewPostDetails = (postFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePost(postFirebaseKey).then((postObj) => {
    getSingleProfile(postObj.ownerProfileID).then((profileObj) => {
      resolve({ profileObj, ...postObj });
    });
  }).catch((error) => reject(error));
});

const viewProfileDetails = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfilePosts(profileFirebaseKey), getSingleTrade(profileFirebaseKey)])
    .then(([profileObject, profilePostsArray]) => {
      resolve({ ...profileObject, posts: profilePostsArray });
    })
    .catch((error) => reject(error));
});

const viewMyProfile = (uid) => new Promise((resolve, reject) => {
  Promise.all([getMyProfile(uid), getMyPosts(uid), getMyTrades(uid)])
    .then(([profileObject, profilePostsArray]) => {
      resolve({ ...profileObject, posts: profilePostsArray });
    })
    .catch((error) => reject(error));
});

const retrieveProfiles = (profileFirebaseKey, uid) => new Promise((resolve, reject) => {
  getSingleProfile(profileFirebaseKey).then((profileToObj) => {
    getMyProfile(uid).then((profileFromObj) => {
      resolve({ to: profileToObj, from: profileFromObj[0] });
    });
  }).catch((error) => reject(error));
});

const retrieveProfilesPosts = (profileFirebaseKey, uid) => new Promise((resolve, reject) => {
  getSingleProfile(profileFirebaseKey).then((profileToObj) => {
    getMyProfile(uid).then((profileFromObj) => {
      getMyPosts(uid).then((profileFromPosts) => {
        resolve({
          to: profileToObj,
          from: profileFromObj[0],
          fromPosts: profileFromPosts,
        });
      });
    });
  })
    .catch((error) => reject(error));
});

export {
  viewProfileDetails, viewPostDetails, retrieveProfiles, retrieveProfilesPosts, viewMyProfile,
};
