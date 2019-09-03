//requring the mongoose
var mongoose = require("mongoose");

//extracting the schema
var Schema = mongoose.Schema;

//making the schema
var userSchema = new Schema({
    name:String,
    email:String,
},{timestamps:true})
//making the model of schema
var User = mongoose.model("User",userSchema)
//exporting the usersschema
module.exports = User;