/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function MessageDetails({ messageObj }) {
  return (
    <Card>
      <Card.Header as="h5">Message {messageObj.userNameFrom ? `From: ${messageObj.userNameFrom}` : `To: ${messageObj.userNameTo}`}</Card.Header>
      <Card.Body>
        <img className="thumbnail-image" src={messageObj.userNameFrom ? messageObj.profilePhotofromURL : messageObj.profilePhotoToURL} style={{ width: '30%', borderRadius: '50%' }} alt="Profile Pic" />
        <Card.Title>{messageObj.messageBody}</Card.Title>
        <Card.Title>
          <Card.Link href={`Messages/${messageObj.firebaseKey}`}>View</Card.Link>
          <Card.Link href="#">Delete</Card.Link>
        </Card.Title>
        <Button variant="primary">Reply</Button>
      </Card.Body>
    </Card>
  );
}

MessageDetails.propTypes = {
  messageObj: PropTypes.shape({
    messageBody: PropTypes.string.isRequired,
    profileFromFirebaseKey: PropTypes.string.isRequired,
    profilePhotofromURL: PropTypes.string.isRequired,
    profilePhotoToURL: PropTypes.string.isRequired,
    userNameFrom: PropTypes.string.isRequired,
    userNameTo: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
