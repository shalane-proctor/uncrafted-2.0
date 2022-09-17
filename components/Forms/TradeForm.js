/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createTrades, deleteTrade, updateTrades } from '../../api/tradesData';
import { getMyPosts, updateTradedPost } from '../../api/itemsData';

export default function TradeForm({
  itemWantedFirebaseKey, firebaseKey, offerTo, offeredFrom, offeredPostObj, wantedPostObj, tradeObj,
}) {
  const [formInput, setFormInput] = useState();
  const [posts, setPosts] = useState();
  const [selected, setSelected] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisTrade = () => {
    if (window.confirm('Are you sure you want to decline trade?')) {
      deleteTrade(firebaseKey).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    getMyPosts(user.uid).then(setPosts);
    if (firebaseKey) setFormInput(firebaseKey);
  }, [firebaseKey, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected(posts.find((post) => post.firebaseKey === e.target.value));
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firebaseKey) {
      const updateWanted = {
        firebaseKey: wantedPostObj.firebaseKey,
        ownerProfileID: offeredFrom.firebaseKey,
        uid: offeredFrom.uid,
        pending: false,
        userName: offeredFrom.userName,
        traded: true,
      };
      const updateOffered = {
        firebaseKey: offeredPostObj.firebaseKey,
        uid: offerTo.uid,
        ownerProfileID: offerTo.firebaseKey,
        userName: offeredPostObj.userName,
        pending: false,
        traded: true,
      };

      updateTrades(firebaseKey).then(() => {
        updateTradedPost(updateOffered).then(() => {
          updateTradedPost(updateWanted).then(() => {
            router.push('/profile');
          });
        });
      });
    } else {
      const payload = {
        ...formInput,
        itemWantedFirebaseKey,
        offerTo: offerTo.firebaseKey,
        offeredFrom: offeredFrom.firebaseKey,
        toUid: offerTo.uid,
        uid: user.uid,
      };
      const updateTradeWanted = {
        firebaseKey: itemWantedFirebaseKey,
        pending: true,
        traded: false,
      };
      const updateTradeOffered = {
        firebaseKey: selected?.firebaseKey,
        pending: true,
        traded: false,
      };
      createTrades(payload).then(() => {
        updateTradedPost(updateTradeOffered).then(() => {
          updateTradedPost(updateTradeWanted).then(() => {
            router.push('/');
          });
        });
      });
    }
  };

  console.warn(selected?.firebaseKey, tradeObj);

  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ width: '50%', marginTop: '45px', float: 'left' }}>
        <div className="text-center my-4">
          <div className="d-flex">
            <>
              <Card style={{ width: '50%', marginTop: '45px', float: 'left' }}>
                <Card.Body>
                  <Card.Title>
                    <img className="thumbnail-image" src={offerTo.profilePicture} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                  </Card.Title>
                  <Card.Subtitle className="mb-2">{offerTo.userName}</Card.Subtitle>
                  <Link href={`/Profile/${wantedPostObj?.ownerProfileID}`} passHref>
                    <Button className="mb-2">View Profile</Button>
                  </Link>
                  {offerTo.uid !== user.uid ? (
                    <Link href={`/Messages/create/${wantedPostObj.ownerProfileID}`} passHref>
                      <Button>Send Message</Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </Card.Body>
              </Card>
              <Card className="post-card">
                <Card.Img src={wantedPostObj.image} className="post-card-image" />
                <Card.Body>
                  <Card.Title>{wantedPostObj.itemName}</Card.Title>
                  <Card.Text>Color: {wantedPostObj.color}</Card.Text>
                  <Card.Text>Amount: {wantedPostObj.amount}</Card.Text>
                  <Link href={`/Items/${wantedPostObj.firebaseKey}`} passHref>
                    <Button variant="primary">View</Button>
                  </Link>
                </Card.Body>
              </Card>
            </>
          </div>
          <Button style={{ display: 'flex', justifyContent: 'center' }} variant="primary" type="submit">
            {firebaseKey ? 'Accept' : 'Offer'} Trade
          </Button>
        </div>
      </div>
      <div style={{ width: '50%', marginTop: '45px', float: 'right' }}>
        {firebaseKey ? (
          ''
        ) : (
          <Form.Select onChange={handleChange} value={offeredPostObj.firebaseKey} name="itemOfferedFirebaseKey" required>
            <option value="">Choose your offer</option>
            {posts?.map((post) => {
              if (post.draft === true) {
                return '';
              }
              return (
                <option key={post.draft === true ? '' : post.firebaseKey} value={post.draft === true ? '' : post.firebaseKey} defaultValue={post.draft === true ? '' : post.firebaseKey === offeredPostObj.firebaseKey}>
                  {post.draft === true ? '' : post.itemName}
                </option>
              );
            })}
            ;
          </Form.Select>
        )}
        <div style={{ width: '50%', marginTop: '45px', float: 'left' }}>
          <div className="text-center my-4">
            <div className="d-flex">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <img className="thumbnail-image" src={offeredFrom.profilePicture} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                  </Card.Title>
                  <Card.Subtitle className="mb-2">{offeredFrom.userName}</Card.Subtitle>
                  <Link href={`/Profile/${offeredPostObj?.ownerProfileID}`} passHref>
                    <Button className="mb-2">View Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
              {firebaseKey ? (
                <>
                  <Card className="post-card">
                    <Card.Img src={offeredPostObj?.image} className="post-card-image" />
                    <Card.Body>
                      <Card.Title>{offeredPostObj?.itemName}</Card.Title>
                      <Card.Text>Color: {offeredPostObj?.color}</Card.Text>
                      <Card.Text>Amount: {offeredPostObj?.amount}</Card.Text>
                      <Link href={`/Items/${offeredPostObj?.firebaseKey}`} passHref>
                        <Button variant="primary">View</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <>
                  <Card onChange={handleChange} className="post-card">
                    <Card.Img src={selected?.image} className="post-card-image" />
                    <Card.Body>
                      <Card.Title>{selected?.itemName}</Card.Title>
                      <Card.Text>Color: {selected?.color}</Card.Text>
                      <Card.Text>Amount: {selected?.amount}</Card.Text>
                      <Link href={`/Items/${selected?.firebaseKey}`} passHref>
                        <Button variant="primary">View</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </>
              )}
            </div>
          </div>
          {firebaseKey ? (
            <Button onClick={deleteThisTrade} variant="primary">
              Decline Trade
            </Button>
          ) : (
            <Link href="/" passHref>
              <Button variant="primary">Cancel Trade</Button>
            </Link>
          )}
        </div>
      </div>
    </Form>
  );
}
TradeForm.propTypes = {
  itemWantedFirebaseKey: PropTypes.string,
  firebaseKey: PropTypes.string,
  offerTo: PropTypes.oneOfType([
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      profilePicture: PropTypes.string,
      uid: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  offeredFrom: PropTypes.oneOfType([
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      userName: PropTypes.string,
      profilePicture: PropTypes.string,
      uid: PropTypes.string,
    }),
  ]),
  offeredPostObj: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        ownerProfileID: PropTypes.string,
      }),
    ),
    PropTypes.shape({}),
  ]),
  wantedPostObj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
    ownerProfileID: PropTypes.string,
    uid: PropTypes.string,
  }),
  tradeObj: PropTypes.shape({
    pending: PropTypes.bool,
    completed: PropTypes.bool,
  }),
};

TradeForm.defaultProps = {
  itemWantedFirebaseKey: '',
  firebaseKey: '',
  wantedPostObj: {
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  },
  offerTo: ({
    firebaseKey: '',
  }),
  offeredFrom: {
    firebaseKey: '',
  },
  offeredPostObj: [{
    pending: true,
  }],
  tradeObj: ({
    pending: false,
    completed: false,
  }),
};
