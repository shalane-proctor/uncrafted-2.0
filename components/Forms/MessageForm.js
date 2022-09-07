import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createMessages } from '../../api/messagesData';

export default function MessageForm({
  profileToFirebaseKey, profileToUserName, profileFromFirebaseKey, profileFromUserName,
}) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();

  useEffect(() => {
    setFormInput();
  }, [profileFromFirebaseKey, profileFromUserName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      profileToFirebaseKey,
      profileFromFirebaseKey,
      profileToUserName,
      profileFromUserName,
    };
    createMessages(payload).then(() => {
      router.push('/messages');
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Send Message</h1>
      <h5>Sending message to: {profileToUserName} </h5>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control type="text" as="textarea" name="messageBody" rows={3} placeholder="" onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Send</Button>
    </Form>
  );
}
MessageForm.propTypes = {
  profileToFirebaseKey: PropTypes.string,
  profileToUserName: PropTypes.string,
  profileFromFirebaseKey: PropTypes.string,
  profileFromUserName: PropTypes.string,
};

MessageForm.defaultProps = {
  profileToFirebaseKey: '',
  profileToUserName: '',
  profileFromFirebaseKey: '',
  profileFromUserName: '',
};
