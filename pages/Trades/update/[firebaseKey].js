import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTradeDetails } from '../../../api/mergeData';
// import TradeForm from '../../../components/Forms/TradeForm';
import { useAuth } from '../../../utils/context/authContext';

export default function NewTrade() {
  const [updateItem, setUpdateItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    viewTradeDetails(user.uid, firebaseKey).then(setUpdateItem);
  }, [firebaseKey, user]);

  console.warn(updateItem);

  return (
    <>
      {/* <TradeForm
        firebaseKey={firebaseKey}
        itemWantedFirebaseKey={p?.firebaseKey}
        offerTo={posts?.offeredTo}
        offeredFrom={posts?.offeredFrom}
        offeredPostObj={posts?.offeredPosts}
        wantedPostObj={posts?.wantedPosts} /> */}
    </>
  );
}
