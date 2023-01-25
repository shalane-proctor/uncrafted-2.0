/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { deleteMessage } from '../api/new/messageData';

export default function MessageCard({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm(`Delete this message between ${messageObj.sender.username} and ${messageObj.receiver.username}?`)) {
      deleteMessage(messageObj.id).then(() => onUpdate());
    }
  };
  return (
    <Card className="various-details">
      <Card.Header as="h5">Message From: {messageObj.sender.username}</Card.Header>
      <Card.Header as="h5"> To: {messageObj.receiver.username}</Card.Header>
      <Card.Body>
        <Card.Title>
          <Link href={`Messages/${messageObj.id}`} passhref>
            <a style={{ fontSize: '1rem', marginRight: '15px', color: 'white' }}>View</a>
          </Link>
          <Card.Link style={{ fontSize: '1rem', color: 'magenta' }} onClick={deleteThisMessage}>
            Delete
          </Card.Link>
        </Card.Title>
        <Card.Text>{messageObj.messageContent}</Card.Text>
      </Card.Body>
    </Card>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape({
    id: PropTypes.number,
    sender: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
    receiver: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
    subject: PropTypes.string,
    messageContent: PropTypes.string,
    isNew: PropTypes.bool,
    connectedToTrade: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
