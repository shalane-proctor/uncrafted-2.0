import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPosts, updatePosts } from '../../api/itemsData';
import { useAuth } from '../../utils/context/authContext';
import { getMyProfile } from '../../api/profileData';

const initialState = {
  amount: '',
  color: '',
  description: '',
  image: '',
  itemName: '',
  pending: false,
  draft: false,
  tradePref: '',
};
export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [profile, setProfile] = useState();
  const [checked, setChecked] = useState(obj?.draft);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMyProfile(user.uid).then(setProfile);
    setChecked(obj?.draft);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChecked(e.target.checked);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePosts(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        profilePicture: profile[0].profilePicture,
        userName: profile[0].userName,
        ownerProfileID: profile[0].firebaseKey,
      };
      createPosts(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} style={{ color: 'slategrey' }}>
        <h1 style={{ color: 'aqua' }}>{obj.firebaseKey ? 'Update' : 'Post'} a Trade</h1>
        <FloatingLabel controlId="floatingTextarea" label="What do you want to trade?" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Paint" name="itemName" value={formInput?.itemName} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Color" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Color" name="color" value={formInput?.color} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Amount" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Amount" name="amount" value={formInput?.amount} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Image URL" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Image" name="image" value={formInput?.image} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Trade preferences" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="preferences" name="tradePref" value={formInput?.tradePref} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Tell us about it">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Desription" style={{ height: '100px' }} name="description" value={formInput?.description} onChange={handleChange} required />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check style={{ color: 'black' }} type="checkbox" label="Draft" name="draft" defaultChecked={checked} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-buttons mb-3">
          {obj.firebaseKey ? 'Update' : 'Post'} Item
        </Button>
      </Form>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    draft: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    ownerProfileID: PropTypes.string,
    tradePref: PropTypes.string,
    pending: PropTypes.bool,
    uid: PropTypes.string,
    userName: PropTypes.string,
    displayName: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: {
    initialState,
  },
};
