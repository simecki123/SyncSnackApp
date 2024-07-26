"use client";
import React, { useState } from 'react';
import { Box, Button, Flex, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import AccountDetails from './step-one/AccountDetails';
import UserProfile from './step-two/UserProfile';
import GroupInformation from './step-three/GroupInformation';

const steps = [
  { title: 'Account Details', component: AccountDetails },
  { title: 'User Profile', component: UserProfile },
  { title: 'Group Information', component: GroupInformation },
];

const RegisterComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    groupChoice: '',
    groupName: '',
    groupPassword: '',
    groupDescription: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleInputChange = (e:any) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, groupChoice: e });
    }
  };

  //______________________________________________________________________
  // function for submiting data to database
  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);  // Clear any previous error messages
    const isemailValid =  await isUserEmailValid();
    console.log("is email valid: ",isemailValid);

    if(isemailValid) {
      setErrorMessage("That user already exist. Can't register this account");
      setIsLoading(false);
      
    } else {
      try {
        let groupId;

        if (formData.groupChoice === 'create') {
          groupId = await createGroup();
        } else {
          groupId = await joinGroup();
        }

        if (!groupId) {
          throw new Error('Failed to create or join group');
        }

        const userData = await registerUser();

        if (!userData.userId) {
          throw new Error('Failed to register user');
        }

        await createUserProfile(userData.userId, groupId);

        setErrorMessage('Registration successful!');
        setTimeout(() => {
          router.push('/login');
        }, 2000);  // Redirect after 2 seconds
      } catch (error) {
        console.error('Registration error:', error);
        if (error instanceof Error) {
          setErrorMessage(`Registration failed: User profile cant be made`);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Create group for user
  const createGroup = async (): Promise<string> => {
    const response = await fetch('http://localhost:8080/api/groups/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.groupName,
        password: formData.groupPassword,
        description: formData.groupDescription,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create group');
    }

    const groupData = await response.json();
    return groupData.id;
  };

  //Join user to specific group
  const joinGroup = async (): Promise<string> => {
    const response = await fetch('http://localhost:8080/api/groups/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.groupName,
        password: formData.groupPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to join group');
    }

    const groupData = await response.json();
    return groupData.id;
  };

  // Register user
  const registerUser = async () => {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }

    return response.json();
  };

  // create user profile
  const createUserProfile = async (userId: string, groupId: string) => {
    const userProfileData = new FormData();
    const jsonBlob = new Blob([JSON.stringify({
      userId,
      groupId,
      firstName: formData.firstName,
      lastName: formData.lastName,
    })], { type: 'application/json' });

    userProfileData.append('body', jsonBlob, 'body.json');

    const response = await fetch('http://localhost:8080/api/profiles/create', {
      method: 'POST',
      body: userProfileData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user profile');
    }
  };


  // Check if userEmail is valid
  const isUserEmailValid = async () => {
    try{
    const isemailValid = await fetch('http://localhost:8080/api/users/check', {
      method: 'GET',
      body: formData.email
    });
    return isemailValid;
  } catch {
    return true;
  }
    
  }

//_______________________________________________________________________________________________

  const isStepComplete =   (step: any) => {
    const isValidEmail = (email: string) => {
      const emailRegex = /@syncsnack/i;
      return emailRegex.test(email);
    };

    switch (step) {
      case 0:
        
        return (
          formData.email &&
          isValidEmail(formData.email) &&
          formData.password &&
          formData.confirmPassword &&
          (formData.password === formData.confirmPassword) 
          
        );
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
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
      {errorMessage && (
        <Alert status={errorMessage.includes('successful') ? 'success' : 'error'} mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>{errorMessage.includes('successful') ? 'Success!' : 'Error!'}</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Stepper  index={activeStep} className="mb-8">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator >
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
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
            colorScheme="orange" 
            onClick={handleSubmit} 
            isDisabled={!isStepComplete(activeStep) || isLoading}
            isLoading={isLoading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        ) : (
          <Button colorScheme="orange" onClick={handleNext} isDisabled={!isStepComplete(activeStep)}>
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default RegisterComponent;