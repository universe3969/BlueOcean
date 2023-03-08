const express = require('express');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const path = require("path");
require("dotenv").config(path.join(__dirname, "./.env"));
const axios = require('axios');
const app = express();
const client = require("./database/database");
const PORT = process.env.PORT || 3000;



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//jsonwebtoken checker from Auth0
const checkJwt = auth({
  audience: process.env.audience,
  issuerBaseURL: process.env.issuerBaseURL,
});

// routes
// This route doesn't need authentication
app.get('/regular', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// We can use this to have all routes below this to be protected routes
// app.use(checkJwt);

// This route needs authentication because it uses checkJWT as a second argument
app.get('/private', function(req, res) {
  // how to grab user information if needed
  //console.log(req.query)
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

// ----------------- All Routers Below -------------------------
// Books
const books = require('./routers/books.js');
app.use('/api/books', books);



// client.connect().then(() => {
//   console.log("database connected");
//   app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
// });

// I haven't gotten the DB running on my end yet so I abstracted the server.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
