// 'use client'
// import { ProfileUser } from '@/app/interfaces'
// import { Box, Button, Text, Flex, VStack, Heading, HStack, Image, Input } from '@chakra-ui/react'
// import RatingPrettyProfile from '../rating-preatty-profile/RatingPreattyProfile';
// import { useDropzone } from 'react-dropzone'
//
// export default function ProfileData({ user, accessToken }: { user: ProfileUser, accessToken: string }) {
//   const finalRate = Math.round(user.score);
//
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
//
//   console.log(accessToken, '>>> accessToken')
//   acceptedFiles.map((file) => {
//     fetch(`http://localhost:8080/api/profiles/edit`, {
//       method: 'PATCH',
//       headers: {
//         // 'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${accessToken}`
//       },
//       body: JSON.stringify({ file: file })
//     }))
//
//   return (
//     <Box>
//       <Heading size="lg" color="orange.500" mb={6}>User Profile</Heading>
//       <Flex justifyContent="space-between">
//         <VStack align="start" spacing={4} flex={1}>
//           <HStack>
//             <Image alt='No profile picture' src={user.profilePhoto} className='size-16 rounded-full' />
//           </HStack>
//           <HStack>
//             <Text>{user.firstName}</Text>
//           </HStack>
//           <HStack>
//             <Text>{user.lastName}</Text>
//           </HStack>
//           <HStack>
//             <Text>{user.email}</Text>
//           </HStack>
//           <HStack>
//             <Text>{user.groupName}</Text>
//           </HStack>
//           <HStack>
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <Button>upload</Button>
//             </div>
//           </HStack>
//           <Button colorScheme="orange" mt={4}>Edit user</Button>
//         </VStack>
//
//         <VStack align="center" justify="center" spacing={4}>
//           <Text fontWeight="bold">Score</Text>
//           <Flex alignItems="center">
//             <Text fontSize="3xl" fontWeight="bold" mr={2}>{user.score.toFixed(1)}</Text>
//             <RatingPrettyProfile rating={finalRate} />
//           </Flex>
//         </VStack>
//       </Flex>
//     </Box>
//   );
// }


'use client'
import { useEffect } from 'react'
import { ProfileUser } from '@/app/interfaces'
import { Box, Button, Text, Flex, VStack, Heading, HStack, Image } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import RatingPrettyProfile from '../rating-preatty-profile/RatingPreattyProfile'

export default function ProfileData({ user, accessToken }: { user: ProfileUser, accessToken: string }) {
  const finalRate = Math.round(user.score);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    const uploadFiles = async () => {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch(`http://localhost:8080/api/profiles/edit`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            body: formData
          });

          if (!response.ok) {
            throw new Error('File upload failed');
          }

          // Handle successful upload
          console.log('File uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    if (acceptedFiles.length > 0) {
      uploadFiles();
    }
  }, [acceptedFiles, accessToken]);

  return (
    <Box>
      <Heading size="lg" color="orange.500" mb={6}>User Profile</Heading>
      <Flex justifyContent="space-between">
        <VStack align="start" spacing={4} flex={1}>
          <HStack>
            <Image alt='No profile picture' src={user.profilePhoto} className='size-16 rounded-full' />
          </HStack>
          <HStack>
            <Text>{user.firstName}</Text>
          </HStack>
          <HStack>
            <Text>{user.lastName}</Text>
          </HStack>
          <HStack>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text>{user.groupName}</Text>
          </HStack>
          <HStack>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button>upload</Button>
            </div>
          </HStack>
          <Button colorScheme="orange" mt={4}>Edit user</Button>
        </VStack>

        <VStack align="center" justify="center" spacing={4}>
          <Text fontWeight="bold">Score</Text>
          <Flex alignItems="center">
            <Text fontSize="3xl" fontWeight="bold" mr={2}>{user.score.toFixed(1)}</Text>
            <RatingPrettyProfile rating={finalRate} />
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );

}
