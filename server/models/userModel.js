import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

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

}, { timestamps: true })


// Hash password before saving the user model
// userSchema.pre('save', async function (next) {
//     // Check if the password field has been modified (i.e., it's a new user or the password is being changed)
//     if (!this.isModified('password')) {
//         return next();  // If password is not modified, move to the next middleware
//     }

//     // Generate a salt with 10 rounds (default)
//     const salt = await bcrypt.genSalt(10)

//     // Hash the password using the generated salt
//     this.password = await bcrypt.hash(this.password, salt)

//     // Call the next middleware in the stack
//     next();
// })



export default mongoose.model('User', userSchema);