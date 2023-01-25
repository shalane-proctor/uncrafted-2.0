import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Badge, Button,
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function TradeCard({ tradeObj }) {
  return (
    <>
      <Card className="trade-card">
        <Card.Img src="/./pinkSticky.png" alt="sticky note" height="150px" width="200px" />
        <Card.ImgOverlay>
          <div> {tradeObj.isPending === true ? <Badge bg="dark">PENDING</Badge> : ''}</div>
          <Card.Body>
            <Card.Title>{tradeObj.isPending === true ? 'New Trade!' : 'Trade'}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Offered ${tradeObj.itemOffered.itemName}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Wanted ${tradeObj.itemWanted.itemName}</Card.Subtitle>
            <Link href={`/Trades/update/${tradeObj?.id}`} passHref>
              <Button variant="primary">View Trade</Button>
            </Link>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

TradeCard.propTypes = {
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

TradeCard.defaultProps = {
  tradeObj: ({
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  }),
};
