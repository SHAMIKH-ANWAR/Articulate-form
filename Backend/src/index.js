const express = require('express');
const cors = require('cors');
const connectDB = require('./db/dbConnect');
const formRoutes = require('./routes/formRoutes');
const uploadRoutes = require('./utils/upload');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [
    'https://articulate-form.vercel.app',
    'http://localhost:5173',
  ],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

connectDB();

app.use('/', formRoutes);
app.use('/api', uploadRoutes);

app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	res.status(status).json({
		error: status === 500 ? 'Internal Server Error' : err.message,
		message: err.message,
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
