import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMessage } from '../../api/new/messageData';

const initialState = {
  subject: 'This is a subject!',
  messageContent: '',
  isNew: true,
  connectedToTrade: false,
};
export default function MessageForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const { user } = useAuth();
  const router = useRouter();

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
      sender: user?.uid,
      receiver: obj?.uid,
      subject: initialState?.subject,
      isNew: true,
      connectedToTrade: false,
    };
    createMessage(payload).then(() => {
      router.push('/messages');
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ color: 'aqua' }}>Send Message</h1>
      <h5 style={{ color: 'aqua' }}>Sending message to: {obj?.username} </h5>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{ color: 'aqua' }}>Message</Form.Label>
        <Form.Control className="forms-over-image" type="text" as="textarea" name="messageContent" value={formInput?.messageContent} rows={3} placeholder="" onChange={handleChange} />
      </Form.Group>
      <Button size="lg" className="message-form-button" type="submit">
        Send
      </Button>
    </Form>
  );
}
MessageForm.propTypes = {
  obj: PropTypes.shape({
    uid: PropTypes.number,
    username: PropTypes.string,
  }),
};

MessageForm.defaultProps = {
  obj: PropTypes.shape({
    uid: '',
    username: '',
    sender: '',
    receiver: '',
  }),
};
