import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Code,
  Flex,
} from "@chakra-ui/react";
import { FiAlertCircle, FiRefreshCw, FiHome } from "react-icons/fi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxW="800px" py={20}>
          <VStack spacing={6} align="stretch">
            <Flex justify="center">
              <Icon as={FiAlertCircle} boxSize={20} color="red.500" mb={4} />
            </Flex>

            <Box textAlign="center">
              <Heading size="xl" mb={2} color="red.600">
                Oops! Something Went Wrong
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={6}>
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </Text>
            </Box>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                bg="red.50"
                border="2px solid"
                borderColor="red.200"
                borderRadius="lg"
                p={6}
              >
                <Text fontWeight="bold" mb={2} color="red.700">
                  Error Details (Development Mode Only):
                </Text>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  p={4}
                  bg="red.100"
                  borderRadius="md"
                  fontSize="sm"
                  color="red.900"
                  mb={4}
                >
                  {this.state.error.toString()}
                </Code>

                {this.state.errorInfo && (
                  <Box>
                    <Text fontWeight="bold" mb={2} color="red.700">
                      Component Stack:
                    </Text>
                    <Code
                      display="block"
                      whiteSpace="pre-wrap"
                      p={4}
                      bg="red.100"
                      borderRadius="md"
                      fontSize="xs"
                      color="red.900"
                      maxH="300px"
                      overflowY="auto"
                    >
                      {this.state.errorInfo.componentStack}
                    </Code>
                  </Box>
                )}
              </Box>
            )}

            <Flex gap={4} justify="center" flexWrap="wrap">
              <Button
                leftIcon={<FiRefreshCw />}
                colorScheme="blue"
                size="lg"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
              <Button
                leftIcon={<FiHome />}
                variant="outline"
                colorScheme="blue"
                size="lg"
                onClick={this.handleGoHome}
              >
                Go to Home
              </Button>
            </Flex>

            <Box textAlign="center" pt={6}>
              <Text fontSize="sm" color="gray.500">
                If this problem persists, please contact support or report this
                issue.
              </Text>
            </Box>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
