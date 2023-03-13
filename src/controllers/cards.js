import getCardData from '../dbOperations/getCardData.js';
import Card from '../models/card.js';
// Fix to send to Client
export const getCards = async (req, res) => {
  if (req.query.setCodes) {
    try {
      const cardDatas = Card.find(
        { set: { $in: req.query.setCodes } },
        (error, cardData) => {
          if (error) {
            console.error(error);
          }
          return cardData;
        }
      );
      console.log(cardDatas);
      res.status(200).json(cardDatas);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: 'Error in retrieving cards' });
    }
  }
};
