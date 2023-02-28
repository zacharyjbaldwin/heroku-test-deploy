const User = require('../models/user.model');
const { validationResult } = require('express-validator');

module.exports.toggleFavoriteTutor = (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required parameters is missing or malformed.' });
    }

    const userId = req.userData.userId;
    const tutorId = req.query.tutorId;

    User.findById(userId)
        .then(user => {
            if (user.favoriteTutors.includes(tutorId)) {
                user.favoriteTutors.splice(user.favoriteTutors.indexOf(tutorId), 1);
            } else {
                user.favoriteTutors.push(tutorId);
            }

            user.save()
                .then(() => { res.status(200).json({ message: 'Toggled favorite tutor.' }); })
                .catch(() => { res.status(500).json({ message: 'Failed to toggle favorite tutor.' }); });
        })
        .catch(() => { res.status(500).json({ message: 'Failed to toggle favorite tutor.' }); });
};