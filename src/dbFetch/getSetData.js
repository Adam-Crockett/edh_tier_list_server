import mongoose from 'mongoose';
import Set from '../models/set.js';
const getSetData = async () => {
  try {
    const allSetData = await Set.find();
    return allSetData;
  } catch (error) {
    console.log(error);
  }
};

export default getSetData;
