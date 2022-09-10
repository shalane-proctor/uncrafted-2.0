import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { viewPostDetails } from '../../api/mergeData';

import PostDetails from '../../components/PostDetails';

export default function ViewThePostDetails() {
  const [postDetail, setPostDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPostDetails(firebaseKey).then(setPostDetails);
  }, [firebaseKey]);

  // eslint-disable-next-line no-console
  console.warn(postDetail);

  return (
    <div>
      <PostDetails
        key={postDetail.firebaseKey}
        postObj={postDetail}
        profilePicture={postDetail.profileObj?.profilePicture}
        userName={postDetail.profileObj?.userName}
      />
    </div>
  );
}
