import session from 'express-session';

const sessionMiddleware = session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use secure: true if using HTTPS
});

export default sessionMiddleware;
