import Set from '../models/set.js';
import getScryfallSets from '../services/getScryfallSets.js';
export default async function resetSetData() {
  Set.deleteMany({}, async (error) => {
    if (error) {
      console.log('Error deleting current set collection', error);
    } else {
      console.log('All documents in set collection deleted');
      // Request new Set data from Scryfall
      const fetchedData = await getScryfallSets();
      // Create new set data on db
      Set.create(fetchedData, (error) => {
        if (error) {
          console.log('Error saving set documents', error);
          return false;
        } else {
          console.log('New set data saved');
          return true;
        }
      });
    }
  });
}
