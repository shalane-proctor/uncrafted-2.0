// import { Button } from 'bootstrap';
// import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { RetrieveMessageDetails } from '../../api/mergeData';
import Footer from '../../components/Footer';
import MessageDetails from '../../components/MessageDetails';

export default function ViewMessageDetails() {
  const [messageDetails, setMessageDetails] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    RetrieveMessageDetails(firebaseKey).then(setMessageDetails);
  }, [firebaseKey]);

  return (
    <div className="background-logo">
      <Head>
        <title>Uncrafted - Message</title>
        <meta name="message" content="individual message page" />
      </Head>
      <div className="center-page">
        <MessageDetails key={messageDetails?.firebaseKey} messageObj={messageDetails} />
      </div>
      <Footer />
    </div>
  );
}
