import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import setRoutes from './routes/sets.js';
import cardRoutes from './routes/cards.js';
import bodyParser from 'body-parser';
import periodicDataFetch from './dbOperations/periodicDataFetch.js';

const app = express();
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/sets', setRoutes);
app.use('/cards', cardRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});
// const db = mongoose.connection;
// mongoose
//   .connect(CONNECTION_URL, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
//   )
//   .catch((error) => console.log(error.message));

mongoose
  .connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Server running on port: ${PORT}`))
  .catch((error) => console.log(error.message));

app.listen(PORT);

periodicDataFetch(() => {
  console.log('Periodic data fetch started');
}, 86400000);

// 86400000
