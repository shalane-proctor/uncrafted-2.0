/* eslint-disable @next/next/no-img-element */
import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import MessageCard from '../components/MessageCard';
import Footer from '../components/Footer';
import { getMessages } from '../api/new/messageData';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const getAllMessages = () => {
    getMessages().then(setMessages);
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
