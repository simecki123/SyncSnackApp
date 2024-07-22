import { SimpleGrid, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

export default function OrdersPage() {

  const cards = mockData.map((data) => (
    <Card className=''>
      <CardBody>
        <Text>{data.firstName} {data.lastName}</Text>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
    </Card>
  ))

  return (
    <div className='h-screen mx-12'>
      <SimpleGrid columns={3} spacing={15}>
        {cards}
      </SimpleGrid>
    </div>
  )
}

const mockData = [
  {
    "firstName": "Lyndsie",
    "lastName": "Allbut",
    "description": "duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor",
    "rating": 4
  }, {
    "firstName": "Bendicty",
    "lastName": "Collinson",
    "description": "donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac",
    "rating": 4
  }, {
    "firstName": "Garey",
    "lastName": "McIlwraith",
    "description": "justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla",
    "rating": 5
  }, {
    "firstName": "Cristi",
    "lastName": "Garham",
    "description": "ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit",
    "rating": 4
  }, {
    "firstName": "Shandeigh",
    "lastName": "Beeken",
    "description": "a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
    "rating": 4
  }, {
    "firstName": "Doretta",
    "lastName": "Scorton",
    "description": "platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat",
    "rating": 2
  }, {
    "firstName": "Hilario",
    "lastName": "Atter",
    "description": "et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
    "rating": 5
  }, {
    "firstName": "Melisa",
    "lastName": "Grzesiewicz",
    "description": "aenean auctor gravida sem praesent id massa id nisl venenatis lacinia",
    "rating": 2
  }, {
    "firstName": "Morse",
    "lastName": "Jeffries",
    "description": "tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras",
    "rating": 3
  }, {
    "firstName": "Corabella",
    "lastName": "Mathewson",
    "description": "quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque",
    "rating": 5
  }, {
    "firstName": "Janot",
    "lastName": "Mounsey",
    "description": "a ipsum integer a nibh in quis justo maecenas rhoncus",
    "rating": 4
  }, {
    "firstName": "Minta",
    "lastName": "Barwise",
    "description": "duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at",
    "rating": 5
  }]


