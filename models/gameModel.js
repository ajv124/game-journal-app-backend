
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["backlog", "tracking", "completed"],
        default: "backlog"
    }
}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);
