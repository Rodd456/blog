const router = require('express').Router();
const { User, Post, Review } = require('../../models');

router.post('/new', async (req, res) => {
  try {
    const { body, post_id } = req.body;

    if (!body || !post_id) {
      return res.status(400).json({ message: 'Please provide a body and post_id.' });
    }

    const newReview = await Review.create({
      body,
      user_id: req.session.user_id,
      post_id,
    });

    res.status(201).json({ review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
