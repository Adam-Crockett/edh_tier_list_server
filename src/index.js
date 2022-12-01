import express from 'express';
import mongoose from 'mongoose';
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

    response.data.data.map((set) => {
      console.log(set.name);
    });

    // JSON.parse(response.data).map((set) => console.log(set.name));
    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

getSets();
