import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../../../components/Footer';
import TradeForm from '../../../components/Forms/TradeForm';
// import { useAuth } from '../../../utils/context/authContext';

export default function NewTrade() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Trade" content="Single trade page" />
      </Head>
      <TradeForm id={id} />
      <Footer />
    </>
  );
}
