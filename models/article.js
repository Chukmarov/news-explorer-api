const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({

  keyword: {
    type: String,
    minlength: 2,
    required: true,
  },

  title: {
    type: String,
    minlength: 2,
    required: true,
  },

  text: {
    type: String,
    minlength: 2,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: true,
  },

  image: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

});

// articleSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }
//           return user;
//         });
//     });
// };

module.exports = mongoose.model('article', articleSchema);
