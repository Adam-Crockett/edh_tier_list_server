import Card from '../models/card.js';
export default async function setNewCards(fullCardData) {
  Card.deleteMany({}, async (error) => {
    if (error) {
      console.log('Error deleting current card collection', error);
    } else {
      console.log('All documents in card collection deleted');
      // Create new card data on db
      try {
        for (let setCardData of fullCardData) {
          Card.create(setCardData.data, (error) => {
            if (error) {
              console.log('Error saving card data', error);
            }
          });
        }
        console.log('New cards saved to database');
      } catch (error) {
        console.log(error);
      }
    }
  });
}
