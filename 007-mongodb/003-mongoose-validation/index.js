const mongoose = require('mongoose');
const beautifulUniqueValidation = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifulUniqueValidation);
const {Schema} = mongoose;

const dbName = 'mongoose_validation';

const url = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

const userSchema = new Schema({
  name: String,
  login: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: 'email is required',
    match: /.*@.*/,
  },
  dateOfBirth: {
    type: Date,
  }
}, {});
const User = mongoose.model('user', userSchema);

(async function () {
  try {
    await User.deleteMany({});

    const paul = new User({
      name: 'Paul',
      email: 'paul@atredias.com',
      login: 'muaddib',
      dateOfBirth: new Date('2000-01-01'),
    });

    await paul.save();
    // await paul.validate();

    paul.dateOfBirth.setMonth(1);
    paul.markModified('dateOfBirth');
    await paul.save();

    const vladimir = new User({
      name: 'Vladimir',
      email: 'vladimir@harkonnen.com',
      login: 'muaddib',
    });

    await vladimir.save();
    // await vladimir.validate();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect()
  }


})();

