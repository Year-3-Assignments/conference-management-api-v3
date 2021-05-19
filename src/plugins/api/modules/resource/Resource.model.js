import mongoose, { Schema } from 'mongoose';

const ResourceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  time: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  createdby: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  resourceurls: [{ type: String, required: true, trim: true }],
  ispaid: { type: Boolean, required: false, default: false },
  resourcepersons: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }]
}, {
  timestamps: true
});

const Resource = mongoose.model('resources', ResourceSchema);
module.exports = Resource;