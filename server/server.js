const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 4000;

const usersRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const bidsRoute = require('./routes/bidsRoute');
const notificationsRoute = require('./routes/notificationsRoute');

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationsRoute);


app.listen(port, ()=> console.log(`node js server is started on port ${port}`));