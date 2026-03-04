"use client";

import { useState } from "react";
import {
    ArrowUpDown,
    Eye,
    Search,
    Filter,
    Download,
    Truck,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Define status colors
const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
};

// Mock orders data
const orders = [
    {
        id: "#ORD-5271",
        customer: "John Doe",
        customerEmail: "john.doe@example.com",
        date: "2025-04-15",
        status: "delivered",
        total: "$256.95",
        items: 3,
        payment: "Credit Card",
        address: "123 Main St, Anytown, AN 12345",
        phone: "+1 (555) 123-4567",
        products: [
            { id: "P001", name: "Smartphone X", price: "$120.00", quantity: 1 },
            { id: "P002", name: "Wireless Earbuds", price: "$79.99", quantity: 1 },
            { id: "P003", name: "Phone Case", price: "$14.99", quantity: 1 }
        ],
        subtotal: "$214.98",
        shipping: "$5.99",
        tax: "$15.98",
    },
    {
        id: "#ORD-5270",
        customer: "Jane Smith",
        customerEmail: "jane.smith@example.com",
        date: "2025-04-15",
        status: "shipped",
        total: "$124.50",
        items: 2,
        payment: "PayPal",
        address: "456 Oak Ave, Springfield, SP 67890",
        phone: "+1 (555) 234-5678",
        products: [
            { id: "P004", name: "USB-C Cable (2-pack)", price: "$19.99", quantity: 1 },
            { id: "P005", name: "Bluetooth Speaker", price: "$89.99", quantity: 1 }
        ],
        subtotal: "$109.98",
        shipping: "$5.99",
        tax: "$8.53",
    },
    {
        id: "#ORD-5269",
        customer: "Robert Johnson",
        customerEmail: "robert.j@example.com",
        date: "2025-04-14",
        status: "processing",
        total: "$534.67",
        items: 1,
        payment: "Credit Card",
        address: "789 Pine Ln, Oakdale, OD 54321",
        phone: "+1 (555) 345-6789",
        products: [
            { id: "P006", name: "4K Monitor", price: "$499.99", quantity: 1 }
        ],
        subtotal: "$499.99",
        shipping: "$0.00",
        tax: "$34.68",
    },
    {
        id: "#ORD-5268",
        customer: "Emily Wilson",
        customerEmail: "emily.w@example.com",
        date: "2025-04-14",
        status: "pending",
        total: "$78.24",
        items: 2,
        payment: "Bank Transfer",
        address: "321 Elm St, Rivertown, RT 98765",
        phone: "+1 (555) 456-7890",
        products: [
            { id: "P007", name: "Mouse Pad", price: "$12.99", quantity: 1 },
            { id: "P008", name: "HDMI Cable", price: "$19.99", quantity: 3 }
        ],
        subtotal: "$72.96",
        shipping: "$5.28",
        tax: "$0.00",
    },
    {
        id: "#ORD-5267",
        customer: "Michael Brown",
        customerEmail: "michael.b@example.com",
        date: "2025-04-13",
        status: "cancelled",
        total: "$349.99",
        items: 1,
        payment: "Credit Card",
        address: "654 Maple Dr, Hilltop, HT 13579",
        phone: "+1 (555) 567-8901",
        products: [
            { id: "P009", name: "Wireless Headphones", price: "$329.99", quantity: 1 }
        ],
        subtotal: "$329.99",
        shipping: "$9.99",
        tax: "$10.01",
    },
    {
        id: "#ORD-5266",
        customer: "Laura Davis",
        customerEmail: "laura.d@example.com",
        date: "2025-04-13",
        status: "refunded",
        total: "$89.97",
        items: 3,
        payment: "PayPal",
        address: "987 Cedar Ave, Brookside, BS 24680",
        phone: "+1 (555) 678-9012",
        products: [
            { id: "P010", name: "Phone Stand", price: "$15.99", quantity: 1 },
            { id: "P011", name: "Screen Protector", price: "$19.99", quantity: 2 },
            { id: "P012", name: "Charging Dock", price: "$29.99", quantity: 1 }
        ],
        subtotal: "$85.96",
        shipping: "$3.99",
        tax: "$0.02",
    },
];

interface Order {
    id: string;
    customer: string;
    customerEmail: string;
    date: string;
    status: string;
    total: string;
    items: number;
    payment: string;
    address: string;
    phone: string;
    products: Array<{
        id: string;
        name: string;
        price: string;
        quantity: number;
    }>;
    subtotal: string;
    shipping: string;
    tax: string;
}
export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
    const [activeStatus, setActiveStatus] = useState("all");
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
    const [dateRange, setDateRange] = useState("all");
    const [paymentMethod, setPaymentMethod] = useState("all");

    // Filter orders based on search term and active status
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = activeStatus === "all" || order.status === activeStatus;

        return matchesSearch && matchesStatus;
    });

    const handleViewOrder = (order: any) => {
        setSelectedOrder(order);
        setIsOrderDetailsOpen(true);
    };

    const updateOrderStatus = (orderId: string, newStatus: string) => {
        console.log(`Updating order ${orderId} status to ${newStatus}`);
        // Implementation would update the order status in the database
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Orders</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveStatus}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <TabsList className="mb-2 sm:mb-0">
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="shipped">Shipped</TabsTrigger>
                        <TabsTrigger value="delivered">Delivered</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search orders..."
                                className="pl-8 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Filter Orders</SheetTitle>
                                    <SheetDescription>
                                        Apply filters to narrow down your orders list
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="py-4 space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Date Range</h4>
                                        <Select value={dateRange} onValueChange={setDateRange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select date range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Time</SelectItem>
                                                <SelectItem value="today">Today</SelectItem>
                                                <SelectItem value="yesterday">Yesterday</SelectItem>
                                                <SelectItem value="week">Last 7 days</SelectItem>
                                                <SelectItem value="month">Last 30 days</SelectItem>
                                                <SelectItem value="quarter">Last 90 days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Payment Method</h4>
                                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Methods</SelectItem>
                                                <SelectItem value="credit">Credit Card</SelectItem>
                                                <SelectItem value="paypal">PayPal</SelectItem>
                                                <SelectItem value="bank">Bank Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex justify-between mt-8">
                                        <Button variant="outline" onClick={() => {
                                            setDateRange("all");
                                            setPaymentMethod("all");
                                        }}>
                                            Reset
                                        </Button>
                                        <Button onClick={() => setIsFilterSheetOpen(false)}>
                                            Apply Filters
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <TabsContent value="all" className="mt-0">
                    <OrdersTable
                        orders={filteredOrders}
                        onViewOrder={handleViewOrder}
                        statusColors={statusColors}
                    />
                </TabsContent>

                {Object.keys(statusColors).map((status) => (
                    <TabsContent key={status} value={status} className="mt-0">
                        <OrdersTable
                            orders={filteredOrders}
                            onViewOrder={handleViewOrder}
                            statusColors={statusColors}
                        />
                    </TabsContent>
                ))}
            </Tabs>

            {/* Order Details Dialog */}
            <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Complete information about this order
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{selectedOrder.id}</h3>
                                    <p className="text-sm text-gray-500">Placed on {selectedOrder.date}</p>
                                </div>
                                <Badge className={statusColors[selectedOrder.status]}>
                                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </Badge>
                            </div>

                            <Separator className="my-4" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Customer Information</h4>
                                    <p className="text-sm">{selectedOrder.customer}</p>
                                    <p className="text-sm">{selectedOrder.customerEmail}</p>
                                    <p className="text-sm">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                                    <p className="text-sm">{selectedOrder.address}</p>
                                </div>
                            </div>

                            <h4 className="text-sm font-medium my-4">Order Items</h4>
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-right">Qty</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedOrder.products.map((product: any) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell className="text-right">{product.price}</TableCell>
                                                <TableCell className="text-right">{product.quantity}</TableCell>
                                                <TableCell className="text-right">
                                                    ${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>{selectedOrder.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>{selectedOrder.shipping}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>{selectedOrder.tax}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>{selectedOrder.total}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                                <p className="text-sm">Method: {selectedOrder.payment}</p>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-medium">Update Order Status</h4>
                                <Select
                                    defaultValue={selectedOrder.status}
                                    onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="refunded">Refunded</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
interface OrdersTableProps {
    orders: any[];
    onViewOrder: (order: any) => void;
    statusColors: Record<string, string>;
}
// Separate table component for better organization
function OrdersTable({ orders, onViewOrder, statusColors }: OrdersTableProps) {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button variant="ghost" className="flex items-center p-0 hover:bg-transparent">
                                        Order ID
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="flex items-center p-0 hover:bg-transparent">
                                        Date
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    <Button variant="ghost" className="flex items-center p-0 hover:bg-transparent justify-end">
                                        Total
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order: any) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{order.customer}</p>
                                                <p className="text-sm text-gray-500">{order.customerEmail}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>
                                            <Badge className={statusColors[order.status]}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{order.total}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => onViewOrder(order)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Truck className="mr-2 h-4 w-4" />
                                                        Update Status
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6">
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}