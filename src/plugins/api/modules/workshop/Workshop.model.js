import mongoose, { Schema } from 'mongoose';

const WorkshopSchema = new Schema({
  name: {type: String, required: false,  trim: true},
  description: { type: String,  required: [true, 'Workshop speaker description'], trim: true },
  createddate: { type: Date, required: false, trim: true },
  time:{type: String, required: false, trim: true },
  place: { type: String,required: [true, 'Workshop venue'],trim: true },
  imageurl: { type: String, required: false, trim: true },
  users:[{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
  attendees:[{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
}, 
  { strict: false },
  { timesamps: true}
);
const Workshop = mongoose.model('workshops', WorkshopSchema);

module.exports = Workshop;