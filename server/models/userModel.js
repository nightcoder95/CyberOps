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
    },
    unit:{
        type: String,
        enum: [
            'TVM C', 'KLM C', 'EKM C', 'TSR C', 'KKD C', 'KNR C',
            'TVM R', 'KLM R', 'PTA', 'ALP', 'KTM', 'IDK', 'EKM R',
            'TSR R', 'PKD', 'MLP', 'KKD R', 'WND', 'KNR R', 'KSD', 'SSB HQ'
        ],
        default: 'SSB HQ', // Or any other default you prefer
        required: true
    }

}, { timestamps: true })

const User = mongoose.model('User', userSchema); // Export your model

export default mongoose.model('User', userSchema);