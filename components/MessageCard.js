/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function MessageCard({ messageObj }) {
  return (
    <Card>
      <Card.Header as="h5">Message {messageObj.profileFromUserName ? `From: ${messageObj.profileFromUserName}` : `To: ${messageObj.profileToUserName}`}</Card.Header>
      <Card.Body>
        <Card.Title>
          <Card.Link href={`Messages/${messageObj.firebaseKey}`}>View</Card.Link>
          <Card.Link href="#">Delete</Card.Link>
        </Card.Title>
        <Card.Text>{messageObj.messageBody}</Card.Text>
      </Card.Body>
    </Card>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape({
    messageBody: PropTypes.string,
    profileToFirebaseKey: PropTypes.string,
    profileToUserName: PropTypes.string,
    profileFromFirebaseKey: PropTypes.string,
    profileFromUserName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
