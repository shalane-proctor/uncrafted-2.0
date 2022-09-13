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
    <div className="text-center my-4">
      <div className="d-flex">
        {posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
