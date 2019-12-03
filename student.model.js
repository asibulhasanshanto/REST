const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: String,
    dpt: String,
    id: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Students', studentSchema);