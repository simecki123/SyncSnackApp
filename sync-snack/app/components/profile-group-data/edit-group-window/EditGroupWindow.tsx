import { Box, Button, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function EditGroupWindow({
  groupName,
  groupDescription,
  handleEditGroup
}: {
  groupName: string,
  groupDescription: string,
  handleEditGroup: (newGroupName: string, newGroupDescription: string) => void
}) {
  const [newGroupName, setNewGroupName] = useState(groupName);
  const [newGroupDescription, setNewGroupDescription] = useState(groupDescription);

  const handleSubmit = () => {
    handleEditGroup(newGroupName, newGroupDescription);
  }

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb={2}>Enter new group name:</Text>
        <Input 
          value={newGroupName} 
          onChange={(e) => setNewGroupName(e.target.value)} 
          placeholder='New name'
        />
      </Box>
      <Box>
        <Text mb={2}>Enter new group description:</Text>
        <Input 
          value={newGroupDescription} 
          onChange={(e) => setNewGroupDescription(e.target.value)} 
          placeholder='New description'
        />
      </Box>
      <Button colorScheme="orange" onClick={handleSubmit}>Submit</Button>
    </VStack>
  )
}