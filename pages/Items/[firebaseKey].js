import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { viewPostDetails } from '../../api/mergeData';

import PostDetails from '../../components/PostDetails';
import { useAuth } from '../../utils/context/authContext';

export default function ViewThePostDetails() {
  const [postDetail, setPostDetails] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPostDetails(firebaseKey).then(setPostDetails);
  }, [firebaseKey, user]);

  return (
    <div>
      <PostDetails key={postDetail?.firebaseKey} postObj={postDetail} profilePicture={postDetail?.profileObj?.profilePicture} userName={postDetail?.profileObj?.userName} />
    </div>
  );
}
