/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function MessageDetails({ messageObj }) {
  return (
    <>
      <Card className="various-details">
        <Card.Title>
          <img className="thumbnail-image" src={messageObj.sender.profileImageUrl} style={{ width: '10%', borderRadius: '50%' }} alt="Profile Pic" /> Message From: {messageObj.sender.username}
        </Card.Title>
        <Card.Title>
          <img className="thumbnail-image" src={messageObj.receiver.profileImageUrl} style={{ width: '10%', borderRadius: '50%' }} alt="Profile Pic" />
          Message to: {messageObj.receiver.username}
        </Card.Title>
      </Card>
      <Card style={{ height: '30rem', marginBottom: '10rem' }} className="various-details">
        <Card.Body>
          <Card.Title>Message:</Card.Title>
          <Card.Title>{messageObj.messageContent}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

MessageDetails.propTypes = {
  messageObj: PropTypes.shape({
    id: PropTypes.number,
    sender: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      username: PropTypes.string,
      favoriteCraft: PropTypes.string,
      email: PropTypes.string,
      about: PropTypes.string,
      profileImageUrl: PropTypes.string,
      instagram: PropTypes.string,
      etsy: PropTypes.string,
    }),
    receiver: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      username: PropTypes.string,
      favoriteCraft: PropTypes.string,
      email: PropTypes.string,
      about: PropTypes.string,
      profileImageUrl: PropTypes.string,
      instagram: PropTypes.string,
      etsy: PropTypes.string,
    }),
    subject: PropTypes.string,
    messageContent: PropTypes.string,
    isNew: PropTypes.bool,
    connectedToTrade: PropTypes.bool,
  }).isRequired,
};
