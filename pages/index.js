import { useEffect, useState } from 'react';
import Head from 'next/head';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import { getPosts } from '../api/new/postData';
// import PostDetails from '../components/PostDetails';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const getAllPosts = () => {
    getPosts().then(setPosts);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Shalane Proctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Uncrafted</title>
      </Head>
      <div className="text-center my-4 center-page">
        <div className="d-flex">
          {posts.map((post) => (
            post.draft === true || post.draft === 'on' ? ''
              : <PostCard key={post.id} postObj={post} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
