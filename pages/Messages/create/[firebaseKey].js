import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
// import { getSinglePost } from '../../../api/itemsData';
// import { createMessages, getSingleMessage } from '../../../api/messagesData';
import { getMyProfile, getSingleProfile } from '../../../api/profileData';
import MessageForm from '../../../components/Forms/MessageForm';
import { useAuth } from '../../../utils/context/authContext';

export default function NewMessage() {
  const { user } = useAuth();
  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProfile(firebaseKey).then(setTo);
  }, [firebaseKey]);
  useEffect(() => {
    getMyProfile(user.uid).then(setFrom);
  }, [user.uid]);
  console.warn(from);
  return (
    <>
      <MessageForm profileToFirebaseKey={firebaseKey} profileToUserName={to?.userName} profileFromUserName={from?.userName} profileFromFirebaseKey={from?.firebaseKey} />
    </>
  );
}
