const PageModel = require('../../models/Page');
const Page = require('../../lib/class/page');
const error = require('../../lib/error');
const auth = require('../../lib/auth');

async function getPageById(id) {
  return await PageModel.findById(id);
}

async function getPageByName(name) {
  return await PageModel.findOne({
    name: name.split(' ').join('-')
  });
}

/**
 * handles get api page by id
 * @param {Express.Request} req 
 */
async function handleGetApiPageById(req, res) {
  if(req.params.pageId) {
    res.status(200).json(await getPageById(req.params.pageId));
  } else throw new error.MissingParameterError('pageId', 'path', 'the mongoose id of the page');
}

async function handleGetApiPageByName(req, res) {
  if(req.params.pageName) {
    res.status(200).json(await getPageByName(req.params.pageName));
  } else throw new error.MissingParameterError('pageName', 'path', 'the name of the page, spaces are converted to dashes automatically');
}

async function handleGetPageById(req, res) {
  if(req.params.pageId) {
    res.status(200).render('page', new Page(await getPageById(req.params.id)));
  } else throw new error.MissingParameterError('pageId', 'path', 'the mongoose id of the page');
}

async function handleGetPageByName(req, res) {
  if(req.params.pageName) {
    res.status(200).render('page', new Page(await getPageByName(req.params.pageName)));
  } else throw new error.MissingParameterError('pageName', 'path', 'the name of the page, spaces are converted to dashes automatically');
}

/**
 * sets all the routes for this api-module
 * @param {Express.Application} app the express applicaiton
 */
async function router(app) {
  app.get('/api/page/id/:pageId', auth.admin, handleGetApiPageById);
  app.get('/api/page/:pageName', auth.admin, handleGetApiPageByName);
  app.get('/page/id/:pageId', auth.public, handleGetPageById);
  app.get('/page/:pageName', auth.public, handleGetPageByName);
}

module.exports = {
  router,

  getPageById,
  getPageByName
};