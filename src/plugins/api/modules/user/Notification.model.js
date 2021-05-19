import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema({
  resource: { type: Schema.Types.ObjectId, required: true, ref: 'resources' },
  from: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  message: { type: String, required: true, trim: true },
  to: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  isarchive: { type: Boolean, required: true }
}, {
  timestamps: true
});

const Notification = mongoose.model('notifications', NotificationSchema);
module.exports = Notification;