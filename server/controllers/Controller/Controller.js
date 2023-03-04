// the base class for a controller, can be extended to handle authenticated routes
class Controller {
  handle(req, res) {
    res.send('Hello World');
  }
}

const HOME_ROUTE = {
  '/': Controller,
};

module.exports = { HOME_ROUTE, Controller };