// Import the models
const { UserModel, PostModel, ReviewModel } = require('./models');

// Create a new user
const user = await UserModel.create({
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123'
});

// Create a new post for the user
const post = await PostModel.create({
  title: 'My First Post',
  content: 'Lorem ipsum dolor sit amet.',
  user_id: user.id
});

// Create a new review for the post
const review = await ReviewModel.create({
  rating: 4,
  comment: 'Great post!',
  user_id: user.id,
  post_id: post.id
});

// Retrieve all reviews for the post
const reviews = await ReviewModel.findAll({
  where: {
    post_id: post.id
  }
});

console.log(reviews);
