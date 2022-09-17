/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { deleteMessage } from '../api/messagesData';

export default function MessageCard({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm(`Delete this message between ${messageObj.ProfileFromUserName} and ${messageObj.profileToUserName}?`)) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Card.Header as="h5">Message From: {messageObj.ProfileFromUserName}</Card.Header>
      <Card.Header as="h5"> To: {messageObj.profileToUserName}</Card.Header>
      <Card.Body>
        <Card.Title>
          <Card.Link href={`Messages/${messageObj.firebaseKey}`}>View</Card.Link>
          <Card.Link onClick={deleteThisMessage}>Delete</Card.Link>
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
    ProfileFromUserName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
