import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createTrades, updateTrades } from '../../api/tradesData';
import { getMyPosts } from '../../api/itemsData';

export default function TradeForm({
  itemOfferedFirebaseKey, itemWantedFirebaseKey, firebaseKey, offerTo, offeredFrom, offeredPostObj, wantedPostObj,
}) {
  const [formInput, setFormInput] = useState();
  const [posts, setPosts] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getMyPosts(user.uid).then(setPosts);
    if (firebaseKey) setFormInput(firebaseKey);
  }, [firebaseKey, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firebaseKey) {
      updateTrades(formInput).then(() => router.push(`/Trades/${firebaseKey}`));
    } else {
      const payload = {
        ...formInput,
        itemOfferedFirebaseKey,
        itemWantedFirebaseKey,
        offerTo,
        offeredFrom,
        wantedPostObj,
        offeredPostObj,
      };
      createTrades(payload).then(() => {
        router.push(`/Trades/${firebaseKey}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ width: '50%' }}>
        <div className="text-center my-4">
          <div className="d-flex">
            {firebaseKey ? (
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
            ) : (
              <Card className="post-card">
                <Card.Img src={wantedPostObj?.image} className="post-card-image" />
                <Card.Body>
                  <Card.Title>{wantedPostObj?.itemName}</Card.Title>
                  <Card.Text>Color: {wantedPostObj?.color}</Card.Text>
                  <Card.Text>Amount: {wantedPostObj?.amount}</Card.Text>
                  <Link href={`/Items/${wantedPostObj?.firebaseKey}`} passHref>
                    <Button variant="primary">View</Button>
                  </Link>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
        <Button style={{ marginBottom: '20px' }} variant="primary" type="submit">
          {firebaseKey ? 'Accept' : 'Offer'} Trade
        </Button>
      </div>
      <div style={{ width: '50%' }}>
        {firebaseKey ? (
          ''
        ) : (
          <Form.Select onChange={handleChange} aria-label="Default select example">
            <option>Choose your offer</option>
            <option value="1">Cash</option>
            <option value="2">Message for other options</option>
            {posts?.map((post) => (
              <option key={post.firebaseKey} defaultValue={post.firebaseKey} value={itemOfferedFirebaseKey?.firebaseKey === post.firebaseKey}>
                {post.itemName}
              </option>
            ))}
            ;
          </Form.Select>
        )}{' '}
        <div className="text-center my-4">
          <div className="d-flex">
            {firebaseKey ? (
              <Card className="post-card" onChange={handleChange}>
                <Card.Img src={wantedPostObj?.image} className="post-card-image" />
                <Card.Body>
                  <Card.Title>{wantedPostObj?.itemName}</Card.Title>
                  <Card.Text>Color: {wantedPostObj?.color}</Card.Text>
                  <Card.Text>Amount: {wantedPostObj?.amount}</Card.Text>
                  <Link href={`/Items/${wantedPostObj?.firebaseKey}`} passHref>
                    <Button variant="primary">View</Button>
                  </Link>
                </Card.Body>
              </Card>
            ) : (
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
            )}{' '}
          </div>
        </div>
        <Link href="/" passHref>
          <Button variant="primary">{firebaseKey ? 'Decline' : 'Cancel'} Trade</Button>
        </Link>
      </div>
    </Form>
  );
}
TradeForm.propTypes = {
  itemOfferedFirebaseKey: PropTypes.string,
  itemWantedFirebaseKey: PropTypes.string,
  firebaseKey: PropTypes.string,
  offerTo: PropTypes.shape({}).isRequired,
  offeredFrom: PropTypes.shape({}).isRequired,
  offeredPostObj: PropTypes.arrayOf(
    PropTypes.shape,
  ).isRequired,
  wantedPostObj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TradeForm.defaultProps = {
  itemOfferedFirebaseKey: '',
  itemWantedFirebaseKey: '',
  firebaseKey: '',
  wantedPostObj: {
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  },
};
