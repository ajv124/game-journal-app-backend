const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    timelineId: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "milestone",
            "note",
            "memory",
            "review",
            "achievement",
            "boss"
        ],
        required: true
    },

    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    content: {
        type: String,
        default: ""
    },

    images: {
        type: [String],
        default: []
    },

}, { timestamps: true });

entrySchema.index({ userId: 1, gameId: 1 },{ unique: true });

module.exports = mongoose.model("entries", entrySchema);
