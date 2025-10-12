import React, { useEffect } from 'react';

const ReturnRefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[12vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Return & Refund Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Safina Carpets Traders, we want you to be completely satisfied with your purchase. 
                This Return & Refund Policy outlines the conditions under which returns and refunds are accepted, 
                ensuring a fair and transparent process for all our customers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Return Eligibility</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Eligible Items</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Machine-made rugs and carpets in original condition</li>
                    <li>Items with original tags and packaging intact</li>
                    <li>Products returned within 30 days of delivery</li>
                    <li>Items that have not been used, washed, or altered</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Non-Eligible Items</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Custom-made or personalized rugs and carpets</li>
                    <li>Handcrafted items (due to their unique nature)</li>
                    <li>Items damaged by customer use or negligence</li>
                    <li>Products returned after 30 days from delivery</li>
                    <li>Items without original packaging or tags</li>
                    <li>Rugs that have been cut, trimmed, or altered in any way</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Return Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Contact Us</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Before returning any item, please contact our customer service team:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Email: safinacarpets@yahoo.com</li>
                    <li>Phone: +91 9953662052</li>
                    <li>Business Hours: Monday-Saturday, 10AM-7PM (IST)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Return Authorization</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team will provide you with a Return Merchandise Authorization (RMA) number 
                    and detailed return instructions. Returns without RMA numbers will not be accepted.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Package and Ship</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Pack the item securely in its original packaging</li>
                    <li>Include all original tags, labels, and accessories</li>
                    <li>Attach the RMA number clearly on the package</li>
                    <li>Use a trackable shipping method</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Return Shipping</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Costs</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Customer is responsible for return shipping costs unless the item was defective or incorrectly shipped</li>
                    <li>We recommend using insured shipping for valuable items</li>
                    <li>Safina Carpets is not responsible for items lost or damaged during return shipping</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Return Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 font-medium">Safina Carpets Traders</p>
                    <p className="text-gray-700">Returns Department</p>
                    <p className="text-gray-700">2592 S. Beverly St, Suite 130</p>
                    <p className="text-gray-700">Boise, ID 83709</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Refund Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Processing Time</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Returns are processed within 5-10 business days after receipt</li>
                    <li>Inspection of returned items may take 2-3 business days</li>
                    <li>Refunds are issued within 5-7 business days after approval</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Method</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Refunds will be processed using the original payment method:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    <li>Credit card refunds: 5-10 business days</li>
                    <li>PayPal refunds: 3-5 business days</li>
                    <li>Bank transfers: 7-10 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Amount</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Full purchase price (excluding original shipping costs)</li>
                    <li>Return shipping costs are not refundable unless item was defective</li>
                    <li>Any applicable taxes will be refunded as per local regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Exchanges</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We currently do not offer direct exchanges. If you need a different size, color, or style:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Return the original item following our return process</li>
                <li>Place a new order for the desired item</li>
                <li>Contact us to coordinate timing if needed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Damaged or Defective Items</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Immediate Action Required</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    If you receive a damaged or defective item:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Contact us within 48 hours of delivery</li>
                    <li>Provide photos of the damage or defect</li>
                    <li>Keep all original packaging</li>
                    <li>Do not attempt to repair the item</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Our Response</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>We will arrange free return shipping</li>
                    <li>Full refund or replacement at your choice</li>
                    <li>Expedited processing for defective items</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Returns</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For international customers:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Same 30-day return policy applies</li>
                <li>Customer responsible for return shipping costs and customs duties</li>
                <li>Items must clear customs inspection</li>
                <li>Additional processing time may be required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Restocking Fees</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safina Carpets does not charge restocking fees for standard returns that meet our return policy criteria. 
                However, items returned in unsellable condition may be subject to a restocking fee of up to 25% of the purchase price.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Cancellations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Order Cancellation</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Orders can be cancelled within 24 hours of placement</li>
                    <li>Contact us immediately at safinacarpets@yahoo.com</li>
                    <li>Full refund for cancelled orders</li>
                    <li>Custom orders cannot be cancelled once production begins</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-2">
                  For questions about returns and refunds, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> safinacarpets@yahoo.com</p>
                  <p><strong>Phone:</strong> +91 9953662052</p>
                  <p><strong>Business Hours:</strong> Monday-Saturday, 10AM-7PM (IST)</p>
                  <p><strong>Address:</strong> 2592 S. Beverly St, Suite 130, Boise, ID 83709</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                This Return & Refund Policy is subject to change without notice. 
                Please review this policy before making a purchase.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;