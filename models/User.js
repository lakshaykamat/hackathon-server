const mongoose = require('mongoose')
const User = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"username required"]
        },
        avatar:{
            type:String,
            required:[true,"avatar required"]
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:[true,"Invalid email (already in use)"]
        }
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("User",User)