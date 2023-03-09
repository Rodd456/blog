const router = require('express').Router();
const reviewRoutes = require('./review-routes');
const postRoutes = require('./post-routes');

// Routes for handling reviews
router.use('/reviews', reviewRoutes);

// Routes for handling posts
router.use('/posts', postRoutes);

module.exports = router;
