import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios, { AxiosError } from 'axios';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // 1. Imported DialogDescription
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2, Package, Loader2 } from 'lucide-react';
import { AddProduct } from '@/components/AddProduct';
import { AuthContext } from '@/context/authContext';

interface Product {
  _id: string;
  name: string;
  sku: string;
  price: number;
  countInStock: number;
  category: string;
  material: string;
  status: 'active' | 'inactive' | 'draft';
  size: string;
  imageUrl: string;
  description: string;
}

// --- Edit Product Dialog Component ---
const EditProductDialog = ({ product, open, onOpenChange, onProductUpdated }) => {
    const [updatedData, setUpdatedData] = useState({
        name: '', sku: '', description: '', price: 0, countInStock: 0, category: '', material: '', size: '', status: 'draft'
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (product) {
            setUpdatedData({
                name: product.name || '',
                sku: product.sku || '',
                description: product.description || '',
                price: product.price || 0,
                countInStock: product.countInStock || 0,
                category: product.category || '',
                material: product.material || '',
                size: product.size || '',
                status: product.status || 'draft',
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${auth.token}` } };
            const { data } = await axios.put(`/api/rugs/${product._id}`, updatedData, config);
            onProductUpdated(data);
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to update product:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Edit: {product.name}</DialogTitle>
                    {/* 2. Added DialogDescription to fix warning */}
                    <DialogDescription>Make changes to your product here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div><Label>Name</Label><Input name="name" value={updatedData.name} onChange={handleChange} /></div>
                        <div><Label>SKU</Label><Input name="sku" value={updatedData.sku} onChange={handleChange} /></div>
                    </div>
                    <div><Label>Description</Label><Textarea name="description" value={updatedData.description} onChange={handleChange} rows={4} /></div>
                    <div className="grid grid-cols-3 gap-4">
                        <div><Label>Price (₹)</Label><Input name="price" type="number" value={updatedData.price} onChange={handleChange} /></div>
                        <div><Label>Stock</Label><Input name="countInStock" type="number" value={updatedData.countInStock} onChange={handleChange} /></div>
                        <div><Label>Category</Label><Input name="category" value={updatedData.category} onChange={handleChange} /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                         <div><Label>Material</Label><Input name="material" value={updatedData.material} onChange={handleChange} /></div>
                         <div><Label>Size</Label><Input name="size" value={updatedData.size} onChange={handleChange} /></div>
                         <div>
                            <Label>Status</Label>
                            <Select value={updatedData.status} onValueChange={(v) => handleSelectChange('status', v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  
  const auth = useContext(AuthContext);
  const token = auth?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) { setIsLoading(false); return; }
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('/api/rugs', config);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  const handleProductAdded = (newProduct: Product) => setProducts(prev => [newProduct, ...prev]);
  
  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p._id === updatedProduct._id ? updatedProduct : p));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const name = product.name || '';
      const sku = product.sku || '';
      const category = product.category || '';
      const status = product.status || '';

      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);
  
  const handleDeleteProduct = async () => {
    if (!deletingProduct || !token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/rugs/${deletingProduct._id}`, config);
      setProducts(prev => prev.filter(p => p._id !== deletingProduct._id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingProduct(null);
    }
  };
  
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === 'active').length;
    const lowStock = products.filter(p => p.countInStock > 0 && p.countInStock < 10).length;
    const draft = products.filter(p => p.status === 'draft').length;
    return { total, active, lowStock, draft };
  }, [products]);
  
  const categoryOptions = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))], [products]);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (status === 'inactive') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div><h1 className="text-3xl font-bold">Products</h1><p className="text-muted-foreground">Manage your product catalog</p></div> 
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
      </div>

      <AddProduct open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onProductAdded={handleProductAdded} />
      {editingProduct && <EditProductDialog product={editingProduct} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} onProductUpdated={handleProductUpdated} />}

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Products</CardTitle><Package /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active</CardTitle><Package className="text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.active}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Low Stock</CardTitle><Package className="text-orange-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.lowStock}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Draft</CardTitle><Package className="text-yellow-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.draft}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Product Catalog</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name or SKU..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
                <SelectContent>{categoryOptions.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow><TableCell colSpan={7} className="text-center h-24"><Loader2 className="mx-auto h-8 w-8 animate-spin" /></TableCell></TableRow>
                ) : filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                    <TableCell><img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md" onError={(e) => { e.currentTarget.src = "https://placehold.co/48x48/f8f8f8/333333?text=N/A" }}/></TableCell>
                    <TableCell><div className="font-medium">{product.name}</div><div className="text-sm text-muted-foreground">{product.material}</div></TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell><Badge className={getStatusColor(product.status)}>{product.status}</Badge></TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => openDeleteDialog(product)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            {/* 2. Added DialogDescription to fix warning */}
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product: <span className="font-semibold">{deletingProduct?.name}</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleDeleteProduct}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

