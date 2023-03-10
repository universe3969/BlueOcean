const express = require('express');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const path = require("path");
const axios = require('axios');
const app = express();
const messageRouter = require('./routers/MessageRoutes.js');
const client = require("./database/database").client;
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/users.js');const profileRouter = require('./controllers/profile.js');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/messages', messageRouter);


// routes
// This route doesn't need authentication
app.get('/regular', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

const tinder = require('./controllers/TinderController.js');
app.use('/explore', tinder);

app.use('/api/profile', profileRouter);


// ----------------- All Routers Below -------------------------
// Books
const books = require('./routers/books.js');
app.use('/api/books', books);
app.use('/api/profile', profileRouter);


// ----------------- All Routers Below -------------------------
// Books
// const books = require('./routers/books.js');
// app.use('/api/books', books);

// ----------------- All Protected Routers Below -------------------------
// We can use this to have all routes below this to be protected routes
// jsonwebtoken checker from Auth0
const checkJwt = auth({
  audience: process.env.audience,
  issuerBaseURL: process.env.issuerBaseURL,
});

// app.use(checkJwt);

// This route needs authentication because it uses checkJWT as a second argument
app.use('/users', checkJwt, userRouter);

const CreatePostController = require('./controllers/CreatePostController.js');
const PostsController = require('./controllers/PostsController.js');
app.use('/posts', checkJwt, PostsController);
app.use('/createpost', checkJwt, CreatePostController);

client.connect().then(() => {
  console.log("database connected");
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});

// app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
