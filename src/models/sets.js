import mongoose from 'mongoose';
import setSchema from './set';

const setsSchema = mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  sets: { type: [setSchema], required: true },
});

export default mongoose.model('Sets', setsSchema);
