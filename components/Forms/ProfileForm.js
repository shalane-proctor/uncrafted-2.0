import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/new/userData';

const initialState = {
  id: '',
  uid: '',
  username: '',
  favoriteCraft: '',
  email: '',
  about: '',
  profileImageUrl: '',
  instagram: '',
  etsy: '',
};
export default function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updateUser(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
      };
      createUser(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="form-titles">{obj?.id ? 'Update' : 'Create'} your profile</h1>
        <FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Paint" name="username" value={formInput?.obj?.username} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Favorite Crafts" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Crafts" name="favoriteCrafts" value={formInput?.favoriteCrafts} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Etsy" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Etsy" name="etsy" value={formInput?.etsy} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="instagram" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="instagram" name="instagram" value={formInput?.instagram} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Profile Picture" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="profilePicture" name="profileImageUrl" value={formInput?.profileImageUrl} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel className="all-my-form-labels" controlId="floatingTextarea2" label="Tell us about you">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Desription" style={{ height: '100px' }} name="about" value={formInput?.about} onChange={handleChange} required />
        </FloatingLabel>
        <Button variant="info" size="lg" className="my-buttons" type="submit">
          {obj?.id ? 'Update' : 'Create'} Profile
        </Button>
      </Form>
    </>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
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
};

ProfileForm.defaultProps = {
  obj: initialState,
};
