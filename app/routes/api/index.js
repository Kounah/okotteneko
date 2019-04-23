const bodyParser = require('body-parser');
const multer = require('multer');
const cfg = require('../../../config/app');

const fileUpload = multer({
  dest: cfg.tempStorage,
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 64,
    fileSize: cfg.limit
  }
});

/**
 * sets all the routes
 * @param {Express.Application} app 
 */
function router(app) {
  app.use('/api/*', bodyParser.urlencoded({
    extended: true,
    type: 'application/x-www-form-urlencoded',
    limit: cfg.limit
  }), bodyParser.json({
    type: 'application/json',
    limit: cfg.limit
  }), fileUpload.any());
  

  require('./page').router(app);
}

module.exports = router;