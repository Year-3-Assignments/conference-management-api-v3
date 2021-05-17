import mongoose, { Schema } from 'mongoose';

const ConferenceSchema = new Schema({
  atendees: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  resource: { type: Schema.Types.ObjectId, ref: 'resources'},
  status: { type: String, required: true }
});

const Conference = mongoose.model('conferences', ConferenceSchema);
module.exports = Conference;