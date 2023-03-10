import mongoose from 'mongoose';

const expireUpdateSchema = mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
});

expireUpdateSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

export default mongoose.model('ExpireUpdate', expireUpdateSchema);
