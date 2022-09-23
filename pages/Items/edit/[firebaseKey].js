import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PostForm from '../../../components/Forms/PostForm';
import { getSinglePost } from '../../../api/itemsData';
import Footer from '../../../components/Footer';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>Uncrafted - Update Post</title>
        <meta name="Update post" content="Update post form" />
      </Head>
      <div className="center-page">
        <PostForm obj={editItem} />
      </div>
      <Footer />
    </>
  );
}
