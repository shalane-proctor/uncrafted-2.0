import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProfileSection from '../../components/ProfileSection';
import PostCard from '../../components/PostCard';
import Footer from '../../components/Footer';
import { getSingleUser } from '../../api/new/userData';
import { getPostsByUser } from '../../api/new/postData';

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setProfile);
    getPostsByUser(id).then(setPosts);
  }, [id]);

  return (
    <div className="background-logo">
      <Head>
        <title>Uncrafted - {profile?.username}</title>
        <meta name="Individula user profile" content="Individual user profile page" />
      </Head>
      <div className="center-page">
        <ProfileSection key={profile?.id} profileObj={profile} />
        <h1>My Posts</h1>
        <div className="text-center my-4">
          <div className="d-flex">
            {posts?.map((post) => (
              <PostCard key={post.id} id={post.id} imageUrl={post.image_url} itemName={post.item_name} color={post.color} amount={post.amount} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
