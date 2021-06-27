const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    hash: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    createdAt: { type: Object, default: new Date() },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id,
        delete ret.hash
    }
});

module.exports = {
    userModel: mongoose.model('User', schema)
};    