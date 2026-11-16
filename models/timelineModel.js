
const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },

    userId: {
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

    content: {
        type: String,
        default: ""
    },

    images: {
        type: [String],
        default: []
    },

    entryDate: {
        type: Date,
        default: Date.now,
        required: true
    },

}, { timestamps: true });

timelineSchema.index({ userId: 1, gameId: 1 },{ unique: true });

module.exports = mongoose.model("Timeline", timelineSchema);
