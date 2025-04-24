import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['lunch', 'dinner'] // Add more categories as needed
  },
  cuisineType: {
    type: String,
    required: true,
    enum: ['fusion', 'sichuan', 'hunan', 'fujian', 'anhui', 'zhejiang'] // Add more types as needed
  },
  sizes: [{
    name: {
      type: String,
      required: true,
      enum: ['small', 'medium', 'large']
    },
    price: {
      required: true,
      type: Number,
    }
  }],
  extras: [{
    name: {
      type: String,
    },
    price: {
      type: Number,
    }
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', RecipeSchema)
export default Recipe