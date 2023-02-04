import { useEffect, useState } from 'react';
import Head from 'next/head';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import { getPosts } from '../api/new/postData';

function Home() {
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
            post.is_draft === true ? ''
              : <PostCard key={post.id} id={post.id} imageUrl={post.image_url} itemName={post.item_name} color={post.color} amount={post.amount} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
