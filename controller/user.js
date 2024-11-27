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
                const response = await userService.deleteUser(req.body);
                console.log('Update user response: ', response);
                res.status(200).send({response:response})
            } catch (e) {
                console.log('Error #user/update: ', e);
            }
    }
}
module.exports = userController