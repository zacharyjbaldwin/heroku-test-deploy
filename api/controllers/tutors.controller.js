const { validationResult } = require('express-validator');
const User = require('../models/user.model');

module.exports.getTutors = (req, res) => {
    const pageSize = req.query.pageSize || 8;
    const pageNumber = req.query.pageNumber || 0;
    const filter = { isTutor: true };
    const search = req.query.searchQuery ? req.query.searchQuery.trim().toLowerCase() : undefined;

    if (search) {
        User.find(filter, '-password')
            .then(users => {
                let foundUsers = users.filter(user => {
                    const nameMatch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(search);
                    const skillMatch = user.skills.includes(search.toUpperCase());
                    return nameMatch || skillMatch;
                });

                res.status(200).json({
                    tutorCount: foundUsers.length,
                    pageCount: Math.ceil(foundUsers.length / pageSize),
                    pageNumber,
                    tutors: foundUsers.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize)
                });
            })
            .catch((error) => { console.log(error); res.status(500).json({ message: 'Failed to fetch tutors.' }); });
    } else {
        User.find(filter, '-password')
            .skip(pageNumber * pageSize)
            .limit(pageSize)
            .then(tutors => {
                User.count(filter, (error, tutorCount) => {
                    if (error) return res.status(500).json({ message: 'Failed to fetch tutors.' });
                    res.status(200).json({ tutorCount, pageCount: Math.ceil(tutorCount / pageSize), pageNumber, tutors });
                });
            })
            .catch((error) => { console.log(error); res.status(500).json({ message: 'Failed to fetch tutors.' }); });
    }

};

module.exports.getTutorById = (req, res) => {
    User.findById(req.params.tutorId, '-password')
        .then(user => {
            if (!user) return res.status(404).json({ message: 'No user found with the provided ID.' });
            res.status(200).json(user);
        })
        .catch(() => { res.status(500).json({ message: 'Failed to fetch user.' }); });
};

// do not use this route for signing up tutors
module.exports.createTutor = (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required parameters is missing or malformed.' });
    }

    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'.split(' ');

    const { firstName, lastName, skills, availability } = req.body;

    const tutor = new User({
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@utdallas.edu`,
        password: 'password123',
        favoriteTutors: [],
        isTutor: true,
        isAdmin: false,
        aboutMe: lorem.splice(0, Math.floor(Math.random() * lorem.length)).join(' '),
        skills,
        profilePictureUrl: 'https://placeholder.com/assets/images/150x150-2-500x500.png',
        availability
    });

    tutor.save()
        .then(tutor => { res.status(201).json(tutor); })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: 'Failed to create tutor.' });
        });
};

module.exports.updateTutor = (req, res) => {
    User.findByIdAndUpdate(req.params.tutorId, req.body, { new: true })
        .then(tutor => { res.status(200).json({ message: 'Updated tutor', tutor }); })
        .catch(() => { res.status(500).json({ message: 'Failed to update tutor.' }); });
};

module.exports.deleteTutor = (req, res) => {
    User.findByIdAndDelete(req.params.tutorId)
        .then(() => { res.status(204).json({ message: 'Deleted tutor.' }); })
        .catch(() => { res.status(500).json({ message: 'Failed to delete tutor.' }); });
}