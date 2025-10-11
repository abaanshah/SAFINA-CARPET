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

// --- Predefined options for dropdowns to ensure data consistency ---
const categoryOptions = ["Persian", "Modern", "Traditional", "Vintage", "Bohemian"];
const materialOptions = ["Wool", "Silk", "Cotton", "Jute", "Synthetic"];
const shapeOptions = ["Rectangular", "Round", "Runner", "Square", "Oval"];
const patternOptions = ["Geometric", "Floral", "Abstract", "Oriental", "Solid"];
const typeOptions = ["Hand-Knotted", "Hand-Tufted", "Machine-Made", "Flatweave"];

interface AddProductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: (newProduct: any) => void;
}

// --- FIX: Defined a type for the errors state object ---
interface FormErrors {
    [key: string]: string | undefined;
    title?: string;
    sku?: string;
    description?: string;
    priceInr?: string;
    priceUsd?: string;
    quantity?: string;
    category?: string;
    material?: string;
    pattern?: string;
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

  const initialFormState = {
    title: "", sku: "", description: "", personalization: "", instructionForBuyers: "",
    priceInr: "", priceUsd: "", quantity: "0", category: "", material: "",
    primaryColor: "", secondaryColor: "", width: "", length: "", diameter: "",
    pattern: "", shape: "", type: "", pileHeight: "", room: "",
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // --- FIX: Applied the FormErrors type to the state ---
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Improved validation logic ---
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields = {
        title: "Title is required.",
        sku: "SKU is required.",
        description: "Description is required.",
        priceInr: "Price (INR) is required.",
        priceUsd: "Price (USD) is required.",
        quantity: "Quantity is required.",
        category: "Category is required.",
        material: "Material is required.",
        pattern: "Please select a design for the pattern field.",
    };

    for (const field in requiredFields) {
        if (!formData[field]) {
            newErrors[field] = requiredFields[field];
        }
    }

    if (Number(formData.priceInr) < 0) newErrors.priceInr = "Price cannot be negative.";
    if (Number(formData.priceUsd) < 0) newErrors.priceUsd = "Price cannot be negative.";
    if (Number(formData.quantity) < 0) newErrors.quantity = "Quantity cannot be negative.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
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
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post('/api/rugs', submissionData, config);
      
      alert("Product added successfully!");
      onProductAdded(data); 
      onOpenChange(false);
      setFormData(initialFormState);
      setFiles([]);
      setErrors({});

    } catch (error) {
      let errorMessage = "Failed to add product.";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      console.error("Failed to add product:", error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

            <SectionCard title="Pics & Videos">
                <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${ isDragActive ? "border-primary bg-primary/10" : "border-border" }`}>
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground"> Drag 'n' drop some files here, or click to select files </p>
                </div>
                {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {getFileIcon(file.type)}
                                    <span className="text-sm font-medium truncate">{file.name}</span>
                                </div>
                                <button type="button" onClick={() => removeFile(index)} className="p-1 text-destructive hover:bg-destructive/10 rounded-full"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                )}
            </SectionCard>

            <SectionCard title="Customization">
                <div><Label htmlFor="personalization">Personalization Instructions for Buyer</Label><Textarea id="personalization" name="personalization" value={formData.personalization} onChange={handleInputChange} placeholder="e.g., Enter the name you'd like embroidered." className="mt-1" rows={2}/></div>
                <div><Label htmlFor="instructionForBuyers">Additional Instructions for Buyers</Label><Textarea id="instructionForBuyers" name="instructionForBuyers" value={formData.instructionForBuyers} onChange={handleInputChange} placeholder="e.g., Gift wrapping available upon request." className="mt-1" rows={2}/></div>
            </SectionCard>

            <SectionCard title="Pricing & Inventory">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><Label htmlFor="priceInr">Pricing (India - ₹)</Label><Input id="priceInr" name="priceInr" type="number" min="0" value={formData.priceInr} onChange={handleInputChange} className={`mt-1 ${errors.priceInr ? 'border-red-500' : ''}`} />{errors.priceInr && <p className="text-red-500 text-xs mt-1">{errors.priceInr}</p>}</div>
                    <div><Label htmlFor="priceUsd">Pricing (Elsewhere - $)</Label><Input id="priceUsd" name="priceUsd" type="number" min="0" value={formData.priceUsd} onChange={handleInputChange} className={`mt-1 ${errors.priceUsd ? 'border-red-500' : ''}`} />{errors.priceUsd && <p className="text-red-500 text-xs mt-1">{errors.priceUsd}</p>}</div>
                    <div><Label htmlFor="quantity">Quantity</Label><Input id="quantity" name="quantity" type="number" min="0" value={formData.quantity} onChange={handleInputChange} className={`mt-1 ${errors.quantity ? 'border-red-500' : ''}`} />{errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}</div>
                </div>
            </SectionCard>

            <SectionCard title="Details & Specifications">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div><Label>Category</Label><Select name="category" onValueChange={(v) => handleSelectChange("category", v)}><SelectTrigger className={`mt-1 ${errors.category ? 'border-red-500' : ''}`}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{categoryOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>{errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}</div>
                    <div><Label>Material</Label><Select name="material" onValueChange={(v) => handleSelectChange("material", v)}><SelectTrigger className={`mt-1 ${errors.material ? 'border-red-500' : ''}`}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{materialOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>{errors.material && <p className="text-red-500 text-xs mt-1">{errors.material}</p>}</div>
                    <div><Label htmlFor="primaryColor">Primary Color</Label><Input id="primaryColor" name="primaryColor" value={formData.primaryColor} onChange={handleInputChange} className="mt-1"/></div>
                    <div><Label htmlFor="secondaryColor">Secondary Color</Label><Input id="secondaryColor" name="secondaryColor" value={formData.secondaryColor} onChange={handleInputChange} className="mt-1"/></div>
                    <div><Label>Pattern</Label><Select name="pattern" onValueChange={(v) => handleSelectChange("pattern", v)}><SelectTrigger className={`mt-1 ${errors.pattern ? 'border-red-500' : ''}`}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{patternOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>{errors.pattern && <p className="text-red-500 text-xs mt-1">{errors.pattern}</p>}</div>
                    <div><Label>Shape</Label><Select name="shape" onValueChange={(v) => handleSelectChange("shape", v)}><SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{shapeOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
                    <div><Label>Type</Label><Select name="type" onValueChange={(v) => handleSelectChange("type", v)}><SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{typeOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
                    <div><Label htmlFor="pileHeight">Pile Height</Label><Input id="pileHeight" name="pileHeight" value={formData.pileHeight} onChange={handleInputChange} placeholder="e.g., 0.5 inch" className="mt-1"/></div>
                    <div><Label htmlFor="room">Recommended Room(s)</Label><Input id="room" name="room" value={formData.room} onChange={handleInputChange} placeholder="Living Room, Bedroom" className="mt-1"/></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div><Label htmlFor="width">Width (ft)</Label><Input id="width" name="width" type="number" value={formData.width} onChange={handleInputChange} className="mt-1"/></div>
                    <div><Label htmlFor="length">Length (ft)</Label><Input id="length" name="length" type="number" value={formData.length} onChange={handleInputChange} className="mt-1"/></div>
                    <div><Label htmlFor="diameter">Diameter (ft)</Label><Input id="diameter" name="diameter" type="number" value={formData.diameter} onChange={handleInputChange} className="mt-1"/></div>
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

