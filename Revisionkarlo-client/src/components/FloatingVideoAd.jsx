import React, { useState } from "react";
import { Box, IconButton, Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

const FloatingVideoAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom={{ base: "70px", md: "20px" }}
      right={{ base: "10px", md: "20px" }}
      zIndex={9999}
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
      borderRadius="12px"
      overflow="hidden"
      bg="white"
      border="2px solid"
      borderColor="gray.300"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      w={isMinimized ? "80px" : { base: "280px", sm: "320px", md: "380px" }}
      maxW="calc(100vw - 40px)"
    >
      {/* Control Bar */}
      <Box
        bg="gray.900"
        px={2}
        py={1.5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          fontSize="xs"
          color="white"
          fontWeight="600"
          letterSpacing="0.5px"
          display={isMinimized ? "none" : "block"}
        >
          Advertisement
        </Box>

        <Box display="flex" gap={1}>
          {/* Minimize/Maximize Button */}
          <IconButton
            icon={<Icon as={isMinimized ? FiMaximize2 : FiMinimize2} />}
            size="xs"
            variant="ghost"
            colorScheme="whiteAlpha"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
            onClick={() => setIsMinimized(!isMinimized)}
            _hover={{ bg: "whiteAlpha.300" }}
            color="white"
          />

          {/* Close Button */}
          <IconButton
            icon={<CloseIcon />}
            size="xs"
            variant="ghost"
            colorScheme="whiteAlpha"
            aria-label="Close ad"
            onClick={() => setIsVisible(false)}
            _hover={{ bg: "whiteAlpha.300" }}
            color="white"
          />
        </Box>
      </Box>

      {/* Video Container */}
      {!isMinimized && (
        <Box bg="gray.100" position="relative" w="100%" aspectRatio="16/9">
          {/* Placeholder - Replace with actual video ad */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="gray.900"
            color="white"
            gap={3}
          >
            <Box
              w="60px"
              h="60px"
              borderRadius="full"
              bg="whiteAlpha.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)" }}
            >
              ▶
            </Box>
            <Box fontSize="xs" color="gray.400" textAlign="center" px={4}>
              Floating Video Ad Space
            </Box>
          </Box>

          {/* 
            REPLACE THE PLACEHOLDER ABOVE WITH YOUR ACTUAL VIDEO AD:
            
            Option 1: YouTube Video Ad
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0 }}
            />

            Option 2: Self-hosted Video
            <video
              width="100%"
              height="100%"
              autoPlay
              muted
              loop
              playsInline
              style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
            >
              <source src="/path/to/your-ad.mp4" type="video/mp4" />
            </video>

            Option 3: Video Ad Network (Google AdSense Video)
            <ins className="adsbygoogle"
                 style={{display:'block', position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"></ins>
          */}
        </Box>
      )}

      {/* Minimized State - Show small preview */}
      {isMinimized && (
        <Box
          w="76px"
          h="42px"
          bg="gray.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="lg"
          cursor="pointer"
          onClick={() => setIsMinimized(false)}
          _hover={{ bg: "gray.800" }}
        >
          ▶
        </Box>
      )}
    </Box>
  );
};

export default FloatingVideoAd;
