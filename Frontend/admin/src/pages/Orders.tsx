import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Search, Eye, ShoppingCart, Clock, CheckCircle, XCircle, Truck, Loader2, Edit } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { AuthContext } from '@/context/authContext';

// --- Order Details Modal Component (FIXED) ---
const OrderDetailsModal = ({ order, open, onOpenChange }) => {
    if (!order) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Order Details: #{order._id.substring(0, 7).toUpperCase()}</DialogTitle>
                    <DialogDescription>
                        Placed on {order.createdAt ? format(new Date(order.createdAt), 'PPpp') : 'N/A'}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-6">
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-800">Customer</h4>
                        <div className="text-sm bg-gray-50 p-3 rounded-md border">
                            {/* --- THIS IS THE FIX: Using optional chaining (?.) and fallbacks --- */}
                            <p><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${order.user?.email}`} className="text-blue-600 hover:underline">{order.user?.email || 'N/A'}</a></p>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2 text-gray-800">Shipping Address</h4>
                        <div className="text-sm bg-gray-50 p-3 rounded-md border">
                            <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</p>
                        </div>
                    </div>
                    {order.shippingInfo?.trackingNumber && (
                         <div>
                            <h4 className="font-semibold mb-2 text-gray-800">Tracking Information</h4>
                            <div className="text-sm bg-blue-50 p-3 rounded-md border border-blue-200">
                                <p><strong>Courier:</strong> {order.shippingInfo.courierName}</p>
                                <p><strong>Tracking #:</strong> {order.shippingInfo.trackingNumber}</p>
                            </div>
                        </div>
                    )}
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-800">Order Items ({order.orderItems?.length || 0})</h4>
                        <div className="space-y-3">
                            {order.orderItems?.map(item => (
                                <div key={item.product} className="flex items-center gap-4 border-b pb-3 last:border-b-0 last:pb-0">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                                    <div className="flex-grow">
                                        <p className="font-medium text-sm text-gray-900">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                    <p className="font-semibold text-sm text-gray-800">₹{(item.quantity * item.price).toLocaleString('en-IN')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- Update Order Status Modal ---
const UpdateStatusModal = ({ order, open, onOpenChange, onOrderUpdated }) => {
    const [newStatus, setNewStatus] = useState(order?.orderStatus || 'Processing');
    const [courierName, setCourierName] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const auth = useContext(AuthContext);

    useEffect(() => {
        if(order) {
            setNewStatus(order.orderStatus);
            setCourierName(order.shippingInfo?.courierName || '');
            setTrackingNumber(order.shippingInfo?.trackingNumber || '');
        }
    }, [order]);
    
    const handleUpdate = async () => {
        if (!order || !auth?.token) return;
        setIsUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${auth.token}` } };
            const body = { newStatus, courierName, trackingNumber };
            const { data } = await axios.put(`/api/orders/${order._id}/status`, body, config);
            onOrderUpdated(data);
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update order status.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Status for Order #{order._id.substring(0,7).toUpperCase()}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label>New Status</Label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Order Placed">Order Placed</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {newStatus === 'Shipped' && (
                        <div className="space-y-4 pt-4 border-t">
                             <div>
                                <Label htmlFor="courierName">Courier Name</Label>
                                <Input id="courierName" value={courierName} onChange={(e) => setCourierName(e.target.value)} placeholder="e.g., DHL Express" />
                            </div>
                            <div>
                                <Label htmlFor="trackingNumber">Tracking Number</Label>
                                <Input id="trackingNumber" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Enter tracking #" />
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Status
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const [viewingOrder, setViewingOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth?.token) { setIsLoading(false); return; }
      try {
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };
        const { data } = await axios.get('/api/orders', config);
        const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(sortedData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [auth?.token]);

  const handleOrderUpdated = (updatedOrder) => {
    setOrders(prev => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
  };

  const openDetailsModal = (order) => {
    setViewingOrder(order);
    setIsDetailsOpen(true);
  };
  
  const openUpdateStatusModal = (order) => {
      setUpdatingOrder(order);
      setIsUpdateStatusOpen(true);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const search = searchTerm.toLowerCase();
      const userName = order.user?.name?.toLowerCase() || '';
      const userEmail = order.user?.email?.toLowerCase() || '';
      
      const matchesSearch = order._id.toLowerCase().includes(search) ||
                            userName.includes(search) ||
                            userEmail.includes(search);
      const matchesStatus = selectedStatus === 'all' || order.orderStatus.toLowerCase() === selectedStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Order Placed').length;
    const delivered = orders.filter(o => o.orderStatus === 'Delivered').length;
    const cancelled = orders.filter(o => o.orderStatus === 'Cancelled').length;
    return { total, pending, delivered, cancelled };
  }, [orders]);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
  
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'pending':
        case 'order placed':
            return 'bg-yellow-100 text-yellow-800';
        case 'processing':
        case 'shipped': 
            return 'bg-blue-100 text-blue-800';
        case 'delivered': 
            return 'bg-green-100 text-green-800';
        case 'cancelled': 
            return 'bg-red-100 text-red-800';
        default: 
            return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Orders</CardTitle><ShoppingCart className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><Clock className="h-4 w-4 text-yellow-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.pending}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Delivered</CardTitle><CheckCircle className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.delivered}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Cancelled</CardTitle><XCircle className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.cancelled}</div></CardContent></Card>
      </div>
      
      <Card>
        <CardHeader><CardTitle>Order History</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by ID, name, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Order Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Order Placed">Order Placed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <TableRow><TableCell colSpan={7} className="text-center h-24"><Loader2 className="animate-spin mx-auto h-8 w-8" /></TableCell></TableRow> 
                : filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">#{order._id.substring(0, 7).toUpperCase()}</TableCell>
                    <TableCell><div><div className="font-medium">{order.user?.name || 'N/A'}</div><div className="text-sm text-muted-foreground">{order.user?.email || 'N/A'}</div></div></TableCell>
                    <TableCell>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell><Badge className={order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>{order.isPaid ? 'Paid' : 'Pending'}</Badge></TableCell>
                    <TableCell><Badge className={getStatusColor(order.orderStatus)}>{order.orderStatus}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openDetailsModal(order)}><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openUpdateStatusModal(order)} title="Update Status"><Edit className="w-4 h-4 text-blue-600" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <OrderDetailsModal order={viewingOrder} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      <UpdateStatusModal order={updatingOrder} open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen} onOrderUpdated={handleOrderUpdated} />
    </div>
  );
}

