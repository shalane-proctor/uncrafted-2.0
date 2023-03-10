/* eslint-disable @next/next/no-img-element */
import { Button, Figure } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ProfileSection({ profileObj }) {
  return (
    <>
      <Figure className="various-details">
        <img width={171} height={180} alt="171x180" src={profileObj?.profile_image_url} style={{ borderRadius: '50%' }} />
        <h2>{profileObj?.username}</h2>
        {profileObj?.etsy === undefined ? (
          ''
        ) : (
          <Link href={profileObj?.etsy} to={profileObj?.instagram} passHref>
            <Button className="profile-buttons">Etsy</Button>
          </Link>
        )}
        {profileObj?.instagram === undefined ? (
          ''
        ) : (
          <Link href={undefined ? '' : profileObj?.instagram} to={profileObj?.instagram} passHref>
            <Button className="profile-buttons">Instagram</Button>
          </Link>
        )}
        <h4 className="more-ledgible">{profileObj?.about}</h4>
        <h5>{profileObj?.favorite_craft}</h5>
      </Figure>
    </>
  );
}

ProfileSection.propTypes = {
  profileObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    username: PropTypes.string,
    favorite_craft: PropTypes.string,
    email: PropTypes.string,
    about: PropTypes.string,
    profile_image_url: PropTypes.string,
    instagram: PropTypes.string,
    etsy: PropTypes.string,
  }),
};

ProfileSection.defaultProps = {
  profileObj: {
    username: null,
    profile_image_url: 'https://media.istockphoto.com/id/1313958250/vector/user-avatar-profile-icon-black-vector-illustration-on-transparent-background-website-or-app.webp?s=612x612&w=is&k=20&c=NU0fH5hkYFHipczYUZvQNPifL7NmkewZX-R-BGrBl4M=',
    etsy: '',
    instagram: '',
    favorite_craft: null,
    about: null,
  },
};
