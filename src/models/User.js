const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { required } = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    }
}, { timestamps: true });

// Хеширование пароля перед сохранением в БД
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const slat = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, slat);
    next(); 
});

// Метод для сравнения пароля
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);    
};


module.exports = mongoose.model('User', userSchema);
