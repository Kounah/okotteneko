const fs = require('fs');
const path = require('path');
const error = require('../lib/error');
const mime = require('mime');

/**
 * handles source routes
 * @param {Express.Application} app
 */
function router(app) {
  app.get('/src/*', (req, res) => {
    var p = path.join(__dirname, '../../src', path.relative('/src/', req.path));
    if(fs.existsSync(p)) {
      res.set('content-type', mime.getType(p)).status(200).sendFile(p);
    } else throw new error.NotFoundError('Resource', 'file', {
      path: path.relative(__dirname, '../../', p)
    });
  });

  app.get('/node_modules/:moduleName/*', (req, res) => {
    var p = path.join(__dirname, '../../node_modules/', req.params.moduleName, path.relative(`/module/${req.params.moduleName}/`, req.path));
    if(fs.existsSync(p)) {
      res.set('content-type', mime.getType(p)).status(200).sendFile(p);
    } else throw new error.NotFoundError('Module-Resource', 'file', {
      path: path.relative(__dirname, '../../', p)
    });
  });
}

module.exports = router;