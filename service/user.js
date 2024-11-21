const bcrypt = require('bcrypt');
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

module.exports = {
    createUser
}