import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { viewProfileDetails } from '../../api/mergeData';
import ProfileSection from '../../components/ProfileSection';
import PostCard from '../../components/PostCard';

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProfileDetails(firebaseKey).then(setProfile);
  }, [firebaseKey]);
  console.warn(profile);

  return (
    <>
      <ProfileSection key={profile.firebaseKey} profileObj={profile} />
      <h1>My Posts</h1>
      <div className="text-center my-4">
        <div className="d-flex">
          {profile.posts?.map((post) => (
            <PostCard key={post.firebaseKey} postObj={post} />
          ))}
        </div>
      </div>
      <span>
        <Button href="/Items/new">New Post</Button>
      </span>
      <h1>My Trades</h1>
      <h4>Trade offers</h4>
      <h4>Trade Requests</h4>
    </>
  );
}
