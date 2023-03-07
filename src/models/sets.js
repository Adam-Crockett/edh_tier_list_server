import mongoose from 'mongoose';

const setsSchema = mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  sets: { type: [Object], required: true },
});

setsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

export default mongoose.model('Sets', setsSchema);
