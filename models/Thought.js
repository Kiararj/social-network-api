// Imports necessary modules from the 'mongoose' package
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema that creates Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      },
);

// Creates virtual property reactionCount that retrieves amount of reactions a thought has
thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
});

// Initializes Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;