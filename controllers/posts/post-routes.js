const router = require('express').Router();
const { User, Post, Review } = require('../../models');

const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ error: 'An error occurred' });
};

router.post('/create', async (req, res) => {
  try {
    const { title, body, date_created } = req.body;
    const { user_name, user_id } = req.session;
    const newPost = await Post.create({ title, body, date_created, author: user_name, user_id });
    res.json(newPost);
  } catch (err) {
    handleErrors(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postData = await Post.findOne({
      where: { id },
      include: [
        {
          model: Review,
          include: { model: User, attributes: ['name'] },
        },
        { model: User, attributes: ['name'] },
      ],
    });
    res.render('singlePost', { postData, logged_in: req.session.logged_in, name_user: req.session.user_name, id_user: req.session.user_id });
  } catch (err) {
    handleErrors(res, err);
  }
});

module.exports = router;
