import { React, useEffect, useState } from 'react';
import Head from 'next/head';
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
      <Head>
        <title>Uncrafted - My Messages</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      {messages.map((message) => (
        <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllMessages} />
      ))}
    </>
  );
}
