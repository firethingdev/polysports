'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { Search, Truck, CheckCircle, Clock, Filter, Eye } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { Order } from '@/types';
import { Badge } from '@workspace/ui/components/badge';
import { getOrders, updateOrderStatus } from '@/app/actions/orders';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order['status'],
  ) => {
    await updateOrderStatus(orderId, newStatus);
    const data = await getOrders();
    setOrders(data);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className='h-3 w-3 mr-1' />;
      case 'shipped':
        return <Truck className='h-3 w-3 mr-1' />;
      case 'delivered':
        return <CheckCircle className='h-3 w-3 mr-1' />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.items.some((item) =>
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  if (loading) {
    return (
      <div className='rounded-md border border-border bg-card overflow-hidden h-96 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
          <p className='text-muted-foreground animate-pulse'>
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div className='relative w-full sm:w-96'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by order ID or product...'
            className='pl-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' className='gap-2 font-medium'>
            <Filter className='h-4 w-4' />
            Filter
          </Button>
        </div>
      </div>

      <div className='rounded-md border border-border bg-card overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='font-mono text-xs font-bold text-primary'>
                  {order.id}
                </TableCell>
                <TableCell className='text-sm'>{order.date}</TableCell>
                <TableCell className='text-sm max-w-[250px] truncate'>
                  {order.items.length}{' '}
                  {order.items.length === 1 ? 'item' : 'items'}:{' '}
                  {order.items.map((i) => i.product.name).join(', ')}
                </TableCell>
                <TableCell className='font-semibold'>
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value as Order['status'])
                    }
                  >
                    <SelectTrigger
                      className={`h-8 w-[130px] ${getStatusColor(order.status)} font-semibold border text-xs`}
                    >
                      <SelectValue>
                        <div className='flex items-center'>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='pending'>
                        <div className='flex items-center text-xs'>
                          <Clock className='h-3 w-3 mr-2' /> Pending
                        </div>
                      </SelectItem>
                      <SelectItem value='shipped'>
                        <div className='flex items-center text-xs'>
                          <Truck className='h-3 w-3 mr-2' /> Shipped
                        </div>
                      </SelectItem>
                      <SelectItem value='delivered'>
                        <div className='flex items-center text-xs'>
                          <CheckCircle className='h-3 w-3 mr-2' /> Delivered
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className='text-right'>
                  <Link href={`/admin/orders/${order.id}`}>
                    <Button variant='ghost' size='sm' className='gap-2'>
                      <Eye className='h-4 w-4' />
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='h-24 text-center text-muted-foreground text-sm italic'
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
