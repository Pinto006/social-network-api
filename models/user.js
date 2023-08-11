const { Schema, model } = require('mongoose');

//create a user//
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, 
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts:[ 
    {
        type: Schema.Types.ObjectId,
        ref: 'thought',
    }
],
friends:[ 
    {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Create a virtual property `friendCount` that gets the amount of comments per post
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
// Initialize our User model
  const User = model('user', userschema);

module.exports = User;