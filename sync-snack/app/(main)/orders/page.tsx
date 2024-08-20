import { auth } from '@/app/auth';
import OrdersPageTable from '@/app/components/my-orders/OrdersPageTable';
import dynamic from 'next/dynamic';

const OrdersTable = dynamic(
  () => import('@/app/components/my-orders/orders-table/OrdersTable'),
  { ssr: false }
);

export default async function OrdersPage({ searchParams }: { searchParams: { page?: string } }) {

  const session = await auth();
  const activeUser: any = session?.user;
  const accessToken: any = activeUser?.accessToken;

  let currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 0;

  if (isNaN(currentPage)) {
    currentPage = 0
  }

  return (
    <OrdersPageTable
      currentPage={currentPage}
      accessToken={accessToken}
    />
  );
}

// const pageSize = 5; // You can adjust this as needed
//
// const fetchOrders = async (pageNumber: number): Promise<any[]> => {
//   try {
//     const response = await fetchImproved(`/api/orders/all?page=${pageNumber}&size=${pageSize}`);
//     console.log(response)
//     return response;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return [];
//   }
// };
//
// const orders = await fetchOrders(currentPage);
//
// if (orders.length === 0 && currentPage > 0) {
//   redirect(`/orders?page=${currentPage - 1}`);
// }
