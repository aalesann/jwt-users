import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }]
},{
    timestamps: true,
    versionKey: false
});

// Métodos para comparar y para cifrar las contraseñas

// Toma la contraseña y la cifra
userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
};

// Compara las contraseñas y retorna true o false
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};


export default model('User', userSchema);