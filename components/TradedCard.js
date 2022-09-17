/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

export default function TradedCard({
  offerTo, offeredFrom, offeredPostObj, wantedPostObj,
}) {
  const { user } = useAuth();
  return (
    <>
      <div style={{ width: '50%', marginTop: '45px', float: 'left' }}>
        <div className="text-center my-4">
          <div className="d-flex">
            <Card style={{ width: '50%', marginTop: '45px', float: 'left' }}>
              <Card.Body>
                <Card.Title>
                  <img className="thumbnail-image" src={offerTo.profilePicture} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                </Card.Title>
                <Card.Subtitle className="mb-2">{offerTo.userName}</Card.Subtitle>
                <Link href={`/Profile/${wantedPostObj?.ownerProfileID}`} passHref>
                  <Button className="mb-2">View Profile</Button>
                </Link>
                {offerTo.uid !== user.uid ? (
                  <Link href={`/Messages/create/${wantedPostObj.ownerProfileID}`} passHref>
                    <Button>Send Message</Button>
                  </Link>
                ) : (
                  ''
                )}
              </Card.Body>
            </Card>
            <Card className="post-card">
              <Card.Img src={wantedPostObj.image} className="post-card-image" />
              <Card.Body>
                <Card.Title>{wantedPostObj.itemName}</Card.Title>
                <Card.Text>Color: {wantedPostObj.color}</Card.Text>
                <Card.Text>Amount: {wantedPostObj.amount}</Card.Text>
                <Link href={`/Items/${wantedPostObj.firebaseKey}`} passHref>
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
                  <img className="thumbnail-image" src={offeredFrom.profilePicture} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
                </Card.Title>
                <Card.Subtitle className="mb-2">{offeredFrom.userName}</Card.Subtitle>
                <Link href={`/Profile/${offeredPostObj?.ownerProfileID}`} passHref>
                  <Button className="mb-2">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card className="post-card">
              <Card.Img src={offeredPostObj?.image} className="post-card-image" />
              <Card.Body>
                <Card.Title>{offeredPostObj?.itemName}</Card.Title>
                <Card.Text>Color: {offeredPostObj?.color}</Card.Text>
                <Card.Text>Amount: {offeredPostObj?.amount}</Card.Text>
                <Link href={`/Items/${offeredPostObj?.firebaseKey}`} passHref>
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
  firebaseKey: PropTypes.string,
  offerTo: PropTypes.oneOfType([
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      profilePicture: PropTypes.string,
      uid: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  offeredFrom: PropTypes.oneOfType([
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      userName: PropTypes.string,
      profilePicture: PropTypes.string,
      uid: PropTypes.string,
    }),
  ]),
  offeredPostObj: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        ownerProfileID: PropTypes.string,
      }),
    ),
    PropTypes.shape({}),
  ]),
  wantedPostObj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
    ownerProfileID: PropTypes.string,
    uid: PropTypes.string,
  }),
  tradeObj: PropTypes.shape({
    pending: PropTypes.bool,
    completed: PropTypes.bool,
  }),
};

TradedCard.defaultProps = {
  firebaseKey: '',
  wantedPostObj: {
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  },
  offerTo: {
    firebaseKey: '',
  },
  offeredFrom: {
    firebaseKey: '',
  },
  offeredPostObj: [
    {
      pending: true,
    },
  ],
  tradeObj: {
    pending: false,
    completed: false,
  },
};
