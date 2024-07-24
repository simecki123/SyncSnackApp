import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Text,
} from '@chakra-ui/react'

export default function OrdersPage() {

  const listElements = mockedData.map((data, index) => (
    <Tr key={index}>
      <Td>{data._id}</Td>
      <Td><OrderTypePretty orderType={data.orderType} /></Td>
      <Td>{data.createdAt.toLocaleString()}</Td>
      <Td>{data.completedAt?.toLocaleString() || '-'}</Td>
      <Td className='flex'><StatusPretty statusType={data.status} /></Td>
      <Td><Button>Description</Button></Td>
      <Td>
        {data.rating && <RatingPretty rating={data.rating} /> || <Button>Rate</Button>}
      </Td>
    </Tr>
  ))

  return (
    <div className='h-screen mx-12'>
      <TableContainer>
        <Table>
          <TableCaption>Orders history</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>Created At</Th>
              <Th>Completed At</Th>
              <Th>Status</Th>
              <Th>Description</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listElements}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>Created At</Th>
              <Th>Completed At</Th>
              <Th>Status</Th>
              <Th>Description</Th>
              <Th>Rating</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  )
}

function OrderTypePretty({ orderType }: { orderType: string }) {

  switch (orderType) {
    case "coffee":
      return (
        <Box className='px-4 py-2 bg-stone-300 rounded-md'>
          <Text>Coffee</Text>
        </Box>
      )
    case "outside":
      return (
        <Box className='px-4 py-2 bg-stone-400 rounded-md text-white'>
          <Text>Outside</Text>
        </Box>
      )
  }
}

function StatusPretty({ statusType }: { statusType: string }) {

  switch (statusType) {
    case "In Progress":
      return (
        <Box className='px-4 py-2 bg-yellow-500 rounded-md text-white'>
          <Text>In Progress</Text>
        </Box>
      )
    case "Done":
      return (
        <Box className='px-4 py-2 bg-green-500 rounded-md text-white'>
          <Text>Done</Text>
        </Box>
      )
    case "Canceled":
      return (
        <Box className='px-4 py-2 bg-red-600 rounded-md text-white'>
          <Text>Canceled</Text>
        </Box>
      )
  }
}

function RatingPretty({ rating }: { rating: number }) {

  return (
    <Box>
      {[...Array(rating)].map((_, index) => (
        <Text key={index} as="span">
          {index < rating ? '★' : '☆'}
        </Text>
      ))}
    </Box>
  )
}

const mockedData = [
  {
    _id: "aB1cD2eF",
    createdAt: new Date("2023-07-23T10:20:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 3,
      sugarAmount: 4,
      description: "bring it in a yellow cup"
    },
    rating: 3
  },
  {
    _id: "9Q0rS1tU",
    createdAt: new Date("2023-04-25T08:45:50Z"),
    completedAt: new Date("2023-05-10T07:35:40Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "gluten-free bun",
    rating: 5
  },
  {
    _id: "3gH4iJ5k",
    createdAt: new Date("2023-06-15T12:10:20Z"),
    completedAt: new Date("2023-07-01T09:15:30Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "add ketchup",
    rating: 4
  },
  {
    _id: "6L7mN8oP",
    createdAt: new Date("2023-05-12T14:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 2,
      sugarAmount: 5,
      description: "use a large cup"
    },
    rating: null
  },
  {
    _id: "2V3wX4yZ",
    createdAt: new Date("2023-03-18T16:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 4,
      sugarAmount: 2,
      description: "add a stirrer"
    },
    rating: null
  },
  {
    _id: "4P5qR6sT",
    createdAt: new Date("2023-06-22T07:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 5,
      sugarAmount: 1,
      description: "extra hot"
    },
    rating: null
  },
  {
    _id: "7U8vW9xY",
    createdAt: new Date("2023-05-11T06:20:20Z"),
    completedAt: new Date("2023-06-01T05:15:30Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "no pickles",
    rating: 4
  },
  {
    _id: "0Z1aB2cD",
    createdAt: new Date("2023-04-05T10:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 3,
      sugarAmount: 4,
      description: "extra frothy"
    },
    rating: 3
  },
  {
    _id: "5A6bC7dE",
    createdAt: new Date("2023-02-27T18:25:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "outside",
    additionalOptions: "side of ranch",
    rating: 2
  },
  {
    _id: "8F9gH0iJ",
    createdAt: new Date("2023-01-19T20:30:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 1,
      sugarAmount: 3,
      description: "bring it in a blue cup"
    },
    rating: null
  },
  {
    _id: "9O0pQ1rS",
    createdAt: new Date("2023-01-05T14:25:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "outside",
    additionalOptions: "double patty",
    rating: 2
  },
  {
    _id: "2tU3vW4x",
    createdAt: new Date("2023-07-12T16:30:30Z"),
    completedAt: new Date("2023-07-20T15:20:40Z"),
    status: "Done",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 4,
      sugarAmount: 3,
      description: "bring it in a red cup"
    },
    rating: 3
  },
  {
    _id: "5Y6zA7bC",
    createdAt: new Date("2023-06-18T18:40:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "outside",
    additionalOptions: "grilled onions",
    rating: null
  },
  {
    _id: "1K2lM3nO",
    createdAt: new Date("2023-07-03T09:40:40Z"),
    completedAt: new Date("2023-07-10T08:20:50Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "spicy sauce",
    rating: 1
  },
  {
    _id: "3eF4gH5i",
    createdAt: new Date("2023-03-20T11:45:50Z"),
    completedAt: new Date("2023-04-01T10:35:40Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "extra sauce",
    rating: 5
  },
  {
    _id: "6J7kL8mN",
    createdAt: new Date("2023-02-15T12:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 2,
      sugarAmount: 2,
      description: "decaf"
    },
    rating: null
  },
  {
    _id: "8dE9fG0H",
    createdAt: new Date("2023-05-28T20:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 1,
      sugarAmount: 5,
      description: "extra strong"
    },
    rating: null
  },
  {
    _id: "1iJ2kL3m",
    createdAt: new Date("2023-04-02T09:25:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "outside",
    additionalOptions: "extra pickles",
    rating: 1
  },
  {
    _id: "4N5oP6qR",
    createdAt: new Date("2023-03-10T10:30:30Z"),
    completedAt: new Date("2023-03-25T09:15:40Z"),
    status: "Done",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 2,
      sugarAmount: 1,
      description: "no foam"
    },
    rating: 5
  },
  {
    _id: "7sT8uV9w",
    createdAt: new Date("2023-02-27T12:40:50Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "outside",
    additionalOptions: "add avocado",
    rating: null
  },
  {
    _id: "0xY1zA2b",
    createdAt: new Date("2023-01-18T14:50:10Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 5,
      sugarAmount: 3,
      description: "bring it in a green cup"
    },
    rating: 2
  },
  {
    _id: "3cD4eF5g",
    createdAt: new Date("2023-07-07T16:25:20Z"),
    completedAt: new Date("2023-07-15T15:10:30Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "no onions",
    rating: 4
  },
  {
    _id: "6H7iJ8kL",
    createdAt: new Date("2023-06-11T18:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 4,
      sugarAmount: 2,
      description: "bring it with a lid"
    },
    rating: null
  },
  {
    _id: "9mN0oP1q",
    createdAt: new Date("2023-05-15T20:45:50Z"),
    completedAt: new Date("2023-06-01T19:35:40Z"),
    status: "Done",
    orderType: "outside",
    additionalOptions: "add bacon",
    rating: 5
  },
  {
    _id: "2rS3tU4v",
    createdAt: new Date("2023-04-20T09:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: {
      milkAmount: 1,
      sugarAmount: 4,
      description: "extra hot"
    },
    rating: null
  }
];



