import { ProductList } from './product-list';


export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog, prices, and inventory.</p>
      </div>

      <ProductList />
    </div>
  );
}
