import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function PostCard({
  imageUrl, itemName, color, amount, id,
}) {
  return (
    <Card className="post-card">
      <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
      <Card.ImgOverlay>
        <Card.Img src={imageUrl} className="post-card-image" />
        <Card.Body>
          <Card.Title style={{ margin: '2px' }}>{itemName}</Card.Title>
          <Card.Text style={{ margin: '2px' }}>Color: {color}</Card.Text>
          <Card.Text style={{ margin: '2px' }}>Amount: {amount}</Card.Text>
          <Link href={`/Items/${id}`} passHref>
            <Button variant="outline-info" style={{ marginTop: '4px' }}>
              View
            </Button>
          </Link>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
}

PostCard.propTypes = {
  id: PropTypes.number,
  itemName: PropTypes.string,
  color: PropTypes.string,
  amount: PropTypes.string,
  imageUrl: PropTypes.string,
};

PostCard.defaultProps = {
  id: 0,
  itemName: '',
  color: '',
  amount: '',
  imageUrl: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
};
