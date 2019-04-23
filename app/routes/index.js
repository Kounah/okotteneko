const Page = require('../lib/class/page');
const error = require('../lib/error');

/**
 * the router
 * @param {Express.Application} app the express application
 */
function router(app) {
  app.use(error.handler);

  app.get('/', (req, res) => {
    res.render('index', new Page({
      title: 'Welcome',
      html: {
        lang: 'en'
      },
      opengraph: {
        title: 'Welcome - Okotteneko',
        locale: 'en_GB',
        description: 'The start-page of my website.',
      },
      req: req,
      res: res
    }));
  });

  require('./api')(app);
  require('./sources')(app);
}

module.exports = router;