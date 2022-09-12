import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTrade } from '../../api/tradesData';
import TradeForm from '../../components/Forms/TradeForm';

export default function NewTrade() {
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTrade(firebaseKey).then(setPosts);
  }, [firebaseKey]);

  console.warn(posts);

  return (
    <>
      <TradeForm itemWantedFirebaseKey={firebaseKey} itemOfferedFirebaseKey={posts?.posts.itemName} />
    </>
  );
}
