import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
  all_parts: { type: Object }, // Further implementation; for cards like meld commanders and possible others.
  card_faces: { type: Object }, // Further implementation; for the sub-cards of this. Address Dual faced cards.
  color_identity: [String],
  colors: [String],
  createdAt: { type: Date, default: new Date() },
  id: { type: String, required: true },
  image_status: { type: String, required: true },
  // Need to pick what images to pick up and what to store vs API reference
  legalities: { type: legalitiesObject, required: true }, // This may not be needed based on use scope
  mana_cost: String,
  name: { type: String, required: true },
  object: { type: String, requried: true },
  oracle_text: String,
  power: String,
  set_id: { type: String, required: true },
  set: { type: String, required: true },
  toughness: String,
  type_line: String,
});

const legalitiesObject = mongoose.Schema({
  commander: { type: String },
});

export default mongoose.model('Card', cardSchema);
