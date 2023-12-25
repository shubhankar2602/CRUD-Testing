const jwt = require('jsonwebtoken')
const SECRET_KEY = 'wfvwuvgvby23trr327ybqdba';

const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.indexOf;
        }
        else{
            res.status(401).json({message:"Unauthorized user"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Unauthorized user"});
    }
}

module.exports = auth;