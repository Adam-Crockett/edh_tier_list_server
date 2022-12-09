import mongoose from 'mongoose';

const setSchema = mongoose.Schema({
  code: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  icon_svg_uri: { type: String, required: false },
  id: { type: String, required: true },
  name: { type: String, required: true },
  object: { type: String, required: true },
});

export default mongoose.model('Set', setSchema);
