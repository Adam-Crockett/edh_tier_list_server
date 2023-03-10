import mongoose from 'mongoose';
import Sets from '../models/setsUpdate.js';
import getScryfallSets from '../services/getScryfallSets.js';
import { dayDateCalculation } from '../constants/utilsValues.js';
import createSetData from '../utils/createSetData.js';

export const getSets = async (req, res) => {
  try {
    const now = new Date();
    const validSet = await Sets.findOne().sort({ createdAt: -1 });

    if (validSet || validSet !== null) {
      res.status(200).json(validSet);
    } else {
      const updatedSets = await getScryfallSets();
      const setList = await createSetData(updatedSets);
      const newSetList = new Sets({
        createdAt: new Date(),
      });
      await newSetList.save();
      res.status(201).send({ message: newSetList });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Error in retrieving sets' });
  }
};

// Check for removal of this controller, function baked into detSets controller
export const createSets = async (req, res) => {
  let setList = [];
  let newSetList;
  let currentSets;

  try {
    currentSets = getSets();
    console.log(currentSets.res);
  } catch (error) {
    console.log(error);
  }

  if (currentSets) {
    res
      .status(200)
      .json(currentSets)
      .send({ message: 'A recent set is cached.' });
  }

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

export const updateSets = async (req, res) => {};
