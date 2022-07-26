const express = require ('express');
const userRouter = express.Router();
const { authenticateToken } = require('../service/jsonwebToken')

//import module
const userController = require('../controller/userController');
const { handleRefreshToken } = require('../controller/refreshTokenController');
const refreshTokenController = (require('../controller/refreshTokenController'))
const logoutController = (require('../controller/logoutController'))

//validation des données
const { createProject, updateUser, createUser, updateProject } = require('../validator/schema/index');
const { createValidator } = require('express-joi-validation');
const validate = createValidator() 


//GET
userRouter.get('/',(_, res)=>{
    res.setHeader('Content-Type', 'application/json')
    res.send("votre feature validtion d'email est terminée")
});
userRouter.get('/users',userController.fetchAllUser);
userRouter.get('/user/verify/:id/:verificationLink', userController.checkVerificationLink)
userRouter.get('/user/:id(\\d+)',userController.fetchOneUserById);
userRouter.get('/user/:email',userController.fetchOneUserBymail);

userRouter.get('/home',authenticateToken, (_, res) => {
    res.send('Vous êtes bien connecté')
})

userRouter.get("/homes", (_, res) => {
    console.log("123");
    res.send("index");
});
//token

//POST
/**
 * POST /post 
 * @tags Articles
 * @descrition lamain dans mon slip
 * @parameters bla bla bla
 * 
 */
userRouter.get('/user/refreshToken', refreshTokenController.handleRefreshToken);
userRouter.get('/user/logout', logoutController.handleLogout);
userRouter.post('/user/create',validate.body(createUser),userController.create);
userRouter.post('/user/login', userController.logIn);

//PATCH
userRouter.patch('/user/:id', userController.updateUser);

//DELETE
userRouter.delete('/user/:id',userController.deleteUser);

module.exports = userRouter ;