/* eslint-disable @next/next/no-img-element */
import { Button, Figure } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ProfileSection({ email, displayName, photoURL }) {
  return (
    <>
      <Figure>
        <img width={171} height={180} alt="171x180" src={photoURL} style={{ borderRadius: '50%' }} />
        <Figure.Caption>{displayName}</Figure.Caption>
        <Figure.Caption>{email}</Figure.Caption>
      </Figure>
      <h1>My Posts</h1>
      <span>
        <Button>New Post</Button>
      </span>
      <h1>My Trades</h1>
      <h4>Trade offers</h4>
      <h4>Trade Requests</h4>
    </>
  );
}

ProfileSection.propTypes = {
  email: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

ProfileSection.defaultProps = {
  displayName: null,
  photoURL: 'https://media.istockphoto.com/id/1313958250/vector/user-avatar-profile-icon-black-vector-illustration-on-transparent-background-website-or-app.webp?s=612x612&w=is&k=20&c=NU0fH5hkYFHipczYUZvQNPifL7NmkewZX-R-BGrBl4M=',
  email: null,
};
