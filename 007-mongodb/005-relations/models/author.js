const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book'
    },
  ]
}, {});
const Author = mongoose.model('author', authorSchema);

module.exports = Author;

