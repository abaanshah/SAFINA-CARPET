import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Search, Heart, Package, User, Eye, Mail, Phone } from 'lucide-react';

const mockFavorites = [
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
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredFavorites = favorites.filter(favorite => {
    const matchesSearch = favorite.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         favorite.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || favorite.productCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority) => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const categories = [...new Set(favorites.map(f => f.productCategory))];

  return (
    <div className="space-y-6">
      {/* Full JSX content already shared above */}
    </div>
  );
}