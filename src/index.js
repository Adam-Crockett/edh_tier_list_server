import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import axios from 'axios';
import setRoutes from './routes/sets.js';
import { createSets } from './controllers/sets.js';

// import getSets from './services/getScryfallSets.js';

const app = express();
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
app.use(cors());

// app.use('/', setRoutes);
// app.use('/', cardRoutes);

const db = mongoose.connection;

db.once('open', () => {
  createSets();
  console.log('MongoDB connection established...');
});

// app.post('/', setRoutes);

app.use('/', (req, res) => {
  res.send('APP IS RUNNING');
});
mongoose.connect(CONNECTION_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Query to find cards that are: from target sets, can be your commander, one of the target sets is the card's first printing.
// `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3A${set1}+OR+set%3A${set2}%29+%28is%3Acommander+is%3Afirstprint%29`,

async function getCommanders(setArray) {
  try {
    const response = await axios.get(
      `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3Amir+OR+set%3Aneo%29+%28is%3Acommander+is%3Afirstprint%29`,
      {
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
          'Accept-Encoding': 'application/json',
        },
      }
    );

    // for (set in response.data) {

    //   if (set.data.id === '59a2059f-5482-433f-8761-eb2e17859b71') {
    //     console.log(set.data.search_uri)
    //   }

    // }

    let cardCount = 0;

    response.data.data.map((set) => {
      cardCount++;
    });
    console.log(cardCount);
  } catch (error) {
    console.log(error);
  }
}
// const sets = await getSets();
// console.log(sets.length);

// const setArray = ['59a2059f-5482-433f-8761-eb2e17859b71'];

// getCommanders(setArray);
