import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sendMessage } from '../../../api/mergeData';
import MessageForm from '../../../components/Forms/MessageForm';
import { useAuth } from '../../../utils/context/authContext';

export default function NewMessage() {
  const [profiles, setProfiles] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    sendMessage(firebaseKey, user.uid).then(setProfiles);
  }, [firebaseKey, user]);
  console.warn(profiles);
  return (
    <>
      <MessageForm
        profileToFirebaseKey={firebaseKey}
        profileToUserName={profiles}
        profileFromFirebaseKey={profiles}
        ProfileFromUserName={profiles}
      />
    </>
  );
}
