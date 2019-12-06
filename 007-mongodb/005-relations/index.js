const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);

const {Author, Genre, Book} = require('./models');

const dbName = 'mongoose_relations';

const url = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('debug', true);

(async function () {
  try {
    await Author.deleteMany({});
    await Book.deleteMany({});
    await Genre.deleteMany({});

    const genre = new Genre({
      title: 'Science fiction'
    });

    const books = [
      new Book({
        title: 'Dune',
        genre,
      }),
      new Book({
        title: 'Dune Messiah',
        genre,
      }),
      new Book({
        title: 'Children of Dune',
        genre,
      })
    ];

    const author = new Author({
      name: 'Frank Herbert',
      books
    });

    for (const doc of [...books, author, genre]) {
      await doc.save();
    }

    const [frankHerbert] = await Author.find({name: 'Frank Herbert'}).populate('books');
    console.log(frankHerbert);

    const [dune] = await Book.find({title: 'Dune'}).populate('genre');
    console.log(dune);

    const [sciFi] = await Genre.find({title: 'Science fiction'}).populate('books', 'title');
    console.log(sciFi);

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect()
  }

})();

