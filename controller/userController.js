const User = require("../models/User");
const { tryCatch } = require("../util/tryCatch");
const asyncHandler = require('express-async-handler');
const passport = require('passport')

const getAllUser = tryCatch(asyncHandler(async (req, res) => {

    const users = await User.find()
    res.json(users)

}))

const getUser = tryCatch(asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)

}))

const deleteUser = tryCatch(asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    res.json(user)

}))


const updateUser = tryCatch(asyncHandler(async (req, res) => {
    const existingUser = await User.findById(req.params.id)
    if (!existingUser) throw new Error("Invalid User")
    if (req.user.id !== existingUser._id.toString()) throw new Error("Something went wrong.")
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true })
    res.json({ success: true, value: user })

}))

const registerUser = tryCatch(asyncHandler(async (req, res) => {

    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }


    const newUser = await User.create({
        username, password, email, avatar: getAvatar(email)
    })

    res.json({ user: newUser })
    res.redirect('/login');

}))

const loginUser = tryCatch(asyncHandler(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/500',
    failureFlash:true
})))


module.exports = {
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    registerUser,
    loginUser
}