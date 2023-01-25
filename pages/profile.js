import { React, useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import ProfileSection from '../components/ProfileSection';
import PostCard from '../components/PostCard';
import TradeCard from '../components/TradeCard';
import Footer from '../components/Footer';
import { getSingleUser } from '../api/new/userData';
import { getTrades } from '../api/new/tradeData';
import { getPosts } from '../api/new/postData';

export default function ProfilePage() {
  const [myProfile, setMyProfile] = useState({});
  const [trades, setTrades] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getSingleUser(user.uid).then(setMyProfile);
    getPosts(user.uid).then(setPosts);
    getTrades(user.uid).then(setTrades);
  }, [user]);

  return (
    <div className="background-logo">
      <Head>
        <title>Uncrafted - My Profile</title>
        <meta name="Profile" content="My profile page" />
      </Head>
      <div className="center-page">
        {myProfile?.id === undefined ? (
          ''
        ) : (
          <Link href={`/Profile/edit/${myProfile.id}`} passHref>
            <Button size="lg" className="profile-buttons">
              Edit Profile
            </Button>
          </Link>
        )}
        <ProfileSection key={myProfile} profileObj={myProfile} />
        <span>
          {myProfile?.id === undefined ? (
            ''
          ) : (
            <Link href="/Items/new" passHref>
              <Button size="lg" className="profile-buttons">
                New Post
              </Button>
            </Link>
          )}
        </span>
        <h1 style={{ color: 'aqua', fontSize: '60px' }}>My Posts</h1>
        <div className="text-center my-4">
          <div className="d-flex">
            {posts?.map((post) => (
              <PostCard key={post.firebaseKey} postObj={post} />
            ))}
          </div>
        </div>
        <h1 style={{ color: 'aqua', fontSize: '60px' }}>My Trades</h1>
        <h4 style={{ color: 'aqua', fontSize: '40px' }}>Trade offers</h4>
        <div className="text-center my-4">
          <div className="d-flex">{trades.tradesFrom?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>
        </div>
        <h4 style={{ color: 'aqua', fontSize: '40px' }}>Trade Requests</h4>
        <Container>
          <Row>
            <Col>
              <div className="text-center my-4">
                <div className="d-flex">{trades.itemWanted.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>
              </div>
              <h4 style={{ color: 'aqua', fontSize: '40px' }}>Past Trades</h4>
              <div className="text-center my-4">
                <div className="d-flex">{trades.itemWanted.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>
                <div className="d-flex">{trades.itemOffered.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
