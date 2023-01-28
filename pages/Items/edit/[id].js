import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PostForm from '../../../components/Forms/PostForm';
import Footer from '../../../components/Footer';
import { getSinglePost } from '../../../api/new/postData';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  console.log(editItem);

  return (
    <>
      <Head>
        <title>Uncrafted - Update Post</title>
        <meta name="Update post" content="Update post form" />
      </Head>
      <div className="center-page">
        <PostForm key={editItem?.id} obj={editItem} />
      </div>
      <Footer />
    </>
  );
}
