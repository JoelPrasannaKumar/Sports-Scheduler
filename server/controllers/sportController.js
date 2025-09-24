const Sport = require('../models/sportModel');

// @desc    Create a new sport
// @route   POST /api/sports
// @access  Private/Admin
const createSport = async (req, res) => {
    const { name } = req.body;

    const sportExists = await Sport.findOne({ name });

    if (sportExists) {
        return res.status(400).json({ message: 'Sport already exists' });
    }

    const sport = new Sport({
        name,
        createdBy: req.user.id,
    });

    try {
        const createdSport = await sport.save();
        res.status(201).json(createdSport);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all sports
// @route   GET /api/sports
// @access  Private
const getSports = async (req, res) => {
    try {
        const sports = await Sport.find({});
        res.json(sports);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createSport, getSports };