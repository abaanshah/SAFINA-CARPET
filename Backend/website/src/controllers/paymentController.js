import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/order.js';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.Razorpay_API_Key,
  key_secret: process.env.Razorpay_API_Secret,
});

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    // Validate required fields
    if (!amount || !receipt) {
      return res.status(400).json({
        success: false,
        message: 'Amount and receipt are required',
      });
    }

    // Create order options
    const options = {
      amount: amount * 100, // Amount in paise (multiply by 100)
      currency,
      receipt,
      notes: notes || {},
    };

    // Create order with Razorpay
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

// Verify payment signature
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    console.log('Payment verification request:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: razorpay_signature ? 'present' : 'missing',
      orderData: orderData ? 'present' : 'missing'
    });

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log('Missing payment verification data');
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification data',
      });
    }

    // Generate signature for verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.Razorpay_API_Secret)
      .update(body.toString())
      .digest('hex');

    console.log('Signature verification:', {
      body,
      expectedSignature,
      receivedSignature: razorpay_signature,
      secretPresent: !!process.env.Razorpay_API_Secret
    });

    // Verify signature
    if (expectedSignature === razorpay_signature) {
      // Payment is successful, save order to database
      try {
        if (orderData) {
          const newOrder = new Order({
            ...orderData,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            paymentStatus: 'completed',
            paymentMethod: 'Razorpay',
            isPaid: true,
            paidAt: new Date(),
          });

          await newOrder.save();

          res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            order: newOrder,
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
          });
        }
      } catch (dbError) {
        console.error('Error saving order to database:', dbError);
        res.status(500).json({
          success: false,
          message: 'Payment verified but failed to save order',
          error: dbError.message,
        });
      }
    } else {
      console.log('Payment verification failed - signature mismatch');
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};

// Get payment details
const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required',
      });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message,
    });
  }
};

export {
  createOrder,
  verifyPayment,
  getPaymentDetails,
};