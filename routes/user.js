const express = require('express')
const router = express.Router()
const {
    getAllUser,getUser,deleteUser,updateUser,registerUser,loginUser
} = require('../controller/userController')



router.route('/all').get(getAllUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser)
module.exports = router