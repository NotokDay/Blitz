const express = require('express')
const router = express.Router()

const {
    loadRegisterPage,
    loadSigninPage,

    userRegister, 
    userSignin,

    logOut

} = require('../controllers/auth')

router.route('/register').get(loadRegisterPage).post(userRegister)
router.route('/signin').get(loadSigninPage).post(userSignin)
router.route('/logout').get(logOut)

module.exports = router;