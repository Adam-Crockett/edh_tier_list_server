import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
  id: { type: String, required: true },
  set_id: { type: String, required: true },
  set: { type: String, required: true },
  object: { type: String, requried: true },
  legalities: { type: legalitiesObject, required: true },
  name: { type: String, required: true },
  card_faces: { type: Object }, // Further implementation; for the sub-cards of this. Address Dual faced cards.
  all_parts: { type: Object }, // Further implementation; for cards like meld commanders and possible others.
  image_status: { type: String, required: true },
  // Need to pick what images to pick up and what to store vs API reference
  mana_cost: String,
  colors: [String],
  color_identity: [String],
  type_line: String,
  oracle_text: String,
  power: String,
  toughness: String,
  createdAt: { type: Date, default: new Date() },
});

const legalitiesObject = mongoose.Schema({
  commander: { type: String },
});

export default mongoose.model('Card', cardSchema);
