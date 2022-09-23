/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
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
    <Card className="various-details">
      <Card.Header as="h5">Message From: {messageObj.ProfileFromUserName}</Card.Header>
      <Card.Header as="h5"> To: {messageObj.profileToUserName}</Card.Header>
      <Card.Body>
        <Card.Title>
          <Link href={`Messages/${messageObj.firebaseKey}`} passhref>
            <a style={{ fontSize: '1rem', marginRight: '15px', color: 'white' }}>View</a>
          </Link>
          <Card.Link style={{ fontSize: '1rem', color: 'magenta' }} onClick={deleteThisMessage}>
            Delete
          </Card.Link>
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
