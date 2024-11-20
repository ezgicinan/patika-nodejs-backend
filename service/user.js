const bcrypt = require('bcrypt');
const mongooseUser = require('../model/user')

async function createUser(userParams) {
    const {username,email,password} = userParams;
    try {
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new mongooseUser({
            username,
            email,
            password:hashedPassword
        })
        newUser.save();
        return true;
    } catch (error) {
        console.log(e);
    }
}

module.exports = {
    createUser
}