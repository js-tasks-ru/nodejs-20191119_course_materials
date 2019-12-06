const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

genreSchema.virtual('books', {
  ref: 'book',
  localField: '_id',
  foreignField: 'genre',
  justOne: false,
});
const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;
