import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { retrieveProfilesPosts } from '../../../api/mergeData';
import Footer from '../../../components/Footer';
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

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Trade" content="Single trade page" />
      </Head>
      <TradeForm itemWantedFirebaseKey={firebaseKey} offerTo={posts?.offeredTo} offeredFrom={posts?.offeredFrom} offeredPostObj={posts?.offeredPosts} wantedPostObj={posts?.wantedPosts} />
      <Footer />
    </>
  );
}
