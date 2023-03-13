import getCardData from '../dbOperations/getCardData.js';
import Card from '../models/card.js';
// Fix to send to Client
export const getCards = async (req, res) => {
  if (req.query.setCodes) {
    try {
      const cardData = await getCardData(req.query.setCodes);
      res.status(200).json(cardData);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: 'Error in retrieving cards' });
    }
  }
};
