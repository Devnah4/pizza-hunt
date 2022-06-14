const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');

// Adds the prefix of /api to all routes pulled from the api directory
router.use('/api', apiRoutes)
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
