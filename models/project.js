const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  repoUrl: {
    type: String,
    required: true,
    unique: true
  },
  deployedUrl: {
    type: String,
    required: true,
    unique: true
  },
  imageUrls: {
    type: [String],
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Project', projectSchema);
