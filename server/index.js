const express = require('express');
const path = require('path');
require('dotenv').config(path.join(__dirname, './.env'));

const client = require('./database/database');

const app = express();

const PORT = process.env.PORT || 3000;
const { HOME_ROUTE } = require('./controllers/Controller/Controller');
const FRIEND_ROUTES = require('./controllers/FriendControllers/friendController');

// import top-level middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
for (const route of Object.keys(HOME_ROUTE)) {
  app.get(route, (req, res) => new (HOME_ROUTE[route])().handle(req, res));
}

for (const route of Object.keys(FRIEND_ROUTES)) {
  app.get(route, (req, res) => {
    // console.log(req.query);
    new (FRIEND_ROUTES[route])().handle(req.query.admin, req, res);
  });
}

client.connect().then(() => {
  console.log('database connected');
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});

