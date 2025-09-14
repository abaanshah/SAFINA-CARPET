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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customer-favorites" element={<CustomerFavorites />} />
            <Route path="mail-inbox" element={<MailInbox />} />
            <Route path="chat" element={<Chat />} />
            <Route path="meeting-schedule" element={<MeetingSchedule />} />
            <Route path="custom-requests" element={<div className="p-6">Custom Requests Page Coming Soon</div>} />
            <Route path="messages" element={<div className="p-6">Messages Page Coming Soon</div>} />
            <Route path="international" element={<div className="p-6">International Clients Page Coming Soon</div>} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
