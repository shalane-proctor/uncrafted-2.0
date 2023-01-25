/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

export default function TradedCard({
  tradeObj,
}) {
  const { user } = useAuth();
  return (
    <>
      <div style={{ width: '50%', marginTop: '45px', float: 'left' }}>
        <div className="text-center my-4">
          <div className="d-flex">
            <Card className="post-card">
              <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>
                    <img className="thumbnail-image" src={tradeObj.itemWanted.ownerProfileId.profileImageUrl} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                  </Card.Title>
                  <Card.Subtitle className="mb-2">{tradeObj.itemWanted.ownerProfileId.userName}</Card.Subtitle>
                  <Link href={`/Profile/${tradeObj.itemWanted.ownerProfileId.id}`} passHref>
                    <Button className="mb-2">View Profile</Button>
                  </Link>
                  {tradeObj.itemWanted.ownerProfileId.uid !== user.uid ? (
                    <Link href={`/Messages/create/${tradeObj.itemWanted.ownerProfileId.id}`} passHref>
                      <Button>Send Message</Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
            <Card className="post-card">
              <Card.Img src={tradeObj.itemWanted.imageUrl} className="post-card-image" />
              <Card.Body>
                <Card.Title>{tradeObj.itemWanted.itemName}</Card.Title>
                <Card.Text>Color: {tradeObj.itemWanted.color}</Card.Text>
                <Card.Text>Amount: {tradeObj.itemWanted.amount}</Card.Text>
                <Link href={`/Items/${tradeObj.itemWanted.id}`} passHref>
                  <Button variant="primary">View</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div style={{ width: '50%', marginTop: '45px', float: 'left' }}>
        <div className="text-center my-4">
          <div className="d-flex">
            <Card>
              <Card.Body>
                <Card.Title>
                  <img className="thumbnail-image" src={tradeObj.itemOffered.ownerProfileId.profilePicture} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                </Card.Title>
                <Card.Subtitle className="mb-2">{tradeObj.itemOffered.ownerProfileId.userName}</Card.Subtitle>
                <Link href={`/Profile/${tradeObj.itemOffered.ownerProfileId.id}`} passHref>
                  <Button className="mb-2">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card className="post-card">
              <Card.Img src={tradeObj.itemOffered.imageUrl} className="post-card-image" />
              <Card.Body>
                <Card.Title>{tradeObj.itemOffered.itemName}</Card.Title>
                <Card.Text>Color: {tradeObj.itemOffered.color}</Card.Text>
                <Card.Text>Amount: {tradeObj.itemOffered.amount}</Card.Text>
                <Link href={`/Items/${tradeObj.itemOffered.id}`} passHref>
                  <Button variant="primary">View</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

TradedCard.propTypes = {
  tradeObj: PropTypes.shape({
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

TradedCard.defaultProps = {
  tradeObj: {
    id: 0,
    itemWanted: {},
    itemOffered: {},
    isPending: PropTypes.bool,
  },
};
