import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    id: String,
    title: String,
    size: String,
    price: Number,
    // imageUrl: String,
    // quantity: Number,
    // extras: [{
    //   name: String,
    //   price: Number,
    //   quantity: Number
    // }]
  }],
  drinks: [{
    id: String,
    name: String,
    ml: Number,
    price: Number
  }],
  subtotal: Number,
  // platformFee: Number,
  // vatAmount: Number,
  // total: Number,
  // paymentMethod: String,
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'processing', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', OrderSchema);