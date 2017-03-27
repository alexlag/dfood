const getTodayMenu = require('./lib/dailyFood').getTodayMenu;

const Router = require('express').Router;

const router = new Router();

router.get('/today', (req, res) => {
  getTodayMenu((data) => res.send(data));
});

module.exports = router;
