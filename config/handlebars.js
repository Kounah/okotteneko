const path = require('path');

/**
 * sets up the app to use handlebars in this current context
 * @param {Express.Application} app 
 */
function setup(app) {
  let hbs = require('handlebars').create();

  hbs.registerHelper();

  let exphbs = require('express-handlebars')({
    extname: 'hbs',
    handlebars: hbs,
    partialsDir: path.join(__dirname, '../views/partials'),
    layoutsDir: path.join(__dirname, '../views/layouts'),
    defaultLayout: 'main'
  });

  app.engine('hbs', exphbs);
  app.set('view engine', 'hbs');
}

module.exports = setup;