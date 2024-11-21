const mongoose = require('mongoose')

async function connectionDB() {
    try {
        console.log("before mongoose");
        await mongoose.connect('mongodb+srv://ezgicinan35:16NAvE4murrTMZnt@newmind.gkxlr.mongodb.net/backend_patika');
        console.log("Bağlandık.");
    } catch (e) {
        console.log('Error #db-mongo:', e);
    }
}

module.exports = {connectionDB}