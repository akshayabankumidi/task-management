const express = require('express');
const bodyParser = require('body-parser');
const { authRoutes, taskRoutes, metricRoutes } = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { authenticateToken } = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());


app.use('/auth', authRoutes);
app.use('/tasks', authenticateToken, taskRoutes);
app.use('/metrics', authenticateToken, metricRoutes);


app.use(errorHandler);

module.exports = app;