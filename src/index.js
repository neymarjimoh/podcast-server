const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth.route');
const podcastRoutes = require('./routes/podcast.route');
const connectDB = require('./config/db');

const app = express();

// connect to database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
	res.send('Server working 🔥');
});

app.use('/api/v1/auth', authRoutes); // authentication routes for admin and user
app.use('/api/v1/podcasts', podcastRoutes); // routes for podcasts

// You can set 404 and 500 errors
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	if (error.status === 404)
		res.status(404).json({ message: 'Invalid Request, Request Not found' });
	else {
		console.log(error);
		res.status(500).json({
			message: 'Oops, problem occurred while processing your request..',
		});
	}
});

app.listen(config.PORT, () => {
    console.log(`Server started listening on port ${config.PORT}`);
});