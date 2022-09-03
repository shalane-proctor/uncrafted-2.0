import { React, useEffect, useState } from 'react';
import { getMessages } from '../api/messagesData';
import MessageCard from '../components/MessageCard';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const getAllMessages = () => {
    getMessages().then(setMessages);
  };
  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <>
      {messages.map((message) => (
        <MessageCard key={message.firebaseKey} messageObj={message} />
      ))}
    </>
  );
}
