// import { Box, Flex, Text, Image, Spinner } from "@chakra-ui/react";

// import {
//   FaYoutube,
//   FaTelegram,
//   FaInstagram,
//   FaWhatsapp,
//   FaBook,
//   FaCalculator,
//   FaBrain,
//   FaGlobe,
//   FaBookmark,
//   FaFacebook,
// } from "react-icons/fa";

// import { Link, useNavigate } from "react-router-dom";
// import Slideshow from "./Slideshow";
// import { setLocalStorage } from "../helpers/localStorage";
// import { useRef, useState, useEffect } from "react";

// const Home = ({ setchoosesub }) => {
//   const navigate = useNavigate();
//   const subjectsRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading (you can replace this with actual data fetching)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000); // Adjust time as needed

//     return () => clearTimeout(timer);
//   }, []);

//   const setsub = (pro, sub = null) => {
//     setchoosesub(pro);
//     setLocalStorage("cat", sub);
//     navigate("/questionList");
//   };

//   const scrollToSubjects = () => {
//     subjectsRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   if (isLoading) {
//     return (
//       <Box
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         bg="white"
//       >
//         <Flex direction="column" align="center" gap={6}>
//           {/* Animated Spinner */}
//           <Box position="relative">
//             <Spinner
//               thickness="4px"
//               speed="0.65s"
//               emptyColor="gray.200"
//               color="#667eea"
//               size="xl"
//               w="80px"
//               h="80px"
//             />
//             <Box
//               position="absolute"
//               top="50%"
//               left="50%"
//               transform="translate(-50%, -50%)"
//             >
//               <FaBook size={32} color="#667eea" />
//             </Box>
//           </Box>

//           {/* Loading Text */}
//           <Flex direction="column" align="center" gap={2}>
//             <Text
//               color="#2d3748"
//               fontSize="24px"
//               fontWeight="700"
//               letterSpacing="0.5px"
//             >
//               Loading Quiz Portal
//             </Text>
//             <Text color="#718096" fontSize="14px" fontWeight="400">
//               Preparing your questions...
//             </Text>
//           </Flex>

//           {/* Animated Dots */}
//           <Flex gap={2}>
//             {[0, 1, 2].map((i) => (
//               <Box
//                 key={i}
//                 w="10px"
//                 h="10px"
//                 borderRadius="full"
//                 bg="#667eea"
//                 animation={`bounce 1.4s infinite ease-in-out`}
//                 style={{ animationDelay: `${i * 0.16}s` }}
//               />
//             ))}
//           </Flex>
//         </Flex>

//         {/* CSS Animation */}
//         <style>
//           {`
//             @keyframes bounce {
//               0%, 80%, 100% {
//                 transform: scale(0);
//                 opacity: 0.5;
//               }
//               40% {
//                 transform: scale(1);
//                 opacity: 1;
//               }
//             }
//           `}
//         </style>
//       </Box>
//     );
//   }

//   return (
//     <Box pb={{ base: 6, md: 8, lg: 12 }}>
//       {/* Slideshow */}
//       <Box mb={{ base: 6, md: 8 }}>
//         <Slideshow scrollToSubjects={scrollToSubjects} />
//       </Box>

//       {/* ================= SOCIAL MEDIA ================= */}
//       <Box
//         w={{ base: "95%", md: "90%", lg: "85%" }}
//         maxW="1200px"
//         mx="auto"
//         mb={{ base: 8, md: 10, lg: 12 }}
//         p={{ base: 5, md: 6, lg: 8 }}
//         bg="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
//         borderRadius={{ base: "16px", md: "20px" }}
//         boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
//       >
//         <Text
//           textAlign="center"
//           fontSize={{ base: "20px", md: "24px", lg: "26px" }}
//           fontWeight="600"
//           mb={{ base: 6, md: 7, lg: 8 }}
//           color="#2d3748"
//           letterSpacing="0.3px"
//         >
//           Follow Us On
//         </Text>

//         <Flex
//           justifyContent="center"
//           flexWrap="wrap"
//           gap={{ base: 4, md: 5, lg: 6 }}
//           maxW="900px"
//           mx="auto"
//         >
//           {/* YouTube */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #FF0000 0%, #cc0000 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(255, 0, 0, 0.3)"
//             >
//               <FaYoutube size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               YouTube
//             </Text>
//           </Box>

//           {/* Telegram */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #29b6f6 0%, #1e88e5 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(41, 182, 246, 0.3)"
//             >
//               <FaTelegram size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               Telegram
//             </Text>
//           </Box>

//           {/* Instagram */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #E4405F 0%, #c13584 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(228, 64, 95, 0.3)"
//             >
//               <FaInstagram size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               Instagram
//             </Text>
//           </Box>

//           {/* Facebook */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #1877F2 0%, #0d65d9 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(24, 119, 242, 0.3)"
//             >
//               <FaFacebook size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               Facebook
//             </Text>
//           </Box>

//           {/* WhatsApp */}
//           <Box
//             onClick={() =>
//               window.open(
//                 "https://api.whatsapp.com/send?phone=919696306817&text=Hi!%20want%20help.",
//                 "_blank",
//               )
//             }
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #25D366 0%, #1ebe57 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(37, 211, 102, 0.3)"
//             >
//               <FaWhatsapp size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               WhatsApp
//             </Text>
//           </Box>
//         </Flex>
//       </Box>

//       {/* ================= SUBJECTS ================= */}
//       <Box
//         ref={subjectsRef}
//         w={{ base: "95%", md: "90%", lg: "85%" }}
//         maxW="1200px"
//         mx="auto"
//       >
//         <Text
//           textAlign="center"
//           fontSize={{ base: "20px", md: "24px", lg: "26px" }}
//           fontWeight="600"
//           mb={{ base: 6, md: 7, lg: 8 }}
//           color="#2d3748"
//           letterSpacing="0.3px"
//         >
//           Top Competitive Subject Quiz
//         </Text>

//         <Box
//           display="grid"
//           gridTemplateColumns={{
//             base: "repeat(2, 1fr)",
//             sm: "repeat(2, 1fr)",
//             md: "repeat(3, 1fr)",
//             lg: "repeat(6, 1fr)",
//           }}
//           gap={{ base: 4, md: 5, lg: 6 }}
//         >
//           {/* English */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(102, 175, 221, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #66afdd 0%, #5a9dc9 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("Eng")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaBook size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               English
//             </Text>
//           </Box>

//           {/* Maths */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(65, 216, 213, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #41d8d5 0%, #39c2bf 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("math")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaCalculator size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               Maths
//             </Text>
//           </Box>

//           {/* Reasoning */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(72, 187, 120, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #48bb78 0%, #41a968 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("Reasoning")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaBrain size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               Reasoning
//             </Text>
//           </Box>

//           {/* Vocabulary */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(44, 100, 255, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #2c64ff 0%, #2658e6 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("vocabulary")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaBook size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               Vocabulary
//             </Text>
//           </Box>

//           {/* General Studies */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(255, 120, 44, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #ff782c 0%, #e66a28 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("gs")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaGlobe size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               General Studies
//             </Text>
//           </Box>

//           {/* Saved */}
//           <Link to="/Saved-question">
//             <Box
//               _hover={{
//                 transform: "translateY(-8px)",
//                 boxShadow: "0 12px 24px rgba(92, 76, 227, 0.3)",
//               }}
//               transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//               bg="linear-gradient(135deg, #5c4ce3 0%, #5244cc 100%)"
//               color="white"
//               borderRadius={{ base: "12px", md: "16px" }}
//               boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//               p={{ base: 4, md: 5, lg: 6 }}
//               h={{ base: "140px", md: "150px", lg: "160px" }}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               cursor="pointer"
//             >
//               <Box
//                 bg="rgba(255, 255, 255, 0.2)"
//                 borderRadius="full"
//                 p={{ base: 2.5, md: 3 }}
//                 mb={{ base: 2, md: 3 }}
//               >
//                 <FaBookmark size={32} color="white" />
//               </Box>
//               <Text
//                 fontSize={{ base: "14px", md: "15px" }}
//                 fontWeight="600"
//                 letterSpacing="0.3px"
//               >
//                 Saved Question
//               </Text>
//             </Box>
//           </Link>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Home;

import { Box, Flex, Text, Image, Spinner } from "@chakra-ui/react";

import {
  FaYoutube,
  FaTelegram,
  FaInstagram,
  FaWhatsapp,
  FaBook,
  FaCalculator,
  FaBrain,
  FaGlobe,
  FaBookmark,
  FaFacebook,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Slideshow from "./Slideshow";
import { setLocalStorage } from "../helpers/localStorage";
import { useRef, useState, useEffect } from "react";
import AdBanner from "./AdBanner";
import FloatingVideoAd from "./FloatingVideoAd";
import AdsterraBanner from "./AdsterraBanner";

const Home = ({ setchoosesub }) => {
  const navigate = useNavigate();
  const subjectsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (you can replace this with actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const setsub = (pro, sub = null) => {
    setchoosesub(pro);
    setLocalStorage("cat", sub);
    navigate("/questionList");
  };

  const scrollToSubjects = () => {
    subjectsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
      >
        <Flex direction="column" align="center" gap={6}>
          {/* Animated Spinner */}
          <Box position="relative">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#667eea"
              size="xl"
              w="80px"
              h="80px"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <FaBook size={32} color="#667eea" />
            </Box>
          </Box>

          {/* Loading Text */}
          <Flex direction="column" align="center" gap={2}>
            <Text
              color="#2d3748"
              fontSize="24px"
              fontWeight="700"
              letterSpacing="0.5px"
            >
              Loading Quiz Portal
            </Text>
            <Text color="#718096" fontSize="14px" fontWeight="400">
              Preparing your questions...
            </Text>
          </Flex>

          {/* Animated Dots */}
          <Flex gap={2}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                w="10px"
                h="10px"
                borderRadius="full"
                bg="#667eea"
                animation={`bounce 1.4s infinite ease-in-out`}
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </Flex>
        </Flex>

        {/* CSS Animation */}
        <style>
          {`
            @keyframes bounce {
              0%, 80%, 100% { 
                transform: scale(0);
                opacity: 0.5;
              }
              40% { 
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Box pb={{ base: 6, md: 8, lg: 12 }}>
      {/* Slideshow */}
      <Box mb={{ base: 6, md: 8 }}>
        <Slideshow scrollToSubjects={scrollToSubjects} />
      </Box>

      {/* VIDEO AD - After Slideshow */}
      {/* <Box
        w={{ base: "95%", md: "90%", lg: "85%" }}
        maxW="1200px"
        mx="auto"
        mb={{ base: 6, md: 8 }}
      >
        <AdBanner type="video" label="Video Advertisement" />
      </Box> */}

      {/* ================= SOCIAL MEDIA ================= */}
      <Box
        w={{ base: "95%", md: "90%", lg: "85%" }}
        maxW="1200px"
        mx="auto"
        mb={{ base: 8, md: 10, lg: 12 }}
        p={{ base: 5, md: 6, lg: 8 }}
        bg="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
        borderRadius={{ base: "16px", md: "20px" }}
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
      >
        <Text
          textAlign="center"
          fontSize={{ base: "20px", md: "24px", lg: "26px" }}
          fontWeight="600"
          mb={{ base: 6, md: 7, lg: 8 }}
          color="#2d3748"
          letterSpacing="0.3px"
        >
          Follow Us On
        </Text>

        <Flex
          justifyContent="center"
          flexWrap="wrap"
          gap={{ base: 4, md: 5, lg: 6 }}
          maxW="900px"
          mx="auto"
        >
          {/* YouTube */}
          <Box
            textAlign="center"
            _hover={{
              transform: "translateY(-8px) scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            p={{ base: 4, md: 5 }}
            borderRadius={{ base: "12px", md: "16px" }}
            bg="white"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
            _active={{ transform: "translateY(-4px) scale(1.02)" }}
            w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
            minW={{ base: "120px", md: "140px" }}
          >
            <Box
              bg="linear-gradient(135deg, #FF0000 0%, #cc0000 100%)"
              borderRadius="full"
              p={{ base: 3, md: 4 }}
              display="inline-flex"
              mb={{ base: 2, md: 3 }}
              boxShadow="0 4px 12px rgba(255, 0, 0, 0.3)"
            >
              <FaYoutube size={36} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="500"
              color="#2d3748"
            >
              YouTube
            </Text>
          </Box>

          {/* Telegram */}
          <Box
            textAlign="center"
            _hover={{
              transform: "translateY(-8px) scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            p={{ base: 4, md: 5 }}
            borderRadius={{ base: "12px", md: "16px" }}
            bg="white"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
            _active={{ transform: "translateY(-4px) scale(1.02)" }}
            w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
            minW={{ base: "120px", md: "140px" }}
          >
            <Box
              bg="linear-gradient(135deg, #29b6f6 0%, #1e88e5 100%)"
              borderRadius="full"
              p={{ base: 3, md: 4 }}
              display="inline-flex"
              mb={{ base: 2, md: 3 }}
              boxShadow="0 4px 12px rgba(41, 182, 246, 0.3)"
            >
              <FaTelegram size={36} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="500"
              color="#2d3748"
            >
              Telegram
            </Text>
          </Box>

          {/* Instagram */}
          <Box
            textAlign="center"
            _hover={{
              transform: "translateY(-8px) scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            p={{ base: 4, md: 5 }}
            borderRadius={{ base: "12px", md: "16px" }}
            bg="white"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
            _active={{ transform: "translateY(-4px) scale(1.02)" }}
            w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
            minW={{ base: "120px", md: "140px" }}
          >
            <Box
              bg="linear-gradient(135deg, #E4405F 0%, #c13584 100%)"
              borderRadius="full"
              p={{ base: 3, md: 4 }}
              display="inline-flex"
              mb={{ base: 2, md: 3 }}
              boxShadow="0 4px 12px rgba(228, 64, 95, 0.3)"
            >
              <FaInstagram size={36} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="500"
              color="#2d3748"
            >
              Instagram
            </Text>
          </Box>

          {/* Facebook */}
          <Box
            textAlign="center"
            _hover={{
              transform: "translateY(-8px) scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            p={{ base: 4, md: 5 }}
            borderRadius={{ base: "12px", md: "16px" }}
            bg="white"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
            _active={{ transform: "translateY(-4px) scale(1.02)" }}
            w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
            minW={{ base: "120px", md: "140px" }}
          >
            <Box
              bg="linear-gradient(135deg, #1877F2 0%, #0d65d9 100%)"
              borderRadius="full"
              p={{ base: 3, md: 4 }}
              display="inline-flex"
              mb={{ base: 2, md: 3 }}
              boxShadow="0 4px 12px rgba(24, 119, 242, 0.3)"
            >
              <FaFacebook size={36} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="500"
              color="#2d3748"
            >
              Facebook
            </Text>
          </Box>

          {/* WhatsApp */}
          <Box
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=919696306817&text=Hi!%20want%20help.",
                "_blank",
              )
            }
            textAlign="center"
            _hover={{
              transform: "translateY(-8px) scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            p={{ base: 4, md: 5 }}
            borderRadius={{ base: "12px", md: "16px" }}
            bg="white"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
            _active={{ transform: "translateY(-4px) scale(1.02)" }}
            w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
            minW={{ base: "120px", md: "140px" }}
          >
            <Box
              bg="linear-gradient(135deg, #25D366 0%, #1ebe57 100%)"
              borderRadius="full"
              p={{ base: 3, md: 4 }}
              display="inline-flex"
              mb={{ base: 2, md: 3 }}
              boxShadow="0 4px 12px rgba(37, 211, 102, 0.3)"
            >
              <FaWhatsapp size={36} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="500"
              color="#2d3748"
            >
              WhatsApp
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* ================= SUBJECTS ================= */}
      <Box
        ref={subjectsRef}
        w={{ base: "95%", md: "90%", lg: "85%" }}
        maxW="1200px"
        mx="auto"
      >
        <Text
          textAlign="center"
          fontSize={{ base: "20px", md: "24px", lg: "26px" }}
          fontWeight="600"
          mb={{ base: 6, md: 7, lg: 8 }}
          color="#2d3748"
          letterSpacing="0.3px"
        >
          Top Competitive Subject Quiz
        </Text>

        <Box
          display="grid"
          gridTemplateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={{ base: 4, md: 5, lg: 6 }}
        >
          {/* Vocabulary */}
          <Box
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(44, 100, 255, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg="linear-gradient(135deg, #2c64ff 0%, #2658e6 100%)"
            color="white"
            borderRadius={{ base: "12px", md: "16px" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            p={{ base: 4, md: 5, lg: 6 }}
            h={{ base: "140px", md: "150px", lg: "160px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => setsub("vocabulary")}
          >
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              p={{ base: 2.5, md: 3 }}
              mb={{ base: 2, md: 3 }}
            >
              <FaBook size={32} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
              letterSpacing="0.3px"
            >
              Vocabulary
            </Text>
          </Box>

          {/* English */}
          <Box
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(102, 175, 221, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg="linear-gradient(135deg, #66afdd 0%, #5a9dc9 100%)"
            color="white"
            borderRadius={{ base: "12px", md: "16px" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            p={{ base: 4, md: 5, lg: 6 }}
            h={{ base: "140px", md: "150px", lg: "160px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => setsub("Eng")}
          >
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              p={{ base: 2.5, md: 3 }}
              mb={{ base: 2, md: 3 }}
            >
              <FaBook size={32} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
              letterSpacing="0.3px"
            >
              English
            </Text>
          </Box>

          {/* General Studies */}
          <Box
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(255, 120, 44, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg="linear-gradient(135deg, #ff782c 0%, #e66a28 100%)"
            color="white"
            borderRadius={{ base: "12px", md: "16px" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            p={{ base: 4, md: 5, lg: 6 }}
            h={{ base: "140px", md: "150px", lg: "160px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => setsub("gs")}
          >
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              p={{ base: 2.5, md: 3 }}
              mb={{ base: 2, md: 3 }}
            >
              <FaGlobe size={32} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
              letterSpacing="0.3px"
            >
              General Studies
            </Text>
          </Box>

          {/* Reasoning */}
          <Box
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(72, 187, 120, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg="linear-gradient(135deg, #48bb78 0%, #41a968 100%)"
            color="white"
            borderRadius={{ base: "12px", md: "16px" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            p={{ base: 4, md: 5, lg: 6 }}
            h={{ base: "140px", md: "150px", lg: "160px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => setsub("Reasoning")}
          >
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              p={{ base: 2.5, md: 3 }}
              mb={{ base: 2, md: 3 }}
            >
              <FaBrain size={32} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
              letterSpacing="0.3px"
            >
              Reasoning
            </Text>
          </Box>

          {/* Maths */}
          <Box
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(65, 216, 213, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg="linear-gradient(135deg, #41d8d5 0%, #39c2bf 100%)"
            color="white"
            borderRadius={{ base: "12px", md: "16px" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            p={{ base: 4, md: 5, lg: 6 }}
            h={{ base: "140px", md: "150px", lg: "160px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => setsub("math")}
          >
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              p={{ base: 2.5, md: 3 }}
              mb={{ base: 2, md: 3 }}
            >
              <FaCalculator size={32} color="white" />
            </Box>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
              letterSpacing="0.3px"
            >
              Maths
            </Text>
          </Box>

          {/* Saved */}
          <Link to="/Saved-question">
            <Box
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(92, 76, 227, 0.3)",
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              bg="linear-gradient(135deg, #5c4ce3 0%, #5244cc 100%)"
              color="white"
              borderRadius={{ base: "12px", md: "16px" }}
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
              p={{ base: 4, md: 5, lg: 6 }}
              h={{ base: "140px", md: "150px", lg: "160px" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Box
                bg="rgba(255, 255, 255, 0.2)"
                borderRadius="full"
                p={{ base: 2.5, md: 3 }}
                mb={{ base: 2, md: 3 }}
              >
                <FaBookmark size={32} color="white" />
              </Box>
              <Text
                fontSize={{ base: "14px", md: "15px" }}
                fontWeight="600"
                letterSpacing="0.3px"
              >
                Saved Question
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>

      {/* BANNER AD - Before Footer */}
      <Box w={{ base: "95%", md: "90%", lg: "85%" }} maxW="1200px" mx="auto">
        <AdsterraBanner />
      </Box>

      {/* Floating Video Ad - Bottom Right */}
      <FloatingVideoAd />
    </Box>
  );
};

export default Home;
