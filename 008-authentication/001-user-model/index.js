const {promisify} = require('util');
const {pbkdf2, randomBytes} = require('crypto');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth_user_model', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const randomBytesPromise = promisify(randomBytes);
const pbkdf2Promise = promisify(pbkdf2);

const GLOBAL_SALT = 'salt';

function createSalt() {
  return randomBytesPromise(20).then(buffer => buffer.toString('hex'));//1234567890ABCDEF
}

function createHash(password, salt) {
  return pbkdf2Promise(password, `${salt}${GLOBAL_SALT}`, 1, 64, 'sha512')
    .then(buffer => buffer.toString('hex'))

}

function removeProperties(...properties) {
  return function (doc, ret, options) {
    for (const prop of properties) {
      delete ret[prop];
    }
    return ret;
  };
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  }
}, {
  toObject: {
    transform: removeProperties('password', 'salt'),
  },
  toJSON: {
    transform: removeProperties('password', 'salt'),
  }
});

// userSchema.post - after
userSchema.pre("save", async function () {
  if (this.isModified('password')) {
    this.salt = await createSalt();
    this.password = await createHash(this.password, this.salt);
  }
});

userSchema.methods.checkPassword = async function (password) {
  const hash = await createHash(password, this.salt);
  return hash === this.password;
};

userSchema.statics.login = async function (login, password) {
  const user = await this.findOne({login}).select('+password +salt');
  if (!user) {
    return false;
  }
  if (!await user.checkPassword(password)) {
    return false
  }
  return user;
};

const User = mongoose.model('user', userSchema);

(async () => {
  await User.deleteMany({});

  const user = new User({
    login: 'muaddib',
    password: 'alia',
  });

  await user.save();

  const loggedUser = await User.login('muaddib', 'alia');
  console.log("Logger user", loggedUser);

  await mongoose.disconnect();
})().catch(err => {
  console.error(err.message);
  process.exit(1);
});
