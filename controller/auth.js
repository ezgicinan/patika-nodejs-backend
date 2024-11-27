const userService = require('../service/user')
//const authService = require('../service/auth')

const authController = {
    login: async(req,res)=>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({message:"Email and password required"})
        }

        try{
            const response = '';
            console.log(req.body.email,'email')
            res.status(200).send({response:req.body})
        }catch(error){
            console.log('Error #auth/login: ', error);
        }
    },
    
    register:async(req,res) => {
        try {
            const response = await userService.createUser(req.body);
            res.status(200).send({response:response})

            /*
            const response2 = await userService.createUser(req.body);
            
            if(response.success == false) {
                return res.status(400).json({
                    success: response.success, 
                    object:response.object,
                    statusCode: 400,
                    response:'User already exist.', 
                    httpMessage:'BAD_REQUEST'})
            }

            res.status(201).json({
                success: response.success, 
                object:response.object, 
                statusCode: 201, 
                response:'User created successfully.', 
                httpMessage:'CREATED'}
                )*/
        } catch (error) {
            console.log("Error #auth/register: ", error);
            return { success: false, message: 'An error occurred during user creation' };
        }
    }
}
module.exports = authController