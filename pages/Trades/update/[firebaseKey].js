import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTradeDetails } from '../../../api/mergeData';
import Footer from '../../../components/Footer';
import TradeForm from '../../../components/Forms/TradeForm';

export default function NewTrade() {
  const [updateItem, setUpdateItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTradeDetails(firebaseKey).then(setUpdateItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Trade" content="Single trade page" />
      </Head>
      <TradeForm firebaseKey={firebaseKey} offerTo={updateItem?.to} offeredFrom={updateItem?.from} offeredPostObj={updateItem?.offer} wantedPostObj={updateItem?.want} trade={updateItem?.tradeObj} />
      <Footer />
    </>
  );
}
