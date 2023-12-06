const jwt = require('jsonwebtoken')

const checkIfAdmin = async (request, response, next) => {
    user = request.user
    console.log(user)

    if(!user.isAdmin){
        return response.render("access_denied.ejs", {status:"error", message:"Access denied"})
    }

    next()
}

module.exports = {checkIfAdmin}