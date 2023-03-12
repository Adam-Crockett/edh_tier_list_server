import getSetData from '../dbFetch/getSetData.js';
import cleanSetDataForMultiselect from '../utils/cleanSetDataForMultiselect.js';

export const getSets = async (req, res) => {
  try {
    const fetchedSets = await getSetData();
    const cleanedSets = await cleanSetDataForMultiselect(fetchedSets);
    res.status(200).json(cleanedSets);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Error in retrieving sets' });
  }
};

export const updateSets = async (req, res) => {};
