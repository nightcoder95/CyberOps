import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    pen: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: '',
    }

}, { timestamps: true })




export default mongoose.model('User', userSchema);