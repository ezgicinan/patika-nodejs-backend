const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).send({message:'No token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({message:'Invalid token'})  
    }
}
module.exports = authMiddleware