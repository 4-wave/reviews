/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ReviewsEntry from './ReviewsEntry.jsx';

const Reviews = ({ reviews }) => (
  <ul className="reviews">
    {reviews.map((review, idx) => {
      return <ReviewsEntry key={idx} review={review} />;
    })}
  </ul>
);

export default Reviews;
