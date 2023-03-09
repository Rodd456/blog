// Import dependencies
const router = require('express').Router();
const { User, Post, Review } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Find all posts and include user information
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['user_name'] }]
    });

    // Convert posts to plain objects
    const postList = posts.map((post) => post.get({ plain: true }));

    // Render homepage template with post data and login status
    res.render('homepage', { postList, logged_in: req.session.logged_in });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error });
  }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    // Find all posts for the logged in user
    const userPosts = await Post.findAll({
      where: { user_id: req.session.user_id }
    });

    // Convert posts to plain objects
    const userPostList = userPosts.map((post) => post.get({ plain: true }));

    // Render dashboard template with user post data, login status, user name and user ID
    res.render('dashboard', {
      userPostList,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error });
  }
});

module.exports = router;
