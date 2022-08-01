const express = require("express");
const roleRouter = express.Router();
const { authenticateToken } = require("../service/jsonwebToken");

//import module
const roleController =require('../controller/roleController')


try {
/*******************
 **      GET      **              
 *******************/
    

roleRouter.get('/role',roleController.getAllRole);

/*******************
 **      POST    **              
 *******************/
roleRouter.post('/project/:id/addparticipantrole',roleController.addRoleCustomer);
roleRouter.post('/project/:id/addroletoproject',roleController.addRoleToproject);

/*******************
 **      DELETE      **              
 *******************/

/*******************
 **      PATCH      **              
 *******************/
} catch (error) {

}
 module.exports = roleRouter ;