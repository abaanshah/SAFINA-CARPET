import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Loader2, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { AuthContext } from '../context/authContext';

// --- UPDATED: Predefined options for the Material dropdown as you requested ---
const materialOptions = ["Hand Made", "Staple", "Machine Made", "Wool", "Silk", "Cotton", "Jute", "Synthetic"];

interface AddProductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: (newProduct: any) => void;
}

// Type for the errors state object
interface FormErrors {
    [key: string]: string | undefined;
}

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode; }) => (
    <div className="bg-gray-50/50 dark:bg-gray-900/50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-gray-500" />;
    if (fileType.startsWith("video/")) return <Video className="h-8 w-8 text-gray-500" />;
    return <FileText className="h-8 w-8 text-gray-500" />;
};

export function AddProduct({ open, onOpenChange, onProductAdded }: AddProductProps) {
  const auth = useContext(AuthContext);
  const token = auth?.token;

  // --- UPDATED: Simplified form state ---
  const initialFormState = {
    title: "", sku: "", description: "",
    priceInr: "", priceUsd: "", quantity: "0",
    material: "", primaryColor: "", secondaryColor: "",
    width: "", length: "", diameter: "", pileHeight: "",
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields = {
        title: "Title is required.",
        sku: "SKU is required.",
        description: "Description is required.",
        priceInr: "Price (INR) is required.",
        priceUsd: "Price (USD) is required.",
        quantity: "Quantity is required.",
        material: "Material is required.",
    };

    for (const field in requiredFields) {
        if (!formData[field]) {
            newErrors[field] = requiredFields[field];
        }
    }
    
    if (Number(formData.priceInr) < 0) newErrors.priceInr = "Price cannot be negative.";
    if (Number(formData.priceUsd) < 0) newErrors.priceUsd = "Price cannot be negative.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Limiting to images
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
        alert("Please fix the errors before submitting.");
        return;
    }
    if (!token) {
      alert("Authentication error: No token found.");
      return;
    }
    setIsSubmitting(true);

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    files.forEach((file) => {
      submissionData.append("media", file);
    });

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } };
      const { data } = await axios.post('/api/rugs', submissionData, config);
      
      alert("Product added successfully!");
      onProductAdded(data); 
      onOpenChange(false);
      setFormData(initialFormState);
      setFiles([]);
      setErrors({});

    } catch (error) {
      let errorMessage = "Failed to add product.";
      if (error instanceof AxiosError && error.response) errorMessage = error.response.data.message || errorMessage;
      console.error("Failed to add product:", error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add a New Rug</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <SectionCard title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} className={`mt-1 ${errors.title ? 'border-red-500' : ''}`} />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <Label htmlFor="sku">SKU Code</Label>
                        <Input id="sku" name="sku" value={formData.sku} onChange={handleInputChange} className={`mt-1 ${errors.sku ? 'border-red-500' : ''}`} placeholder="e.g., SK-MOD-001" />
                        {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
                    </div>
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={`mt-1 ${errors.description ? 'border-red-500' : ''}`} rows={4} />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
            </SectionCard>

            <SectionCard title="Media (Main Image + Gallery)">
                <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${ isDragActive ? "border-primary bg-primary/10" : "border-border" }`}>
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Drag and drop images here, or click to select</p>
                </div>
                {files.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {files.map((file, index) => (
                            <div key={index} className="relative group aspect-square">
                                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-lg" />
                                <button type="button" onClick={() => removeFile(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                                {index === 0 && <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 rounded-b-lg">Main Image</div>}
                            </div>
                        ))}
                    </div>
                )}
            </SectionCard>
            
            <SectionCard title="Pricing & Inventory">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><Label htmlFor="priceInr">Price (INR)</Label><Input id="priceInr" name="priceInr" type="number" min="0" value={formData.priceInr} onChange={handleInputChange} className={`mt-1 ${errors.priceInr ? 'border-red-500' : ''}`} />{errors.priceInr && <p className="text-red-500 text-xs mt-1">{errors.priceInr}</p>}</div>
                    <div><Label htmlFor="priceUsd">Price (USD)</Label><Input id="priceUsd" name="priceUsd" type="number" min="0" value={formData.priceUsd} onChange={handleInputChange} className={`mt-1 ${errors.priceUsd ? 'border-red-500' : ''}`} />{errors.priceUsd && <p className="text-red-500 text-xs mt-1">{errors.priceUsd}</p>}</div>
                    <div><Label htmlFor="quantity">Stock Quantity</Label><Input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} className={`mt-1 ${errors.quantity ? 'border-red-500' : ''}`} />{errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}</div>
                </div>
            </SectionCard>

            <SectionCard title="Details & Specifications">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <Label>Material</Label>
                        <Select name="material" onValueChange={(v) => handleSelectChange("material", v)}>
                            <SelectTrigger className={`mt-1 ${errors.material ? 'border-red-500' : ''}`}><SelectValue placeholder="Select material..." /></SelectTrigger>
                            <SelectContent>{materialOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {errors.material && <p className="text-red-500 text-xs mt-1">{errors.material}</p>}
                    </div>
                    <div><Label htmlFor="primaryColor">Primary Color</Label><Input id="primaryColor" name="primaryColor" value={formData.primaryColor} onChange={handleInputChange} className="mt-1"/></div>
                    <div><Label htmlFor="secondaryColor">Secondary Color</Label><Input id="secondaryColor" name="secondaryColor" value={formData.secondaryColor} onChange={handleInputChange} className="mt-1"/></div>
                    <div><Label htmlFor="width">Width (ft)</Label><Input id="width" name="width" type="number" step="0.1" value={formData.width} onChange={handleInputChange} className="mt-1" placeholder="e.g., 5"/></div>
                    <div><Label htmlFor="length">Length (ft)</Label><Input id="length" name="length" type="number" step="0.1" value={formData.length} onChange={handleInputChange} className="mt-1" placeholder="e.g., 7"/></div>
                    <div><Label htmlFor="pileHeight">Pile Height</Label><Input id="pileHeight" name="pileHeight" value={formData.pileHeight} onChange={handleInputChange} placeholder="e.g., 0.5 inch" className="mt-1"/></div>
                </div>
            </SectionCard>

            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Product
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

