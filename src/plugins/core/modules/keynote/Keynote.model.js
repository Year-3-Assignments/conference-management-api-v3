import mongoose, { Schema } from 'mongoose';

const KeynoteSchema = new Schema({
    title : { type: String, required: [true, 'Title should be provided'], trim: true },
    keynoteimageurl : { type: String, required: false, trim: true },
    conferenceid: [{type:Schema.Types.ObjectId, required:true, ref:'conference'}]
},{strict: false}, 
{timestamps : true});
const Keynote = mongoose.model('keynotes',KeynoteSchema);

module.exports = Keynote;