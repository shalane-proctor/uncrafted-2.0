/* eslint-disable @next/next/no-img-element */
import { Button, Figure } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import Link from 'next/link';

export default function ProfileSection({ profileObj }) {
  return (
    <>
      <Figure>
        <img width={171} height={180} alt="171x180" src={profileObj.profilePicture} style={{ borderRadius: '50%' }} />
        <Figure.Caption>{profileObj.userName}</Figure.Caption>
        {profileObj.etsy === undefined ? ''
          : (
            <Link href={profileObj?.etsy} to={profileObj?.instagram} passHref>
              <Button>Etsy</Button>
            </Link>
          )}
        {profileObj.instagram === undefined ? ''
          : (
            <Link href={undefined ? '' : profileObj?.instagram} to={profileObj?.instagram} passHref>
              <Button>Instagram</Button>
            </Link>
          )}
        <p>{profileObj.about}</p>
        <p>{profileObj.favoriteCrafts}</p>
      </Figure>
    </>
  );
}

ProfileSection.propTypes = {
  profileObj: PropTypes.shape({
    userName: PropTypes.string,
    profilePicture: PropTypes.string,
    etsy: PropTypes.string,
    instagram: PropTypes.string,
    favoriteCrafts: PropTypes.string,
    about: PropTypes.string,
  }),
};

ProfileSection.defaultProps = {
  profileObj: ({
    userName: null,
    profilePicture: 'https://media.istockphoto.com/id/1313958250/vector/user-avatar-profile-icon-black-vector-illustration-on-transparent-background-website-or-app.webp?s=612x612&w=is&k=20&c=NU0fH5hkYFHipczYUZvQNPifL7NmkewZX-R-BGrBl4M=',
    etsy: '',
    instagram: '',
    favoriteCrafts: null,
    about: null,
  }),
};
