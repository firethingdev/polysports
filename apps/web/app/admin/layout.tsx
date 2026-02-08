'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/sidebar';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { Separator } from '@workspace/ui/components/separator';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package,
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
  ];

  return (
    <TooltipProvider>
      <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="h-16 flex items-center px-4 border-b border-border">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-xl overflow-hidden whitespace-nowrap">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span className="group-data-[collapsible=icon]:hidden">Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Other</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Back to Store">
                      <Link href="/">
                        <Home className="h-4 w-4" />
                        <span>Back to Store</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border p-4">
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Logout">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {menuItems.find(item => item.href === pathname)?.title || 'Admin'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
               {/* Add admin user profile or notifications here if needed */}
               <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                 AD
               </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
