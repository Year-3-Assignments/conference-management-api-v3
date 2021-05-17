import mongoose, { Schema } from 'mongoose';
import Users from '../User.model';
const WorkshopSchema = new Schema({
  workshopname: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Workshop speaker description'],
    trim: true
  },
  createddate: {
    type: Date,
    trim: true
  },
  time:{
    type: String,
    trim: true
  },
  place: {
    type: String,
    required: [true, 'Workshop venue'],
    trim: true
  },
  users:{
      type:String,
      trim: true
  },
  attendees:{
    type:String,
    trim: true
  }
}, {strict: false});
const Workshop = mongoose.model('workshop', WorkshopSchema);

module.exports = Workshop;