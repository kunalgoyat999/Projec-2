const express = require('express')

const userController = require('./../Controllers/userController')

const router = express.Router();


router
.route(`/`) 
.get(userController.getallUsers);

router
.route('/:id')
.get(userController.getuser)
.post(userController.createuser)
.patch(userController.updateuser)
.delete(userController.deleteuser);


module.exports = router