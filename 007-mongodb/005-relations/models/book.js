const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'book\'s title required'
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genre'
  }
});
const Book = mongoose.model('book', bookSchema);

module.exports = Book;
