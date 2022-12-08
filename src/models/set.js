import mongoose from 'mongoose';

const setSchema = mongoose.Schema({
  id: { type: String, required: true },
  object: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  icon_svg_uri: { type: String, required: false },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model('Set', setSchema);
