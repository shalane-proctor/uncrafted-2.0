import { getMyPosts, getSinglePost } from './itemsData';
import { getMyProfile, getProfilePosts, getSingleProfile } from './profileData';
import { getMyOfferedTrades, getMyRequestedTrades, getSingleTrade } from './tradesData';

const viewPostDetails = (postFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePost(postFirebaseKey).then((postObj) => {
    getSingleProfile(postObj.ownerProfileID).then((profileObj) => {
      resolve({ profileObj, ...postObj });
    });
  }).catch((error) => reject(error));
});

const viewProfileDetails = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfilePosts(profileFirebaseKey), getSingleTrade(profileFirebaseKey)])
    .then(([profileObject, profilePostsArray, tradeObj]) => {
      resolve({ ...profileObject, posts: profilePostsArray, trades: tradeObj });
    })
    .catch((error) => reject(error));
});

const viewMyProfile = (uid) => new Promise((resolve, reject) => {
  getMyProfile(uid).then((profileObj) => {
    getMyPosts(uid).then((postObj) => {
      getMyRequestedTrades(profileObj[0].firebaseKey).then((offeredtradeObj) => {
        getMyOfferedTrades(profileObj[0].firebaseKey).then((requestedTradeObj) => {
          resolve({
            profile: profileObj[0], posts: postObj, offeredTrades: offeredtradeObj, requestedTrades: requestedTradeObj,
          });
        });
      });
    });
  }).catch((error) => reject(error));
});

const retrieveProfiles = (profileFirebaseKey, uid) => new Promise((resolve, reject) => {
  getSingleProfile(profileFirebaseKey).then((profileToObj) => {
    getMyProfile(uid).then((profileFromObj) => {
      resolve({ to: profileToObj, from: profileFromObj[0] });
    });
  }).catch((error) => reject(error));
});

const retrieveProfilesPosts = (postFirebaseKey, uid) => new Promise((resolve, reject) => {
  getSinglePost(postFirebaseKey)
    .then((postObj) => {
      getSingleProfile(postObj.ownerProfileID).then((profileToObj) => {
        getMyProfile(uid).then((profileFromObj) => {
          getMyPosts(uid).then((profileFromPosts) => {
            resolve({
              wantedPosts: postObj,
              offeredTo: profileToObj,
              offeredFrom: profileFromObj[0],
              offeredPosts: profileFromPosts,
            });
          });
        });
      });
    })
    .catch((error) => reject(error));
});

const viewTradeDetails = (uid, tradeFirbaseKey) => new Promise((resolve, reject) => {
  getSingleTrade(tradeFirbaseKey).then((tradeObj) => {
    retrieveProfiles(uid, tradeObj.itemWantedFirebaseKey).then((tradeItemsObj) => {
      resolve({ tradeInfo: tradeItemsObj });
    });
  }).catch((error) => reject(error));
});

// const viewOfferTrades = (profileFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleTrade(postFirebaseKey).then((tradeObj) => {
//     getSingleProfile(postObj.ownerProfileID).then((profileObj) => {
//       resolve({ profileObj, ...postObj });
//     });
//   }).catch((error) => reject(error));
// });

export {
  viewProfileDetails, viewPostDetails, retrieveProfiles, retrieveProfilesPosts, viewMyProfile, viewTradeDetails,
};
