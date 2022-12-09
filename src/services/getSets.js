import axios from 'axios';
import {
  VALIDEDHSETTYPES,
  VALIDSUBSET,
  EXCEPTIONSETTYPES,
} from '../constants/validEDHSetTypes.js';

//     const validSubset = ['Transformers', 'Unfinity']; Add later to further refine sets response

// After recieving res from Scryfall, remove all invalid sets from res sets
// Helper function defined here as it is only used by the exported function
function validateSets(sets) {
  let validSets = [];

  sets.data.data.map((set) => {
    if (VALIDEDHSETTYPES.includes(set.set_type)) {
      if (
        EXCEPTIONSETTYPES.includes(set.set_type) &&
        !VALIDSUBSET.includes(set.name)
      ) {
      } else {
        validSets.push(set);
      }
    }
  });

  return validSets;
}

// Request a list of all sets from Scryfall
// Use helper, validateSets(), to remove invalid sets from response.
export default async function getSets() {
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
    return validateSets(res);
  } catch (error) {
    console.log(error);
  }
}
