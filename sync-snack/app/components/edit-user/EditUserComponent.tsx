'use client';

import { Box, Button, Input, Text, VStack, Image, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function EditUserComponent({ user, setPhotoUrl, setFirstName, setLastName,  onClose }: {
     user: any,
     setPhotoUrl: (url: string) => void,
     setFirstName:(firstName: string) => void,
     setLastName: (lastName: string) => void,
     onClose: () => void }) {
  
  const [firstName, setNewFirstName] = useState(user.firstName);
  const [lastName, setNewLastName] = useState(user.lastName);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const toast = useToast();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
      }
    }
  });
  

  useEffect(() => {
    // Revoke the data URI to avoid memory leaks when the component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const submitFunction = async () => {
    if (acceptedFiles.length > 0 || firstName !== user.firstName || lastName !== user.lastName) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);

      if (acceptedFiles.length > 0) {
        formData.append('file', acceptedFiles[0]); // Add the first file (assuming single file upload)
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/edit`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${user?.accessToken}`
          },
          body: formData
        });

        setFirstName(firstName);
        setLastName(lastName);

        if (!response.ok) {
          throw new Error('Update failed');
        }

        const responseFinal = await response.json();
        setPhotoUrl(responseFinal.photoUrl);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose(); // Close the modal after successful update
      } catch (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Update failed",
          description: "There was an error updating your profile. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "No changes",
        description: "No changes were made to your profile.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="p-6 bg-white rounded-lg shadow-md">
      <VStack spacing={4} align="stretch">
        <Image
          borderRadius="full"
          boxSize="150px"
          src={previewUrl || user.photoUrl || '/profile_picture.png'}
          alt={`${firstName} ${lastName}`}
          objectFit="cover"
          mx="auto"
          mb={4}
        />
        <FormControl id="first-name">
          <FormLabel>First Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="shadow-sm"
          />
        </FormControl>

        <FormControl id="last-name">
          <FormLabel>Last Name</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setNewLastName(e.target.value)}
            placeholder="Enter your last name"
            className="shadow-sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <div {...getRootProps()} className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input {...getInputProps()} />
            {previewUrl ? (
              <Image src={previewUrl} alt="Image Preview" boxSize="100px" objectFit="cover" mx="auto" />
            ) : (
              <Text textAlign="center">Drag & drop or click to select a new profile picture</Text>
            )}
          </div>
        </FormControl>

        <Button
          colorScheme="orange"
          onClick={submitFunction}
          isLoading={isLoading}
          loadingText="Updating..."
          className="w-full mt-4 shadow-md hover:shadow-lg"
        >
          Update Profile
        </Button>
      </VStack>
    </Box>
  );
}
