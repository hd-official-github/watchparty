import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// const bcrypt= require('bcrypt')
const UserSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    photoUrl: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false
    },
});

// //add method to models
// var salt =bcrypt.genSaltSync(10);
// UserSchema.methods.hashpassword=function(password){
//     return bcrypt.hashSync(password,salt)
// }
// UserSchema.methods.comparepassword=function(password,hashpassword){
//     return bcrypt.compareSync(password,hashpassword)
// }
export default mongoose.model('User', UserSchema);
