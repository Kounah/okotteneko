/** 
 * @typedef {Object} ReturnObject
 * @property {String} type the mime-type of the result
 * @property {String} content the content of the result
 */

/**
 * @returns {ReturnObject};
 */
function build() {
  return {
    type: 'text/plain',
    content: 'i made this'
  };
}

module.exports = build;