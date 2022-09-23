import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { viewProfileDetails } from '../../api/mergeData';
import ProfileSection from '../../components/ProfileSection';
import PostCard from '../../components/PostCard';
import Footer from '../../components/Footer';

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProfileDetails(firebaseKey).then(setProfile);
  }, [firebaseKey]);

  return (
    <div className="background-logo">
      <Head>
        <title>Uncrafted - {profile?.userName}</title>
        <meta name="Individula user profile" content="Individual user profile page" />
      </Head>
      <div className="center-page">
        <ProfileSection key={profile.firebaseKey} profileObj={profile} />
        <h1>My Posts</h1>
        <div className="text-center my-4">
          <div className="d-flex">
            {profile.posts?.map((post) => (
              <PostCard key={post.firebaseKey} postObj={post} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
