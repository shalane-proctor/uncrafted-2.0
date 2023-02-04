import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMessage, getSingleMessage } from '../../api/new/messageData';
import { createTradeMessage } from '../../api/new/tradeMessageData';

const initialState = {
  subject: 'This is a subject!',
  messageContent: '',
  isNew: true,
  connectedToTrade: false,
};
export default function TradeMessageForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [message, setMessage] = useState();
  const [receiver, setReciever] = useState();
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    getSingleMessage().then(setMessage);
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj?.tradeByUser?.id === user.id) {
      setReciever(obj?.itemWanted?.owner_profile);
    } else {
      setReciever(obj?.itemOffered?.owner_profile);
    }
  }, [obj, user]);

  const handleClick = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      sender: user?.uid,
      receiver: receiver?.uid,
      subject: initialState?.subject,
      isNew: true,
      connectedToTrade: true,
    };
    createMessage(payload).then(setMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      trade: obj?.id,
      message: message?.id,
    };
    createTradeMessage(payload).then(() => {
      router.push('/profile');
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ color: 'aqua' }}>Send Message</h1>
      <h5 style={{ color: 'aqua' }}>Sending message to: {receiver?.username} </h5>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{ color: 'aqua' }}>Message</Form.Label>
        <Form.Control className="forms-over-image" type="text" as="textarea" name="messageContent" value={formInput?.messageContent} rows={3} placeholder="" onChange={handleChange} />
      </Form.Group>
      {message?.id ? (
        <Button size="lg" className="message-form-button" type="submit">
          Send
        </Button>
      ) : (
        <Button size="lg" className="message-form-button" type="button" onClick={handleClick}>
          Create Message
        </Button>
      )}
    </Form>
  );
}
TradeMessageForm.propTypes = {
  obj: PropTypes.checkPropTypes({
    id: PropTypes.number,
    tradeByUser: PropTypes.shape({}),
    itemWanted: PropTypes.shape({
      id: PropTypes.number,
      owner_profile_id: {
        id: PropTypes.number,
        uid: PropTypes.number,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      },
    }),
    itemOffered: PropTypes.shape({
      id: PropTypes.number,
      owner_profile_id: {
        id: PropTypes.number,
        uid: PropTypes.number,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      },
    }),
  }),
};

TradeMessageForm.defaultProps = {
  obj: {
    id: 0,
    itemWanted: {},
    itemOffered: {},
    isPending: PropTypes.bool,
  },
};
