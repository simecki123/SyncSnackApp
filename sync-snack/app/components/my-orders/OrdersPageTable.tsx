'use client'

import { Box } from "@chakra-ui/react"
import SearchInputFilter from "./SearchInputFilter"
import RateFilterSlider from "./RateFilterSlider"
import { useEffect, useState } from "react"
import OrdersTable from "./orders-table/OrdersTable"
import { calculateOrderSizeBasedOnScreenHeight } from "@/app/screen"
import dynamic from "next/dynamic"
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function OrdersPageTable({ accessToken }: any) {

  const [orders, setOrders] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [input, setInput] = useState('')

  const [currentPage, setCurrentPage] = useState(0)

  const [rateFilter, setRateFilter] = useState(0)

  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/all?page=${currentPage}&search=${input}&rating=${rateFilter}&status=${statusFilter}`)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/all?size=${calculateOrderSizeBasedOnScreenHeight()}&page=${currentPage}&search=${input}&rating=${rateFilter}&status=${statusFilter}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((value) => value.json())
      .then((value) => {
        setOrders(value)
        console.log(value, 'orders')
        setTimeout(async () => setLoading(false), 2000)
      }).catch((e) => { setOrders([]) })
  }, [rateFilter, input, statusFilter, currentPage])

  if (isLoading) {
    return (
      <Box className="h-screen w-screen flex items-center justify-center text-white">
        <DotLottieReact
          src="/loading.json"
          loop
          autoplay
          className="w-72 h-72 m-44"
        />
      </Box>
    )
  }


  return (
    <Box className='grow flex flex-col'>
      <Box className='flex flex-col items-center'>
        <SearchInputFilter setInput={setInput} setStatusFilter={setStatusFilter} />
        <RateFilterSlider setRateFilter={setRateFilter} />
      </Box>
      <OrdersTable
        accessToken={accessToken}
        orders={orders}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Box>
  )
}
