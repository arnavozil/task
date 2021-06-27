const mongoose = require('mongoose');
const { oid } = require('../helpers/middlewares');
const { Schema } = mongoose;

const schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    expiresIn: { type: Number, required: true },
    file: { type: String },
    priority: {
        type: String, required: true, 
        enum: ['high', 'moderate', 'low']
    },
    createdBy: { type: oid, required: true },
    createdAt: { type: Number, default: +Date.now() }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => delete ret._id
});

module.exports = {
    todoModel: mongoose.model('Todo', schema)
};    