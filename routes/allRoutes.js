const express=require('express')
const router=new express.Router()
const userController=require('../controllers/userController')
const gameController=require('../controllers/gameController')
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

module.exports=router