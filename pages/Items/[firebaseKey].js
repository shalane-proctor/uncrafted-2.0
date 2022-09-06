import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { getSinglePost } from '../../api/itemsData';
import PostDetails from '../../components/PostDetails';

export default function ViewPostDetails() {
  const [postDetail, setPostDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setPostDetails);
  }, [firebaseKey]);

  // eslint-disable-next-line no-console
  console.log(postDetail);

  return (
    <div>
      <PostDetails
        key={postDetail.firebaseKey}
        postObj={postDetail}
      />
    </div>
  );
}
