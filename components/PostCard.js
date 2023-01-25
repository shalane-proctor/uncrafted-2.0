import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function PostCard({ postObj }) {
  return (
    <Card className="post-card">
      <Card.Img src="/./stickyNote.png" alt="sticky note" height="400px" width="400px" />
      <Card.ImgOverlay>
        <Card.Img src={postObj?.imageUrl} className="post-card-image" />
        <Card.Body>
          <Card.Title style={{ margin: '2px' }}>{postObj?.itemName}</Card.Title>
          <Card.Text style={{ margin: '2px' }}>Color: {postObj?.color}</Card.Text>
          <Card.Text style={{ margin: '2px' }}>Amount: {postObj?.amount}</Card.Text>
          <Link href={`/Items/${postObj?.id}`} passHref>
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
  postObj: PropTypes.shape({
    id: PropTypes.number,
    postedByUser: PropTypes.string,
    ownerProfile: PropTypes.string,
    itemName: PropTypes.string,
    color: PropTypes.string,
    amount: PropTypes.string,
    imageUrl: PropTypes.string,
    tradePreferences: PropTypes.string,
    description: PropTypes.string,
    isDraft: PropTypes.bool,
    isPending: PropTypes.bool,
  }),
};

PostCard.defaultProps = {
  postObj: {
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
    isDraft: false,
    isPending: false,
  },
};
