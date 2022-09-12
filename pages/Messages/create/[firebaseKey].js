import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { retrieveProfiles } from '../../../api/mergeData';
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
    <>
      <MessageForm
        profileToFirebaseKey={firebaseKey}
        profileToUserName={profiles?.to.userName}
        profileFromFirebaseKey={profiles?.from.firebaseKey}
        ProfileFromUserName={profiles?.from.userName}
      />
    </>
  );
}
