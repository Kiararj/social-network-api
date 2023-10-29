// Imports necessary modules from the 'mongoose' package
const { Schema, model } = require('mongoose');

// Schema that creates User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0–9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                "Please enter a valid email address"
            ]
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Friend'
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

// Creates virtual property friendCount that retrieves amount of friends user has
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

// Initializes User model
const User = model('user', userSchema);

module.exports = User;