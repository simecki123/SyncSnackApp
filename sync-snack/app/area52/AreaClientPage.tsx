// 'use client'
// import { Box, Button, Text, Input, Textarea } from "@chakra-ui/react";
// import { Client, Message } from '@stomp/stompjs';
// import clsx from "clsx";
// import { useEffect, useState } from "react";
//
// export default function AreaClientPage({ activeUser }: any) {
//
//   const [connection, setConnection] = useState('NO CONNECTION')
//
//   const [inputValue, setInputValue] = useState('');
//
//   const [messages, setMessages] = useState<any[]>([])
//
//   const client = new Client();
//   client.brokerURL = 'ws://localhost:8080/ws';
//
//   useEffect(() => {
//
//     client.onConnect = function(frame) {
//       client.publish({ destination: `/topic/orders/${activeUser.userProfileId}`, body: 'CONNECTED' });
//       client.subscribe(`/topic/orders/${activeUser.userProfileId}`, (message) => {
//         console.log('it works', message)
//       });
//       if (client.connected) {
//         setConnection('CONNECTED')
//       } else (
//         setConnection('CAN\'T CONNECT')
//       )
//     }
//   }, [])
//
//   client.activate()
//   console.log(client.connected, ' -- connection')
//
//   const handleInputChange = (e: any) => {
//     setInputValue(e.target.value);
//   };
//
//   const handleButtonClick = () => {
//     console.log(inputValue);
//     client.onConnect = function(frame) {
//       client.publish({ destination: `/topic/orders/${activeUser.userProfileId}`, body: inputValue });
//     }
//     const messagesCopy = [...messages]
//     messagesCopy.push(inputValue)
//     setMessages(messagesCopy)
//   };
//
//   return (
//     <Box className="h-full w-full flex flex-col space-y-10 items-center">
//       <Text className="text-4xl font-semibold">WELCOME TO WEB SOCKET TESTING GROUND</Text>
//       <Text>{connection}</Text>
//       <Button onClick={() => {
//         if (client.connected) {
//           setConnection('CONNECTED')
//           console.log(client.connected, ' ,, connection ')
//           client.activate()
//         } else (
//           setConnection('CAN\'T CONNECT')
//         )
//       }}>Connect</Button>
//       <Button onClick={() => {
//         setConnection('DISCONNECTED')
//         client.deactivate()
//       }}>Disconnect</Button>
//       <Box className="flex">
//         <Input
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Enter text here"
//           className="mb-4"
//         />
//         <Button
//           onClick={handleButtonClick}
//           className={clsx("border-blue-600 border-2", { "border-red-600": connection !== "CONNECTED" })}>Send</Button>
//       </Box>
//       <Box className="border-black border-2">
//         {messages.map((value, index) => {
//           return (
//             <Text key={index}>{value}</Text>
//           )
//         })}
//       </Box>
//     </Box>
//   )
//
// }

'use client'
import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";
import { Client } from '@stomp/stompjs';
import clsx from "clsx";

export default function AreaClientPage({ activeUser }: { activeUser: { userProfileId: string } }) {
  const [connection, setConnection] = useState('NO CONNECTION');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('Connected');
        setConnection('CONNECTED');
        client.subscribe(`/topic/orders/${activeUser.userProfileId}`, (message) => {
          console.log('Received:', message.body);
          setMessages(prev => [...prev, message.body]);
        });
        client.publish({ destination: `/topic/orders/${activeUser.userProfileId}`, body: 'CONNECTED' });
      },
      onDisconnect: () => {
        console.log('Disconnected');
        setConnection('DISCONNECTED');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [activeUser.userProfileId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (clientRef.current?.connected && inputValue) {
      clientRef.current.publish({ destination: `/topic/orders/${activeUser.userProfileId}`, body: inputValue });
      setInputValue('');
    }
  };

  const handleConnect = () => {
    clientRef.current?.activate();
  };

  const handleDisconnect = () => {
    clientRef.current?.deactivate();
  };

  return (
    <Box className="h-full w-full flex flex-col space-y-10 items-center">
      <Text className="text-4xl font-semibold">WELCOME TO WEB SOCKET TESTING GROUND</Text>
      <Text>{connection}</Text>
      <Button onClick={handleConnect} isDisabled={connection === 'CONNECTED'}>Connect</Button>
      <Button onClick={handleDisconnect} isDisabled={connection !== 'CONNECTED'}>Disconnect</Button>
      <Box className="flex">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text here"
          className="mb-4"
        />
        <Button
          onClick={handleButtonClick}
          className={clsx("border-blue-600 border-2", { "border-red-600": connection !== "CONNECTED" })}
          isDisabled={connection !== 'CONNECTED'}
        >
          Send
        </Button>
      </Box>
      <Box className="border-black border-2 p-4 w-full max-w-md">
        {messages.map((value, index) => (
          <Text key={index}>{value}</Text>
        ))}
      </Box>
    </Box>
  );
}
