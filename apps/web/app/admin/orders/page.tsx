import { OrderList } from './order-list';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders and update shipping statuses.</p>
      </div>

      <OrderList />
    </div>
  );
}
