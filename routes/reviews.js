const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware');
const reviews = require('../controllers/reviews');
 

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewID', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));
  

module.exports = router; 