// import { useRouter } from 'next/router';
// import { React, useState, useEffect } from 'react';
// import { getSingleMessage } from '../../../api/messagesData';

// export default function NewMessage() {
//   const [newMessage, setNewMessage] = useState();
//   // const [userToUid, setUserToUid] = useState();
//   const router = useRouter();
//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     getSingleMessage(firebaseKey).then(setNewMessage);
//   }, [firebaseKey]);
// }

import React from 'react';

export default function firebaseKey() {
  return (
    <div>asdf</div>
  );
}
