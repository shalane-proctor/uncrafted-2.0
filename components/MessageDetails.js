/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function MessageDetails({ messageObj }) {
  return (
    <>
      <Card>
        <Card.Title>
          <img className="thumbnail-image" src={messageObj.fromProfile.profilePicture} style={{ width: '10%', borderRadius: '50%' }} alt="Profile Pic" /> Message From: {messageObj?.ProfileFromUserName}
        </Card.Title>
        <Card.Title>
          <img className="thumbnail-image" src={messageObj?.toProfile.profilePicture} style={{ width: '10%', borderRadius: '50%' }} alt="Profile Pic" />
          Message to: {messageObj?.profileToUserName}
        </Card.Title>
      </Card>
      <Card style={{ height: '600px' }}>
        <Card.Body>
          <Card.Title>Message:</Card.Title>
          <Card.Title>{messageObj.messageBody}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

MessageDetails.propTypes = {
  messageObj: PropTypes.shape({
    messageBody: PropTypes.string,
    profileToFirebaseKey: PropTypes.string,
    profileFromFirebaseKey: PropTypes.string,
    ProfileFromUserName: PropTypes.string,
    profileToUserName: PropTypes.string,
    firebaseKey: PropTypes.string,
    fromProfile: PropTypes.shape({
      profilePicture: PropTypes.string,
    }),
    toProfile: PropTypes.shape({
      profilePicture: PropTypes.string,
    }),
  }),
};

MessageDetails.defaultProps = {
  messageObj: {
    messageBody: '',
    profileToFirebaseKey: '',
    profileFromFirebaseKey: '',
    userNameFrom: '',
    userNameTo: '',
    firebaseKey: '',
    fromProfile: {
      profilePicture: '',
    },
    toProfile: {
      profilePicture: '',
    },
  },
};
