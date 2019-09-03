//requring the mongoose
var mongoose = require("mongoose");
//extracting the schema
var schema = mongoose.Schema;
//making the schema
var usersSchema = new schema({
    name:String,
    email:String,
},{timestamps:true})
//making the model of schema
var usersSchema = mongoose.model("user",userSchema)
//exporting the usersschema
module.exports = usersSchema;