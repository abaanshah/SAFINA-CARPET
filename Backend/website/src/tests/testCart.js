import axios from "axios";

const API_URL = "https://safina-carpet-backend-web-h0o5.onrender.com/api/cart"; // adjust port if needed

async function testCart() {
  try {
    console.log("1️⃣ Getting initial cart...");
    let res = await axios.get(API_URL);
    console.log("Cart:", res.data);

    console.log("\n2️⃣ Adding a product...");
    res = await axios.post(API_URL, {
      productId: "64ea0b5d2b5c4b2f12345678", // replace with a real Product _id from your DB
      quantity: 2,
    });
    console.log("Cart after add:", res.data);

    console.log("\n3️⃣ Updating product quantity...");
    res = await axios.put(API_URL, {
      productId: "64ea0b5d2b5c4b2f12345678", // same _id
      quantity: 5,
    });
    console.log("Cart after update:", res.data);

    console.log("\n4️⃣ Removing product...");
    res = await axios.delete(`${API_URL}/64ea0b5d2b5c4b2f12345678`);
    console.log("Cart after remove:", res.data);

    console.log("\n✅ All cart operations tested successfully!");
  } catch (err) {
    console.error("❌ Error testing cart:", err.response?.data || err.message);
  }
}

testCart();
