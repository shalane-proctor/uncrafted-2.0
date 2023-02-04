/* eslint-disable @next/next/no-img-element */
import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import MessageCard from '../components/MessageCard';
import Footer from '../components/Footer';
import { getMessagesByReceiver, getMessagesBySender } from '../api/new/messageData';
import { useAuth } from '../utils/context/authContext';

export default function MessagesPage() {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const user = useAuth();
  const getAllMessages = () => {
    getMessagesBySender(user?.user?.id).then(setSent);
    getMessagesByReceiver(user?.user?.id).then(setReceived);
  };

  useEffect(() => {
    getAllMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="background-logo-messages">
      <div className="center-page">
        <Head>
          <title>Uncrafted - My Messages</title>
          <meta name="messages" content="All messages page" />
        </Head>
        <h1>Received Messages</h1>
        {received.map((message) => (
          <MessageCard key={message.id} messageObj={message} onUpdate={getAllMessages} />
        ))}
        <h1>Sent Messages</h1>
        {sent.map((message) => (
          <MessageCard key={message.id} messageObj={message} onUpdate={getAllMessages} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
