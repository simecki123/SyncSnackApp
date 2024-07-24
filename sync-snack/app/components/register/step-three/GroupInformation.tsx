// components/steps/GroupInformation.jsx
import React from 'react';
import { FormControl, FormLabel, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';

const GroupInformation = ({ formData, handleInputChange }: any) => (
  <>
    <FormControl className="mb-4">
      <FormLabel>Group Choice</FormLabel>
      <RadioGroup name="groupChoice" value={formData.groupChoice} onChange={handleInputChange}>
        <Stack direction="row">
          <Radio value="join">Join Group</Radio>
          <Radio value="create">Create Group</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
    {formData.groupChoice === 'join' && (
      <>
        <FormControl className="mb-4">
          <FormLabel>Group Name</FormLabel>
          <Input
            name="groupName"
            value={formData.groupName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="mb-4">
          <FormLabel>Group Password</FormLabel>
          <Input
            name="groupPassword"
            value={formData.groupPassword}
            onChange={handleInputChange}
            type="password"
          />
        </FormControl>
      </>
    )}
    {formData.groupChoice === 'create' && (
      <>
        <FormControl className="mb-4">
          <FormLabel>Group Name</FormLabel>
          <Input
            name="groupName"
            value={formData.groupName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="mb-4">
          <FormLabel>Group Description</FormLabel>
          <Input
            name="groupDescription"
            value={formData.groupDescription}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="mb-4">
          <FormLabel>Group Password</FormLabel>
          <Input
            name="groupPassword"
            value={formData.groupPassword}
            onChange={handleInputChange}
            type="password"
          />
        </FormControl>
      </>
    )}
  </>
);

export default GroupInformation;