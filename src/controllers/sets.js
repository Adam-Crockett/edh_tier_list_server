import mongoose from 'mongoose';
import ExpireUpdate from '../models/expireUpdate.js';
import getScryfallSets from '../services/getScryfallSets.js';
import { dayDateCalculation } from '../constants/utilsValues.js';
import createSetData from '../utils/createSetData.js';
import getSetData from '../dbFetch/getSetData.js';
import cleanSetDataForMultiselect from '../utils/cleanSetDataForMultiselect.js';

export const getSets = async (req, res) => {
  try {
    const validSet = await ExpireUpdate.findOne().sort({ createdAt: -1 });

    if (validSet || validSet !== null) {
      const fetchedSets = await getSetData();
      const cleanedSets = await cleanSetDataForMultiselect(fetchedSets);
      res.status(200).json(cleanedSets);
    } else {
      const updatedSets = await getScryfallSets();
      const setList = await createSetData(updatedSets);
      const newExpireUpdate = new ExpireUpdate({
        createdAt: new Date(),
      });
      await newExpireUpdate.save();
      const fetchedSets = await getSetData();
      const cleanedSets = await cleanSetDataForMultiselect(fetchedSets);
      res.status(201).send({ message: cleanedSets });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Error in retrieving sets' });
  }
};

// Check for removal of this controller, function baked into getSets controller
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
