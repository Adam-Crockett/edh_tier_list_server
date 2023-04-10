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
  const now = new Date();
  const TwoWeeksFromNow = new Date(now.getTime() + 12096e5);
  console.log('Retrieving cards from sets...');
  for (let set of setList) {
    try {
      const setReleaseDate = new Date(set[1]);
      const res = (await setReleasesWithinTwoWeeks(
        now,
        TwoWeeksFromNow,
        setReleaseDate
      ))
        ? await instance.get(futureSetConstructor(set[0]))
        : await instance.get(requestConstructor(set[0]));

      if (res.status === 200) {
        console.log(`Cards retrieved from set: ${set[0]}`);
        completeResult.push(res.data);
        sucessCount += 1;
      } else {
      }
    } catch (error) {
      setsWithNoValidCards.push(set[0]);
      console.error(`Could not fetch cards from this set: ${set[0]}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.log(`Cards retrieved from ${sucessCount} sets on scryfall.`);
  return [completeResult, setsWithNoValidCards];
}

function setReleasesWithinTwoWeeks(now, TwoWeeksFromNow, setReleaseDate) {
  return setReleaseDate >= now && setReleaseDate <= TwoWeeksFromNow;
}

function requestConstructor(code) {
  return `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3A${code}%29+%28is%3Acommander+is%3Afirstprint%29`;
}

function futureSetConstructor(code) {
  console.log('future set');
  return `https://api.scryfall.com/cards/search?order=name&q=%28game%3Apaper%29+set%3A${code}+is%3Acommander+is%3Afirstprint`;
}

// Query to find cards that are: from target sets, can be your commander, and one of the target sets is the card's first printing.
// `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3A${set1}+OR+set%3A${set2}%29+%28is%3Acommander+is%3Afirstprint%29`,

// Query for cards that can be a commander: This query is used to find cards that can be your commander from a set that is not released yet, cards may not be legal or have full data set2:
// https://api.scryfall.com/cards/search?order=name&q=%28game%3Apaper%29+set%3Amom+is%3Acommander+is%3Afirstprint
