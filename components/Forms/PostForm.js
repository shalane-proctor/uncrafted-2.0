import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/new/postData';

const initialState = {
  id: '',
  itemName: '',
  color: '',
  amount: '',
  imageUrl: '',
  tradePreferences: 'Up to offers',
  description: '',
  isDraft: false,
  isPending: false,
};
export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
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
    if (obj.id) {
      const payload = {
        ...formInput,
        isDraft: isChecked,
        isPending: false,
      };
      updatePost(payload).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        postedByUser: user.uid,
        ownerProfile: user.id,
        isDraft: isChecked,
        isPending: false,
      };
      createPost(payload).then(() => {
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
          <Form.Control className="all-my-form-input" as="textarea" placeholder="preferences" name="tradePreferences" value={formInput?.tradePreferences} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Tell us about it">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Desription" style={{ height: '100px' }} name="description" value={formInput?.description} onChange={handleChange} required />
        </FloatingLabel>
        <div>
          <input type="checkbox" name="isDraft" value="isDraft" onChange={(event) => setIsChecked(event.currentTarget.checked)} checked={isChecked} />
          <button type="button" onClick={() => setIsChecked(!isChecked)}>Draft</button>
        </div>
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
    postedByUser: PropTypes.shape({}),
    ownerProfile: PropTypes.shape({}),
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
