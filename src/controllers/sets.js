import mongoose from 'mongoose';
import Sets from '../models/sets.js';
import getScryfallSets from '../services/getScryfallSets.js';
import { dayDateCalculation } from '../constants/utilsValues.js';

export const getSets = async (req, res) => {
  // try {
  //   if (
  //     Sets.estimatedDocumentCount() >= 1 &&
  //     (currTime - Sets.created_at) / dayDateCalculation > 5
  //     ) {
  //       return;
  //     }
  //     console.log(currTime);
  //   } catch (error) {
  //     res.status(404).json({ message: error.message });
  //   }
};

export const createSets = async (req, res) => {
  let setList = [];
  let newSetList;

  try {
    setList = await getScryfallSets();
    newSetList = new Sets({
      createdAt: new Date(),
      sets: setList,
    });
    console.log(newSetList.sets.length);
  } catch (error) {
    console.log(error);
  }
  try {
    await newSetList.save();
    console.log('saved');
    // res.status(201).json(newSetList);
  } catch (error) {
    console.log(error);
  }
};
