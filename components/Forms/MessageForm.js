// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import { createPosts } from '../../api/itemsData';
// import { useAuth } from '../../utils/context/authContext';

// const initialState = {
//   messageBody: '',
//   profilePhotofromURL: '',
//   profilePhotoToURL: '',
//   userNameFrom: '',
//   userNameTo: '',
//   firebaseKey: '',
// };

// export default function MessageForm({ messageObj }) {
//   const [formInput, setFormInput] = useState(initialState);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (messageObj.firebaseKey) setFormInput(messageObj);
//   }, [messageObj, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (messageObj.firebaseKey) {
//       updateMessages(formInput).then(() => router.push('/'));
//     } else {
//       const payload = {
//         ...formInput,
//         uid: user.uid,
//         photoURL: user.photoURL,
//         displayName: user.displayName,
//         ownerProfileID: user.uid,
//       };
//       createPosts(payload).then(() => {
//         router.push('/');
//       });
//     }
//   };
//   return (
//     <Form>
//       <h1>Send Message</h1>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//         <Form.Label>Sending message to:</Form.Label>
//         <Form.Control type="text" placeholder="" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Message</Form.Label>
//         <Form.Control type="text" as="textarea" rows={3} placeholder="" />
//       </Form.Group>
//     </Form>
//   );
// }

// MessageForm.propTypes = {
//   messageObj: PropTypes.shape({
//     messageBody: PropTypes.string,
//     userNameFrom: PropTypes.string,
//     userNameTo: PropTypes.string,
//     firebaseKey: PropTypes.string,
//   }),
// };

// PostForm.defaultProps = {
//   messageObj: initialState,
// };
import React from 'react';

export default function MessageForm() {
  return (
    <div>MessageForm</div>
  );
}
