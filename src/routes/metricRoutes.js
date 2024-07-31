const express = require('express');
const router = express.Router();
const metricController = require('../controllers/metricController');

router.get('/', metricController.getTaskMetrics);

module.exports = router;