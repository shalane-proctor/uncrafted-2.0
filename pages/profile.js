import { React, useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { retrieveAllMyTrades, viewMyProfile } from '../api/mergeData';
import ProfileSection from '../components/ProfileSection';
import PostCard from '../components/PostCard';
import TradeCard from '../components/TradeCard';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const [myProfile, setMyProfile] = useState({});
  const [trades, setTrades] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    viewMyProfile(user.uid).then(setMyProfile);
    retrieveAllMyTrades(user.uid).then(setTrades);
  }, [user]);

  return (
    <div className="background-logo">
      <Head>
        <title>Uncrafted - My Profile</title>
        <meta name="Profile" content="My profile page" />
      </Head>
      <div className="center-page">
        {myProfile?.profile?.firebaseKey === undefined ? (
          ''
        ) : (
          <Link href={`/Profile/edit/${myProfile.profile?.firebaseKey}`} passHref>
            <Button size="lg" className="profile-buttons">
              Edit Profile
            </Button>
          </Link>
        )}
        <ProfileSection key={myProfile} profileObj={myProfile.profile} />
        <span>
          {myProfile?.profile?.firebaseKey === undefined ? (
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
            {myProfile.posts?.map((post) => (
              <PostCard key={post.firebaseKey} postObj={post} />
            ))}
          </div>
        </div>
        <h1 style={{ color: 'aqua', fontSize: '60px' }}>My Trades</h1>
        <h4 style={{ color: 'aqua', fontSize: '40px' }}>Trade offers</h4>
        <div className="text-center my-4">
          <div className="d-flex">{trades.tradesFrom?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
        </div>
        <h4 style={{ color: 'aqua', fontSize: '40px' }}>Trade Requests</h4>
        <Container>
          <Row>
            <Col>
              <div className="text-center my-4">
                <div className="d-flex">{trades.tradeTo?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
              </div>
              <h4 style={{ color: 'aqua', fontSize: '40px' }}>Past Trades</h4>
              <div className="text-center my-4">
                <div className="d-flex">{trades.tradeTo?.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
                <div className="d-flex">{trades.tradesFrom?.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
