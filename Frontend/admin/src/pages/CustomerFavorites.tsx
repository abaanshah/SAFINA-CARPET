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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Heart, Package, User, Eye, Mail, Phone } from 'lucide-react';

interface CustomerFavorite {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productId: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  dateAdded: Date;
  isInStock: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockFavorites: CustomerFavorite[] = [
  {
    id: '1',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@email.com',
    customerPhone: '+91-9876543210',
    productId: 'PR-001',
    productName: 'Royal Persian Silk Rug',
    productCategory: 'Persian Rugs',
    productPrice: 125000,
    dateAdded: new Date('2024-01-20'),
    isInStock: true,
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    customerPhone: '+91-9876543211',
    productId: 'MC-002',
    productName: 'Modern Abstract Carpet',
    productCategory: 'Modern Carpets',
    productPrice: 45000,
    dateAdded: new Date('2024-01-18'),
    isInStock: true,
    priority: 'medium'
  },
  {
    id: '3',
    customerName: 'Mohammed Ali',
    customerEmail: 'mohammed.ali@email.com',
    customerPhone: '+91-9876543212',
    productId: 'PM-003',
    productName: 'Traditional Prayer Mat',
    productCategory: 'Prayer Mats',
    productPrice: 8000,
    dateAdded: new Date('2024-01-15'),
    isInStock: false,
    priority: 'low'
  },
  {
    id: '4',
    customerName: 'Anita Gupta',
    customerEmail: 'anita.gupta@email.com',
    customerPhone: '+91-9876543213',
    productId: 'TR-004',
    productName: 'Vintage Traditional Rug',
    productCategory: 'Traditional Rugs',
    productPrice: 75000,
    dateAdded: new Date('2024-01-22'),
    isInStock: true,
    priority: 'high'
  },
  {
    id: '5',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.singh@email.com',
    productId: 'CC-005',
    productName: 'Custom Geometric Pattern',
    productCategory: 'Custom Carpets',
    productPrice: 95000,
    dateAdded: new Date('2024-01-19'),
    isInStock: true,
    priority: 'medium'
  }
];

export default function CustomerFavorites() {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [selectedFavorite, setSelectedFavorite] = useState<CustomerFavorite | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredFavorites = favorites.filter(favorite => {
    const matchesSearch = favorite.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         favorite.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || favorite.productCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const categories = [...new Set(favorites.map(f => f.productCategory))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Favorites</h1>
          <p className="text-muted-foreground">
            Track products that customers have marked as favorites
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Heart className="mr-2 h-4 w-4" />
          Send Notifications
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Favorites
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{favorites.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Priority
            </CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {favorites.filter(f => f.priority === 'high').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Stock
            </CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {favorites.filter(f => f.isInStock).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Customers
            </CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {new Set(favorites.map(f => f.customerEmail)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Customer Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Product</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Priority</TableHead>
                <TableHead className="text-muted-foreground">Date Added</TableHead>
                <TableHead className="text-muted-foreground">Stock</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFavorites.map((favorite) => (
                <TableRow key={favorite.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">
                          {favorite.customerName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {favorite.customerEmail}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">
                          {favorite.productName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {favorite.productId}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {favorite.productCategory}
                  </TableCell>
                  <TableCell className="text-card-foreground font-medium">
                    {formatCurrency(favorite.productPrice)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(favorite.priority)}>
                      {favorite.priority.charAt(0).toUpperCase() + favorite.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {formatDate(favorite.dateAdded)}
                  </TableCell>
                  <TableCell>
                    <Badge className={favorite.isInStock 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }>
                      {favorite.isInStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:text-primary/80"
                            onClick={() => setSelectedFavorite(favorite)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Favorite Details</DialogTitle>
                          </DialogHeader>
                          {selectedFavorite && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Customer:</label>
                                  <p className="text-card-foreground">{selectedFavorite.customerName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedFavorite.customerEmail}</p>
                                  {selectedFavorite.customerPhone && (
                                    <p className="text-sm text-muted-foreground">{selectedFavorite.customerPhone}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Product:</label>
                                  <p className="text-card-foreground">{selectedFavorite.productName}</p>
                                  <p className="text-sm text-muted-foreground">ID: {selectedFavorite.productId}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Category:</label>
                                  <p className="text-card-foreground">{selectedFavorite.productCategory}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Price:</label>
                                  <p className="text-card-foreground font-medium">{formatCurrency(selectedFavorite.productPrice)}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Added On:</label>
                                  <p className="text-card-foreground">{formatDate(selectedFavorite.dateAdded)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Priority:</label>
                                  <Badge className={getPriorityColor(selectedFavorite.priority)}>
                                    {selectedFavorite.priority.charAt(0).toUpperCase() + selectedFavorite.priority.slice(1)}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex space-x-2 pt-4">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Offer
                                </Button>
                                <Button variant="outline" className="border-border">
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Customer
                                </Button>
                                <Button variant="outline" className="border-border">
                                  <Package className="mr-2 h-4 w-4" />
                                  View Product
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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