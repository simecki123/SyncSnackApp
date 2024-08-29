"use client";
import React, { useState } from 'react';
import { Box, Button, Flex, useToast, Stepper, Step, StepIndicator, StepTitle, StepStatus, StepNumber, StepIcon, StepSeparator } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import UserProfile from './step-two/UserProfile';
import GroupInformation from './step-three/GroupInformation';

const steps = [
  { title: 'User Profile', component: UserProfile },
  { title: 'Group Information', component: GroupInformation },
];

export default function SetProfileComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    groupChoice: '',
    groupName: '',
    groupPassword: '',
    groupDescription: '',
  });

  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleInputChange = (e: any) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, groupChoice: e });
    }
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const showToast = (title: string, description: string, status: 'success' | 'error' | 'warning' | 'info') => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleSubmit = async () => {
    try {
      let groupId;
      if (formData.groupChoice === 'create') {
        groupId = await createGroup();
      } else {
        groupId = await joinGroup();
      }

      if (!groupId) {
        showToast('Error', 'Failed to create or join group', 'error');
        return;
      }

      const userId = searchParams.get('userId'); // Assuming userId is in the URL
      await createUserProfile(userId, groupId);

      showToast('Success', 'Profile setup successful!', 'success');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Profile setup error:', error);

    }
  };

  const createGroup = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.groupName,
        password: formData.groupPassword,
        description: formData.groupDescription,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create group');
    }

    const groupData = await response.json();
    return groupData.groupId;
  };

  const joinGroup = async (): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.groupName,
        password: formData.groupPassword,
      }),
    });

    if (response.status === 404) {
      showToast('Error', 'Group not found', 'error');
      throw new Error('Group not found'); // Ensure the error is thrown to halt further processing
    }

    if (!response.ok) {
      throw new Error('Failed to join group');
    }

    const groupData = await response.json();
    return groupData.groupId;
  };

  // Last step in our registration process. Creating user profile. If user didnt verify email backend will return forbidden.
  const createUserProfile = async (userId: string | null, groupId: string) => {
    const userProfileData = new FormData();
    const jsonBlob = new Blob([JSON.stringify({
      userId,
      groupId,
      firstName: formData.firstName,
      lastName: formData.lastName,
    })], { type: 'application/json' });

    userProfileData.append('body', jsonBlob, 'body.json');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/create`, {
      method: 'POST',
      body: userProfileData,
    });

    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        if (formData.groupChoice === 'join') {
          return formData.groupName && formData.groupPassword;
        } else if (formData.groupChoice === 'create') {
          return formData.groupName && formData.groupDescription && formData.groupPassword;
        }
        return false;
      default:
        return false;
    }
  };

  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Box className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Stepper index={activeStep} className="mb-8">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <CurrentStepComponent formData={formData} handleInputChange={handleInputChange} />
      <Flex justifyContent="space-between" mt={6}>
        <Button onClick={handleBack} isDisabled={activeStep === 0}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            colorScheme="xorange"
            onClick={handleSubmit}
            isDisabled={!isStepComplete(activeStep)}
          >
            Setup Profile
          </Button>
        ) : (
          <Button colorScheme="xorange" onClick={handleNext} isDisabled={!isStepComplete(activeStep)}>
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
}
