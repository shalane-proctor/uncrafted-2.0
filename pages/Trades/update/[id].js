import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTrade } from '../../../api/new/tradeData';
import { getTradeMessageTrade } from '../../../api/new/tradeMessageData';
import Footer from '../../../components/Footer';
import TradeForm from '../../../components/Forms/TradeForm';
import TradeMessageCard from '../../../components/TradeMessageCard';

export default function EditTrade() {
  const [trade, setTrade] = useState();
  const [tradeMessage, setTradeMessage] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTrade(id).then(setTrade);
    getTradeMessageTrade(id).then(setTradeMessage);
  }, [id]);

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Trade" content="Single trade page" />
      </Head>
      <TradeForm item={trade} />
      <TradeMessageCard tradeMessageObj={tradeMessage} />
      <Footer />
    </>
  );
}
