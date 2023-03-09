const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helmet = require('helmet');
const compression = require('compression');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const https = require('https');

const routes = require('./controllers');
const sequelize = require('./config/connection');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);
app.use(errorHandler());

// View engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Start server
if (process.env.NODE_ENV === 'production') {
  // Start HTTPS server in production
  const privateKey = fs.readFileSync('/etc/ssl/private/yourserver.key');
  const certificate = fs.readFileSync('/etc/ssl/certs/yourserver.crt');
  const credentials = { key: privateKey, cert: certificate };
  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`Server running in production mode on port ${PORT}`);
  });
} else {
  // Start HTTP server in development
  http.createServer(app).listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
}

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});
