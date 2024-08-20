const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound,errorHandler } = require('./middleware/errorMiddleware');
const cron = require('node-cron');
const evaluateTests = require('./controllers/testController').evaluateTests;

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

cron.schedule('0 * * * *', evaluateTests);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
