import mongoose from 'mongoose';
// import setSchema from './set.js';

// const setSchema = mongoose.Schema({
//   code: { type: String, required: true },
//   createdAt: { type: Date, default: new Date() },
//   icon_svg_uri: { type: String, required: false },
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   object: { type: String, required: true },
//   released_at: { type: Date },
// });

const setsSchema = mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  sets: { type: [Object], required: true },
});

setsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default mongoose.model('Sets', setsSchema);
