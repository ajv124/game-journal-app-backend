const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: null
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["backlog", "tracking", "completed"],
        default: "backlog"
    }
}, { timestamps: true });

gameSchema.index({ userId: 1, gameId: 1 },{ unique: true });

module.exports = mongoose.model("Game", gameSchema);
