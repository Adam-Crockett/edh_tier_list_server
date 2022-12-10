import axios from 'axios';
import {
  VALIDEDHSETTYPES,
  VALIDSUBSET,
  EXCEPTIONSETTYPES,
} from '../constants/validEDHSetTypes.js';

// After recieving res from Scryfall, remove all invalid sets from res sets
// Helper function defined here as it is only used by the exported function
function validateSets(sets) {
  const validSets = sets.data.data.reduce((result, set) => {
    // The set is a valid set type
    if (VALIDEDHSETTYPES.includes(set.set_type)) {
      // The set is not in the exception list
      if (!EXCEPTIONSETTYPES.includes(set.set_type)) {
        result.push(set);
        // The set is in the exception list but is a valid set
      } else if (VALIDSUBSET.includes(set.name)) {
        result.push(set);
      }
    }
    return result;
  }, []);

  return validSets;
}

// Request a list of all sets from Scryfall
// Use helper, validateSets(), to remove invalid sets from response.
export default async function getScryfallSets() {
  const instance = axios.create({
    baseURL: 'https://api.scryfall.com',
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
      'Accept-Encoding': 'application/json',
    },
  });

  try {
    const res = await instance.get('/sets');
    console.log('retrieved sets');
    return validateSets(res);
  } catch (error) {
    console.log(error);
  }
}
