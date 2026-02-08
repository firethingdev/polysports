'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@workspace/ui/components/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface ProductFormProps {
  initialData?: Product;
  onSave: (data: Partial<Product>) => void;
  title: string;
}

export function ProductForm({ initialData, onSave, title }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=800&fit=crop']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    router.push('/admin/products');
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Professional Basketball"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Basketball"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Level</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.images?.[0] || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    images: [e.target.value, ...(formData.images?.slice(1) || [])]
                  })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[120px]"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 border-t pt-6 bg-muted/30">
            <Link href="/admin/products">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Product
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
