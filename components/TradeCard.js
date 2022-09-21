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
          <div> {tradeObj.pending === true ? <Badge bg="dark">PENDING</Badge> : ''}</div>
          <Card.Body>
            <Card.Title>{tradeObj.pending === true ? ('New Trade!') : 'Trade'}</Card.Title>
            <Link href={`/Trades/update/${tradeObj?.firebaseKey}`} passHref>
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
    amount: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
    pending: PropTypes.bool,
    completed: PropTypes.bool,
  }),
  // offerFromObj: PropTypes.shape({
  //   amount: PropTypes.string,
  //   color: PropTypes.string,
  //   image: PropTypes.string,
  //   itemName: PropTypes.string,
  //   firebaseKey: PropTypes.string,
  //   pending: PropTypes.bool,
  // }),
  // offerToObj: PropTypes.shape({
  //   amount: PropTypes.string,
  //   color: PropTypes.string,
  //   image: PropTypes.string,
  //   itemName: PropTypes.string,
  //   firebaseKey: PropTypes.string,
  //   pending: PropTypes.bool,
  // }),
};

TradeCard.defaultProps = {
  tradeObj: ({
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  }),
};
