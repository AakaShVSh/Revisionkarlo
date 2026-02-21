import {
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" bg="gray.50" mt="auto">
      {/* Feedback Banner */}
      <Box w="100%" bg="#f0f9ff" borderTop="1px" borderColor="#e0f2fe">
        <Container maxW="1400px" py={{ base: 4, md: 5 }}>
          <Text
            textAlign="center"
            fontSize={{ base: "14px", md: "15px" }}
            color="gray.700"
            fontWeight="500"
          >
            Have feedback?{" "}
            <ChakraLink
              as={Link}
              to="/GiveFeedback"
              color="#2563eb"
              fontWeight="600"
              _hover={{ color: "#1d4ed8", textDecoration: "underline" }}
              transition="all 0.2s"
            >
              Share your thoughts
            </ChakraLink>{" "}
            — we value your input
          </Text>
        </Container>
      </Box>

      {/* Main Footer */}
      <Box bg="#4f6a95" color="white">
        <Container maxW="1400px" py={{ base: 12, md: 16 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align={{ base: "start", lg: "flex-start" }}
            gap={{ base: 10, md: 12, lg: 16 }}
          >
            {/* Logo & Description Section */}
            <Box
              flex={{ base: "0", lg: "1" }}
              maxW={{ base: "100%", lg: "350px" }}
            >
              <ChakraLink as={Link} to="/" display="inline-block">
                <Text
                  fontSize={{ base: "22px", md: "24px" }}
                  fontWeight="700"
                  color="white"
                  mb={4}
                  _hover={{ color: "#60a5fa" }}
                  transition="all 0.2s"
                >
                  Revision Karlo
                </Text>
              </ChakraLink>
              <Text fontSize="15px" color="gray.400" lineHeight="1.7" mb={6}>
                Your trusted partner for competitive exam preparation. Quality
                education and excellence in every quiz.
              </Text>

              {/* Social Media Icons */}
              <HStack spacing={4}>
                <Box
                  as="a"
                  href="#"
                  bg="rgba(255, 255, 255, 0.1)"
                  p={2.5}
                  borderRadius="8px"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: "#2563eb", transform: "translateY(-2px)" }}
                >
                  <Icon as={FaFacebook} fontSize="18px" />
                </Box>
                <Box
                  as="a"
                  href="#"
                  bg="rgba(255, 255, 255, 0.1)"
                  p={2.5}
                  borderRadius="8px"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: "#2563eb", transform: "translateY(-2px)" }}
                >
                  <Icon as={FaTwitter} fontSize="18px" />
                </Box>
                <Box
                  as="a"
                  href="#"
                  bg="rgba(255, 255, 255, 0.1)"
                  p={2.5}
                  borderRadius="8px"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: "#2563eb", transform: "translateY(-2px)" }}
                >
                  <Icon as={FaInstagram} fontSize="18px" />
                </Box>
                <Box
                  as="a"
                  href="#"
                  bg="rgba(255, 255, 255, 0.1)"
                  p={2.5}
                  borderRadius="8px"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: "#2563eb", transform: "translateY(-2px)" }}
                >
                  <Icon as={FaLinkedin} fontSize="18px" />
                </Box>
              </HStack>
            </Box>

            {/* Links Sections */}
            <Flex
              flex={{ base: "0", lg: "2" }}
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 10, sm: 12, lg: 20 }}
              justify={{ lg: "flex-end" }}
            >
              {/* About Us */}
              <VStack align="flex-start" spacing={4}>
                <Text
                  fontSize="16px"
                  fontWeight="700"
                  mb={1}
                  color="white"
                  letterSpacing="0.5px"
                >
                  About Us
                </Text>
                <ChakraLink
                  as={Link}
                  to="/GiveFeedback"
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Give Feedback
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Our Story
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Contact Us
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Careers
                </ChakraLink>
              </VStack>

              {/* Resources */}
              <VStack align="flex-start" spacing={4}>
                <Text
                  fontSize="16px"
                  fontWeight="700"
                  mb={1}
                  color="white"
                  letterSpacing="0.5px"
                >
                  Resources
                </Text>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Help Center
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Documentation
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Blog
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  FAQs
                </ChakraLink>
              </VStack>

              {/* Legal */}
              <VStack align="flex-start" spacing={4}>
                <Text
                  fontSize="16px"
                  fontWeight="700"
                  mb={1}
                  color="white"
                  letterSpacing="0.5px"
                >
                  Legal
                </Text>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Privacy Policy
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Terms of Service
                </ChakraLink>
                <ChakraLink
                  fontSize="15px"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    pl: 1,
                  }}
                  transition="all 0.2s"
                >
                  Cookie Policy
                </ChakraLink>
              </VStack>
            </Flex>
          </Flex>

          {/* Copyright */}
          <Divider mt={12} mb={6} borderColor="rgba(255, 255, 255, 0.1)" />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text fontSize="14px" color="gray.500">
              © {currentYear} Revision Karlo. All rights reserved.
            </Text>
            <HStack spacing={6} fontSize="14px" color="gray.500">
              <ChakraLink _hover={{ color: "white" }} transition="all 0.2s">
                Privacy
              </ChakraLink>
              <ChakraLink _hover={{ color: "white" }} transition="all 0.2s">
                Terms
              </ChakraLink>
              <ChakraLink _hover={{ color: "white" }} transition="all 0.2s">
                Sitemap
              </ChakraLink>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
