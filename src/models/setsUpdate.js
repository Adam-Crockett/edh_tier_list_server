import mongoose from 'mongoose';
// import Set from './set.js';

const setsUpdateSchema = mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  // sets: { type: [await Set.find()], required: true },
  // sets: { type: [Object], required: true },
});

setsUpdateSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

export default mongoose.model('SetsUpdate', setsUpdateSchema);
