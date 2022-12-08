import mongoose from 'mongoose';

const setSchema = mongoose.Schema({
  id: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  icon_svg_uri: { type: String, required: false },
});

export default mongoose.model('Set', setSchema);
