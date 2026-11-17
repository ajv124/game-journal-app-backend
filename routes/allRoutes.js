const express=require('express')
const router=new express.Router()
const userController=require('../controllers/userController')
const gameController=require('../controllers/gameController')
const timelineController=require('../controllers/timelineController')
const entryController=require('../controllers/entryController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/logout',userController.logoutController)

router.get('/me',authMiddleware,userController.getUserController)

router.get('/games',gameController.getGamesController)

router.get('/genres',gameController.getGenresController)

router.get('/platforms',gameController.getPlatformsController)

router.get('/screenshots/:id',gameController.getScreenshotsController)

router.get('/get-game/:id',gameController.getSingleGameController)

router.post('/save-game/:id',authMiddleware,gameController.saveGameController)

router.get('/saved-games',authMiddleware,gameController.getSavedGamesController)

router.delete('/remove-game/:id',authMiddleware,gameController.removeGameController)

router.get('/timeline-game/:id',authMiddleware,gameController.getTimelineGameController)

router.post('/create-timeline/:id',authMiddleware,timelineController.createTimelineController)

router.put('/status/:id',authMiddleware,gameController.changeStatusController)

router.get('/timelines/:id',authMiddleware,timelineController.getTimelinesController)

router.get('/entries/:id',authMiddleware,entryController.getEntriesController)

router.post('/create-entry/:id',authMiddleware,entryController.createEntryController)

module.exports=router