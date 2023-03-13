import Card from '../models/card.js';
// Fix to get set Data out of Mongo
const getCardData = async (setCodes) =>
  Card.find({ set: { $in: setCodes } }, (error, cardData) => {
    if (error) {
      console.error(error);
    }
    return cardData;
  });

export default getCardData;
