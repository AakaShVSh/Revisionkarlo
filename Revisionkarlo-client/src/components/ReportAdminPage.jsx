import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const sampleData = [
  {
    category: "MCQ",
    subject: "General Studies",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    explanation: "Paris is the capital of France.",
  },
  {
    category: "Reported",
    subject: "Physics",
    question: "Explain the theory of relativity.",
    options: [],
    answer: "Einstein’s theory explaining gravity.",
    explanation:
      "The theory of relativity was developed by Albert Einstein and consists of special and general relativity.",
  },
  {
    category: "MCQ",
    subject: "Science",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    explanation:
      "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
  },
];

const ReportAdminPage = ({}) => {
  return (
    <Box p={4}>
      <Heading size="lg">Report Admin Page</Heading>
      <Text mt={2}>Review reported questions categorized by type.</Text>
      <VStack spacing={4} mt={4} align="start">
        {sampleData.map((report, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="md" width="100%">
            <Heading size="md">
              Category: {report.category} ({report.subject})
            </Heading>
            <Text mt={2}>
              <strong>Question:</strong> {report.question}
            </Text>
            {report.options.length > 0 && (
              <Text mt={2}>
                <strong>Options:</strong> {report.options.join(", ")}
              </Text>
            )}
            <Text mt={2}>
              <strong>Answer:</strong> {report.answer}
            </Text>
            <Text mt={2}>
              <strong>Explanation:</strong> {report.explanation}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ReportAdminPage;
