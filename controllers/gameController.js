const axios = require('axios')
const games = require("../models/gameModel");

exports.getGamesController = async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.rawg.io/api/games',
            {
                params: {
                    key: process.env.RAWG_API_KEY,
                    page: req.query.page,
                    page_size: req.query.limit,
                    search: req.query.search,
                    search_precise: true,
                    search_exact: true,
                    parent_platforms: req.query.platforms || undefined,
                    genres: req.query.genres || undefined,
                    ordering: req.query.sort || "-added",
                }
            }
        );
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response?.status || 500).json('Failed to get games')
    }
}

exports.getGenresController = async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.rawg.io/api/genres',
            {
                params: {
                    key: process.env.RAWG_API_KEY,
                    page_size: 40
                }
            }
        );
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response?.status || 500).json('Failed to get genres')
    }
}

exports.getPlatformsController = async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.rawg.io/api/platforms/lists/parents',
            {
                params: {
                    key: process.env.RAWG_API_KEY,
                    page_size: 40
                }
            }
        );
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response?.status || 500).json('Failed to get platforms')
    }
}

exports.getScreenshotsController = async (req, res) => {
    try {
        const { id } = req.params
        const response = await axios.get(
            `https://api.rawg.io/api/games/${id}/screenshots`,
            {
                params: {
                    key: process.env.RAWG_API_KEY,
                    page_size: 40
                }
            }
        );
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response?.status || 500).json('Failed to get platforms')
    }
}

exports.getSingleGameController = async (req, res) => {
    try {
        const { id } = req.params
        const response = await axios.get(
            `https://api.rawg.io/api/games/${id}`,
            {
                params: {
                    key: process.env.RAWG_API_KEY,
                }
            }
        );
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response?.status || 500).json('Failed to get game')
    }
}

exports.saveGameController = async (req, res) => {
    try {
        const { id } = req.params
        const { name, coverImage } = req.body
        const userId = req.payload.userId
        const existingGame = await games.findOne({ gameId: id, userId });
        if (existingGame) {
            return res.status(409).json("Game already saved");
        }
        const newGame = await games.create({
            gameId: id,
            name,
            coverImage,
            userId
        });
        res.status(201).json(newGame);
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.getSavedGamesController = async (req, res) => {
    try {
        const userId = req.payload.userId
        const savedGames = await games.find({ userId });
        res.status(200).json(savedGames)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.removeGameController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.payload.userId
        const deletedGame = await games.findOneAndDelete({
            gameId: id,
            userId
        });
        if (!deletedGame) {
            return res.status(404).json("Game not found");
        }
        res.status(200).json("Game removed successfully");
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.getTimelineGameController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.payload.userId
        const timelineGame = await games.findOne({
            gameId: id,
            userId
        })
        if (!timelineGame) {
            return res.status(404).json("Game not found")
        }
        res.status(200).json(timelineGame)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.changeStatusController = async (req, res) => {
    try {
        const { id } = req.params
        const {status} = req.body
        const userId = req.payload.userId
        const updatedGame = await games.findOneAndUpdate(
            { gameId: id, userId },
            { status },
            { new: true }
        )
        if (updatedGame) {
            return res.status(200).json(updatedGame)
        } else {
            return res.status(409).json("Game has been deleted")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}