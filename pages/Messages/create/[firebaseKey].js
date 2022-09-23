import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { retrieveProfiles } from '../../../api/mergeData';
import Footer from '../../../components/Footer';
import MessageForm from '../../../components/Forms/MessageForm';
import { useAuth } from '../../../utils/context/authContext';

export default function NewMessage() {
  const [profiles, setProfiles] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    retrieveProfiles(firebaseKey, user.uid).then(setProfiles);
  }, [firebaseKey, user]);

  return (
    <div>
      <Head>
        <title>Uncrafted - My Messages</title>
        <meta name="Create message" content="Create message page" />
      </Head>
      <div className="center-page">
        <MessageForm profileToFirebaseKey={firebaseKey} profileToUserName={profiles?.to?.userName} profileFromFirebaseKey={profiles?.from?.firebaseKey} ProfileFromUserName={profiles?.from?.userName} />
      </div>
      <Footer />
    </div>
  );
}
