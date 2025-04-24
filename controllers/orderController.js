import Order from "../models/Order.js";
import jwt from 'jsonwebtoken';


export const createOrder = async (req, res) => {
   try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'No token provided' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const { cart } = req.body;
    //   console.log(cart)

      const orderNumber = 'ORD' + Date.now().toString().slice(-8);

      const newOrder = new Order({
         orderNumber,
         user: userId,
         items: cart.mainItems,
        //  imageUrl: cart.imageUrl,
         drinks: cart.drinks,
         subtotal: cart.subtotal,
        //  platformFee: 0.99,
        //  vatAmount: cart.subtotal * 0.13,
         total: cart.subtotal + 0.99 + (cart.subtotal * 0.13),
        //  paymentMethod: req.body.paymentMethod
      });

      await newOrder.save();
      res.status(201).json(newOrder);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


export const getOrders = async (req, res) => {
   try {
    //   const token = req.headers.authorization?.split(' ')[1];
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //   const orders = await Order.find({ user: decoded.id }).sort({ createdAt: -1 });
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export const updateOrderStatus = async (req, res) => {
   try {
       // Verify authentication
       const token = req.headers.authorization?.split(' ')[1];
       if (!token) return res.status(401).json({ message: 'No token provided' });

       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       // Get order ID and new status from request
       const orderNumber = req.params.orderNumber;
       const { status } = req.body;

       // Validate status
       const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
       if (!validStatuses.includes(status)) {
           return res.status(400).json({ 
               message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
           });
       }

       // Find the order
       const order = await Order.findOne({orderNumber: orderNumber});
       
       if (!order) {
           return res.status(404).json({ message: 'Order not found' });
       }

       // Check if user has permission to update this order
       if (order.user.toString() !== decoded.id && decoded.role !== 'admin') {
           return res.status(403).json({ 
               message: 'You do not have permission to update this order' 
           });
       }

       // Update order status
       order.status = status;
       
       // Optional: Add status history (only if this field exists in your schema)
      //  if (order.statusHistory) {
      //      order.statusHistory.push({
      //          status,
      //          timestamp: new Date(),
      //          updatedBy: decoded.id
      //      });
      //  }

       // Save the updated order
       const updatedOrder = await order.save();

       res.json(updatedOrder);

   } catch (error) {
       if (error.name === 'JsonWebTokenError') {
           return res.status(401).json({ message: 'Invalid token' });
       }
       res.status(500).json({ message: error.message });
   }
};