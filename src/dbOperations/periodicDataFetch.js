import resetDatabase from './resetDatabase.js';

const periodicDataFetch = async (callback, interval) => {
  setInterval(() => {
    resetDatabase();
  }, interval);
  callback();
};

export default periodicDataFetch;
