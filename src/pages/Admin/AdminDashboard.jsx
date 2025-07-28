import { useEffect } from 'react';
// import { useAppStore } from '@/store';
import CategoryChart from '../../components/Admin/AdminDashboard/CategoryChart';
import SalesChart from '../../components/Admin/AdminDashboard/SalesChart';
import StatsCard from '../../components/Admin/AdminDashboard/StatsCard';
import RecentOrdersTable from '../../components/Admin/AdminDashboard/RecentOrdersTable';

import { Card,CardContent,CardTitle,CardHeader } from '../../components/ui/card';
import {
  mockDashboardStats,
  mockSalesData,
  mockCategorySales,
  mockRecentOrders,
} from '../../data/mockData';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  XCircle,
  Users,
  Package,
  AlertTriangle,
  FileText,
} from 'lucide-react';

export default function AdminDashboard() {
  const { setDashboardStats, dashboardStats } = useAppStore();

  useEffect(() => {
    setDashboardStats(mockDashboardStats);
  }, [setDashboardStats]);

  if (!dashboardStats) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-6"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to SAFINA CARPETS Admin Panel - Monitor your business at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Orders" value={dashboardStats.totalOrders} description="All time orders" icon={ShoppingCart} trend={{ value: 12.5, isPositive: true }} />
        <StatsCard title="Total Revenue" value={dashboardStats.totalRevenue} description="All time revenue" icon={DollarSign} trend={{ value: 8.2, isPositive: true }} />
        <StatsCard title="Pending Orders" value={dashboardStats.pendingOrders} description="Awaiting processing" icon={Clock} trend={{ value: 3.1, isPositive: false }} />
        <StatsCard title="Cancelled Orders" value={dashboardStats.cancelledOrders} description="This month" icon={XCircle} trend={{ value: 1.8, isPositive: false }} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Active Users" value="1,247" description="Currently online" icon={Users} trend={{ value: 15.3, isPositive: true }} />
        <StatsCard title="Total Products" value={dashboardStats.totalProducts} description="In inventory" icon={Package} trend={{ value: 5.1, isPositive: true }} />
        <StatsCard title="Low Stock Alert" value={dashboardStats.lowStockProducts} description="Products below threshold" icon={AlertTriangle} trend={{ value: 2.4, isPositive: false }} />
        <StatsCard title="Custom Requests" value={dashboardStats.customRequests} description="Pending review" icon={FileText} trend={{ value: 25.0, isPositive: true }} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Social Media Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((platform, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{platform}</span>
                  <span className="font-medium">{[42, 28, 18, 12][i]}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            {[
              ['🇮🇳 India', 65],
              ['🇺🇸 USA', 15],
              ['🇬🇧 UK', 12],
              ['🇨🇦 Canada', 8],
            ].map(([country, percent], i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{country}</span>
                <span className="font-medium">{percent}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Most Visited Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {[
              ['Products', 3247],
              ['Dashboard', 2891],
              ['Orders', 1834],
              ['Categories', 1247],
            ].map(([page, count], i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{page}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart data={mockSalesData} />
        <CategoryChart data={mockCategorySales} />
      </div>

      <RecentOrdersTable orders={mockRecentOrders} />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-card-foreground mb-2">Quick Actions</h3>
          <div className="space-y-3">
            {['Add New Product', 'Process Pending Orders', 'Review Custom Requests'].map((text, i) => (
              <button key={i} className="w-full text-left p-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                → {text}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-card-foreground mb-2">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            {[
              ['New order received', '2m ago'],
              ['Product stock updated', '15m ago'],
              ['Customer inquiry', '1h ago'],
            ].map(([text, time], i) => (
              <div key={i} className="flex justify-between">
                <span className="text-muted-foreground">{text}</span>
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-card-foreground mb-2">Heritage Quote</h3>
          <blockquote className="text-sm text-muted-foreground italic">
            "Every carpet tells a story of Mughal craftsmanship, woven with threads of tradition and excellence since 1970."
          </blockquote>
          <cite className="text-xs text-primary mt-2 block">- SAFINA CARPETS</cite>
        </div>
      </div>
    </div>
  );
}
