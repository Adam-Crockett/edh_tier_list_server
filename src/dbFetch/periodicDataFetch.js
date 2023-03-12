import Set from '../models/set.js';
import getScryfallSets from '../services/getScryfallSets.js';

const periodicDataFetch = (callback, interval) => {
  setInterval(() => {
    Set.deleteMany({}, async (err) => {
      if (err) {
        console.log('Error deleting current set collection', err);
      } else {
        console.log('All documents in set collection deleted');

        const fetchedData = await getScryfallSets();

        Set.create(fetchedData, (err, docs) => {
          if (err) {
            console.log('Error saving set documents', err);
          } else {
            console.log('New set data saved');
          }
        });
      }
    });
  }, interval);
  callback();
};

export default periodicDataFetch;
