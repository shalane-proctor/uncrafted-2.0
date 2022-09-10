import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function PostCard({ postObj }) {
  // const handleClick = () => {
  //   <Link passHref href={`/Items/${firebaseKey}`}>
  //     <a className="nav-link" />
  //   </Link>;
  // };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={postObj?.image} />
      <Card.Body>
        <Card.Title>{postObj?.itemName}</Card.Title>
        <Card.Text>Color: {postObj?.color}</Card.Text>
        <Card.Text>Amount: {postObj?.amount}</Card.Text>
        <Link href={`/Items/${postObj?.firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    amount: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PostCard.defaultProps = {
  postObj: ({
    image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
  }),
};
