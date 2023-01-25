import Head from 'next/head';
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { getSinglePost } from '../../api/new/postData';
import Footer from '../../components/Footer';

import PostDetails from '../../components/PostDetails';
import { useAuth } from '../../utils/context/authContext';

export default function ViewThePostDetails() {
  const [postDetail, setPostDetails] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
  }, [id, user]);

  return (
    <div>
      <Head>
        <title>Uncrafted - Post</title>
        <meta name="Individual Posts" content="Individual posts page" />
      </Head>
      <div className="center-page">
        <PostDetails key={postDetail?.id} postObj={postDetail} />
      </div>
      <Footer />
    </div>
  );
}
