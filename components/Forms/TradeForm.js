/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import {
  createTrade, deleteTrade, getSingleTrade, updateTrade,
} from '../../api/new/tradeData';
import { getPostsByUser, getSinglePost, updateTradePost } from '../../api/new/postData';

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
    if (window.confirm(item?.tradeByUser?.id === item?.itemOffered?.owner_profile?.id ? 'Are you sure you want to cancel trade?' : 'Are you sure you want to decline trade?')) {
      deleteTrade(item?.id).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    if (item?.id) {
      getSinglePost(item?.itemOffered?.id).then(setPostOffered);
      getSinglePost(item?.itemWanted?.id).then(setPostWanted);
    } else {
      getPostsByUser(user.id).then(setPostOffered);
      getSinglePost(id).then(setPostWanted);
    }
  }, [item, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected(postOffered.find((post) => post.id === +e.target.value));
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item?.id) {
      getSingleTrade(item?.id).then();
      const tradePayload = {
        id: item?.id,
        tradeByUser: item?.tradeByUser?.uid,
        itemWanted: item?.itemWanted?.id,
        itemOffered: item?.itemOffered?.id,
        isPending: false,
      };
      const wantedPayload = {
        id: item?.itemWanted?.id,
        owner_profile: item?.tradeByUser?.id,
        posted_by_user: item?.itemWanted?.posted_by_user?.id,
        item_name: item?.itemWanted?.item_name,
        color: item?.itemWanted?.color,
        amount: item?.itemWanted?.amount,
        image_url: item?.itemWanted?.image_url,
        trade_preferences: item?.itemWanted?.trade_preferences,
        description: item?.itemWanted?.description,
        is_draft: item?.itemWanted?.is_draft,
        is_pending: false,
      };
      const offeredPayload = {
        id: item?.itemOffered?.id,
        owner_profile: item?.itemWanted?.posted_by_user?.id,
        posted_by_user: item?.itemOffered?.posted_by_user?.id,
        item_name: item?.itemOffered?.item_name,
        color: item?.itemOffered?.color,
        amount: item?.itemOffered?.amount,
        image_url: item?.itemOffered?.image_url,
        trade_preferences: item?.itemOffered?.trade_preferences,
        description: item?.itemOffered?.description,
        is_draft: item?.itemOffered?.is_draft,
        is_pending: false,
      };
      updateTradePost(wantedPayload);
      updateTradePost(offeredPayload);
      updateTrade(tradePayload).then(() => {
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
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={item.id ? 'trade-form-pending' : 'trade-form-current'}>
        <div className="text-center my-4">
          <div className="d-flex">
            <>
              {item?.id ? (
                <Card className="trade-card-profile">
                  <Card.Img src="/./pinkSticky.png" alt="sticky note" height="215px" width="200px" />
                  <Card.ImgOverlay>
                    <Card.Body>
                      <Card.Title>
                        <img className="thumbnail-image" src={item?.itemWanted?.owner_profile?.profile_image_url} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                      </Card.Title>
                      <Card.Subtitle className="mb-2">{item?.itemWanted?.owner_profile?.username}</Card.Subtitle>
                      <Link href={`/Profile/${item?.itemWanted?.owner_profile?.id}`} passHref>
                        <Button variant="outline-info">View Profile</Button>
                      </Link>
                      {item?.itemWanted?.owner_profile?.id === user.id ? (
                        ''
                      ) : (
                        <Link href={`/TradeMessages/create/${item?.id}`} passHref>
                          <Button variant="outline-info">Send Message</Button>
                        </Link>
                      )}
                    </Card.Body>
                  </Card.ImgOverlay>
                </Card>
              ) : (
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
                      <Link href={`/Messages/create/${postWanted?.ownerProfile?.uid}`} passHref>
                        <Button variant="outline-info">Send Message</Button>
                      </Link>
                    </Card.Body>
                  </Card.ImgOverlay>
                </Card>
              )}
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
          {item.isPending === false ? (
            ''
          ) : (
            <div>
              {user?.id === item?.itemOffered?.owner_profile?.id && item.id ? (
                ''
              ) : (
                <Button className="trade-buttons" variant="info" type="submit" size="lg">
                  {item?.id ? 'Accept' : 'Offer'} Trade
                </Button>
              )}
            </div>
          )}
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
              {item?.id ? (
                <>
                  <Card className="trade-card-profile">
                    <Card.Img src="/./pinkSticky.png" alt="sticky note" height="215px" width="200px" />
                    <Card.ImgOverlay>
                      <Card.Body>
                        <Card.Title>
                          <img className="thumbnail-image" src={item?.itemOffered?.owner_profile?.profile_image_url} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                        </Card.Title>
                        <Card.Subtitle className="mb-2">{item?.itemOffered?.owner_profile?.username}</Card.Subtitle>
                        <Link href={`/Profile/${item?.itemOffered?.owner_profile?.id}`} passHref>
                          <Button variant="outline-info">View Profile</Button>
                        </Link>
                        {item?.itemOffered?.owner_profile?.id === user.id ? (
                          ''
                        ) : (
                          <Link href={`/TradeMessages/create/${item?.id}`} passHref>
                            <Button variant="outline-info">Send Message</Button>
                          </Link>
                        )}
                      </Card.Body>
                    </Card.ImgOverlay>
                  </Card>
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
            {item.isPending === false ? (
              ''
            ) : (
              <div>
                {item.id && user?.id !== item?.itemOffered?.owner_profile?.id ? (
                  <Button onClick={deleteThisTrade} className="cancel-decline" variant="danger" size="lg">
                    Decline Trade
                  </Button>
                ) : (
                  <Link href="/" passHref>
                    <Button onClick={deleteThisTrade} variant="danger" className="cancel-decline" size="lg">
                      Cancel Trade
                    </Button>
                  </Link>
                )}
              </div>
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
