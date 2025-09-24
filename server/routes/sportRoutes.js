const express = require('express');
const router = express.Router();
const { createSport, getSports } = require('../controllers/sportController');
const { protect, admin } = require('../middleware/authMiddleware');

// Only admins can create a sport, but any authenticated user can view them.
router.route('/').post(protect, admin, createSport).get(protect, getSports);

module.exports = router;