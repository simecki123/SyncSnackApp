import { auth } from '@/app/auth';
import { fetchImproved } from '@/app/fetch';
import { Order } from '@/app/interfaces';

import dynamic from 'next/dynamic';

const OrdersTable = dynamic(
  () => import('@/app/components/my-orders/orders-table/OrdersTable'),
  { ssr: false }
);


export default async function OrdersPage() {

  const session = await auth();
  const activeUser: any = session?.user;
  const accessToken: any = activeUser?.accessToken

  let orders: Order[] = []
  try {
    orders = await fetchImproved('/api/orders/all')
  } catch (e: any) {
  }

  orders.map((order) => {
    order.createdAt = new Date(order.createdAt)
  })


  return (
    <OrdersTable accessToken={accessToken} orders={sortDataByCreatedAtDescending(orders)} />
  );
}

function sortDataByCreatedAtDescending(data: any[]) {
  return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function calculateStatistics(data: any) {
  const statistics = {
    completed: 0,
    canceled: 0,
    ordersPerMonth: new Array(12).fill(0),
    ordersPerType: {
      coffee: 0,
      drinks: 0,
      food: 0,
      mix: 0,
    }
  };

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  data.forEach((order: any) => {
    // Count completed and canceled orders
    if (order.status === "Done") {
      statistics.completed += 1;
    } else if (order.status === "Canceled") {
      statistics.canceled += 1;
    }

    const orderDate = new Date(order.createdAt);
    const orderYear = orderDate.getFullYear();

    if (orderYear === previousYear) {
      // Count orders per month
      const month = new Date(order.createdAt).getMonth(); // getMonth returns 0-11
      statistics.ordersPerMonth[month] += 1;
    }

    // Count orders per type
    switch (order.orderType) {
      case "coffee":
        statistics.ordersPerType.coffee += 1;
        break;
      case "drinks":
        statistics.ordersPerType.drinks += 1;
        break;
      case "food":
        statistics.ordersPerType.food += 1;
        break;
      case "mix":
        statistics.ordersPerType.mix += 1;
        break;
      default:
        // If there are other order types not accounted for, we can decide how to handle them here
        break;
    }
  });

  return statistics;
}

const mockedData = [
  {
    _id: "aB1cD2eF",
    createdAt: new Date("2019-07-23T10:20:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "bring it in a yellow cup",
    rating: 3
  },
  {
    _id: "9Q0rS1tU",
    createdAt: new Date("2022-04-25T08:45:50Z"),
    completedAt: new Date("2022-05-10T07:35:40Z"),
    status: "Done",
    orderType: "food",
    additionalOptions: "gluten-free bun",
    rating: 5
  },
  {
    _id: "3gH4iJ5k",
    createdAt: new Date("2018-06-15T12:10:20Z"),
    completedAt: new Date("2018-07-01T09:15:30Z"),
    status: "Done",
    orderType: "mix",
    additionalOptions: "add ketchup",
    rating: 4
  },
  {
    _id: "6L7mN8oP",
    createdAt: new Date("2020-05-12T14:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "use a large cup",
    rating: null
  },
  {
    _id: "2V3wX4yZ",
    createdAt: new Date("2021-03-18T16:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: "add a stirrer",
    rating: null
  },
  {
    _id: "4P5qR6sT",
    createdAt: new Date("2016-06-22T07:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: "extra hot",
    rating: null
  },
  {
    _id: "7U8vW9xY",
    createdAt: new Date("2017-05-11T06:20:20Z"),
    completedAt: new Date("2017-06-01T05:15:30Z"),
    status: "Done",
    orderType: "mix",
    additionalOptions: "no pickles",
    rating: 4
  },
  {
    _id: "0Z1aB2cD",
    createdAt: new Date("2019-04-05T10:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra frothy",
    rating: 3
  },
  {
    _id: "5A6bC7dE",
    createdAt: new Date("2021-02-27T18:25:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "side of ranch",
    rating: 2
  },
  {
    _id: "8F9gH0iJ",
    createdAt: new Date("2015-01-19T20:30:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "bring it in a blue cup",
    rating: null
  },
  {
    _id: "9O0pQ1rS",
    createdAt: new Date("2020-01-05T14:25:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "double patty",
    rating: 2
  },
  {
    _id: "2tU3vW4x",
    createdAt: new Date("2017-07-12T16:30:30Z"),
    completedAt: new Date("2017-07-20T15:20:40Z"),
    status: "Done",
    orderType: "coffee",
    additionalOptions: "bring it in a red cup",
    rating: 3
  },
  {
    _id: "5Y6zA7bC",
    createdAt: new Date("2018-06-18T18:40:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "grilled onions",
    rating: null
  },
  {
    _id: "1K2lM3nO",
    createdAt: new Date("2013-07-03T09:40:40Z"),
    completedAt: new Date("2013-07-10T08:20:50Z"),
    status: "Done",
    orderType: "mix",
    additionalOptions: "spicy sauce",
    rating: 1
  },
  {
    _id: "3eF4gH5i",
    createdAt: new Date("2017-03-20T11:45:50Z"),
    completedAt: new Date("2017-04-01T10:35:40Z"),
    status: "Done",
    orderType: "mix",
    additionalOptions: "extra sauce",
    rating: 5
  },
  {
    _id: "6J7kL8mN",
    createdAt: new Date("2015-02-15T12:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: "decaf",
    rating: null
  },
  {
    _id: "8dE9fG0H",
    createdAt: new Date("2019-05-28T20:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: "extra strong",
    rating: null
  },
  {
    _id: "1iJ2kL3m",
    createdAt: new Date("2023-04-02T09:25:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "extra pickles",
    rating: 1
  },
  {
    _id: "4N5oP6qR",
    createdAt: new Date("2020-03-10T10:30:30Z"),
    completedAt: new Date("2020-03-25T09:15:40Z"),
    status: "Done",
    orderType: "coffee",
    additionalOptions: "no foam",
    rating: 4
  },
  {
    _id: "7sT8uV9w",
    createdAt: new Date("2014-02-27T12:40:50Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "mix",
    additionalOptions: "add avocado",
    rating: null
  },
  {
    _id: "0xY1zA2b",
    createdAt: new Date("2015-01-18T14:50:10Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "bring it in a green cup",
    rating: 2
  },
  {
    _id: "3cD4eF5g",
    createdAt: new Date("2022-07-07T16:25:20Z"),
    completedAt: new Date("2022-07-15T15:10:30Z"),
    status: "Done",
    orderType: "drinks",
    additionalOptions: "no onions",
    rating: 4
  },
  {
    _id: "6H7iJ8kL",
    createdAt: new Date("2011-06-11T18:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "bring it with a lid",
    rating: null
  },
  {
    _id: "9mN0oP1q",
    createdAt: new Date("2016-05-15T20:45:50Z"),
    completedAt: new Date("2016-06-01T19:35:40Z"),
    status: "Done",
    orderType: "mix",
    additionalOptions: "add bacon",
    rating: 5
  },
  {
    _id: "2rS3tU4v",
    createdAt: new Date("2019-04-20T09:50:10Z"),
    completedAt: null,
    status: "Canceled",
    orderType: "coffee",
    additionalOptions: "extra hot",
    rating: null
  },
  {
    _id: "1X2yZ3aB",
    createdAt: new Date("2024-02-15T09:15:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "with soy milk",
    rating: 4
  },
  {
    _id: "4C5dE6fG",
    createdAt: new Date("2024-03-20T14:25:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "extra cheese",
    rating: 3
  },
  {
    _id: "7H8iJ9kL",
    createdAt: new Date("2024-04-30T18:45:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra shot of espresso",
    rating: 5
  },
  {
    _id: "0M1nO2pQ",
    createdAt: new Date("2024-05-10T12:10:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "side salad",
    rating: 2
  },
  {
    _id: "3R4sT5uV",
    createdAt: new Date("2024-06-15T07:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra foam",
    rating: 3
  },
  {
    _id: "1L2mN3oP",
    createdAt: new Date("2024-07-19T09:15:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "with almond milk",
    rating: 4
  },
  {
    _id: "4Q5rS6tU",
    createdAt: new Date("2024-07-20T14:25:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "extra lettuce",
    rating: 3
  },
  {
    _id: "7V8wX9yZ",
    createdAt: new Date("2024-07-21T18:45:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "two shots of espresso",
    rating: 5
  },
  {
    _id: "0A1bC2dE",
    createdAt: new Date("2024-07-22T12:10:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "drinks",
    additionalOptions: "add extra tomatoes",
    rating: 2
  },
  {
    _id: "3F4gH5iJ",
    createdAt: new Date("2024-07-23T07:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "with caramel syrup",
    rating: 3
  },
  {
    _id: "6K7lM8nO",
    createdAt: new Date("2024-07-24T10:50:10Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "no onions",
    rating: 1
  },
  {
    _id: "9P0qR1sT",
    createdAt: new Date("2024-07-25T15:20:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra hot",
    rating: 4
  },
  {
    _id: "2U3vW4xY",
    createdAt: new Date("2024-07-26T06:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "extra bacon",
    rating: 2
  },
  {
    _id: "5Z6aB7cD",
    createdAt: new Date("2024-07-20T09:45:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "no sugar",
    rating: 3
  },
  {
    _id: "8dE9fG0H",
    createdAt: new Date("2024-07-21T14:15:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "add avocado",
    rating: 5
  },
  {
    _id: "2eF3gH4i",
    createdAt: new Date("2023-01-15T12:20:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra sugar",
    rating: 3
  },
  {
    _id: "3jK4lM5n",
    createdAt: new Date("2023-02-22T10:15:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "drinks",
    additionalOptions: "extra cheese",
    rating: 4
  },
  {
    _id: "4oP5qR6s",
    createdAt: new Date("2023-03-18T14:10:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "no cream",
    rating: 2
  },
  {
    _id: "5tU6vW7x",
    createdAt: new Date("2023-04-25T09:05:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "extra sauce",
    rating: 5
  },
  {
    _id: "6yZ7aB8c",
    createdAt: new Date("2023-05-19T16:25:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra hot",
    rating: 1
  },
  {
    _id: "7dE8fG9h",
    createdAt: new Date("2023-06-30T11:35:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "add bacon",
    rating: 2
  },
  {
    _id: "8iJ9kL0m",
    createdAt: new Date("2023-07-15T13:40:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "with milk",
    rating: 4
  },
  {
    _id: "9nO0pQ1r",
    createdAt: new Date("2023-08-20T15:50:10Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "drinks",
    additionalOptions: "no onions",
    rating: 3
  },
  {
    _id: "0sT1uV2w",
    createdAt: new Date("2023-09-14T18:45:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra cream",
    rating: 5
  },
  {
    _id: "1xY2zA3b",
    createdAt: new Date("2023-10-22T08:30:40Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "drinks",
    additionalOptions: "extra ketchup",
    rating: 2
  },
  {
    _id: "2eF3gH4i",
    createdAt: new Date("2023-11-05T09:15:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "with vanilla syrup",
    rating: 4
  },
  {
    _id: "3jK4lM5n",
    createdAt: new Date("2023-11-15T12:45:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "mix",
    additionalOptions: "extra lettuce",
    rating: 3
  },
  {
    _id: "4oP5qR6s",
    createdAt: new Date("2023-12-01T11:10:50Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "no sugar",
    rating: 2
  },
  {
    _id: "5tU6vW7x",
    createdAt: new Date("2023-12-15T08:05:20Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "food",
    additionalOptions: "add cheese",
    rating: 5
  },
  {
    _id: "6yZ7aB8c",
    createdAt: new Date("2023-12-20T16:25:30Z"),
    completedAt: null,
    status: "In Progress",
    orderType: "coffee",
    additionalOptions: "extra hot",
    rating: 1
  },
];



