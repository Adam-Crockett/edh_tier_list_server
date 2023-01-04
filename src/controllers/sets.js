import mongoose from 'mongoose';
import Sets from '../models/sets.js';
import getScryfallSets from '../services/getScryfallSets.js';
import { dayDateCalculation } from '../constants/utilsValues.js';

export const getSets = async (req, res) => {
  // res.status(200).json({ message: 'test' });
  try {
    const now = new Date();
    const validSet = await Sets.findOne({
      daterating: {
        $gte: new Date(now.getFullYear, now.getMonth, now.getDay - 7),
        $lte: new Date(),
      },
    }).sort({ createdAt: -1 });
    if (validSet) {
      return res.status(200).json(validSet);
    }
  } catch (error) {
    console.log(error);
  }
};

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
