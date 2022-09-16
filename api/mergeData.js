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

const viewTradeDetails = (tradeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTrade(tradeFirebaseKey).then((tradeObj) => {
    getSinglePost(tradeObj?.itemOfferedFirebaseKey).then((postOfferedObj) => {
      getSinglePost(tradeObj?.itemWantedFirebaseKey).then((postWantedObj) => {
        getSingleProfile(tradeObj?.offeredFrom).then((offerFromObj) => {
          getSingleProfile(tradeObj?.offerTo).then((offerToObj) => {
            resolve({
              tradeObj, offer: postOfferedObj, want: postWantedObj, from: offerFromObj, to: offerToObj,
            });
          });
        });
      });
    });
  }).catch((error) => reject(error));
});

const viewMyProfile = (uid) => new Promise((resolve, reject) => {
  getMyProfile(uid).then((profileObj) => {
    getMyPosts(uid).then((postObj) => {
      resolve({
        profile: profileObj[0],
        posts: postObj,
      });
    });
  }).catch((error) => reject(error));
});

const GetMyTradePosts = (firebaseKey) => new Promise((resolve, reject) => {
  getMyOfferedTrades(firebaseKey).then((offeredTrades) => {
    getMyRequestedTrades(firebaseKey).then((requestedTrades) => {
      getSinglePost(offeredTrades.itemWantedFirebaseKey).then((offeredPosts) => {
        getSinglePost(requestedTrades.itemOfferedFirebaseKey).then((requestedPosts) => {
          resolve({ offerPosts: offeredPosts, requestPosts: requestedPosts });
        });
        //   });
      });
    }).catch((error) => reject(error));
  });
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

// const viewTradeDetails = (uid, tradeFirbaseKey) => new Promise((resolve, reject) => {
//   getSingleTrade(tradeFirbaseKey).then((tradeObj) => {
//     retrieveProfiles(uid, tradeObj.itemWantedFirebaseKey).then((tradeItemsObj) => {
//       resolve({ tradeInfo: tradeItemsObj });
//     });
//   }).catch((error) => reject(error));
// });

export {
  viewProfileDetails, viewPostDetails, retrieveProfiles, retrieveProfilesPosts, viewMyProfile, viewTradeDetails, GetMyTradePosts,
};
