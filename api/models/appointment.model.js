const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectMatter: { type: String, required: true }, // e.g., "CS 3305"
    duration: { type: Number, required: true, default: 1 }, // 1 means 1 hour. e.g., 2 = 2 hours, 3 = 3 hours. decimals are not allowed
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    meetingUrl: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Appointment', appointmentSchema);