'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@workspace/ui/components/alert-dialog';
import { Badge } from '@workspace/ui/components/badge';
import { Product } from '@/types';
import { getProducts, deleteProduct } from '@/app/actions/products';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  React.useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      const data = await getProducts();
      setProducts(data);
      setProductToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  if (loading) {
    return (
      <div className='rounded-md border border-border bg-card overflow-hidden h-96 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
          <p className='text-muted-foreground animate-pulse'>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div className='relative w-full sm:w-96'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search products...'
            className='pl-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href='/admin/products/new' className='w-full sm:w-auto'>
          <Button className='gap-2 w-full'>
            <Plus className='h-4 w-4' />
            Add Product
          </Button>
        </Link>
      </div>

      <div className='rounded-md border border-border bg-card overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className='font-medium'>
                  <div className='flex items-center gap-3'>
                    {product.images?.[0] ? (
                      <div className='relative h-10 w-10 shrink-0 rounded overflow-hidden border border-border'>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ) : (
                      <div className='h-10 w-10 shrink-0 rounded bg-secondary flex items-center justify-center'>
                        <ImageIcon className='h-5 w-5 text-muted-foreground' />
                      </div>
                    )}
                    <span>{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{product.category}</Badge>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={
                      product.stock < 10 ? 'text-rose-500 font-medium' : ''
                    }
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant='outline' size='icon-sm' title='Edit'>
                        <Pencil className='h-4 w-4' />
                      </Button>
                    </Link>
                    <Button
                      variant='outline'
                      size='icon-sm'
                      onClick={() => handleDeleteClick(product.id)}
                      className='text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                      title='Delete'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='h-24 text-center text-muted-foreground'
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
