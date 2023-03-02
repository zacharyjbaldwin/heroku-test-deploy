const { validationResult } = require('express-validator');

module.exports.toggleFavoriteTutor = (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required parameters is missing or malformed.' });
    }

    const userId = req.userData.userId;
    const tutorId = req.query.tutorId;

    // waiting on route protection middleware to continue

    res.json({ message: 'Waiting on route protection middleware to continue.' });
};