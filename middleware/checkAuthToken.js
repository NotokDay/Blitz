const jwt = require('jsonwebtoken')
require('dotenv/config');


const authenticateToken = (req, res, next) => {
    var accessToken = req.cookies.accessToken

    if(!accessToken) return res.redirect('/auth/signin')

    // jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
    //     if(err) return res.redirect('/auth/signin')
    //     req.user = user
    //     next()
    // })

    try{
        const user = jwt.decode(accessToken)
        if (!user) {
            return res.status(500).send({status:'error', message:'provided token does not decode as JWT'})
        }
        req.user = user
        next()
    }catch (error){
        res.status(500).send({status:"error", message:'Something went wrong', error:error})
    }
    
}

module.exports = {authenticateToken}