import mongoose from 'mongoose'

export const clientSchema = new mongoose.Schema({
  id: String,
  full_name: String,
  created_at: Date,
  updated_at: Date
})