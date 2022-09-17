import { React, useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { retrieveAllMyTrades, viewMyProfile } from '../api/mergeData';
import ProfileSection from '../components/ProfileSection';
import PostCard from '../components/PostCard';
import TradeCard from '../components/TradeCard';

export default function ProfilePage() {
  const [myProfile, setMyProfile] = useState({});
  const [trades, setTrades] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    viewMyProfile(user.uid).then(setMyProfile);
    retrieveAllMyTrades(user.uid).then(setTrades);
  }, [user]);

  return (
    <>
      {myProfile?.profile?.firebaseKey === undefined ? '' : (
        <Link href={`/Profile/edit/${myProfile.profile?.firebaseKey}`} passHref>
          <Button>Edit Profile</Button>
        </Link>
      )}
      <ProfileSection key={myProfile} profileObj={myProfile.profile} />
      <h1>My Posts</h1>
      <div className="text-center my-4">
        <div className="d-flex">
          {myProfile.posts?.map((post) => (
            <PostCard key={post.firebaseKey} postObj={post} />
          ))}
        </div>
      </div>
      <span>
        {myProfile?.profile?.firebaseKey === undefined ? '' : (
          <Link href="/Items/new" passHref>
            <Button>New Post</Button>
          </Link>
        )}
      </span>
      <h1>My Trades</h1>
      <h4>Trade offers</h4>
      <div className="text-center my-4">
        <div className="d-flex">{trades.tradesFrom?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
      </div>
      <h4>Trade Requests</h4>
      <Container>
        <Row>
          <Col>
            <div className="text-center my-4">
              <div className="d-flex">{trades.tradeTo?.map((trade) => (trade.pending === false ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
            </div>
            <h4>Past Trades</h4>
            <div className="text-center my-4">
              <div className="d-flex">{trades.tradeTo?.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
              <div className="d-flex">{trades.tradesFrom?.map((trade) => (trade.pending === true ? '' : <TradeCard key={trade.firebaseKey} tradeObj={trade} />))}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
