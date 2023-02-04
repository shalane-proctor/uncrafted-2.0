/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/new/postData';

export default function PostDetails({ postObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj?.itemName}?`)) {
      deletePost(postObj?.id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Card className="post-details-card">
        <Card.Body>
          <div>{postObj?.isDraft ? <Badge bg="secondary">DRAFT</Badge> : ''}</div>
          <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="500px" />
          <Card.ImgOverlay>
            <Card.Img src={postObj?.imageUrl} alt={postObj?.itemName} className="post-card-image-details" />
          </Card.ImgOverlay>
        </Card.Body>
      </Card>
      <Card className="info-post-card-right">
        <Card.Body>
          <Card.Title>
            <img className="thumbnail-image" src={postObj?.ownerProfile?.profile_image_url} alt="Profile Pic" style={{ width: '20%', borderRadius: '50%' }} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Posted by</Card.Subtitle>
          <Card.Subtitle className="mb-2">{postObj?.ownerProfile?.username}</Card.Subtitle>
          <Link href={`/Profile/${postObj?.ownerProfile?.id}`} passHref>
            <Button className="my-post-info-buttons">View Profile</Button>
          </Link>
          <div>
            {postObj?.ownerProfile?.id !== user.id ? (
              <>
                <Link href={`/Messages/create/${postObj?.ownerProfile?.id}`} passHref>
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
          <Card.Title style={{ margin: '2px', fontWeight: '700' }}>{postObj?.itemName}</Card.Title>
          <Card.Text className="more-ledgible">Color: {postObj?.color}</Card.Text>
          <Card.Text className="more-ledgible">Amount: {postObj?.amount}</Card.Text>
          <Card.Text className="more-ledgible">Prefered Trade: {postObj?.tradePreferences}</Card.Text>
          <h5 style={{ color: 'slategrey' }}>Description:</h5>
          <Card.Text className="more-ledgible">{postObj?.description}</Card.Text>
          <div style={{ display: 'inline', float: 'left' }}>
            {postObj?.ownerProfile?.id !== user.id ? (
              <>
                <Link href={`/Trades/create/${postObj?.id}`} passHref>
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
            {postObj?.ownerProfile?.id === user.id ? (
              <>
                <Card.Link style={{ color: 'white', fontWeight: '400', fontSize: '30px' }} href={`/Items/edit/${postObj?.id}`}>
                  Edit
                </Card.Link>
                <Card.Link style={{ color: 'magenta', fontWeight: '400', fontSize: '30px' }} onClick={deleteThisPost}>
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
    id: PropTypes.number,
    postedByUser: PropTypes.shape({}),
    ownerProfile: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      profile_image_url: PropTypes.string,
    }),
    itemName: PropTypes.string,
    color: PropTypes.string,
    amount: PropTypes.string,
    imageUrl: PropTypes.string,
    tradePreferences: PropTypes.string,
    description: PropTypes.string,
    isDraft: PropTypes.bool,
    isPending: PropTypes.bool,
  }),
};

PostDetails.defaultProps = {
  postObj: {
    id: 0,
    postedByUser: {},
    ownerProfile: {},
    itemName: 'N/A',
    color: 'N/A',
    amount: 'N/A',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
    tradePreferences: 'Open to all offers',
    description: 'N/A',
    isDraft: false,
    isPending: false,
  },
};
