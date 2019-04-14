const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const items = require('./routes/api/items');

//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...!'))
	.catch(err => console.log(err));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

//Use Routes
app.use('/api/items', items);

app.listen(port, () => console.log(`Server Started on port ${port}...!`));
