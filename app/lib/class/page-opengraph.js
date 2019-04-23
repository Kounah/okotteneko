const propdef = require('../propdef');

/**
 * @typedef {Object} Properties
 * @property {String} title REQUIRED - the opengraph title
 * @property {String} description OPTIONAL - the opengraph descriptino
 * @property {String}
 */

module.exports = class PageOpengraph {
  /**
   * creates a new instance of the PageOpengraph class
   * @param {Properties} properties 
   */
  constructor(properties) {
    if(typeof properties == 'object') {
      propdef(this, [
        {
          name: 'title',
          typeof: 'string',
          instanceof: null,
          required: true,
        }, {
          name: 'description',
          typeof: 'string',
          
        }
      ], properties);
    } else throw new TypeError('properties was not an object.');
  }
};