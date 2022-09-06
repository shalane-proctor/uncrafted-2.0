import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ProfileSection from '../components/ProfileSection';
import { getMyProfile } from '../api/profileData';
import PostCard from '../components/PostCard';
import { getMyPosts } from '../api/itemsData';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const { user } = useAuth;
  console.warn(user);
  const [profile, setProfile] = useState([]);
  const getProfile = () => {
    getMyProfile(user.uid).then(setProfile);
  };
  useEffect(() => {
    getProfile(user.uid);
  }, []);
  const [posts, setPosts] = useState([]);
  const getThisProfilesPosts = () => {
    getMyPosts().then(setPosts);
  };
  useEffect(() => {
    getThisProfilesPosts();
  }, []);
  return (
    <><ProfileSection key={profile.uid} userName={profile.userName} profilePicture={profile.profilePicture} etsy={profile.etsy} instagram={profile.instagram} favoriteCrafts={profile.favoriteCrafts} about={profile.about} />
      <h1>My Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.firebaseKey} firebaseKey={post.firebaseKey} amount={post.amount} color={post.color} image={post.image} itemName={post.itemName} ownerProfileID={post.ownerProfileID} />
      ))}
      <span>
        <Button href="/Items/new">New Post</Button>
      </span>
      <h1>My Trades</h1>
      <h4>Trade offers</h4>
      <h4>Trade Requests</h4>
    </>
  );
}
