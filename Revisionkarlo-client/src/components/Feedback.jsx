import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';
import React from 'react'

const Feedback = () => {
  return (
    <div>
      {/* /* feeid */} 
      <Box
        maxW="600px"
        mx="auto"
        my="5%"
        p="5"
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        border="1px solid rgba(0, 0, 0, 0.1)"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="teal.500">
          We Value Your Feedback
        </Text>

        {/* User Information Section (optional) */}
        <FormControl mb="4">
          <FormLabel fontWeight="bold">Your Name (Optional)</FormLabel>
          <Input placeholder="Enter your name" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel fontWeight="bold">Your Email (Optional)</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>

        {/* Feedback Section */}
        <FormControl mb="4" isRequired>
          <FormLabel fontWeight="bold">Feedback Type</FormLabel>
          <Input as="select" placeholder="Select feedback type">
            <option>Design & Interface</option>
            <option>Functionality & Features</option>
            <option>Performance & Speed</option>
            <option>Overall Experience</option>
            <option>Other</option>
          </Input>
        </FormControl>

        <FormControl mb="6" isRequired>
          <FormLabel fontWeight="bold">Your Feedback</FormLabel>
          <Textarea placeholder="Tell us what you think..." rows={5} />
        </FormControl>

        {/* Call-to-Action Button */}
        <Flex justifyContent="center">
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => alert("Feedback Submitted!")}
          >
            Submit Feedback
          </Button>
        </Flex>
      </Box>
    </div>
  );
}

export default Feedback
