const User = require('../models/user.model');

module.exports.getUsers = (req, res) => {
    User.find({}, '-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => res.status(500).json({ message: 'Failed to fetch users.' }));
};

module.exports.getUserById = (req, res) => {
    User.findById(req.params.userId, '-password')
        .then(user => {
            if (!user) return res.status(404).json({ message: 'No user found with the provided ID.' });
            res.status(200).json(user);
        })
        .catch(() => { res.status(500).json({ message: 'Failed to fetch user.' }); });
};