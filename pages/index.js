import { useEffect, useState } from 'react';
import { getPosts } from '../api/itemsData';
import PostCard from '../components/PostCard';
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
      {posts.map((post) => (
        <PostCard key={post.firebaseKey} firebaseKey={post.firebaseKey} amount={post.amount} color={post.color} image={post.image} itemName={post.itemName} />
      ))}
      {/* <PostDetails displayName={user.displayName} photoURL={user.photoURL} onUpdate={getAllPosts} /> */}
    </>
  );
}

export default Home;
