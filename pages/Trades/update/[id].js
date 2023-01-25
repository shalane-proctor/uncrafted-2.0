import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTrades } from '../../../api/new/tradeData';
import Footer from '../../../components/Footer';
import TradeForm from '../../../components/Forms/TradeForm';

export default function EditTrade() {
  const [updateItem, setUpdateItem] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getTrades(id).then(setUpdateItem);
  }, [id]);

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Trade" content="Single trade page" />
      </Head>
      <TradeForm item={updateItem} />
      <Footer />
    </>
  );
}
