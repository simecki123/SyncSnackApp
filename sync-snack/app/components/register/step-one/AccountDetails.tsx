// components/steps/AccountDetails.jsx
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const AccountDetails = ({ formData, handleInputChange }: any) => (
  <>
    <FormControl className="mb-4">
      <FormLabel>Email</FormLabel>
      <Input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        type="email"
      />
    </FormControl>
    <FormControl className="mb-4">
      <FormLabel>Password</FormLabel>
      <Input
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        type="password"
      />
    </FormControl>
    <FormControl className="mb-4">
      <FormLabel>Confirm Password</FormLabel>
      <Input
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        type="password"
      />
    </FormControl>
  </>
);

export default AccountDetails;