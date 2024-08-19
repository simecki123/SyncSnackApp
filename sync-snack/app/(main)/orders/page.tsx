import { auth } from '@/app/auth';
import RateFilterSlider from '@/app/components/my-orders/RateFilterSlider';
import SearchInputFilter from '@/app/components/my-orders/SearchInputFilter';
import { fetchImproved } from '@/app/fetch';
import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const OrdersTable = dynamic(
  () => import('@/app/components/my-orders/orders-table/OrdersTable'),
  { ssr: false }
);

export default async function OrdersPage({ searchParams }: { searchParams: { page?: string } }) {
  const session = await auth();
  const activeUser: any = session?.user;
  const accessToken: any = activeUser?.accessToken;

  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 0;

  return (
    <Box className='mt-24'>
      <Box className='flex flex-col items-center'>
        <SearchInputFilter />
        <RateFilterSlider />
      </Box>
      <OrdersTable
        accessToken={accessToken}
        orders={orders}
        currentPage={currentPage}
      />
    </Box>
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
