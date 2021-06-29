import mongoose, { Schema } from 'mongoose';

const WorkshopSchema = new Schema({
  name: {type: String, required: false,  trim: true},
  description: { type: String,  required: [true, 'Workshop speaker description'], trim: true },
  imageurl: { type: String, required: false, trim: true },
  resource: { type: Schema.Types.ObjectId, required: true, ref: 'resources' },
  attendees:[{ type: Schema.Types.ObjectId, required: false, ref: 'users' }],
  createdby: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  isapproved: { type: Boolean, required: false, default: false }
}, {
  timestamps: true
});
const Workshop = mongoose.model('workshops', WorkshopSchema);
export default Workshop;