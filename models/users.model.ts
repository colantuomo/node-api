import * as mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string
}

// O Schema seria o equivalente a uma 'table' em um banco relacional
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

export const User = mongoose.model<IUser>('User', userSchema)