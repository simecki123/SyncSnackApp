import { auth } from '@/app/auth';
import dynamic from 'next/dynamic';

const OrdersTable = dynamic(
  () => import('@/app/components/my-orders/orders-table/OrdersTable'),
  { ssr: false }
);

export default async function OrdersPage() {
  const session = await auth();
  const activeUser: any = session?.user;
  const accessToken: any = activeUser?.accessToken;

  let orders: Array<any> = [];
  const startSearch = "";
  
  try {
    const response = await fetch("http://localhost:8080/api/orders/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ startSearch }),
    });
    
    orders = await response.json();
  } catch (e: any) {
    console.error('Error fetching orders:', e);
  }

  async function searchSpecificOrders(searchTerm: string) {
    "use server";
    
    try {
      const response = await fetch("http://localhost:8080/api/orders/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ searchTerm }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  orders = orders.map((order: any) => {
    order.createdAt = new Date(order.createdAt);
    return order;
  });

  return (
    <OrdersTable
      accessToken={accessToken}
      orders={sortDataByCreatedAtDescending(orders)}
      searchSpecificOrders={searchSpecificOrders}
    />
  );
}

function sortDataByCreatedAtDescending(data: any[]) {
  return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
