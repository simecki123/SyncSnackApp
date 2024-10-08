// components/steps/UserProfile.jsx
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function UserProfile ({ formData, handleInputChange }: any)  {
  return(
  <>
    <FormControl className="mb-4">
      <FormLabel>First Name</FormLabel>
      <Input
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
    </FormControl>
    <FormControl className="mb-4">
      <FormLabel>Last Name</FormLabel>
      <Input
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
    </FormControl>
  </>
  )

}


