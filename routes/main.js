const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../middleware/checkAuthToken')

router.get('/', authenticateToken, (request, response) => {
    return response.render('index2.ejs', {status:"", data:""})
})

router.get('/index', authenticateToken, (request, response) => {
    return response.redirect('/')
})

router.get('/about', authenticateToken, (request, response) => {
    return response.render('about.ejs', {status:"", data:""})
})

router.get('/blog', authenticateToken, (request, response) => {
    return response.render('blog.ejs', {status:"", data:""})
})

router.get('/furniture', authenticateToken, (request, response) => {
    return response.render('furniture.ejs', {status:"", data:""})
})

router.get('/contact', authenticateToken, (request, response) => {
    return response.render('contact.ejs', {status:"", data:""})
})


module.exports = router;

