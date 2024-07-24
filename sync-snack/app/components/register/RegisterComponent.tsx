// components/RegisterComponent.jsx
"use client";
import React, { useState } from 'react';
import { Box, Button, Flex, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react';
import AccountDetails from './step-one/AccountDetails';
import UserProfile from './step-two/UserProfile';
import GroupInformation from './step-three/GroupInformation';

const steps = [
  { title: 'Account Details', component: AccountDetails },
  { title: 'User Profile', component: UserProfile },
  { title: 'Group Information', component: GroupInformation },
];

const RegisterComponent = () => {
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

  const handleInputChange = (e: any) => {
    if (e.target) {
      // For standard input elements
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      // For Chakra RadioGroup
      setFormData({ ...formData, groupChoice: e });
    }
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const isStepComplete = (step: any) => {
    switch (step) {
      case 0:
        return formData.email && formData.password && formData.confirmPassword && (formData.password === formData.confirmPassword);
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
          <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!isStepComplete(activeStep)}>
            Submit
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleNext} isDisabled={!isStepComplete(activeStep)}>
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default RegisterComponent;