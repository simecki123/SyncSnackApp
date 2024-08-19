'use client'

import { Box } from "@chakra-ui/react"
import SearchInputFilter from "./SearchInputFilter"
import RateFilterSlider from "./RateFilterSlider"
import OrdersTable from "../my-events/OrdersTable"
import { useEffect, useState } from "react"

export default function OrdersPageTable({ currentPage, accessToken }: any) {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((value) => value.json())
      .then((value) => setOrders(value))
  })

  return (
    <Box className='mt-24'>
      <Box className='flex flex-col items-center'>
        <SearchInputFilter page={currentPage} />
        <RateFilterSlider />
      </Box>
      <OrdersTable
        accessToken={accessToken}
        orders={orders}
        currentPage={currentPage}
      />
    </Box>
  )
}
