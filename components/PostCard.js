import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function PostCard({
  amount, color, image, itemName, firebaseKey,
}) {
  // const handleClick = () => {
  //   <Link passHref href={`/Items/${firebaseKey}`}>
  //     <a className="nav-link" />
  //   </Link>;
  // };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text>Color: {color}</Card.Text>
        <Card.Text>Amount: {amount}</Card.Text>
        <Link href={`Items/${firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  amount: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string,
  itemName: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
};

PostCard.defaultProps = {
  image: 'https://cdn.shopify.com/s/files/1/0969/9128/files/feature4.png?8761787851395034074',
};
