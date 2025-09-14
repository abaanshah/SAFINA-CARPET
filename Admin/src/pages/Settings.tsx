import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from '@/components/ui/separator';
import { useAppStore, useUIStore } from '@/store';
import { useToast } from '@/hooks/use-toast';
import { Save, Building, Palette, Bell, Shield } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useAppStore();
  const { theme, setTheme } = useUIStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: settings.companyName,
    currency: settings.currency,
    taxRate: settings.taxRate,
    language: settings.language,
    notifications: { ...settings.notifications }
  });

  const handleSave = () => {
    updateSettings(formData);
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  const handleNotificationChange = (key: keyof typeof formData.notifications, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Configure your admin panel and company preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Settings */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-primary" />
                <CardTitle className="text-card-foreground">Company Information</CardTitle>
              </div>
              <CardDescription>
                Update your company details and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="SAFINA CARPETS"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={formData.currency} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }))}
                    placeholder="18"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={formData.language} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-primary" />
                <CardTitle className="text-card-foreground">Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize the look and feel of your admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle className="text-card-foreground">Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive push notifications in browser
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order Updates</Label>
                  <div className="text-sm text-muted-foreground">
                    Get notified about new orders and status changes
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.orderUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Stock Alerts</Label>
                  <div className="text-sm text-muted-foreground">
                    Get alerted when products are running low
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.lowStock}
                  onCheckedChange={(checked) => handleNotificationChange('lowStock', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
              
              <Button variant="outline" className="w-full border-border">
                Export Data
              </Button>
              
              <Button variant="outline" className="w-full border-border">
                Backup Settings
              </Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-card-foreground">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-border text-sm">
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full border-border text-sm">
                Two-Factor Auth
              </Button>
              
              <Button variant="outline" className="w-full border-border text-sm">
                Login History
              </Button>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Company Heritage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <strong className="text-card-foreground">SAFINA CARPETS</strong>
                </p>
                <p className="text-muted-foreground">
                  Mughal-era craftsmanship since 1970
                </p>
                <p className="text-muted-foreground">
                  "Make Your House Happy"
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Delhi, India • Export • Wholesale • Retail
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}