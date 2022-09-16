import { React, useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { viewMyProfile, viewTradeDetails } from '../api/mergeData';
import ProfileSection from '../components/ProfileSection';
import PostCard from '../components/PostCard';
import TradeCard from '../components/TradeCard';

export default function ProfilePage() {
  const [myProfile, setMyProfile] = useState({});
  const [trades, setTrades] = useState();
  const { user } = useAuth();

  useEffect(() => {
    viewMyProfile(user.uid).then(setMyProfile);
  }, [user]);
  console.warn(myProfile);

  useEffect(() => {
    viewTradeDetails(myProfile.firebaseKey).then(setTrades);
  }, []);

  console.warn(trades);

  return (
    <>
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
        <Button href="/Items/new">New Post</Button>
      </span>
      <h1>My Trades</h1>
      <h4>Trade offers</h4>
      <div className="text-center my-4">
        <div className="d-flex">
          {myProfile.offeredTrades?.map((trade) => (
            <TradeCard key={trade.firebaseKey} tradeObj={trade.itemWantedFireBaseKey} />
          ))}
        </div>
      </div>
      <h4>Trade Requests</h4>
      <Container>
        <Row>
          <Col>
            <div className="text-center my-4">
              {/* <div className="d-flex">
                {myProfile.requestedTrades?.map((trade) => (
                  <TradeCard key={trade.firebaseKey} tradeFirebaseKey={trade.itemWantedFireBaseKey} />
                ))}
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>

    </>
  );
}
