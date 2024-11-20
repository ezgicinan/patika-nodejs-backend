const userService = require('../service/user')
const authController = {
    login: async(req,res)=>{
        try{
            console.log(req.body.email,'email')
            console.log(req.body.password,'password')
            //res.status(200).send({response:req.body})
            res.status(200).send({response:{}})
        }catch(e){
            console.log(e,'error')
        }
    },
    register:async(req,res) => {
        try {
            console.log('geldi');
            const response = await userService.createUser(req.body);
            res.status(200).send({response:'success'})
        } catch (error) {
            console.log("authControl ERR: ", e);
        }
    }
}
module.exports = authController