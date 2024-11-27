const bcrypt = require('bcryptjs');
const mongooseUser = require('../model/user')
//const jwt = require('jsonwebtoken')

async function createUser(userParams) {
    const { username, email, password } = userParams;
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new mongooseUser({ 
            username, 
            email, 
            password: hashedPassword 
        });

        newUser.save();
        return true;
    } catch (error) {
        console.log('Error #SERVICE/AUTH/UserCreate: ', error);
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


async function login(userParams) {
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

        return { success: true, object: token };
    } catch (error) {
        console.log('Error #UserCreate: ', error);
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}