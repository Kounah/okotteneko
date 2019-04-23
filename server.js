const express = require('express');
const log = require('./app/lib/log');
const cfg = require('./config/app');

const app = express();

cfg.handlebars(app);

app.listen(cfg.port, () => {
  log.v('server', 'listening on port', cfg.port);
});