const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const itemsRoutes = require('./routes/routesItems');
const usersRoutes = require('./routes/routesUser');

dotenv.config(); 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.status(200).send('WORKING!');
});

app.use('/items', itemsRoutes);
app.use('/users', usersRoutes);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
