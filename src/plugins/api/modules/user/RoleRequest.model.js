import mongoose, { Schema } from 'mongoose';

const RoleRequestSchema = new Schema({
  requestedby: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  requestrole: { type: String, required: true, trim: true },
  message: { type: String, required: false, trim: true },
}, {
  strict: false,
  timestamps: true
});

const RoleRequest = mongoose.model('rolerequests', RoleRequestSchema);
module.exports = RoleRequest;