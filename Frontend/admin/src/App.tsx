import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MailInbox from "./pages/MailInbox";
import Chat from "./pages/Chat";
import MeetingSchedule from "./pages/MeetingSchedule";
import CustomerFavorites from "./pages/CustomerFavorites";
import AuthCallback from "./pages/AuthCallback";

// --- 1. Import your AuthProvider ---
import { AuthProvider } from "./context/authContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* --- 2. Wrap your Routes with the AuthProvider --- */}
        {/* This makes the user and token available to all pages */}
        <AuthProvider>
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/customer-favorites" element={<CustomerFavorites />} />
              <Route path="/admin/mail-inbox" element={<MailInbox />} />
              <Route path="/admin/chat" element={<Chat />} />
              <Route path="/admin/meeting-schedule" element={<MeetingSchedule />} />
              <Route path="/admin/custom-requests" element={<div className="p-6">Custom Requests Page Coming Soon</div>} />
              <Route path="/admin/messages" element={<div className="p-6">Messages Page Coming Soon</div>} />
              <Route path="/admin/international" element={<div className="p-6">International Clients Page Coming Soon</div>} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

