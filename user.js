async function createUser(req,res) {
    const {username, email,password} = req.body;
    try {
        console.log("create user");
    } catch (error) {
        console.log(error);
    }
    
}