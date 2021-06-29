import mongoose, { Schema } from 'mongoose';

const ResourceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  time: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  reveiwedby: { type: Schema.Types.ObjectId, required: false, ref: 'users' },
  status: { type: String, required: true, trim: true },
  amount: { type: Number, required: false, trim: true },
  type: { type: String, required: true, trim: true },
  createdby: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  resourceurls: [{ type: String, required: true, trim: true }],
  ispaid: { type: Boolean, required: false, default: false },
  resourcepersons: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
  isedited: { type: Boolean, required: false, default: false },
  publishtitle: { type: String, required: false, trim: true },
  publishdescription: { type: String, required: false, trim: true },
  publishimgurl: { type: String, required: false, trim: true },
  adminstatus: { type: String, required: false, trim: true },
  adminmessage: { type: String, required: false, trim: true }
}, {
  timestamps: true
});

const Resource = mongoose.model('resources', ResourceSchema);
module.exports = Resource;