/* eslint-disable @next/next/no-img-element */
import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import MessageCard from '../components/MessageCard';
import Footer from '../components/Footer';
import { getMessagesByUser } from '../api/new/messageData';
import { useAuth } from '../utils/context/authContext';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const user = useAuth();
  const getAllMessages = () => {
    getMessagesByUser(user?.user?.id).then(setMessages);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <div className="background-logo-messages">
      <div className="center-page">
        <Head>
          <title>Uncrafted - My Messages</title>
          <meta name="messages" content="All messages page" />
        </Head>
        {messages.map((message) => (
          <MessageCard key={message.id} messageObj={message} onUpdate={getAllMessages} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
