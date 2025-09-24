const Session = require('../models/sessionModel');

// @desc    Create a sport session
// @route   POST /api/sessions
// @access  Private
const createSession = async (req, res) => {
  const { sport, dateTime, venue, additionalPlayersNeeded } = req.body;

  try {
    const session = new Session({
      sport,
      dateTime,
      venue,
      additionalPlayersNeeded,
      createdBy: req.user.id,
      players: [req.user.id], // The creator automatically joins the session
    });

    const createdSession = await session.save();
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Get all upcoming sport sessions
// @route   GET /api/sessions
// @access  Private
const getSessions = async (req, res) => {
  try {
    // Find sessions where the dateTime is in the future
    const sessions = await Session.find({ dateTime: { $gte: new Date() } })
      .populate('sport', 'name')
      .populate('createdBy', 'name')
      .populate('players', 'name');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Join a sport session
// @route   POST /api/sessions/:id/join
// @access  Private
const joinSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (session) {
      if (session.players.includes(req.user.id)) {
        return res.status(400).json({ message: 'Already joined this session' });
      }
      session.players.push(req.user.id);
      await session.save();
      res.json({ message: 'Joined session successfully' });
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Cancel a created session
// @route   DELETE /api/sessions/:id
// @access  Private
const cancelSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (session) {
            // Check if the logged-in user is the one who created the session
            if (session.createdBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'User not authorized to cancel this session' });
            }
            await session.deleteOne(); // or session.remove() for older mongoose versions
            res.json({ message: 'Session cancelled' });
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { createSession, getSessions, joinSession, cancelSession };