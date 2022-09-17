// import { Button } from 'bootstrap';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { RetrieveMessageDetails } from '../../api/mergeData';
import MessageDetails from '../../components/MessageDetails';

export default function ViewMessageDetails() {
  const [messageDetails, setMessageDetails] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    RetrieveMessageDetails(firebaseKey).then(setMessageDetails);
  }, [firebaseKey]);

  return (
    <div>
      <MessageDetails
        key={messageDetails?.firebaseKey}
        messageObj={messageDetails}
      />
    </div>
  );
}
