/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function TradeMessageCard({ tradeMessageObj }) {
  return (
    <Card className="various-details">
      <Card.Title>
        <img className="thumbnail-image" src={tradeMessageObj.message?.sender?.profile_image_url} style={{ width: '10%', borderRadius: '50%' }} alt="Profile Pic" /> Message From: {tradeMessageObj.message?.sender?.username}
      </Card.Title>
      <Card.Title>
        <img className="thumbnail-image" src={tradeMessageObj.message?.receiver?.profile_image_url} style={{ width: '10%', borderRadius: '50%' }} alt="Profile Pic" />
        Message to: {tradeMessageObj.message?.receiver?.username}
      </Card.Title>
      <Card.Body>
        <Card.Text>{tradeMessageObj?.message?.message_content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

TradeMessageCard.propTypes = {
  tradeMessageObj: PropTypes.checkPropTypes({
    id: PropTypes.number,
    message: PropTypes.shape({
      message_content: PropTypes.string,
      sender: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      }),
      reciever: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        profile_image_url: PropTypes.string,
      }),
    }),
    trade: PropTypes.shape({}),
  }),
};
TradeMessageCard.defaultProps = {
  tradeMessageObj: {},
};
