const userService = require('../service/user')

const userController = {
    updateUser:async(req,res) => {
        try {
            const response = await userService.updateUser(req.body);
            console.log('Update user response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #user/update: ', e);
        }
    },
    deleteUser:async(req,res) => {
            try {
                const response = await userService.deleteUser(req.params);
                console.log('Update user response: ', response);
                res.status(200).send({response:response})
            } catch (e) {
                console.log('Error #user/update: ', e);
            }
    },
    getUser:async(req,res) => {
        try {
            const response = await userService.getUser(req.params);
            console.log('Get user response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/getById: ', e);
        }
    },
    getUsers:async(req,res) => {
        try {
            const response = await userService.getUsers(req.params);
            console.log('Get all users: $(response) ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/getAll: ', e);
        }
    },

}
module.exports = userController