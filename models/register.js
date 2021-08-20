const moongoose = require("mongoose");
const registerSchema = new moongoose.Schema({
    Name: String,
    Address: String,
    Email: String,
    Phone: Number,
    Cmnd: String,
    Haspayed: Boolean,
    Grade: Number,
    Hash: String,
    Time : { type : Date, default: Date.now }
})

module.exports = moongoose.model("register", registerSchema);