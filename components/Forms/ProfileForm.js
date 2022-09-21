import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProfile, updateProfile } from '../../api/profileData';

const initialState = {
  about: '',
  etsy: '',
  favoriteCrafts: '',
  firebaseKey: '',
  instagram: '',
  profilePicture: '',
  uid: '',
  userName: '',
};
export default function ProfileForm({ profileObj }) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (profileObj.firebaseKey) setFormInput(profileObj);
  }, [profileObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileObj.firebaseKey) {
      updateProfile(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
      };
      createProfile(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ color: 'slategrey' }}>
        <h1 style={{ color: 'aqua' }}>{profileObj.firebaseKey ? 'Update' : 'Create'} your profile</h1>
        <FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Paint" name="userName" value={formInput?.userName} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Favorite Crafts" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Crafts" name="favoriteCrafts" value={formInput?.favoriteCrafts} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Etsy" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Etsy" name="etsy" value={formInput?.etsy} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="instagram" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="instagram" name="instagram" value={formInput?.instagram} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Profile Picture" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="profilePicture" name="profilePicture" value={formInput?.profilePicture} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Tell us about you">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Desription" style={{ height: '100px' }} name="about" value={formInput?.about} onChange={handleChange} required />
        </FloatingLabel>
        <Button variant="info" size="lg" className="my-buttons" type="submit">
          {profileObj.firebaseKey ? 'Update' : 'Create'} Profile
        </Button>
      </Form>
    </>
  );
}

ProfileForm.propTypes = {
  profileObj: PropTypes.shape({
    about: PropTypes.string,
    etsy: PropTypes.string,
    favoriteCrafts: PropTypes.string,
    firebaseKey: PropTypes.string,
    instagram: PropTypes.string,
    profilePicture: PropTypes.string,
    userName: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  profileObj: initialState,
};
