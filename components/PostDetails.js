/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deletePost } from '../api/itemsData';
import { useAuth } from '../utils/context/authContext';

export default function PostDetails({ postObj, profilePicture, userName }) {
  const router = useRouter();
  const { user } = useAuth();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.itemName}?`)) {
      deletePost(postObj.firebaseKey).then(() => router.push('/'));
    }
  };
  return (
    <>
      <Card className="post-details-card">
        <Card.Body>
          <div>{postObj.draft ? <Badge bg="secondary">DRAFT</Badge> : ''}</div>
          <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="500px" />
          <Card.ImgOverlay>
            <Card.Img src={postObj.image} alt={postObj.itemName} className="post-card-image-details" />
          </Card.ImgOverlay>
        </Card.Body>
      </Card>
      <Card className="info-post-card-right">
        <Card.Body>
          <Card.Title>
            <img className="thumbnail-image" src={profilePicture} alt="Profile Pic" style={{ width: '20%', borderRadius: '50%' }} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Posted by</Card.Subtitle>
          <Card.Subtitle className="mb-2">{userName}</Card.Subtitle>
          <Link href={`/Profile/${postObj?.ownerProfileID}`} passHref>
            <Button className="my-post-info-buttons">View Profile</Button>
          </Link>
          <div>
            {postObj.uid !== user.uid ? (
              <>
                <Link href={`/Messages/create/${postObj?.ownerProfileID}`} passHref>
                  <Button className="my-post-info-buttons">Send Message</Button>
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
        </Card.Body>
      </Card>
      <Card className="info-post-card-left">
        <Card.Body>
          <Card.Title style={{ margin: '2px', fontWeight: '700' }}>{postObj.itemName}</Card.Title>
          <Card.Text className="more-ledgible">Color: {postObj.color}</Card.Text>
          <Card.Text className="more-ledgible">Amount: {postObj.amount}</Card.Text>
          <Card.Text className="more-ledgible">Prefered Trade: {postObj.tradePref}</Card.Text>
          <h5 style={{ color: 'slategrey' }}>Description:</h5>
          <Card.Text className="more-ledgible">{postObj.description}</Card.Text>
          <div style={{ display: 'inline', float: 'left' }}>
            {postObj.uid !== user.uid ? (
              <>
                <Link href={`/Trades/create/${postObj?.firebaseKey}`} passHref>
                  <Button className="my-buttons" size="lg">
                    Request Trade
                  </Button>
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
          <div>
            {postObj.uid === user.uid ? (
              <>
                <Card.Link style={{ color: 'white', fontWeight: '400' }} href={`/Items/edit/${postObj.firebaseKey}`}>
                  Edit
                </Card.Link>
                <Card.Link style={{ color: 'magenta', fontWeight: '400' }} onClick={deleteThisPost}>
                  Delete
                </Card.Link>
              </>
            ) : (
              ''
            )}
          </div>
        </Card.Body>
      </Card>

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
    uid: PropTypes.string,
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
