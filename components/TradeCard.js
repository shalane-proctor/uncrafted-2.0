import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Badge, Button,
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { getTradeByUser } from '../api/new/tradeData';
import { useAuth } from '../utils/context/authContext';

export default function TradeCard({ tradeObj }) {
  const user = useAuth();
  return (
    <>
      <Card className="trade-card">
        <Card.Img src="/./pinkSticky.png" alt="sticky note" height="300px" width="300px" />
        <Card.ImgOverlay>
          <div> {tradeObj?.is_pending === true ? <Badge bg="dark">PENDING</Badge> : ''}</div>
          <Card.Body>
            <Card.Title>{tradeObj?.is_pending === true ? 'New Trade!' : 'Trade'}</Card.Title>
            {user?.uid === getTradeByUser?.uid ? (
              <div>
                <Card.Subtitle className="mb-2 text-muted">
                  You Offered {tradeObj?.item_offered?.item_name} to {tradeObj?.item_wanted?.owner_profile?.username} for {tradeObj?.item_wanted?.item_name}!
                </Card.Subtitle>
                <Card.Img src={tradeObj?.item_wanted?.image_url} className="trade-card-image" alt={tradeObj?.item_wanted?.item_name} height="100px" width="100px" />
              </div>
            ) : (
              <div>
                <Card.Subtitle className="mb-2 text-muted">
                  {tradeObj?.item_wanted?.owner_profile?.username} offered {tradeObj?.item_offered?.item_name} for {tradeObj?.item_wanted?.item_name}!
                </Card.Subtitle>
                <Card.Img src={tradeObj?.item_wanted?.image_url} className="trade-card-image" alt={tradeObj?.item_wanted?.item_name} height="100px" width="100px" />
              </div>
            )}
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
    item_wanted: PropTypes.shape({
      id: PropTypes.number,
      item_name: PropTypes.string,
      color: PropTypes.string,
      amount: PropTypes.string,
      image_url: PropTypes.string,
      trade_preferences: PropTypes.string,
      description: PropTypes.string,
      is_draft: PropTypes.bool,
      is_pending: PropTypes.bool,
      owner_profile: PropTypes.shape({
        id: PropTypes.number,
        uid: PropTypes.string,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      }),
    }),
    item_offered: PropTypes.shape({
      id: PropTypes.number,
      item_name: PropTypes.string,
      color: PropTypes.string,
      amount: PropTypes.string,
      image_url: PropTypes.string,
      trade_preferences: PropTypes.string,
      description: PropTypes.string,
      is_draft: PropTypes.bool,
      is_pending: PropTypes.bool,
      owner_profile: PropTypes.shape({
        id: PropTypes.number,
        uid: PropTypes.string,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      }),
    }),
    is_pending: PropTypes.bool,
  }),
};

TradeCard.defaultProps = {
  tradeObj: ({
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  }),
};
