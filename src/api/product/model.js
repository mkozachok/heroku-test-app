import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  previewImage: String,
  created_at: Date,
  updated_at: Date
});

productSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

export const Product = mongoose.model('Product', productSchema);