const bcrypt = require('bcryptjs');
const mongooseUser = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function login(userParams) {
    const {email, password } = userParams;
    try {
        const user = await mongooseUser.findOne({ email });
        console.log("User: ", user);

        if(!user || !(await bcrypt.compare(password, user.password))){
            return {message:'Invalid email or password'};
        }
        const token = jwt.sign({email:user.email}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        return {token:token, message:'Login successful'};
    } catch (error) {
        console.log('Error #SERVICE/AUTH/login: ', error);
        return false;
    }
}

async function updateUser(userParams) {
    const id = userParams.id;
    const email = userParams.email;
    try {
        const user = await mongooseUser.findById(id);
        user.email = email;
        const savedUser = await user.save();
        console.log('User updated: ', savedUser);
        return savedUser;
    } catch (error) {
        console.log('Error #SERVICE/AUTH/UpdateUser: ', error);
        return false;   
    }
}

async function deleteUser(userParams){
    const id = userParams.id;
    try{
        const userDelete = await mongooseUser.findByIdAndDelete(id);
        return userDelete;
    }catch(e){
        console.log(e);
        return false;
    }
}


async function login2create(userParams) {
    const {email,password} = userParams;
    try {
        const user = await mongooseUser.findOne({ email });
        console.log("#login-service: user: ", user);

        if(!user){
            return { success: false, object: 'Invalid email or password.' }; //Need to return 401. Adjust this
        }
        const token = 'token';
        /*
        const token = jwt.sign({email:user.email}, proceess.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        */
        /*
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new mongooseUser({ 
            username, 
            email, 
            password: hashedPassword 
        });
        newUser.save();*/

        return { success: true, object: token };
    } catch (error) {
        console.log('Error #UserCreate: ', error);
    }
}

module.exports = {
    login,
    updateUser,
    deleteUser
}