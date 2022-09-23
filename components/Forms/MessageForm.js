import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createMessages } from '../../api/messagesData';
import { useAuth } from '../../utils/context/authContext';
import { getMyProfile } from '../../api/profileData';

export default function MessageForm({
  profileToFirebaseKey, profileToUserName, profileFromFirebaseKey, ProfileFromUserName,
}) {
  const [formInput, setFormInput] = useState();
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    getMyProfile(user.uid).then();
  }, [user]);

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
      profileToUserName,
      profileFromFirebaseKey,
      ProfileFromUserName,
    };
    createMessages(payload).then(() => {
      router.push('/messages');
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ color: 'aqua' }}>Send Message</h1>
      <h5 style={{ color: 'aqua' }}>Sending message to: {profileToUserName} </h5>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{ color: 'aqua' }}>Message</Form.Label>
        <Form.Control className="forms-over-image" type="text" as="textarea" name="messageBody" rows={3} placeholder="" onChange={handleChange} />
      </Form.Group>
      <Button size="lg" className="message-form-button" type="submit">
        Send
      </Button>
    </Form>
  );
}
MessageForm.propTypes = {
  profileToFirebaseKey: PropTypes.string,
  profileToUserName: PropTypes.string,
  profileFromFirebaseKey: PropTypes.string,
  ProfileFromUserName: PropTypes.string,
};

MessageForm.defaultProps = {
  profileToFirebaseKey: '',
  profileToUserName: '',
  profileFromFirebaseKey: '',
  ProfileFromUserName: '',
};
