const base = require('../index');
const sass = require('sass');
const cfg = require('../../config/app');
const fs = require('fs');
const path = require('path');
const error = require('../../app/lib/error');

function b(p) {
  var result = sass.renderSync({
    file: path.join(__dirname, './sass/custom.scss'),
    sourceMap: true,
  });

  fs.writeFileSync(p, result.css, {
    encoding: 'utf8'
  });
  fs.writeFileSync(path.join(path.parse(p).dir, 'materialize.css.map'), result.map, {
    encoding: 'utf8'
  });

  return {
    type: 'text/css',
    content: result.css.toString('utf8')
  };
}

/**
 * @returns {base.ReturnObject}
 */
function build() {
  let p = path.join(__dirname, '../../src/materialize.css');
  if(fs.existsSync(p)) {
    let stat = fs.statSync(p);
    if(stat.isFile()) {
      if((new Date().getTime() - stat.mtime.getTime()) < cfg.maxCacheAge) {
        return {
          type: 'text/css',
          content: fs.readFileSync(p, {encoding: 'utf8'})
        };
      } else return b(p);
    } else throw new error.NotFoundError('materialize.css', 'file', {
      path: p
    });
  } else {
    return b(p);
  }
}

module.exports = build || base;