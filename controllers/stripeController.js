import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckout = async (req, res) => {
   try {
      const { items } = req.body; // Array of cart items

      const lineItems = items.map((item) => {
         return {
            price_data: {
               currency: "usd",
               product_data: {
                  name: item.title || item.name,
                  // images: [encodedImageUrl], // Must be a valid public URL
               },
               unit_amount: Math.round(item.price * 100), // Ensure integer value
            },
            quantity: item.quantity,
         };
      })

      const session = await stripe.checkout.sessions.create({
         payment_method_types: ["alipay"], // Enable Alipay
         line_items: lineItems,
         mode: "payment",
         success_url: `${process.env.SITE_URL}/payment-details?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${process.env.SITE_URL}/failed-payment`,
      });

      res.json({ url: session.url });
   } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: error.message });
   }
}

export const checkoutSession = async (req, res) => {
   try {
      const { session_id } = req.query; // Get session ID from frontend
      if (!session_id) return res.status(400).json({ error: "Session ID is required" });

      const session = await stripe.checkout.sessions.retrieve(session_id, {
         expand: ["line_items.data.price.product"], // Fetch product details
      });

      res.json(session);
   } catch (error) {
      console.error("Error fetching session:", error);
      res.status(500).json({ error: error.message });
   }
}

export default router;
