import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Eye, Users, UserCheck, UserX, Mail, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { AuthContext } from '@/context/authContext';

// This interface matches the data structure from your userService.js
interface Customer {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
  lastLogin: string;
  orderCount: number;
  wishlistCount: number;
  lastOrderAt: string;
  phone:number;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!auth?.token) {
        setIsLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };
        const { data } = await axios.get('/api/users', config);
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, [auth?.token]);

  // Memoized filtering logic
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const search = searchTerm.toLowerCase();
      // Safe checks for data
      const name = customer.name || '';
      const email = customer.email || '';
      
      const matchesSearch = name.toLowerCase().includes(search) ||
                             email.toLowerCase().includes(search);
      
      const matchesStatus = selectedStatus === 'all' || 
                            (selectedStatus === 'blocked' && customer.isBlocked) ||
                            (selectedStatus === 'active' && !customer.isBlocked);
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, selectedStatus]);

  // Memoized stats calculation
  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter(c => !c.isBlocked).length;
    const blocked = total - active;
    const repeat = customers.filter(c => c.orderCount > 1).length;
    return { total, active, blocked, repeat };
  }, [customers]);

  const getInitials = (name: string | null) => {
    if (!name) return 'N/A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  /**
   * Formats a date string.
   * @param {string} dateString - The date string to format.
   * @param {boolean} [relative=false] - True to get relative time (e.g., "3 days ago").
   * @returns {string} The formatted date string.
   */
  const formatDate = (dateString: string, relative: boolean = false): string => {
      if (!dateString) return 'Never';
      try {
        const date = new Date(dateString);
        if (relative) {
          return formatDistanceToNow(date, { addSuffix: true });
        }
        // Returns exact date and time as requested
        return format(date, 'dd MMM yyyy, hh:mm a');
      } catch (e) {
        return 'N/A';
      }
  };

  const getStatusBadge = (isBlocked: boolean) => {
    if (isBlocked) {
      return <Badge className="bg-red-100 text-red-800">Blocked</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
        <p className="text-muted-foreground">Manage your customer base and track their orders</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Customers</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active Customers</CardTitle><UserCheck className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.active}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Blocked Customers</CardTitle><UserX className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.blocked}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Repeat Customers</CardTitle><Users className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.repeat}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-card-foreground">Customer Database</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Customer Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Wishlist</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={9} className="text-center h-24"><Loader2 className="animate-spin mx-auto h-8 w-8" /></TableCell></TableRow>
              ) : filteredCustomers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-card-foreground">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {customer._id.substring(0, 6)}...</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone || 'No phone'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{customer.orderCount} orders</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.wishlistCount} items</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(customer.isBlocked)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(customer.createdAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(customer.lastLogin)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(customer.lastOrderAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" title="View Details (coming soon)">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Email Customer (coming soon)">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

