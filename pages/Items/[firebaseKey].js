import Link from 'next/link';
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { getSinglePost } from '../../api/itemsData';
import PostDetails from '../../components/PostDetails';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

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
        photoURL={user.photoURL}
        displayName={user.displayName}
        onUpdate={() => {
          <Link href="/" passHref />;
        }}
      />
    </div>
  );
}
