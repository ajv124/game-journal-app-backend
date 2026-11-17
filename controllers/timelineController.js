const timelines=require('../models/timelineModel')

exports.createTimelineController = async (req, res) => {
    try {
        const { id } = req.params
        const { name  } = req.body
        const userId = req.payload.userId
        const newTimeline = await timelines.create({
            gameId: id,
            userId,
            name
        });
        res.status(201).json(newTimeline);
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.getTimelinesController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.payload.userId
        const allTimelines = await timelines.find({
            gameId: id,
            userId
        })
        res.status(200).json(allTimelines)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}