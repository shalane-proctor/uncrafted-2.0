import { React, useEffect, useState } from 'react';
import {
  Button,
  Col, Container, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import ProfileSection from '../components/ProfileSection';
import PostCard from '../components/PostCard';
import TradeCard from '../components/TradeCard';
import Footer from '../components/Footer';
import { getTradeByUser } from '../api/new/tradeData';
import { getPostsByUser } from '../api/new/postData';

export default function ProfilePage() {
  // const [myProfile, setMyProfile] = useState({});
  const [trades, setTrades] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getPostsByUser(user.id).then(setPosts);
    getTradeByUser(8).then(setTrades);
  }, [user]);

  console.log(trades, user.id.id);

  return (
    <div className="background-logo">
      <Head>
        <title>Uncrafted - My Profile</title>
        <meta name="Profile" content="My profile page" />
      </Head>
      <div className="center-page">
        <Link href={`/Profile/edit/${user?.id}`} passHref>
          <Button size="lg" className="profile-buttons">
            Edit Profile
          </Button>
        </Link>
        <ProfileSection key={user.id} profileObj={user} />
        <span>
          <Link href="/Items/new" passHref>
            <Button size="lg" className="profile-buttons">
              New Post
            </Button>
          </Link>
        </span>
        <h1 style={{ color: 'aqua', fontSize: '60px' }}>My Posts</h1>
        <div className="text-center my-4">
          {posts?.id !== [] ? (
            <div className="d-flex">
              {posts?.map((post) => (
                <PostCard key={post.id} imageUrl={post.image_url} itemName={post.item_name} color={post.color} amount={post.amount} id={post.id} />
              ))}
            </div>
          ) : (
            <h5 style={{ color: 'white', fontSize: '30px' }}>No posts yet!</h5>
          )}
        </div>
        <h1 style={{ color: 'aqua', fontSize: '60px' }}>My Trades</h1>
        <h4 style={{ color: 'aqua', fontSize: '40px' }}>Trade offers</h4>
        { user.id === trades?.trade_by_user?.id
          ? (
            <div className="text-center my-4">
              <div className="d-flex">{trades?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>
            </div>
          ) : ''}
        <h4 style={{ color: 'aqua', fontSize: '40px' }}>Trade Requests</h4>
        <Container>
          <Row>
            <Col>
              <div className="text-center my-4">{trades?.item_wanted === undefined ? <h5 style={{ color: 'white', fontSize: '30px' }}>No trades yet!</h5> : <div className="d-flex">{trades?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>}</div>
              <h4 style={{ color: 'aqua', fontSize: '40px' }}>Past Trades</h4>
              <div className="text-center my-4">
                <div className="d-flex">{trades?.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.id} tradeObj={trade} />))}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
