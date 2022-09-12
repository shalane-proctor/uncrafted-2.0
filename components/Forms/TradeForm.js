import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createTrades, updateTrades } from '../../api/tradesData';
import PostCard from '../PostCard';
import { getMyPosts } from '../../api/itemsData';

export default function TradeForm({
  itemOfferedFirebaseKey, itemWantedFirebaseKey, firebaseKey, offerTo, offeredFrom,
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
      };
      createTrades(payload).then(() => {
        router.push(`/Trades/${firebaseKey}`);
      });
    }
  };

  console.warn(posts);

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        {firebaseKey ? <PostCard postObj={itemOfferedFirebaseKey} /> : <PostCard postObj={itemWantedFirebaseKey} />}
        <Button variant="primary" type="submit">
          {firebaseKey ? 'Accept' : 'Offer'} Trade
        </Button>
      </div>
      <div>
        {firebaseKey ? ''
          : (
            <Form.Select onChange={handleChange} aria-label="Default select example">
              <option>Choose your offer</option>
              <option value="1">Cash</option>
              <option value="2">Message for other options</option>
              {posts.map((post) => (
                <option key={post.firebaseKey} value={post.firebaseKey} selected={itemOfferedFirebaseKey.firebaseKey === post.firebaseKey}>
                  {post.itemName}
                </option>
              ))}
              ;
            </Form.Select>
          )}
        {firebaseKey ? <PostCard postObj={itemWantedFirebaseKey} /> : <PostCard postObj={itemOfferedFirebaseKey} />}
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
  offerTo: PropTypes.shape({}),
  offeredFrom: PropTypes.shape({}),
};

TradeForm.defaultProps = {
  itemOfferedFirebaseKey: '',
  itemWantedFirebaseKey: '',
  firebaseKey: '',
  offerTo: '',
  offeredFrom: '',
};
