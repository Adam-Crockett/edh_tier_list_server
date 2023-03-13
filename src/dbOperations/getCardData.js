import Card from '../models/card.js';
// Fix to get set Data out of Mongo
const getCardData = async (setCodes) => {
  return Card.find({ set: { $in: setCodes } });
};

export default getCardData;
