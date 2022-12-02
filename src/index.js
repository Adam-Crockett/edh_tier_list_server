import express from 'express';
import mongoose, { set } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import axios from 'axios';

dotenv.config();
const app = express();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(CONNECTION_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB connection established...');
});

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

async function getSets() {
  try {
    const response = await axios.get('https://api.scryfall.com/sets', {
      responseType: 'json',
      responseEncoding: 'utf8',
      headers: {
        'Accept-Encoding': 'application/json',
      },
    });

    const setTypeSet = new Set();
    const setValidEDH = new Set();

    // masterpiece: only Transformers, funny: only Unfinity,

    const validEDHSetType = [
      'masters',
      'commander',
      'expansion',
      'draft_innovation',
      'masterpiece',
      'funny',
      'core',
    ];

    const validSubset = ['Transformers', 'Unfinity'];

    let setCount = 0;

    response.data.data.map((set) => {
      if (validEDHSetType.includes(set.set_type)) {
        console.log(set.name, set.id);
        setCount++;
      }
    });
    console.log(setCount);
  } catch (error) {
    console.log(error);
  }
}

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

// getSets();

// const setArray = ['59a2059f-5482-433f-8761-eb2e17859b71'];

// getCommanders(setArray);
