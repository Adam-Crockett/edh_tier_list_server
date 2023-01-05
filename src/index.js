import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import axios from 'axios';
import setRoutes from './routes/sets.js';
import { createSets } from './controllers/sets.js';
import bodyParser from 'body-parser';

// import getSets from './services/getScryfallSets.js';

const app = express();
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/sets', setRoutes);
// app.use('/sets', (req, res) => res.status(200).json({ message: 'test' }));
// app.use('/', cardRoutes);

// db.once('open', () => {
//   // createSets();
//   console.log('MongoDB connection established...');
// });

// app.post('/', setRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});
const db = mongoose.connection;
mongoose
  .connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Query to find cards that are: from target sets, can be your commander, and one of the target sets is the card's first printing.
// `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3A${set1}+OR+set%3A${set2}%29+%28is%3Acommander+is%3Afirstprint%29`,

// async function getCommanders(setArray) {
//   try {
//     const response = await axios.get(
//       `https://api.scryfall.com/cards/search?order=name&q=legal%3Acommander+%28set%3Amir+OR+set%3Aneo%29+%28is%3Acommander+is%3Afirstprint%29`,
//       {
//         responseType: 'json',
//         responseEncoding: 'utf8',
//         headers: {
//           'Accept-Encoding': 'application/json',
//         },
//       }
//     );

//     // for (set in response.data) {

//     //   if (set.data.id === '59a2059f-5482-433f-8761-eb2e17859b71') {
//     //     console.log(set.data.search_uri)
//     //   }

//     // }

//     let cardCount = 0;

//     response.data.data.map((set) => {
//       cardCount++;
//     });
//     console.log(cardCount);
//   } catch (error) {
//     console.log(error);
//   }
// }
// const sets = await getSets();
// console.log(sets.length);

// const setArray = ['59a2059f-5482-433f-8761-eb2e17859b71'];

// getCommanders(setArray);
