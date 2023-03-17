import Set from '../models/set.js';

const removeSetsWithNoCards = async (setsWithNoValidCards) => {
  console.log(setsWithNoValidCards);
  try {
    Set.deleteMany({ code: { $in: setsWithNoValidCards } }, (error) => {
      if (error) {
        console.error('Failed to removed sets with no valid cards.');
      } else {
        console.log('Empty sets removed.');
      }
    });
  } catch (error) {
    console.error('Could not remove set');
  }
};

export default removeSetsWithNoCards;
