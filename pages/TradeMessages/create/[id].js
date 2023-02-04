/* eslint-disable no-console */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTrade } from '../../../api/new/tradeData';
import Footer from '../../../components/Footer';
import TradeMessageForm from '../../../components/Forms/TradeMessageForm';

export default function NewMessage() {
  const [trade, setTrade] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTrade(id).then(setTrade);
  }, [id]);
  return (
    <div>
      <Head>
        <title>Uncrafted - Trade Message</title>
        <meta name="Create message" content="Create message page" />
      </Head>
      <div className="center-page">
        <TradeMessageForm obj={trade} />
      </div>
      <Footer />
    </div>
  );
}
