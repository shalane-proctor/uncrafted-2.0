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
import { getPostsByUser, getSinglePost } from '../../api/new/postData';

export default function TradeForm({
  id, item,
}) {
  const [formInput, setFormInput] = useState();
  const [postOffered, setPostOffered] = useState();
  const [postWanted, setPostWanted] = useState();
  const [selected, setSelected] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisTrade = () => {
    if (window.confirm('Are you sure you want to decline trade?')) {
      deleteTrade(item.id).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    if (item.id) {
      getPostsByUser(item?.itemOffered?.owner_profile_id?.id).then(setPostOffered);
      getSinglePost(item?.itemWanted?.owner_profile_id?.id).then(setPostWanted);
      setFormInput(item);
    } else {
      getPostsByUser(user.id).then(setPostOffered);
      getSinglePost(id).then(setPostWanted);
    }
  }, [item.id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected(postOffered.find((post) => post.id === +e.target.value));
    // setSelected({ selected: +e.target.value });
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
      const payload = {
        ...formInput,
        tradeByUser: user.id,
        itemOffered: selected?.id,
        itemWanted: postWanted?.id,
        isPending: true,
      };
      createTrade(payload).then(() => {
        router.push('/');
      });
      console.log(payload);
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
                      <img className="thumbnail-image" src={postWanted?.ownerProfile?.profile_image_url} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                    </Card.Title>
                    <Card.Subtitle className="mb-2">{postWanted?.ownerProfile?.username}</Card.Subtitle>
                    <Link href={`/Profile/${postWanted?.ownerProfile?.id}`} passHref>
                      <Button variant="outline-info">View Profile</Button>
                    </Link>
                    {postWanted?.ownerProfile?.id !== user.id ? (
                      <Link href={`/Messages/create/${postWanted?.ownerProfile?.uid}`} passHref>
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
                  <Card.Img src={postWanted?.imageUrl} className="trade-form-post-card-image" />
                  <Card.Body>
                    <Card.Title>{postWanted?.itemName}</Card.Title>
                    <Card.Text>Color: {postWanted?.color}</Card.Text>
                    <Card.Text>Amount: {postWanted?.amount}</Card.Text>
                    <Link href={`/Items/${postWanted?.id}`} passHref>
                      <Button variant="outline-info">View</Button>
                    </Link>
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </>
          </div>
          <Button className="trade-buttons" variant="info" type="submit" size="lg">
            {item?.id ? 'Accept' : 'Offer'} Trade
          </Button>
        </div>
      </div>
      <div>
        {item?.id ? (
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
            value={postOffered}
            name="itemOffered"
          >
            <option value="">Choose your offer</option>
            {postOffered?.map((post) => (
              <option key={post?.id} value={post?.id} defaultValue={post?.id === item?.itemOffered?.id}>
                {post?.item_name}
              </option>
            ))}
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
                      <img className="thumbnail-image" src={user.profile_image_url} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                    </Card.Title>
                    <Card.Subtitle className="mb-2">{user.username}</Card.Subtitle>
                    <Link href={`/Profile/${user.id}`} passHref>
                      <Button variant="outline-info">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
              {item?.id ? (
                <>
                  <Card className="trade-form-post-card">
                    <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
                    <Card.ImgOverlay>
                      <Card.Img src={item?.itemOffered?.image_url} className="trade-form-post-card-image" />
                      <Card.Body>
                        <Card.Title>{item?.itemOffered?.item_name}</Card.Title>
                        <Card.Text>Color: {item?.itemOffered?.color}</Card.Text>
                        <Card.Text>Amount: {item?.itemOffered?.amount}</Card.Text>
                        <Link href={`/Items/${item?.itemOffered?.id}`} passHref>
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
                      <Card.Img src={selected?.image_url} className="trade-form-post-card-image" />
                      <Card.Body>
                        <Card.Title>{selected?.item_name}</Card.Title>
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
  id: PropTypes.number.isRequired,
  item: PropTypes.checkPropTypes({
    id: PropTypes.number,
    itemWanted: PropTypes.shape({
      id: PropTypes.number,
      item_name: PropTypes.string,
      color: PropTypes.string,
      amount: PropTypes.string,
      image_url: PropTypes.string,
      trade_preferences: PropTypes.string,
      description: PropTypes.string,
      is_draft: PropTypes.bool,
      is_pending: PropTypes.bool,
      owner_profile_id: {
        id: PropTypes.number,
        uid: PropTypes.number,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      },
    }),
    itemOffered: PropTypes.shape({
      id: PropTypes.number,
      item_name: PropTypes.string,
      color: PropTypes.string,
      amount: PropTypes.string,
      image_url: PropTypes.string,
      trade_preferences: PropTypes.string,
      description: PropTypes.string,
      is_draft: PropTypes.bool,
      is_pending: PropTypes.bool,
      owner_profile_id: {
        id: PropTypes.number,
        uid: PropTypes.number,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
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
