const router = require('express').Router();
const userRouter = require('./user-routes');

// Add error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('An error occurred');
});

// Add authentication middleware
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
});

// Use sub-router for user routes
router.use('/user', userRouter);

module.exports = router;
