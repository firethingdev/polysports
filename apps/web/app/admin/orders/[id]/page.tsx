'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { Order } from '@/types';
import { getOrderById, updateOrderStatus } from '@/app/actions/orders';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';

export default function OrderDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getOrderById(id);
      if (data) {
        setOrder(data);
      } else {
        router.push('/admin/orders');
      }
      setLoading(false);
    }
    load();
  }, [id, router]);

  const handleStatusChange = async (newStatus: Order['status']) => {
    const updated = await updateOrderStatus(id, newStatus);
    if (updated) setOrder(updated);
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

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className='h-4 w-4' />;
      case 'shipped':
        return <Truck className='h-4 w-4' />;
      case 'delivered':
        return <CheckCircle className='h-4 w-4' />;
    }
  };

  if (loading) {
    return (
      <div className='space-y-6'>
        <Skeleton className='h-10 w-1/4' />
        <Skeleton className='h-[600px] w-full' />
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className='space-y-6'>
      <div className='mb-6'>
        <Link href='/admin/orders'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Back to Orders
          </Button>
        </Link>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-3'>
            Order <span className='text-primary font-mono'>{order.id}</span>
          </h1>
          <p className='text-muted-foreground flex items-center gap-2 mt-1'>
            <Calendar className='h-4 w-4' />
            Placed on {order.date}
          </p>
        </div>

        <div className='flex items-center gap-3 bg-card border rounded-lg p-2 pr-4 shadow-sm'>
          <div
            className={`p-2 rounded-full ${getStatusColor(order.status).split(' ')[0]}`}
          >
            {getStatusIcon(order.status)}
          </div>
          <div className='space-y-1'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
              Order Status
            </p>
            <Select
              value={order.status}
              onValueChange={(value) =>
                handleStatusChange(value as Order['status'])
              }
            >
              <SelectTrigger className='h-8 border-none p-0 focus:ring-0 shadow-none font-bold text-sm'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='shipped'>Shipped</SelectItem>
                <SelectItem value='delivered'>Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Order Content */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader className='border-b bg-muted/30'>
              <CardTitle className='text-lg flex items-center gap-2'>
                <Package className='h-5 w-5 text-primary' />
                Items Summary
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='divide-y divide-border'>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-center p-4'
                  >
                    <div className='flex gap-4'>
                      {/* Image Placeholder */}
                      <div className='h-16 w-16 rounded bg-secondary flex items-center justify-center border'>
                        <Package className='h-8 w-8 text-muted-foreground/50' />
                      </div>
                      <div className='space-y-1 text-sm'>
                        <p className='font-bold'>{item.product.name}</p>
                        <p className='text-muted-foreground'>
                          Category: {item.product.category}
                        </p>
                        <p className='text-muted-foreground'>
                          Unit Price: ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className='text-right space-y-1'>
                      <p className='text-sm font-medium'>
                        Qty: {item.quantity}
                      </p>
                      <p className='font-bold text-lg'>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className='bg-muted/30 border-t flex flex-col gap-2 p-6'>
              <div className='flex justify-between w-full text-sm'>
                <span className='text-muted-foreground'>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className='flex justify-between w-full text-sm'>
                <span className='text-muted-foreground'>Shipping</span>
                <span className='text-emerald-500 font-medium'>Free</span>
              </div>
              <div className='flex justify-between w-full mt-2 pt-2 border-t text-xl font-bold'>
                <span>Total Amount</span>
                <span className='text-primary'>${order.total.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Customer & Payment Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start gap-3'>
                <User className='h-4 w-4 mt-1 text-primary' />
                <div className='text-sm'>
                  <p className='font-bold'>John Doe</p>
                  <p className='text-muted-foreground'>
                    Customer ID: CUST-4921
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3 border-t pt-4'>
                <Mail className='h-4 w-4 mt-1 text-primary' />
                <p className='text-sm'>john.doe@example.com</p>
              </div>
              <div className='flex items-start gap-3 border-t pt-4'>
                <Phone className='h-4 w-4 mt-1 text-primary' />
                <p className='text-sm'>+1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className='flex items-start gap-3'>
              <MapPin className='h-4 w-4 mt-1 text-primary' />
              <div className='text-sm leading-relaxed'>
                <p>123 Sports Avenue</p>
                <p>Brooklyn, NY 11201</p>
                <p>United States</p>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-primary/5 border-primary/20'>
            <CardHeader>
              <CardTitle className='text-sm font-bold uppercase tracking-wider text-primary'>
                Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className='flex items-start gap-3'>
              <CreditCard className='h-4 w-4 mt-1 text-primary' />
              <div className='text-sm'>
                <p className='font-bold'>Visa ending in 4242</p>
                <p className='text-muted-foreground'>Paid on {order.date}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
