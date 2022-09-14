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
  itemWantedFirebaseKey, firebaseKey, offerTo, offeredFrom, offeredPostObj, wantedPostObj,
}) {
  const [formInput, setFormInput] = useState();
  const [posts, setPosts] = useState();
  const [selected, setSelected] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getMyPosts(user.uid).then(setPosts);
    if (firebaseKey) setFormInput(firebaseKey);
  }, [firebaseKey, user]);

  console.warn(posts);

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
      updateTrades(formInput).then(() => router.push(`/Trades/${firebaseKey}`));
    } else {
      const payload = {
        ...formInput,
        itemWantedFirebaseKey,
        offerTo: offerTo.firebaseKey,
        offeredFrom: offeredFrom.firebaseKey,
      };
      createTrades(payload).then(() => {
        router.push('/');
      });
    }
  };

  console.warn(formInput);

  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ width: '50%' }}>
        <div className="text-center my-4">
          <div className="d-flex">
            {firebaseKey ? (
              <Card className="post-card">
                <Card.Img src={offeredPostObj.image} className="post-card-image" />
                <Card.Body>
                  <Card.Title>{offeredPostObj.itemName}</Card.Title>
                  <Card.Text>Color: {offeredPostObj.color}</Card.Text>
                  <Card.Text>Amount: {offeredPostObj.amount}</Card.Text>
                  <Link href={`/Items/${offeredPostObj.firebaseKey}`} passHref>
                    <Button variant="primary">View</Button>
                  </Link>
                </Card.Body>
              </Card>
            ) : (
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
          <Form.Select onChange={handleChange} value={offeredPostObj.firebaseKey} name="itemOfferedFirebaseKey" required>
            <option value="">Choose your offer</option>
            <option key="cash" value="Cash">Cash</option>
            {posts?.map((post) => (
              <option key={post.firebaseKey} value={post.firebaseKey} defaultValue={post.firebaseKey === offeredPostObj.firebaseKey}>
                {post.itemName}
              </option>
            ))}
          </Form.Select>
        )}
        <div className="text-center my-4">
          <div className="d-flex">
            {firebaseKey ? (
              <Card className="post-card" onChange={handleChange}>
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
            ) : (
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
  itemWantedFirebaseKey: PropTypes.string,
  firebaseKey: PropTypes.string,
  offerTo: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
  offeredFrom: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
  offeredPostObj: PropTypes.arrayOf(PropTypes.shape),
  wantedPostObj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
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
  offeredPostObj: [{}],
};
