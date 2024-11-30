const express = require('express');
const userController = require('../controller/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/korumali', authMiddleware, function test(req,res){
    console.log('test')
    res.status(200).send({message:'success'})
})
router.delete('/:id', authMiddleware, userController.deleteUser)
router.put('/', authMiddleware, userController.updateUser);
router.get('/:id', authMiddleware, userController.getUser);
router.get('/', authMiddleware, userController.getUsers);



/*
router.get('/', authMiddleware.userController.getUsers);
router.get('/:id', authMiddleware, userController.getUser);
*/
module.exports = router;