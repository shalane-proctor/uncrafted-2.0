import Head from 'next/head';
import React from 'react';
import Footer from '../../components/Footer';
import PostForm from '../../components/Forms/PostForm';

export default function AddItem() {
  return (
    <>
      <Head>
        <title>Uncrafted - New Post</title>
        <meta name="New post form" content="New post form page" />
      </Head>
      <div className="center-page">
        <PostForm />
      </div>
      <Footer />
    </>
  );
}
