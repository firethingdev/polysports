'use client';

import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@workspace/ui/components/accordion';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
  Search,
  Truck,
  CheckCircle,
  Clock,
  Filter,
  Calendar,
  Package,
  CreditCard
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@workspace/ui/components/select';
import { Order } from '@/types';
import { mockOrders } from '@/lib/data/mockOrders';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialize from localStorage or mock data
    const savedOrders = localStorage.getItem('polysports_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(mockOrders);
      localStorage.setItem('polysports_orders', JSON.stringify(mockOrders));
    }
  }, []);

  const saveToLocalStorage = (newOrders: Order[]) => {
    localStorage.setItem('polysports_orders', JSON.stringify(newOrders));
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    saveToLocalStorage(updated);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3 mr-1" />;
      case 'shipped': return <Truck className="h-3 w-3 mr-1" />;
      case 'delivered': return <CheckCircle className="h-3 w-3 mr-1" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.items.some(item => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or product..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 font-medium">
             <Filter className="h-4 w-4" />
             Filter
           </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Header-like row for large screens */}
        <div className="hidden lg:grid lg:grid-cols-12 px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-secondary/50 rounded-t-lg items-center divide-x divide-border border-x border-t border-border">
          <div className="col-span-2 pl-2">Order ID</div>
          <div className="col-span-2 pl-4">Date</div>
          <div className="col-span-3 pl-4">Products</div>
          <div className="col-span-2 pl-4">Total</div>
          <div className="col-span-3 pl-4">Status</div>
        </div>

        <Accordion type="multiple" className="w-full space-y-2">
          {filteredOrders.map((order) => (
            <AccordionItem
              key={order.id}
              value={order.id}
              className="border border-border rounded-lg bg-card overflow-hidden data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="hover:no-underline px-6 py-4">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full text-left items-center pr-4">
                    <div className="col-span-2 font-mono text-xs font-bold text-primary">
                       {order.id}
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground flex items-center gap-2">
                       <Calendar className="h-3.5 w-3.5" />
                       {order.date}
                    </div>
                    <div className="col-span-3 text-sm truncate pr-2">
                       {order.items.length} {order.items.length === 1 ? 'item' : 'items'}: {order.items.map(i => i.product.name).join(', ')}
                    </div>
                    <div className="col-span-2 font-semibold">
                       ${order.total.toFixed(2)}
                    </div>
                    <div className="col-span-3" onClick={(e) => e.stopPropagation()}>
                       <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className={`h-8 w-full max-w-[140px] ${getStatusColor(order.status)} font-semibold border text-xs`}>
                          <SelectValue>
                            <div className="flex items-center">
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <div className="flex items-center text-xs"><Clock className="h-3 w-3 mr-2" /> Pending</div>
                          </SelectItem>
                          <SelectItem value="shipped">
                            <div className="flex items-center text-xs"><Truck className="h-3 w-3 mr-2" /> Shipped</div>
                          </SelectItem>
                          <SelectItem value="delivered">
                            <div className="flex items-center text-xs"><CheckCircle className="h-3 w-3 mr-2" /> Delivered</div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 border-t border-border grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Package className="h-4 w-4" />
                      Order Details
                    </div>
                    <Card className="bg-muted/30 border-none shadow-none">
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-3 text-sm px-4">
                              <div className="flex flex-col">
                                <span className="font-medium">{item.product.name}</span>
                                <span className="text-xs text-muted-foreground">Category: {item.product.category}</span>
                              </div>
                              <div className="flex items-center gap-8">
                                <span className="text-muted-foreground">Qty: {item.quantity}</span>
                                <span className="font-semibold text-right w-20">${(item.product.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <CreditCard className="h-4 w-4" />
                      Summary
                    </div>
                    <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-emerald-500 font-medium">Free</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                       <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1.5">Action</p>
                       <Button variant="outline" size="sm" className="w-full shadow-sm text-xs h-9">
                         View Invoice
                       </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          {filteredOrders.length === 0 && (
            <div className="h-32 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border rounded-lg bg-muted/10">
               <Package className="h-8 w-8 mb-2 opacity-20" />
               <p>No orders found matching your criteria.</p>
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
}
