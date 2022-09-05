import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { getSinglePost } from '../../api/itemsData';
import PostDetails from '../../components/PostDetails';

export default function ViewPostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setPostDetails);
  }, [firebaseKey]);

  return (
    <div>
      <PostDetails
        key={postDetails.firebaseKey}
        amount={postDetails.amount}
        color={postDetails.color}
        description={postDetails.description}
        draft={postDetails.draft}
        firebaseKey={postDetails.firebaseKey}
        image={postDetails.image}
        itemName={postDetails.itemName}
        pending={postDetails.pending}
        tradePref={postDetails.tradePref}
        photoURL={postDetails.photoURL}
        displayName={postDetails.displayName}
        ownerProfileId={postDetails.ownerProfileId}
      />
    </div>
  );
}
