import { Badge } from "../../components/ui/Admin/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Admin/table";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/Admin/sheet";

const categories = [
  { id: 1, name: "Electronics", description: "Devices and gadgets", status: "active" },
  { id: 2, name: "Fashion", description: "Clothing and accessories", status: "draft" },
  { id: 3, name: "Home", description: "Home appliances and furniture", status: "active" },
  { id: 4, name: "Books", description: "Printed and digital books", status: "draft" },
];

const statusColors = {
  active: "bg-green-200 text-green-800",
  draft: "bg-yellow-200 text-yellow-800",
};

export default function Categories() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Categories</CardTitle>
            <p className="text-sm text-muted-foreground">Manage your product categories</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Category
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Add New Category</h2>
                {/* You can put form fields here */}
              </div>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[category.status]}>
                      {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </Badge>
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
