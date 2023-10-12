const express = require('express')
const router = express.Router()
const {
    getAllUser,getUser,deleteUser,updateUser
} = require('../controller/userController')



router.route('/all').get(getAllUser)
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser)
module.exports = router