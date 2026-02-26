// import React, { useEffect, useState } from "react";
// import { Box, Heading, Text, VStack } from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
// import { getLocalStorage } from "../helpers/localStorage";

// const SavedPage = () => {
//    const topic = getLocalStorage("savedtopic");
//    const [saveData,setsaveData] = useState(null)
//    console.log(topic);
//    useEffect(() => {
//   if(topic === "math"){
//         const loval = getLocalStorage("saveData")
//         console.log(loval[1]);

//         setsaveData(loval)
//    }
//    if(topic === "eng"){
//       const loval = getLocalStorage("saveData")
//         console.log(loval[1]);

//         setsaveData([loval])
//    }

//    },[])

//     //  const [saveData] = useState([math[1]])
//   return (
//     <Box p={4}>
//       <Heading size="lg">Saved Page</Heading>
//       <Text mt={2}>Review reported questions categorized by type.</Text>
//       <VStack spacing={4} mt={4} align="start">
//         {saveData?.map((Saved, index) => {
//           if (index === 0) return null;

//           return (
//             <Box
//               key={index}
//               p={4}
//               borderWidth={1}
//               borderRadius="md"
//               width="100%"
//             >
//               <Heading size="md">Category: {Saved.exam}</Heading>
//               <Text mt={2}>
//                 <strong>Question:</strong> {Saved.qus}
//               </Text>

//               {Saved?.options?.length > 0 && (
//                 <Text mt={2}>
//                   <strong>Options:</strong> {Saved.options.join(", ")}
//                 </Text>
//               )}

//               <Text mt={2}>
//                 <strong>Answer:</strong> {Saved.answer}
//               </Text>
//               <Text mt={2}>
//                 <strong>Explanation:</strong> {Saved.explanation}
//               </Text>
//             </Box>
//           );
//         })}
//       </VStack>
//     </Box>
//   );
// };

// export default SavedPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Flex,
  Card,
  CardBody,
  Icon,
  Select,
  HStack,
  Divider,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiBookmark, FiFilter } from "react-icons/fi";
import { getLocalStorage } from "../helpers/localStorage";

const SavedPage = () => {
  const [saveData, setSaveData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    // Get all saved questions organized by subject
    const allSaved = getLocalStorage("savedQuestionsBySubject") || {};

    console.log("📚 Loaded saved questions:", allSaved);

    // Get available subjects
    const subjects = Object.keys(allSaved);
    setAvailableSubjects(subjects);

    // Check if there's a specific topic requested
    const requestedTopic = getLocalStorage("savedtopic");

    if (requestedTopic && allSaved[requestedTopic]) {
      // Show only questions for the requested topic
      setSaveData(allSaved[requestedTopic]);
      setFilteredData(allSaved[requestedTopic]);
      setSelectedSubject(requestedTopic);
      console.log(
        `✅ Showing ${requestedTopic} questions:`,
        allSaved[requestedTopic].length,
      );
    } else {
      // Show all questions from all subjects
      const allQuestions = Object.entries(allSaved).flatMap(
        ([subject, questions]) => questions.map((q) => ({ ...q, subject })),
      );
      setSaveData(allQuestions);
      setFilteredData(allQuestions);
      console.log("✅ Showing all questions:", allQuestions.length);
    }
  }, []);

  // Filter questions when subject selection changes
  const handleSubjectFilter = (subject) => {
    setSelectedSubject(subject);

    if (subject === "all") {
      setFilteredData(saveData);
    } else {
      const filtered = saveData.filter((q) => q.subject === subject);
      setFilteredData(filtered);
    }

    console.log(`🔍 Filtered to ${subject}:`, filteredData.length, "questions");
  };

  // Get display name for subject
  const getSubjectDisplayName = (subjectKey) => {
    const subjectMap = {
      english: "English",
      eng: "English",
      mathematics: "Mathematics",
      math: "Mathematics",
      reasoning: "Reasoning",
      "general studies": "General Studies",
      gs: "General Studies",
      vocabulary: "Vocabulary",
      vocab: "Vocabulary",
    };
    return subjectMap[subjectKey?.toLowerCase()] || subjectKey || "Unknown";
  };

  return (
    <Container maxW="1200px" py={8} px={4}>
      {/* Header */}
      <Box mb={8}>
        <Flex align="center" gap={2} mb={2}>
          <Icon as={FiBookmark} boxSize={6} color="purple.600" />
          <Heading size="lg" color="gray.800">
            Saved Questions
          </Heading>
        </Flex>
        <Text color="gray.600" fontSize="md">
          Review and practice your bookmarked questions
        </Text>
      </Box>

      {/* Subject Filter */}
      {availableSubjects.length > 1 && (
        <Card mb={6} bg="white" shadow="sm" borderRadius="lg">
          <CardBody p={4}>
            <Flex align="center" gap={3} wrap="wrap">
              <HStack spacing={2}>
                <Icon as={FiFilter} color="gray.600" />
                <Text fontWeight="600" color="gray.700" fontSize="sm">
                  Filter by Subject:
                </Text>
              </HStack>
              <Select
                value={selectedSubject}
                onChange={(e) => handleSubjectFilter(e.target.value)}
                size="sm"
                width={{ base: "full", sm: "250px" }}
                bg="white"
                borderColor="gray.300"
              >
                <option value="all">All Subjects ({saveData.length})</option>
                {availableSubjects.map((subject) => {
                  const count = saveData.filter(
                    (q) => q.subject === subject,
                  ).length;
                  return (
                    <option key={subject} value={subject}>
                      {getSubjectDisplayName(subject)} ({count})
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </CardBody>
        </Card>
      )}

      {/* Stats */}
      {filteredData.length > 0 && (
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mb={6}>
          <Card bg="purple.50" borderColor="purple.200" borderWidth="1px">
            <CardBody textAlign="center" p={4}>
              <Text fontSize="2xl" fontWeight="bold" color="purple.700">
                {filteredData.length}
              </Text>
              <Text fontSize="sm" color="purple.600" fontWeight="500">
                Total Bookmarked
              </Text>
            </CardBody>
          </Card>
          <Card bg="blue.50" borderColor="blue.200" borderWidth="1px">
            <CardBody textAlign="center" p={4}>
              <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                {availableSubjects.length}
              </Text>
              <Text fontSize="sm" color="blue.600" fontWeight="500">
                Subjects Covered
              </Text>
            </CardBody>
          </Card>
          <Card bg="green.50" borderColor="green.200" borderWidth="1px">
            <CardBody textAlign="center" p={4}>
              <Text fontSize="2xl" fontWeight="bold" color="green.700">
                {selectedSubject === "all" ? "All" : "1"}
              </Text>
              <Text fontSize="sm" color="green.600" fontWeight="500">
                Currently Viewing
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      )}

      {/* Questions List */}
      {filteredData.length === 0 ? (
        <Card bg="gray.50" shadow="none" borderRadius="xl">
          <CardBody textAlign="center" py={16}>
            <Icon as={FiBookmark} boxSize={16} color="gray.300" mb={4} />
            <Heading size="md" color="gray.600" mb={2}>
              No Saved Questions
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Bookmark questions from the Review Test page to see them here
            </Text>
          </CardBody>
        </Card>
      ) : (
        <VStack spacing={4} align="stretch">
          {filteredData.map((question, index) => (
            <Card
              key={index}
              bg="white"
              shadow="md"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.2s"
              _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
              border="1px"
              borderColor="gray.200"
            >
              <CardBody p={{ base: 4, md: 6 }}>
                {/* Question Header */}
                <Flex
                  justify="space-between"
                  align="start"
                  mb={4}
                  gap={3}
                  wrap="wrap"
                >
                  <HStack spacing={2} wrap="wrap">
                    <Badge
                      colorScheme="purple"
                      fontSize="xs"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Question {index + 1}
                    </Badge>
                    {question.subject && (
                      <Badge
                        colorScheme="blue"
                        fontSize="xs"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {getSubjectDisplayName(question.subject)}
                      </Badge>
                    )}
                  </HStack>
                  <Icon
                    as={FiBookmark}
                    boxSize={5}
                    color="purple.500"
                    fill="purple.500"
                  />
                </Flex>

                {/* Question Text */}
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="600"
                  color="gray.800"
                  mb={4}
                  lineHeight="tall"
                >
                  {question.qus}
                </Text>

                <Divider mb={4} />

                {/* Options */}
                {question.options && question.options.length > 0 && (
                  <VStack align="stretch" spacing={2} mb={4}>
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.700"
                      mb={2}
                    >
                      Options:
                    </Text>
                    {question.options.map((option, optIndex) => {
                      const isCorrectAnswer = optIndex === question.answer - 1;
                      return (
                        <Box
                          key={optIndex}
                          p={3}
                          borderRadius="md"
                          border="2px"
                          borderColor={
                            isCorrectAnswer ? "green.300" : "gray.200"
                          }
                          bg={isCorrectAnswer ? "green.50" : "gray.50"}
                        >
                          <Flex align="center" gap={3}>
                            <Badge
                              colorScheme={isCorrectAnswer ? "green" : "gray"}
                              fontSize="xs"
                              fontWeight="bold"
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {String.fromCharCode(65 + optIndex)}
                            </Badge>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              fontWeight={isCorrectAnswer ? "600" : "400"}
                            >
                              {option}
                            </Text>
                            {isCorrectAnswer && (
                              <Badge
                                colorScheme="green"
                                fontSize="2xs"
                                ml="auto"
                                px={2}
                                py={1}
                              >
                                ✓ Correct
                              </Badge>
                            )}
                          </Flex>
                        </Box>
                      );
                    })}
                  </VStack>
                )}

                {/* Answer (if no options) */}
                {(!question.options || question.options.length === 0) &&
                  question.answer && (
                    <Box
                      p={3}
                      bg="green.50"
                      borderRadius="md"
                      border="1px"
                      borderColor="green.200"
                      mb={4}
                    >
                      <Text fontSize="sm" color="green.800">
                        <Text as="span" fontWeight="600">
                          Answer:{" "}
                        </Text>
                        {question.answer}
                      </Text>
                    </Box>
                  )}

                {/* Explanation */}
                {question.explanation && (
                  <Box
                    p={4}
                    bg="blue.50"
                    borderRadius="md"
                    borderLeft="4px"
                    borderColor="blue.400"
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="blue.700"
                      mb={2}
                    >
                      📚 Explanation:
                    </Text>
                    <Text fontSize="sm" color="blue.900" lineHeight="tall">
                      {question.explanation}
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default SavedPage;