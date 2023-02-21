const User = require('../models/user.model');

module.exports.getTutors = (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const pageNumber = req.query.pageNumber || 0;
    const filter = { isTutor: true };

    User.find(filter, '-password',)
        .skip(pageNumber * pageSize)
        .limit(pageSize)
        .then(tutors => {
            User.count(filter, (error, tutorCount) => {
                if (error) return res.status(500).json({ message: 'Failed to fetch tutors.' });
                res.status(200).json({ tutorCount, pageCount: Math.ceil(tutorCount / pageSize), tutors });
            });
        })
        .catch((error) => { console.log(error); res.status(500).json({ message: 'Failed to fetch tutors.' }); });
};

module.exports.getTutorById = (req, res) => {
    User.findById(req.params.tutorId, '-password')
        .then(user => {
            if (!user) return res.status(404).json({ message: 'No user found with the provided ID.' });
            res.status(200).json(user);
        })
        .catch(() => { res.status(500).json({ message: 'Failed to fetch user.' }); });
};