import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { getSingleMessage } from '../../api/messagesData';
import MessageDetails from '../../components/MessageDetails';

export default function ViewMessageDetails() {
  const [messageDetails, setMessageDetails] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMessage(firebaseKey).then(setMessageDetails);
  }, [firebaseKey]);
  return (
    <div>
      <MessageDetails
        key={messageDetails.firebaseKey}
        messageObj={messageDetails}
        // onUpdate={() => {
        //   <Link href="/" passHref />;}
      />
    </div>
  );
}
