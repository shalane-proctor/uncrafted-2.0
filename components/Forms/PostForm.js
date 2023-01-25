import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPosts, updatePosts } from '../../api/old/itemsData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/new/userData';

const initialState = {
  uid: '',
  id: '',
  postedByUser: '',
  ownerProfile: '',
  itemName: '',
  color: '',
  amount: '',
  imageUrl: '',
  tradePreferences: '',
  description: '',
  isDraft: false,
  isPending: true,
};
export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [checked, setChecked] = useState(obj?.isDraft);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getSingleUser(user.id).then(setCurrentUser);
    setChecked(obj?.isDraft);
    if (obj.id) setFormInput(obj, obj?.isDraft);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setChecked(e.target.checked);
    setChecked((prev) => !prev);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updatePosts(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        ownerProfile: currentUser.uid,
      };
      createPosts(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} style={{ color: 'slategrey' }}>
        <h1 style={{ color: 'aqua' }}>{obj.id ? 'Update' : 'Post'} a Trade</h1>
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
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Image" name="imageUrl" value={formInput?.imageUrl} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Trade preferences" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="preferences" name="tradePreferences" value={formInput?.tradePreferences} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Tell us about it">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Desription" style={{ height: '100px' }} name="description" value={formInput?.description} onChange={handleChange} required />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check style={{ color: 'black' }} type="checkbox" label="Draft" name="isDraft" defaultChecked={checked} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-buttons mb-3">
          {obj.id ? 'Update' : 'Post'} Item
        </Button>
      </Form>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    postedByUser: PropTypes.string,
    ownerProfile: PropTypes.string,
    itemName: PropTypes.string,
    color: PropTypes.string,
    amount: PropTypes.string,
    imageUrl: PropTypes.string,
    tradePreferences: PropTypes.string,
    description: PropTypes.string,
    isDraft: PropTypes.bool,
    isPending: PropTypes.bool,
  }),
};

PostForm.defaultProps = {
  obj: {
    initialState,
  },
};
