const path = require('path');
const pageConfig = require('./page');

/**
 * sets up the app to use handlebars in this current context
 * @param {Express.Application} app 
 */
function setup(app) {
  let hbs = require('handlebars').create();

  // code found at https://stackoverflow.com/questions/53398408/switch-case-with-default-in-handlebars-js
  hbs.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
  });
  
  hbs.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
  });
  
  hbs.registerHelper('default', function(/* value, options */) {
    return true;
  });
  // end code quotation

  hbs.registerHelper('json', function(value) {
    return(JSON.stringify(value, null, '  '));
  });

  hbs.registerHelper('config', function(key) {
    return pageConfig[key];
  });

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