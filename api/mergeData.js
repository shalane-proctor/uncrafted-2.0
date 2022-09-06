import { getProfilePosts, getSingleProfile } from './profileData';

const viewProfileDetails = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfilePosts(profileFirebaseKey)])
    .then(([profileObject, profilePostsArray]) => {
      resolve({ ...profileObject, posts: profilePostsArray });
    })
    .catch((error) => reject(error));
});

export default viewProfileDetails;
