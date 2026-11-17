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

    name: {
        type: String,
        required: true
    },

}, { timestamps: true });

timelineSchema.index({ userId: 1, gameId: 1 },{ unique: true });

module.exports = mongoose.model("timelines", timelineSchema);
