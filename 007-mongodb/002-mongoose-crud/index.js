const mongoose = require('mongoose');
const {Schema} = mongoose;

const dbName = 'mongoose_crud';

const url = `mongodb://localhost:27017/${dbName}`;

/**
 * For all available options see
 * @link https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-set
 */
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

const userSchema = new Schema({
  name: String,
  login: {
    type: String,
  },
  email: {
    type: String,
  }
}, {});
const User = mongoose.model('user', userSchema);

(async function () {

  await User.deleteMany({});

  const user = new User({
    name: 'Paul',
    email: 'paul@atredias.com',
    login: 'muaddib'
  });

  await user.save();
  // await User.create({
  //   name: 'Paul',
  //   email: 'paul@atredias.com',
  //   login: 'muaddib'
  // });
  // User.insert, User.insertMany

  user.login = 'muad-dib';
  await user.save();
  // User.update, User.updateOne, User.updateMany

  // await User.deleteOne({id: user.id});

  await mongoose.disconnect()
})();

