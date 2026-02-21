import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Flex,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getLocalStorage } from "../helpers/localStorage";

const UserTestDataList = () => {
  const [completedTests, setCompletedTests] = useState([]);
  const [displayedTests, setDisplayedTests] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const INITIAL_DISPLAY_COUNT = 5;

  // Load completed tests from localStorage
  useEffect(() => {
    loadCompletedTests();
  }, []);

  const loadCompletedTests = () => {
    // Get all test results from localStorage
    const allTests = [];

    // Get created tests
    const createdTests = getLocalStorage("allTypeWiseTests") || [];

    // For each created test, check if there's a result
    createdTests.forEach((test, index) => {
      const testResult = getLocalStorage(`testResult_${index}`);

      if (testResult && testResult.completed) {
        allTests.push({
          ...test,
          testIndex: index,
          results: testResult,
          completedAt: testResult.completedAt || test.createdAt,
        });
      }
    });

    // Sort by completion date (most recent first)
    allTests.sort((a, b) => {
      const dateA = new Date(a.completedAt || a.createdAt);
      const dateB = new Date(b.completedAt || b.createdAt);
      return dateB - dateA;
    });

    setCompletedTests(allTests);
    setDisplayedTests(allTests.slice(0, INITIAL_DISPLAY_COUNT));
  };

  // Refresh when component becomes visible or when tests are updated
  useEffect(() => {
    const handleStorageChange = () => {
      loadCompletedTests();
    };

    // Listen for custom events (you can dispatch this when a test is completed)
    window.addEventListener("testCompleted", handleStorageChange);

    // Refresh every 2 seconds to catch new completions
    const interval = setInterval(loadCompletedTests, 2000);

    return () => {
      window.removeEventListener("testCompleted", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Handle show more/less
  const handleToggleShowAll = () => {
    if (showAll) {
      setDisplayedTests(completedTests.slice(0, INITIAL_DISPLAY_COUNT));
    } else {
      setDisplayedTests(completedTests);
    }
    setShowAll(!showAll);
  };

  // Handle test click
  const handleTestClick = (test) => {
    setSelectedTest(test);
    onOpen();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate statistics
  const getTestStats = (test) => {
    const results = test.results || {};
    const score = results.score || 0;
    const totalQuestions = test.noOfQus || test.questions?.length || 0;
    const correctAnswers = results.correctAnswers || 0;
    const incorrectAnswers = results.incorrectAnswers || 0;
    const skipped = totalQuestions - (correctAnswers + incorrectAnswers);
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return {
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      skipped,
      percentage,
    };
  };

  // Get performance color
  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return "green";
    if (percentage >= 60) return "orange";
    return "red";
  };

  return (
    <Box>
      <VStack spacing={0} align="stretch">
        {displayedTests.length > 0 ? (
          <>
            {displayedTests.map((test, index) => {
              const stats = getTestStats(test);
              const performanceColor = getPerformanceColor(stats.percentage);

              return (
                <Box
                  key={test.testIndex || index}
                  p={4}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  transition="all 0.2s"
                  cursor="pointer"
                  _hover={{
                    bg: "gray.50",
                  }}
                  _last={{
                    borderBottom: "none",
                  }}
                  onClick={() => handleTestClick(test)}
                >
                  {/* Test Header */}
                  <Flex justify="space-between" align="start" mb={2}>
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="600" fontSize="15px" color="gray.800">
                        {test.testName || "Unnamed Test"}
                      </Text>
                      {test.subcategory && (
                        <Text fontSize="11px" color="gray.500">
                          {test.subcategory}
                        </Text>
                      )}
                    </VStack>
                    <Icon as={InfoIcon} color="blue.500" boxSize={4} />
                  </Flex>

                  {/* Test Stats */}
                  <HStack spacing={2} mb={2} flexWrap="wrap">
                    <Badge
                      bg="blue.50"
                      color="blue.700"
                      fontSize="12px"
                      px={2}
                      py={1}
                      borderRadius="4px"
                      fontWeight="500"
                    >
                      {stats.totalQuestions} Questions
                    </Badge>
                    <Badge
                      colorScheme={performanceColor}
                      fontSize="12px"
                      px={2}
                      py={1}
                      borderRadius="4px"
                      fontWeight="500"
                    >
                      {stats.percentage}%
                    </Badge>
                    {test.category && (
                      <Badge
                        colorScheme="purple"
                        fontSize="12px"
                        px={2}
                        py={1}
                        borderRadius="4px"
                        fontWeight="500"
                      >
                        {test.category}
                      </Badge>
                    )}
                  </HStack>

                  {/* Progress Bar */}
                  {stats.percentage > 0 && (
                    <Progress
                      value={stats.percentage}
                      size="xs"
                      colorScheme={performanceColor}
                      borderRadius="full"
                      mb={2}
                    />
                  )}

                  {/* Date and Time */}
                  <HStack spacing={3} fontSize="11px" color="gray.500">
                    <HStack spacing={1}>
                      <Icon as={FiCalendar} boxSize={3} />
                      <Text>
                        {formatDate(test.completedAt || test.createdAt)}
                      </Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={FiClock} boxSize={3} />
                      <Text>
                        {formatTime(test.completedAt || test.createdAt)}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              );
            })}

            {/* Show More/Less Button */}
            {completedTests.length > INITIAL_DISPLAY_COUNT && (
              <Box
                p={3}
                textAlign="center"
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  rightIcon={
                    <ChevronDownIcon
                      boxSize={5}
                      transform={showAll ? "rotate(180deg)" : "rotate(0deg)"}
                      transition="transform 0.2s"
                    />
                  }
                  onClick={handleToggleShowAll}
                  fontWeight="500"
                  fontSize="14px"
                >
                  {showAll
                    ? "Show Less"
                    : `Show ${completedTests.length - INITIAL_DISPLAY_COUNT} More`}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box p={8} textAlign="center">
            <Icon as={FiAlertCircle} boxSize={12} color="gray.300" mb={3} />
            <Text color="gray.400" fontSize="14px" fontWeight="500">
              No completed tests yet
            </Text>
            <Text color="gray.400" fontSize="13px" mt={2}>
              Complete a test to see it here
            </Text>
          </Box>
        )}
      </VStack>

      {/* Test Details Modal */}
      {selectedTest && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader borderBottom="1px solid" borderColor="gray.200">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="600">
                  {selectedTest.testName || "Test Results"}
                </Text>
                {selectedTest.completedAt && (
                  <Text fontSize="sm" color="gray.500" fontWeight="400">
                    Completed: {formatDate(selectedTest.completedAt)} at{" "}
                    {formatTime(selectedTest.completedAt)}
                  </Text>
                )}
              </VStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody py={6}>
              {(() => {
                const stats = getTestStats(selectedTest);
                const performanceColor = getPerformanceColor(stats.percentage);

                return (
                  <VStack spacing={5} align="stretch">
                    {/* Score Overview */}
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="gray.700"
                        mb={3}
                      >
                        Performance Overview
                      </Text>
                      <Box
                        bg={`${performanceColor}.50`}
                        border="1px solid"
                        borderColor={`${performanceColor}.200`}
                        borderRadius="8px"
                        p={4}
                      >
                        <Flex justify="space-between" align="center" mb={2}>
                          <Text
                            fontSize="2xl"
                            fontWeight="700"
                            color={`${performanceColor}.700`}
                          >
                            {stats.percentage}%
                          </Text>
                          <Badge
                            colorScheme={performanceColor}
                            fontSize="md"
                            px={3}
                            py={1}
                            borderRadius="6px"
                          >
                            {stats.percentage >= 80
                              ? "Excellent"
                              : stats.percentage >= 60
                                ? "Good"
                                : "Needs Improvement"}
                          </Badge>
                        </Flex>
                        <Progress
                          value={stats.percentage}
                          size="sm"
                          colorScheme={performanceColor}
                          borderRadius="full"
                        />
                      </Box>
                    </Box>

                    {/* Statistics Grid */}
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="gray.700"
                        mb={3}
                      >
                        Detailed Statistics
                      </Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <GridItem>
                          <Box
                            bg="blue.50"
                            border="1px solid"
                            borderColor="blue.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Text
                              fontSize="sm"
                              color="blue.600"
                              fontWeight="500"
                              mb={1}
                            >
                              Total Questions
                            </Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="blue.700"
                            >
                              {stats.totalQuestions}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem>
                          <Box
                            bg="purple.50"
                            border="1px solid"
                            borderColor="purple.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Text
                              fontSize="sm"
                              color="purple.600"
                              fontWeight="500"
                              mb={1}
                            >
                              Score
                            </Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="purple.700"
                            >
                              {stats.score}/{stats.totalQuestions}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem>
                          <Box
                            bg="green.50"
                            border="1px solid"
                            borderColor="green.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Flex align="center" justify="center" mb={1}>
                              <FaCheckCircle color="#48BB78" size={14} />
                              <Text
                                fontSize="sm"
                                color="green.600"
                                fontWeight="500"
                                ml={1}
                              >
                                Correct
                              </Text>
                            </Flex>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="green.700"
                            >
                              {stats.correctAnswers}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem>
                          <Box
                            bg="red.50"
                            border="1px solid"
                            borderColor="red.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Flex align="center" justify="center" mb={1}>
                              <FaTimesCircle color="#F56565" size={14} />
                              <Text
                                fontSize="sm"
                                color="red.600"
                                fontWeight="500"
                                ml={1}
                              >
                                Incorrect
                              </Text>
                            </Flex>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="red.700"
                            >
                              {stats.incorrectAnswers}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <Box
                            bg="gray.50"
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Text
                              fontSize="sm"
                              color="gray.600"
                              fontWeight="500"
                              mb={1}
                            >
                              Skipped
                            </Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="gray.700"
                            >
                              {stats.skipped}
                            </Text>
                          </Box>
                        </GridItem>
                      </Grid>
                    </Box>

                    {/* Topics Covered */}
                    {selectedTest.quslist &&
                      selectedTest.quslist.length > 0 && (
                        <Box>
                          <Text
                            fontSize="sm"
                            fontWeight="600"
                            color="gray.700"
                            mb={3}
                          >
                            Topics Covered ({selectedTest.quslist.length})
                          </Text>
                          <VStack spacing={2} align="stretch">
                            {selectedTest.quslist.map((topic, idx) => (
                              <Flex
                                key={idx}
                                justify="space-between"
                                align="center"
                                bg="gray.50"
                                p={3}
                                borderRadius="6px"
                                border="1px solid"
                                borderColor="gray.200"
                              >
                                <Text
                                  fontSize="sm"
                                  color="gray.700"
                                  fontWeight="500"
                                >
                                  {topic.qusdata}
                                </Text>
                                <Badge
                                  bg="gray.200"
                                  color="gray.700"
                                  fontSize="xs"
                                  px={2}
                                  py={1}
                                  borderRadius="4px"
                                >
                                  {topic.count} questions
                                </Badge>
                              </Flex>
                            ))}
                          </VStack>
                        </Box>
                      )}

                    {/* Test Information */}
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="gray.700"
                        mb={3}
                      >
                        Test Information
                      </Text>
                      <VStack spacing={2} align="stretch">
                        {selectedTest.category && (
                          <Flex justify="space-between" align="center">
                            <Text fontSize="sm" color="gray.600">
                              Category:
                            </Text>
                            <Badge
                              colorScheme="blue"
                              fontSize="sm"
                              px={3}
                              py={1}
                            >
                              {selectedTest.category}
                            </Badge>
                          </Flex>
                        )}
                        {selectedTest.subcategory && (
                          <Flex justify="space-between" align="center">
                            <Text fontSize="sm" color="gray.600">
                              Subcategory:
                            </Text>
                            <Badge
                              colorScheme="purple"
                              fontSize="sm"
                              px={3}
                              py={1}
                            >
                              {selectedTest.subcategory}
                            </Badge>
                          </Flex>
                        )}
                        {selectedTest.createdAt && (
                          <Flex justify="space-between" align="center">
                            <Text fontSize="sm" color="gray.600">
                              Created:
                            </Text>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              fontWeight="500"
                            >
                              {formatDate(selectedTest.createdAt)}
                            </Text>
                          </Flex>
                        )}
                        {selectedTest.completedAt && (
                          <Flex justify="space-between" align="center">
                            <Text fontSize="sm" color="gray.600">
                              Completed:
                            </Text>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              fontWeight="500"
                            >
                              {formatDate(selectedTest.completedAt)} at{" "}
                              {formatTime(selectedTest.completedAt)}
                            </Text>
                          </Flex>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                );
              })()}
            </ModalBody>

            <ModalFooter borderTop="1px solid" borderColor="gray.200">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default UserTestDataList;
