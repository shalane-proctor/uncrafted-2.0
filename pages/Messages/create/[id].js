/* eslint-disable no-console */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../../api/new/userData';
import Footer from '../../../components/Footer';
import MessageForm from '../../../components/Forms/MessageForm';

export default function NewMessage() {
  const [profiles, setProfiles] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setProfiles);
  }, [id]);

  return (
    <div>
      <Head>
        <title>Uncrafted - My Messages</title>
        <meta name="Create message" content="Create message page" />
      </Head>
      <div className="center-page">
        <MessageForm obj={profiles} />
      </div>
      <Footer />
    </div>
  );
}
