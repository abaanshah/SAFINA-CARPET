import { useState } from 'react';
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
import { mockCustomers } from '@/data/mockData';
import { Search, Eye, Users, UserCheck, UserX, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'blocked' && customer.isBlocked) ||
                         (selectedStatus === 'active' && !customer.isBlocked);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
        <p className="text-muted-foreground">
          Manage your customer base and track their orders and preferences
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">876</div>
            <p className="text-xs text-muted-foreground">
              +45 this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Customers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">842</div>
            <p className="text-xs text-muted-foreground">
              96.1% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Blocked Customers
            </CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">34</div>
            <p className="text-xs text-muted-foreground">
              3.9% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Repeat Customers
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">456</div>
            <p className="text-xs text-muted-foreground">
              52.1% return rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Customer Database</CardTitle>
        </CardHeader>
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

      {/* Customers Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Contact</TableHead>
                <TableHead className="text-muted-foreground">Orders</TableHead>
                <TableHead className="text-muted-foreground">Wishlist</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Registered</TableHead>
                <TableHead className="text-muted-foreground">Last Order</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-card-foreground">
                          {customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {customer.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="text-sm text-muted-foreground">
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    <Badge variant="secondary">
                      {customer.orders.length} orders
                    </Badge>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    <Badge variant="outline">
                      {customer.wishlist.length} items
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      customer.isBlocked 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }>
                      {customer.isBlocked ? 'Blocked' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="text-sm">
                      {customer.registeredAt.toLocaleDateString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(customer.registeredAt, { addSuffix: true })}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.lastOrderAt ? (
                      <div>
                        <div className="text-sm">
                          {customer.lastOrderAt.toLocaleDateString('en-IN')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(customer.lastOrderAt, { addSuffix: true })}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Never</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
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