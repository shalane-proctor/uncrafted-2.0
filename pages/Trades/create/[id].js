import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTrades } from '../../../api/new/tradeData';
import Footer from '../../../components/Footer';
import TradeForm from '../../../components/Forms/TradeForm';
// import { useAuth } from '../../../utils/context/authContext';

export default function NewTrade() {
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useAuth();

  useEffect(() => {
    getTrades(id).then(setPosts);
  }, [id]);

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Trade" content="Single trade page" />
      </Head>
      <TradeForm item={posts} />
      <Footer />
    </>
  );
}
