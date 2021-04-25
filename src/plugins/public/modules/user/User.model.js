import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name should be provided'],
    trim: true
  },
  university: {
    type: String,
    required: [true, 'University must be provided'],
    trim: true
  }
}, {strict: false});
const User = mongoose.model('users', UserSchema);

module.exports = User;