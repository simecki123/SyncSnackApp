'use client'
import { Box, Button, Text, Input, Textarea } from "@chakra-ui/react";
import { Client, Message } from '@stomp/stompjs';
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Area52Page() {

  const [connection, setConnection] = useState('NO CONNECTION')

  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState<any[]>([])

  const client = new Client();
  client.brokerURL = 'ws://localhost:8080/ws';

  useEffect(() => {

    client.onConnect = function(frame) {
      console.log('CONNECTED TO WEB SOCKET')
      if (client.connected) {
        setConnection('CONNECTED')
      } else (
        setConnection('CAN\'T CONNECT')
      )
    }
  }, [])

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    console.log(inputValue);
    const messagesCopy = [...messages]
    messagesCopy.push(inputValue)
    setMessages(messagesCopy)
  };

  return (
    <Box className="h-full w-full flex flex-col space-y-10 items-center">
      <Text className="text-4xl font-semibold">WELCOME TO WEB SOCKET TESTING GROUND</Text>
      <Text>{connection}</Text>
      <Button onClick={() => {
        if (client.connected) {
          setConnection('CONNECTED')
          client.activate()
        } else (
          setConnection('CAN\'T CONNECT')
        )
      }}>Connect</Button>
      <Button onClick={() => {
        setConnection('DISCONNECTED')
        client.deactivate()
      }}>Disconnect</Button>
      <Box className="flex">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text here"
          className="mb-4"
        />
        <Button
          onClick={handleButtonClick}
          className={clsx("border-blue-600 border-2", { "border-red-600": connection !== "CONNECTED" })}>Send</Button>
      </Box>
      <Box className="border-black border-2">
        {messages.map((value, index) => {
          return (
            <Text key={index}>{value}</Text>
          )
        })}
      </Box>
    </Box>
  )
}
