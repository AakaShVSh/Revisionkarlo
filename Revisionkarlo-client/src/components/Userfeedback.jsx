import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { RiFeedbackFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const FeedbackSlideshow = () => {
  // Array of feedback messages with background colors and images
  const feedbacks = [
    {
      text: "Friendly staff and excellent customer support. The way they handled my requests was extremely professional.",
      bg: "teal.500",
      img: "data:image/jpeg;base64,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",
    },
    {
      text: "Great experience, highly recommend!",
      bg: "purple.500",
      img: "data:image/jpeg;base64,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",
    },
    {
      text: "Friendly staff and excellent customer support. The way they handled my requests was extremely professional.",
      bg: "orange.400",
      img: "data:image/jpeg;base64,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",
    },
  ];

  const [currentFeedback, setCurrentFeedback] = useState(0);
  const feedbackCount = feedbacks.length;
  const autoSlideInterval = 3000; // Auto-slide every 3 seconds

  const nextFeedback = () => {
    setCurrentFeedback((prev) => (prev === feedbackCount - 1 ? 0 : prev + 1));
  };

  const prevFeedback = () => {
    setCurrentFeedback((prev) => (prev === 0 ? feedbackCount - 1 : prev - 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(nextFeedback, autoSlideInterval);
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [currentFeedback]);

  // Function to get feedback index based on the current index and offset
  const getFeedbackIndex = (offset) => {
    let index = (currentFeedback + offset + feedbackCount) % feedbackCount;
    return index;
  };

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="center"
      w="100%"
      maxW="800px"
      mx="auto"
      h="350px"
      p={5}
      position="relative"
      overflow="hidden"
    >
      {/* Left Side Feedback */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="30%"
        h="80%"
        mx={2}
        bg={feedbacks[getFeedbackIndex(-1)].bg} // Previous feedback background
        borderRadius="md"
        boxShadow="lg"
        p={4}
        opacity={0.7} // Slightly faded effect for side feedback
        position="relative"
        transition="background-color 0.5s ease-in-out"
      >
        <Image
          src={feedbacks[getFeedbackIndex(-1)].img}
          alt="Feedback"
          borderRadius="md"
          mb={4}
          w="80%"
        />
        <Text fontSize="md" textAlign="center" noOfLines={3} color="white">
          {feedbacks[getFeedbackIndex(-1)].text}
        </Text>
      </Flex>

      {/* Center Feedback */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w={{base:"100%",lg:"30%"}}
        h="100%"
        mx={2}
        bg={feedbacks[getFeedbackIndex(0)].bg} // Current feedback background
        borderRadius="md"
        boxShadow="2xl"
        p={6}
        position="relative"
        transition="background-color 0.5s ease-in-out"
      >
        {/* Feedback Icon at the Top Left */}
        <Box
          position="absolute"
          top="-20px"
          left="-20px"
          bg="white"
          p={3}
          borderRadius="full"
          border="4px solid"
          borderColor={feedbacks[currentFeedback].bg}
        >
          <RiFeedbackFill size={30} color={feedbacks[currentFeedback].bg} />
        </Box>

        <Image
          src={feedbacks[getFeedbackIndex(0)].img}
          alt="Feedback"
          borderRadius="md"
          mb={4}
        //   mt={-50}
          w="80%"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          textAlign="center"
          noOfLines={3}
          color="white"
        >
          {feedbacks[currentFeedback].text}
        </Text>
      </Flex>

      {/* Right Side Feedback */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="30%"
        h="80%"
        mx={2}
        bg={feedbacks[getFeedbackIndex(1)].bg} // Next feedback background
        borderRadius="md"
        boxShadow="lg"
        p={4}
        opacity={0.7} // Slightly faded effect for side feedback
        position="relative"
        transition="background-color 0.5s ease-in-out"
      >
        <Image
          src={feedbacks[getFeedbackIndex(1)].img}
          alt="Feedback"
          borderRadius="md"
          mb={4}
          w="80%"
        />
        <Text fontSize="md" textAlign="center" noOfLines={3} color="white">
          {feedbacks[getFeedbackIndex(1)].text}
        </Text>
      </Flex>
    </Flex>
  );
};

export default FeedbackSlideshow;
