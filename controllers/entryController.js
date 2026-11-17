const entries=require('../models/entryModel')

exports.createEntryController = async (req, res) => {
    try {
        const { id } = req.params
        const { type, title, date, content, images } = req.body
        const newEntry = await entries.create({
            timelineId:id,
            type,
            title,
            date,
            content,
            images
        });
        res.status(201).json(newEntry);
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.getEntriesController = async (req, res) => {
    try {
        const { id } = req.params
        const allEntries = await entries.find({timelineId:id})
        res.status(200).json(allEntries)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}