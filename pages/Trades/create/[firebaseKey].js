import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { retrieveProfilesPosts } from '../../../api/mergeData';
import TradeForm from '../../../components/Forms/TradeForm';
import { useAuth } from '../../../utils/context/authContext';

export default function NewTrade() {
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    retrieveProfilesPosts(firebaseKey, user.uid).then(setPosts);
  }, [firebaseKey, user]);

  console.warn(posts);

  return (
    <>
      <TradeForm
        itemWantedFirebaseKey={firebaseKey}
        itemOfferedFirebaseKey={posts?.offeredPosts?.firebaseKey}
        offerTo={posts?.offeredTo}
        offeredFrom={posts?.offeredFrom}
        offeredPostObj={posts?.offeredPosts}
        wantedPostObj={posts?.wantedPosts}
      />
    </>
  );
}
