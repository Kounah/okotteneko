const mongoose = require('mongoose');

let opengraphSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 
  description: {
    type: String,
    required: false
  }
});

let pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  opengraph: {
    type: opengraphSchema,
    required: false
  }
});

module.exports = mongoose.model('page', pageSchema);