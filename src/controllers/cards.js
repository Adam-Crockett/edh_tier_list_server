import getScryfallCards from '../services/getScryfallCards.js';
export const getCards = async (req, res) => {
  console.log(req.query.setCodes);
  if (req.query.setCodes) {
    try {
      const scryfallResponse = await getScryfallCards(req.query.setCodes);
      console.log(scryfallResponse);
    } catch (error) {
      console.log(error);
    }
  }
};
