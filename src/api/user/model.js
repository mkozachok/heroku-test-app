import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  full_name: String
})

export const User = mongoose.model('User', userSchema);