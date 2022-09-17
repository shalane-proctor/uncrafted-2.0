import { getMyPosts, getSinglePost } from './itemsData';
import { getSingleMessage } from './messagesData';
import {
  getFromProfileTrades, getMyProfile, getProfilePosts, getSingleProfile, getToProfileTrades,
} from './profileData';
import { getSingleTrade } from './tradesData';

const viewPostDetails = (postFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePost(postFirebaseKey).then((postObj) => {
    getSingleProfile(postObj.ownerProfileID).then((profileObj) => {
      resolve({ profileObj, ...postObj });
    });
  }).catch((error) => reject(error));
});

const viewProfileDetails = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfilePosts(profileFirebaseKey), getFromProfileTrades(profileFirebaseKey), getToProfileTrades(profileFirebaseKey)])
    .then(([profileObject, profilePostsArray, tradeFromObj, tradeToObj]) => {
      resolve({
        ...profileObject, posts: profilePostsArray, tradesFrom: tradeFromObj, tradeTo: tradeToObj,
      });
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

const retrieveAllMyTrades = (uid) => new Promise((resolve, reject) => {
  getMyProfile(uid).then((profileObj) => {
    getToProfileTrades(profileObj[0]?.firebaseKey).then((tradesToProfile) => {
      getFromProfileTrades(profileObj[0]?.firebaseKey).then((tradeFromProfile) => {
        resolve({
          profileObj,
          tradeTo: tradesToProfile,
          tradesFrom: tradeFromProfile,
        });
      });
    });
  }).catch((error) => reject(error));
});

const RetrieveMessageDetails = (messageFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMessage(messageFirebaseKey)
    .then((messageObj) => {
      getSingleProfile(messageObj.profileFromFirebaseKey).then((fromProfileObj) => {
        getSingleProfile(messageObj.profileToFirebaseKey).then((toProfileObj) => {
          resolve({ ...messageObj, fromProfile: fromProfileObj, toProfile: toProfileObj });
        });
      });
    }).catch((error) => reject(error));
});

export {
  viewProfileDetails, viewPostDetails, retrieveProfiles, retrieveProfilesPosts, viewMyProfile, viewTradeDetails, RetrieveMessageDetails, retrieveAllMyTrades,
};
