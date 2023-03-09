const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post, Review } = require('../../models');

// Render the login page
router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new user
router.post('/create', async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const userData = await User.create({
      user_name,
      password,
    });

    req.session.save(() => {
      req.session.user_name = userData.user_name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const userData = await User.findOne({ where: { user_name } });

    if (!userData) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      res
        .status(402)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_name = userData.user_name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout a user
router.post('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
