import Link from 'next/link';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deletePost } from '../api/itemsData';

export default function PostDetails({
  amount, color, description, draft, firebaseKey, image, itemName, pending, tradePref, photoURL, displayName, onUpdate,
}) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${itemName}?`)) {
      deletePost(firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <div>{pending ? <Badge bg="dark">PENDING</Badge> : ''}</div>
          <div>{draft ? <Badge bg="secondary">DRAFT</Badge> : ''}</div>
          <Card.Img variant="top" src={image} />
          <Card.Title>{itemName}</Card.Title>
          <Card.Text>Color: {color}</Card.Text>
          <Card.Text>Amount: {amount}</Card.Text>
          <Card.Text>Prefered Trade: {tradePref}</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>
            <img className="thumbnail-image" src={photoURL} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Posted by</Card.Subtitle>
          <Card.Subtitle className="mb-2">{displayName}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Link href={`Items/edit/${firebaseKey}`}>Edit</Card.Link>
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
  amount: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  draft: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  image: PropTypes.string,
  itemName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  // ownerProfileID: PropTypes.string.isRequired,
  pending: PropTypes.string.isRequired,
  tradePref: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

PostDetails.defaultProps = {
  image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  tradePref: 'Open to options',
};
