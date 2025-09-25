import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Ruler, Sparkles } from "lucide-react";

interface RugDimensionsFormProps {
  width: string;
  length: string;
  unit: "ft" | "cm";
  alignmentHint: string;
  onWidthChange: (value: string) => void;
  onLengthChange: (value: string) => void;
  onUnitChange: (value: "ft" | "cm") => void;
  onAlignmentHintChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  canSubmit: boolean;
}

const RugDimensionsForm = ({
  width,
  length,
  unit,
  alignmentHint,
  onWidthChange,
  onLengthChange,
  onUnitChange,
  onAlignmentHintChange,
  onSubmit,
  isLoading,
  canSubmit,
}: RugDimensionsFormProps) => {
  const [errors, setErrors] = useState<{ width?: string; length?: string }>({});

  const validateDimensions = () => {
    const newErrors: { width?: string; length?: string } = {};
    
    const widthNum = parseFloat(width);
    const lengthNum = parseFloat(length);
    
    if (!width || isNaN(widthNum) || widthNum <= 0) {
      newErrors.width = "Please enter a valid width";
    }
    
    if (!length || isNaN(lengthNum) || lengthNum <= 0) {
      newErrors.length = "Please enter a valid length";
    }
    
    if (unit === "ft") {
      if (widthNum > 20) newErrors.width = "Width seems too large (max 20ft)";
      if (lengthNum > 30) newErrors.length = "Length seems too large (max 30ft)";
      if (widthNum < 0.5) newErrors.width = "Width seems too small (min 0.5ft)";
      if (lengthNum < 0.5) newErrors.length = "Length seems too small (min 0.5ft)";
    } else {
      if (widthNum > 600) newErrors.width = "Width seems too large (max 600cm)";
      if (lengthNum > 900) newErrors.length = "Length seems too large (max 900cm)";
      if (widthNum < 15) newErrors.width = "Width seems too small (min 15cm)";
      if (lengthNum < 15) newErrors.length = "Length seems too small (min 15cm)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateDimensions() && canSubmit) {
      onSubmit();
    }
  };

  const commonSizes = [
    { name: "Small (3×5 ft)", width: "3", length: "5" },
    { name: "Medium (5×8 ft)", width: "5", length: "8" },
    { name: "Large (8×10 ft)", width: "8", length: "10" },
    { name: "Runner (2×8 ft)", width: "2", length: "8" },
  ];

  return (
    <Card className="p-6 bg-gradient-warm shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Rug Dimensions</h3>
      </div>

      {/* Quick size selection */}
      <div className="mb-4">
        <Label className="text-sm font-medium text-muted-foreground">Popular Sizes</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {commonSizes.map((size) => (
            <Button
              key={size.name}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                onWidthChange(size.width);
                onLengthChange(size.length);
                onUnitChange("ft");
              }}
            >
              {size.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom dimensions */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="width" className="text-sm font-medium">
              Width
            </Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.1"
              className={errors.width ? "border-destructive" : ""}
            />
            {errors.width && (
              <p className="text-xs text-destructive mt-1">{errors.width}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="length" className="text-sm font-medium">
              Length
            </Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => onLengthChange(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.1"
              className={errors.length ? "border-destructive" : ""}
            />
            {errors.length && (
              <p className="text-xs text-destructive mt-1">{errors.length}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="unit" className="text-sm font-medium">
              Unit
            </Label>
            <Select value={unit} onValueChange={onUnitChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ft">Feet (ft)</SelectItem>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alignment hint */}
        <div>
          <Label htmlFor="alignment" className="text-sm font-medium">
            Placement Instructions (Optional)
          </Label>
          <Textarea
            id="alignment"
            value={alignmentHint}
            onChange={(e) => onAlignmentHintChange(e.target.value)}
            placeholder="e.g., Center under coffee table, align with sofa..."
            className="mt-1 resize-none"
            rows={2}
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className="w-full bg-gradient-luxury shadow-premium hover:shadow-glow transition-premium"
          size="lg"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Placing Your Rug...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Visualize Rug Placement
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default RugDimensionsForm;