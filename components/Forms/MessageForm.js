import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/new/userData';
import { createMessage } from '../../api/new/messageData';

export default function MessageForm({ id, obj }) {
  const [formInput, setFormInput] = useState();
  const [receiverUser, setReceiverUser] = useState();
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    getSingleUser(id).then(setReceiverUser);
  }, [id]);

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
      sender: user.uid,
      receiver: receiverUser.uid,
      subject: obj.subject,
      isNew: true,
      connectedToTrade: false,
    };
    createMessage(payload).then(() => {
      router.push('/messages');
    });
  };

  console.log(obj.receiver);
  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ color: 'aqua' }}>Send Message</h1>
      <h5 style={{ color: 'aqua' }}>Sending message to: {obj?.receiver?.username} </h5>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{ color: 'aqua' }}>Message</Form.Label>
        <Form.Control className="forms-over-image" type="text" as="textarea" name="messageContent" rows={3} placeholder="" onChange={handleChange} />
      </Form.Group>
      <Button size="lg" className="message-form-button" type="submit">
        Send
      </Button>
    </Form>
  );
}
MessageForm.propTypes = {
  id: PropTypes.number.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    sender: PropTypes.shape({}),
    receiver: PropTypes.shape({
      username: PropTypes.string,
    }),
    subject: PropTypes.string,
    messageContent: PropTypes.string,
    isNew: PropTypes.bool,
    connectedToTrade: PropTypes.bool,
  }),
};

MessageForm.defaultProps = {
  obj: PropTypes.shape({
    id: '',
    sender: '',
    receiver: '',
    subject: 'This is a subject!',
    messageContent: '',
    isNew: true,
    connectedToTrade: false,
  }),
};
