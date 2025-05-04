const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    // console.log(authHeader)
    if(!authHeader){
        return res.status(401).send({message: "Token not provided."})
    }
    console.log(authHeader)
    let token = authHeader.split(" ")[1]
    // console.log(token)
    try{
        let decoded = jwt.verify(token, "12345")
        // console.log(decoded)
        req.user = decoded
        next()
    } catch(error){
        return res.status(401).send({message: "Invalid Token"})
    }
}

module.exports = verifyToken