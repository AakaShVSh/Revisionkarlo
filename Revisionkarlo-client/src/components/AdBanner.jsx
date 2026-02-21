import React from "react";
import { Box, Text, AspectRatio, Center } from "@chakra-ui/react";

const AdBanner = ({
  type = "horizontal", // 'horizontal', 'vertical', 'square', 'video'
  label = "Advertisement",
  height,
  width,
  mt,
  mb,
  mx,
}) => {
  const getAdDimensions = () => {
    switch (type) {
      case "video":
        return {
          h: height || { base: "200px", md: "300px", lg: "400px" },
          w: width || "100%",
        };
      case "horizontal":
        return { h: height || "120px", w: width || "100%" };
      case "vertical":
        return { h: height || "600px", w: width || "300px" };
      case "square":
        return { h: height || "250px", w: width || "250px" };
      default:
        return { h: height || "120px", w: width || "100%" };
    }
  };

  const dimensions = getAdDimensions();

  // Video ad with 16:9 aspect ratio
  if (type === "video") {
    return (
      <Box mt={mt} mb={mb} mx={mx} w={dimensions.w}>
        <Center>
          <Box
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="12px"
            overflow="hidden"
            w="100%"
            position="relative"
          >
            <AspectRatio ratio={16 / 9}>
              <Box
                bg="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={3}
              >
                {/* Placeholder for actual video ad */}
                <Text
                  fontSize="xs"
                  color="gray.400"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {label}
                </Text>
                <Box
                  w="80px"
                  h="80px"
                  bg="gray.200"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="3xl"
                  color="gray.300"
                >
                  ▶
                </Box>
                <Text fontSize="sm" color="gray.400" fontWeight="500">
                  Video Ad Space
                </Text>
                {/* 
                  Replace this section with your video ad code, for example:
                  
                  <video 
                    width="100%" 
                    height="100%" 
                    controls 
                    autoPlay 
                    muted
                  >
                    <source src="your-ad-video.mp4" type="video/mp4" />
                  </video>
                  
                  Or embed YouTube/Vimeo ad:
                  
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                */}
              </Box>
            </AspectRatio>
          </Box>
        </Center>
      </Box>
    );
  }

  // Regular banner ads
  return (
    <Box mt={mt} mb={mb} mx={mx} w={dimensions.w}>
      <Center>
        <Box
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="8px"
          overflow="hidden"
          w="100%"
          h={dimensions.h}
          position="relative"
        >
          {/* Placeholder for actual ad content */}
          <Center h="100%" flexDirection="column" gap={2}>
            <Text
              fontSize="xs"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {label}
            </Text>
            <Box
              w="80%"
              h="60%"
              bg="gray.100"
              borderRadius="4px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* 
                Replace with your ad network code:
                
                Google AdSense:
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-xxxxx"
                     data-ad-slot="xxxxx"
                     data-ad-format="auto"></ins>
              */}
              <Text fontSize="sm" color="gray.300">
                Banner Ad Space
              </Text>
            </Box>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default AdBanner;
