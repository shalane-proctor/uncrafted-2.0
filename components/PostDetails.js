/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deletePost } from '../api/itemsData';

export default function PostDetails({ postObj, profilePicture, userName }) {
  const router = useRouter();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.itemName}?`)) {
      deletePost(postObj.firebaseKey).then(() => router.push('/'));
    }
  };
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <div>{postObj.pending ? <Badge bg="dark">PENDING</Badge> : ''}</div>
          <div>{postObj.draft ? <Badge bg="secondary">DRAFT</Badge> : ''}</div>
          <Card.Img variant="top" src={postObj.image} />
          <Card.Title>{postObj.itemName}</Card.Title>
          <Card.Text>Color: {postObj.color}</Card.Text>
          <Card.Text>Amount: {postObj.amount}</Card.Text>
          <Card.Text>Prefered Trade: {postObj.tradePref}</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>
            <img className="thumbnail-image" src={profilePicture} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Posted by</Card.Subtitle>
          <Card.Subtitle className="mb-2">{userName}</Card.Subtitle>
          <Link href={`/Profile/${postObj?.ownerProfileID}`} passHref>
            <Button className="mb-2 text-muted">View Profile</Button>
          </Link>
          <Link href={`/Messages/create/${postObj?.ownerProfileID}`} passHref>
            <Button>Send Message</Button>
          </Link>
          <Card.Text>{postObj.description}</Card.Text>
          <Card.Link href={`Items/edit/${postObj.firebaseKey}`}>Edit</Card.Link>
          <Card.Link onClick={deleteThisPost}>Delete</Card.Link>
        </Card.Body>
      </Card>
      <Link href="Trades/new" passHref>
        <Button>Request Trade</Button>
      </Link>
    </>
  );
}

PostDetails.propTypes = {
  postObj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    draft: PropTypes.bool,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    pending: PropTypes.bool,
    tradePref: PropTypes.string,
    ownerProfileID: PropTypes.string,
  }),
  userName: PropTypes.string,
  profilePicture: PropTypes.string,
};

PostDetails.defaultProps = {
  postObj: {
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
    tradePref: 'Open to all offers',
    amount: 'N/A',
    color: 'N/A',
    description: 'N/A',
    draft: false,
    firebaseKey: '',
    itemName: 'N/A',
    pending: false,
    userName: '',
    photoURL: '',
  },
  userName: '',
  profilePicture: '',
};
