const fs = require('fs');
const path = require('path');
const base = require('../../build/index');
const error = require('../lib/error');

/**
 * router for build
 * @param {Express.Application} app 
 */
function router(app) {
  app.get('/build/*', (req, res) => {
    let p = path.join(__dirname, '../../build', path.relative('/build/', req.path));
    if(fs.existsSync(p)) {
      /** @type {base.ReturnObject} */
      let buildResult = (require(p) || base)();
      res.status(200).set('content-type', buildResult.type).send(buildResult.content);
    } else throw new error.NotFoundError('builder', 'file', {
      path: p
    });
  });
}

module.exports = router;