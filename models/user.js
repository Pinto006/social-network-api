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
    thought:[ 
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }
],
    friends:[ 
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Create a virtual property `friendCount` that gets the amount of friends the user has
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
// Initialize our User model
const User = model('User', userSchema);

module.exports = User;

