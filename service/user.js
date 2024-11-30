const bcrypt = require('bcryptjs');
const mongooseUser = require('../model/user')

async function createUser(userParams) {
    const {username,email,password} = userParams;
    try {
        // Check if a user with the same email exists
        const existingUser = await mongooseUser.findOne({ email });

        if (existingUser) {
            console.log('#UserCreate: User already exists with this email');
            return { success: false, object: 'User with this email already exists' };
        }

        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new mongooseUser({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save();
        return { success: true, object: 'User created successfully.' };
    } catch (error) {
        console.log('Error #UserCreate: ', error);
    }
}

async function updateUser(userParams){
    const id = userParams.id;
    const email = userParams.email;
    const username = userParams.username;

    try{
        const user = await mongooseUser.findById(id);
        if (!user) {
            console.error(`User with ID ${id} not found.`);
            return { success: false, object: 'User with given ID not found.'};
        }
        user.username = username;
        const updatedUser = await user.save();
        console.log('SERVICE/UPDATE:', updateUser);
        return updatedUser;
    }catch(e){
        console.log('UPDATE USER ERROR:', e);
        return { success: false, message: 'User with given ID not found.'};;
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

async function getUser(userParams) {
    const {id} = userParams;
    try {
        const newUser = await mongooseUser.findById(id);
        return { success: true, object: newUser };
    } catch (error) {
        console.log('Error #getUsers: ', error);
    }
}

async function getUsers(userParams) {
    const {username,email,password} = userParams;
    try {
        const newUser = await mongooseUser.find();
        return { success: true, object: newUser };
    } catch (error) {
        console.log('Error #getUsers: ', error);
    }
}

async function createUser(userParams){
    const {username,email,password} = userParams;
    try{
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new mongooseUser({
            username,
            email,
            password:hashedPassword
        })
        newUser.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers
}