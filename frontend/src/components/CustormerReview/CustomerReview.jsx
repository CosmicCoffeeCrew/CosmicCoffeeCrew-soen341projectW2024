import  { useState } from 'react';
import PropTypes from 'prop-types';
import "./CustomerReview.css";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]); // This would be fetched from the backend
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const submitReview = (event) => {
    event.preventDefault();
    if (!newReview || rating === 0) return; // Prevent blank reviews or reviews without ratings

    //CHANGE IN HERE
    const reviewData = {
      username: "Anonymous", // We need to replace this with actual data... "real user links from the database"
      text: newReview,
      stars: rating,
    };

    // Here, you would send the reviewData to the backend.
    // For now, we'll just add it to the state.
    setReviews([...reviews, reviewData]);
    setNewReview(''); // Reset the input field after submission
    setRating(0); // Reset the rating after submission
  };

  return (
    <div className="review-container">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <form onSubmit={submitReview} className="mb-8">
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              selected={index < rating}
              onSelect={() => setRating(index + 1)}
            />
          ))}
        </div>
        <textarea
          value={newReview}
          onChange={handleReviewChange}
          className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full"
          placeholder="Write your review here"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded mt-2">
          Submit Review
        </button>
      </form>
      <div className="previous-reviews">
        <h3>Previous Reviews</h3>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

const Star = ({ selected, onSelect }) => (
  <span className={selected ? "star selected" : "star"} onClick={onSelect}>
    &#9733;
  </span>
);

Star.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <ul className="reviews-list">
      {reviews.map((review, index) => (
        <li key={index} className="border-b border-gray-300 py-2">
          <div className="review-user">Reviewed by: {review.username}</div>
          <div className="review-stars">
            {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
          </div>
          <div className="review-text">{review.text}</div>
        </li>
      ))}
    </ul>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
  })).isRequired,
};

export default CustomerReview;
