import Set from '../models/set.js';

const createSetData = async (fetchedSets) => {
  const setList = [];
  for (const set of fetchedSets) {
    const newSet = new Set({
      code: set.code,
      createdAt: new Date(),
      icon_svg_uri: set.icon_svg_uri,
      id: set.id,
      name: set.name,
      object: set.object,
      released_at: set.released_at,
      scryfall_uri: set.scryfall_uri,
      search_uri: set.search_uri,
    });
    await newSet.save();
    setList.push(newSet);
  }
  return setList;
};

export default createSetData;
