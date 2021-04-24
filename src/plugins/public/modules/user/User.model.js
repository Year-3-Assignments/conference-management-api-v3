import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  university: {
    type: String,
    required: true,
    trim: true
  }
});
const User = mongoose.model('users', UserSchema);

module.exports = User;