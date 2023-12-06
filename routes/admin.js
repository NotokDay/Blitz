const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../middleware/checkAuthToken')
const {checkIfAdmin} = require('../middleware/isAdmin')
const {loadAdminPage, addNewProduct, loadNewProductPage, makeAdmin} = require('../controllers/admin')

router.route('/').get(authenticateToken, checkIfAdmin, loadAdminPage)
router.route('/newProduct').get(authenticateToken, checkIfAdmin, loadNewProductPage)
.post(authenticateToken, checkIfAdmin, addNewProduct)
router.route('/addAdmin').post(authenticateToken, checkIfAdmin, makeAdmin)

module.exports = router;