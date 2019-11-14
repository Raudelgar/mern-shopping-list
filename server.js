const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());

//DB Config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Connected...!'))
	.catch(err => console.log(err));

app.get('/health', (req, res) => {
	res.send('Hello World!');
});

//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static(path.resolve(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
	console.log('I am in Production');
}

app.listen(port, () => console.log(`Server Started on port ${port}...!`));
