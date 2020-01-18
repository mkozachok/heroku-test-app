import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  id: String,
  status: String,
  client_id: String,
  created_at: Date,
  updated_at: Date
})

export const Order = mongoose.model('Order', orderSchema);