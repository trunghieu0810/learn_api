const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    name: String,
    phone: String,
    gender: String,
    province: String,
    district: String,
    commune: String,
    role: {
        type: String,
        default: 'user'
    },
    mail: String,
    avatar: {
        type:String,
        default: 'https://res.cloudinary.com/databaseimg/image/upload/v1634092031/samples/people/bicycle.jpg',
    },
    gem: Number,
    birthday: Date,
},
    { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
module.exports = User;