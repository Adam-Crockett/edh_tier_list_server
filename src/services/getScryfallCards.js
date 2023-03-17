import axios from 'axios';

export default async function getScryfallCards(setList) {
  const instance = axios.create({
    baseURL: 'https://api.scryfall.com',
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
      'Accept-Encoding': 'application/json',
    },
  });
  const completeResult = [];
  let sucessCount = 0;
  const setsWithNoValidCards = [];
  console.log('Retrieving cards from sets...');
  for (let set of setList) {
    try {
      const res = await instance.get(requestConstructor(set));
      if (res.status === 200) {
        completeResult.push(res.data);
        sucessCount += 1;
      } else {
      }
    } catch (error) {
      setsWithNoValidCards.push(set);
      // console.error(`Could not fetch cards from this set: ${set}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.log(`Cards retrieved from ${sucessCount} sets on scryfall.`);
  return [completeResult, setsWithNoValidCards];
}

function requestConstructor(code) {
  return `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3A${code}%29+%28is%3Acommander+is%3Afirstprint%29`;
}

// Query to find cards that are: from target sets, can be your commander, and one of the target sets is the card's first printing.
// `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3A${set1}+OR+set%3A${set2}%29+%28is%3Acommander+is%3Afirstprint%29`,
