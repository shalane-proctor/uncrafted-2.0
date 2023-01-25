/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import {
  createTrade, deleteTrade, getTrades, updateTrade,
} from '../../api/new/tradeData';
import { getPosts } from '../../api/new/postData';

export default function TradeForm({
  item,
}) {
  const [formInput, setFormInput] = useState();
  const [posts, setPosts] = useState();
  const [selected, setSelected] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisTrade = () => {
    if (window.confirm('Are you sure you want to decline trade?')) {
      deleteTrade(item.id).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    getPosts(user.uid).then(setPosts);
    if (item.id) setFormInput(item.id);
  }, [item.id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected(posts.find((post) => post.id === e.target.value));
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.id) {
      getTrades(item.id).then();
      updateTrade(item.id).then(() => {
        router.push('/profile');
      });
    } else {
      const payload = { ...formInput };
      createTrade(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className={item.id ? 'trade-form-pending' : 'trade-form-current'}>
        <div className="text-center my-4">
          <div className="d-flex">
            <>
              <Card className="trade-card-profile">
                <Card.Img src="/./pinkSticky.png" alt="sticky note" height="215px" width="200px" />
                <Card.ImgOverlay>
                  <Card.Body>
                    <Card.Title>
                      <img className="thumbnail-image" src={item.itemWanted.ownerProfileId.profileImageUrl} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                    </Card.Title>
                    <Card.Subtitle className="mb-2">{item.itemWanted.ownerProfileId.username}</Card.Subtitle>
                    <Link href={`/Profile/${item.itemWanted.ownerProfileId.uid}`} passHref>
                      <Button variant="outline-info">View Profile</Button>
                    </Link>
                    {item.itemWanted.ownerProfileId.uid !== user.uid ? (
                      <Link href={`/Messages/create/${item.itemWanted.ownerProfileId.uid}`} passHref>
                        <Button variant="outline-info">Send Message</Button>
                      </Link>
                    ) : (
                      ''
                    )}
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
              <Card className="trade-form-post-card">
                <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
                <Card.ImgOverlay>
                  <Card.Img src={item.itemWanted.ownerProfileId.uid} className="trade-form-post-card-image" />
                  <Card.Body>
                    <Card.Title>{item.itemWanted.itemName}</Card.Title>
                    <Card.Text>Color: {item.itemWanted.color}</Card.Text>
                    <Card.Text>Amount: {item.itemWanted.amount}</Card.Text>
                    <Link href={`/Items/${item.itemWanted.id}`} passHref>
                      <Button variant="outline-info">View</Button>
                    </Link>
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </>
          </div>
          <Button className="trade-buttons" variant="info" type="submit" size="lg">
            {item.id ? 'Accept' : 'Offer'} Trade
          </Button>
        </div>
      </div>
      <div>
        {item.id ? (
          ''
        ) : (
          <Form.Select
            style={{
              width: '50%',
              marginTop: '45px',
              float: 'right',
              color: 'slategrey',
              background: '#c4ffd9',
            }}
            size="lg"
            onChange={handleChange}
            value={item.itemOffered.id}
            name="id"
            required
          >
            <option value="">Choose your offer</option>
            {posts?.map((post) => {
              if (post.draft === true) {
                return '';
              }
              return (
                <option key={post.draft === true ? '' : post.id} value={post.draft === true ? '' : post.id} defaultValue={post.draft === true ? '' : post.id === item.itemOffered.id}>
                  {post.draft === true ? '' : post.itemName}
                </option>
              );
            })}
            ;
          </Form.Select>
        )}
        <div className="trade-form-pending">
          <div className="text-center my-4">
            <div className="d-flex">
              <Card className="trade-card-profile">
                <Card.Img src="/./pinkSticky.png" alt="sticky note" height="215px" width="200px" />
                <Card.ImgOverlay>
                  <Card.Body>
                    <Card.Title>
                      <img className="thumbnail-image" src={item.itemOffered.ownerProfileId.profileImageUrl} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                    </Card.Title>
                    <Card.Subtitle className="mb-2">{item.itemOffered.ownerProfileId.username}</Card.Subtitle>
                    <Link href={`/Profile/${item.itemOffered.ownerProfileId.id}`} passHref>
                      <Button variant="outline-info">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
              {item.id ? (
                <>
                  <Card className="trade-form-post-card">
                    <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
                    <Card.ImgOverlay>
                      <Card.Img src={item.itemOffered.imageUrl} className="trade-form-post-card-image" />
                      <Card.Body>
                        <Card.Title>{item.itemOffered.itemName}</Card.Title>
                        <Card.Text>Color: {item.itemOffered?.color}</Card.Text>
                        <Card.Text>Amount: {item.itemOffered.amount}</Card.Text>
                        <Link href={`/Items/${item.itemOffered.id}`} passHref>
                          <Button variant="outline-info">View</Button>
                        </Link>
                      </Card.Body>
                    </Card.ImgOverlay>
                  </Card>
                </>
              ) : (
                <>
                  <Card onChange={handleChange} className="trade-card-select">
                    <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
                    <Card.ImgOverlay>
                      <Card.Img src={selected?.imageUrl} className="trade-form-post-card-image" />
                      <Card.Body>
                        <Card.Title>{selected?.itemName}</Card.Title>
                        <Card.Text>Color: {selected?.color}</Card.Text>
                        <Card.Text>Amount: {selected?.amount}</Card.Text>
                        <Link href={`/Items/${selected?.id}`} passHref>
                          <Button variant="outline-info">View</Button>
                        </Link>
                      </Card.Body>
                    </Card.ImgOverlay>
                  </Card>
                </>
              )}
            </div>
            {item.id ? (
              <Button onClick={deleteThisTrade} className="cancel-decline" variant="danger" size="lg">
                Decline Trade
              </Button>
            ) : (
              <Link href="/" passHref>
                <Button variant="danger" className="cancel-decline" size="lg">
                  Cancel Trade
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}
TradeForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    itemWanted: PropTypes.shape({
      id: PropTypes.number,
      itemName: PropTypes.string,
      color: PropTypes.string,
      amount: PropTypes.string,
      imageUrl: PropTypes.string,
      tradePreferences: PropTypes.string,
      description: PropTypes.string,
      isDraft: PropTypes.bool,
      isPending: PropTypes.bool,
      ownerProfileId: {
        id: PropTypes.number,
        uid: PropTypes.number,
        username: PropTypes.string,
        profileImageUrl: PropTypes.string,
      },
    }),
    itemOffered: PropTypes.shape({
      id: PropTypes.number,
      itemName: PropTypes.string,
      color: PropTypes.string,
      amount: PropTypes.string,
      imageUrl: PropTypes.string,
      tradePreferences: PropTypes.string,
      description: PropTypes.string,
      isDraft: PropTypes.bool,
      isPending: PropTypes.bool,
      ownerProfileId: {
        id: PropTypes.number,
        uid: PropTypes.number,
        username: PropTypes.string,
        profileImageUrl: PropTypes.string,
      },
    }),
    isPending: PropTypes.bool,
  }),
};

TradeForm.defaultProps = {
  item: {
    id: 0,
    itemWanted: {},
    itemOffered: {},
    isPending: PropTypes.bool,
  },
};
