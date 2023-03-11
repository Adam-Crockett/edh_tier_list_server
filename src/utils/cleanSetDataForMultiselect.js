const cleanSetDataForMultiselect = async (sets) => {
  const cleanedSets = [];

  for (const set of sets) {
    cleanedSets.push({
      id: set.id,
      src: set.icon_svg_uri,
      name: set.name,
      code: set.code,
    });
  }

  return cleanedSets;
};

export default cleanSetDataForMultiselect;
