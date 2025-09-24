const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  joinSession,
  cancelSession,
} = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createSession).get(protect, getSessions);
router.route('/:id/join').post(protect, joinSession);
router.route('/:id').delete(protect, cancelSession);

module.exports = router;