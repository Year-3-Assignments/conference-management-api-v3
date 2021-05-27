import mongoose, { Schema } from 'mongoose';

const ConferenceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  startdate: { type: Date, required: true, trim: true },
  enddate: { type: Date, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  amount: { type: String, required: false, trim: true },
  status: { type: String, required: true, trim: true },
  createdby: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  atendees: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  resource: { type: Schema.Types.ObjectId, ref: 'resources'},
}, {
  timestamps: true
});

const Conference = mongoose.model('conferences', ConferenceSchema);
module.exports = Conference;