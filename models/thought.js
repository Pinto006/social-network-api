const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        }, 
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlenth: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        },
    }
);

//create a thought//
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlenth: 280,
      
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    user:{
        type: String,
        required: true,
        
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Create a virtual property `reactionCount` that gets the amount of comments per post
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
  });
// Initialize our Thought model
  const thought = model('thought', thoughtSchema);

module.exports = thought;