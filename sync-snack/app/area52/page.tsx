'use client'
import { Box, Button, Text } from "@chakra-ui/react";
import { Client, Message } from '@stomp/stompjs';
import { useEffect, useState } from "react";

export default function Area52Page() {

  const [connection, setConnection] = useState('NO CONNECTION')

  const client = new Client();
  client.brokerURL = 'ws://localhost:8080/ws';

  useEffect(() => {

    client.onConnect = function(frame) {
      console.log('CONNECTED TO WEB SOCKET')
      setConnection('CONNECTED')
    }
  }, [])

  return (
    <Box className="h-full w-full flex flex-col space-y-10 items-center">
      <Text className="text-4xl font-semibold">WELCOME TO WEB SOCKET TESTING GROUND</Text>
      <Text>{connection}</Text>
      <Button onClick={() => {
        setConnection('CONNECTED')
        client.activate()
      }}>Connect</Button>
      <Button onClick={() => {
        setConnection('DISCONNECTED')
        client.deactivate()
      }}>Disconnect</Button>
    </Box>
  )
}
