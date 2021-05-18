import mongoose, { Schema } from 'mongoose';

const ResourceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  time: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  createdby: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  resourceurls: [{ type: String, required: true, trim: true }],
  resourcepersons: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }]
}, {
  timestamps: true
});

const Resource = mongoose.model('resources', ResourceSchema);
module.exports = Resource;