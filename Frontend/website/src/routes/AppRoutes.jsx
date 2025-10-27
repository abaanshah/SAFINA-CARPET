function AppRoutes() {
  return (
    <Routes>
      {/* routes without MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* All main routes inside layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/purchase/:productId" element={<Purchase />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/order/:orderId" element={<OrderConfirmation />} />
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileDetail />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path="/orders"
          element={<Navigate to="/profile/orders" replace />}
        />
      </Route>
    </Routes>
  );
}
