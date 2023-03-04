const { Controller } = require('../Controller/Controller');

class FriendController extends Controller {
  handle(viewerContext, req, res) {
    if (viewerContext) {
      res.send('here are your friends: jared, ishaan, alex, miguel, yuheng, shenfeng');
    } else {
      res.send('sign in to see your friends!');
    }
  }
}

const FRIEND_ROUTES = {
  '/friendslist': FriendController,
};

module.exports = FRIEND_ROUTES;