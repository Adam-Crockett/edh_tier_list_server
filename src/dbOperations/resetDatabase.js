import resetSetData from './resetSetData.js';
import requestNewSetCodes from './requestNewSetCodes.js';
import getScryfallCards from '../services/getScryfallCards.js';
import setNewCards from './setNewCards.js';
import removeSetsWithNoCards from './removeSetsWithNoCards.js';
export default async function resetDatabase() {
  try {
    await resetSetData();
    const newSetCodes = await requestNewSetCodes();
    const [fullCardData, setsWithNoValidCards] = await getScryfallCards(
      newSetCodes
    );
    await setNewCards(fullCardData);
    await removeSetsWithNoCards(setsWithNoValidCards);
    // return cardsAddedToDatabase;
  } catch (error) {
    console.error('Could not reset database succesfully', error);
  }
}
