import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { mockProducts } from '@/lib/data/mockProducts';
import { mockOrders } from '@/lib/data/mockOrders';

export default function AdminDashboard() {
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      description: 'Lifetime revenue',
      color: 'text-emerald-500',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      description: 'Across all time',
      color: 'text-blue-500',
    },
    {
      title: 'Products',
      value: totalProducts,
      icon: Package,
      description: 'Active in catalog',
      color: 'text-amber-500',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: Users,
      description: 'Awaiting shipping',
      color: 'text-rose-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your store administration panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.filter(p => p.stock < 15).slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                   <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className={`text-sm font-medium ${product.stock < 10 ? 'text-rose-500' : 'text-amber-500'}`}>
                    {product.stock} left
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
