// import React, { useEffect, useState } from "react";
// import logo from "../logo.svg";
// import { TbReportSearch } from "react-icons/tb";
// import {
//   Container,
//   Text,
//   Image,
//   Box,
//   Heading,
//   Button,
//   Input,
//   Flex,
//   Center,
//   Icon,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { FaBold, FaRegUserCircle } from "react-icons/fa";
// import { getCookies, setCookies } from "../helpers/cookies";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// import { useSelector } from "react-redux";
// import { FaSearch } from "react-icons/fa";

// const Navbar = () => {
//   const { signInSuccess } = useSelector((state) => state.signInReducer);
//   const [stateSignin, setStateSignin] = useState(false);

//   useEffect(() => {
//     const h = async () => {
//       const s = await getCookies("success");
//       if (s) {
//         setStateSignin(s);
//         console.log(s);
//         setLocalStorage("success", s);
//       } else if (signInSuccess !== false) {
//         setCookies("success", signInSuccess);
//         setStateSignin(s);
//       }
//     };
//     h();
//   });

//   return (
//     <Box
//       as="nav"
//       position="sticky"
//       top="0"
//       zIndex="1000"
//       bg="#527ec4"
//       // bg="#1e293b"
//       boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
//     >
//       <Flex
//         maxW="1400px"
//         mx="auto"
//         px={{ base: 4, md: 6, lg: 8 }}
//         py={{ base: 3, md: 4 }}
//         alignItems="center"
//         justifyContent="space-between"
//         gap={{ base: 3, md: 4 }}
//       >
//         {/* Logo */}
//         <Box flex={{ base: "0 0 auto", md: "0 0 200px" }}>
//           <Link to="/">
//             <Text
//               fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
//               fontWeight="700"
//               letterSpacing={{ base: "0.5px", md: "1px" }}
//               color="white"
//               cursor="pointer"
//               transition="all 0.2s ease"
//               whiteSpace="nowrap"
//               _hover={{
//                 color: "#e0f2fe",
//               }}
//             >
//               Revision Karlo
//             </Text>
//           </Link>
//         </Box>

//         {/* Search Bar */}
//         <Box
//           flex="1"
//           maxW={{ base: "300px", md: "400px", lg: "500px" }}
//           display={{ base: "none", md: "block" }}
//         >
//           <InputGroup size="md">
//             <InputLeftElement pointerEvents="none" h="full">
//               <Icon as={FaSearch} color="gray.400" />
//             </InputLeftElement>
//             <Input
//               type="search"
//               placeholder="Search subjects..."
//               bg="#F1F5F9"
//               color="gray.800"
//               border="1px solid"
//               borderColor="gray.200"
//               borderRadius="8px"
//               fontSize="15px"
//               h="42px"
//               pl="40px"
//               _placeholder={{ color: "gray.500" }}
//               _focus={{
//                 // borderColor: "#60a5fa",
//                 // boxShadow: "0 0 0 1px #60a5fa",
//                 outline: "none",
//               }}
//               transition="all 0.2s"
//             />
//           </InputGroup>
//         </Box>

//         {/* User Icon / Auth */}
//         <Flex alignItems="center" gap={3}>
//           {stateSignin ? (
//             <Box
//               cursor="pointer"
//               transition="all 0.2s ease"
//               _hover={{ opacity: 0.8 }}
//             >
//               <Icon
//                 as={FaRegUserCircle}
//                 fontSize={{ base: "28px", md: "32px" }}
//                 color="white"
//               />
//             </Box>
//           ) : (
//             <Link to="/auth/signin">
//               <Button
//                 rightIcon={<FaRegUserCircle />}
//                 bg="white"
//                 color="#1e293b"
//                 size={{ base: "sm", md: "md" }}
//                 fontWeight="600"
//                 borderRadius="8px"
//                 px={{ base: 4, md: 6 }}
//                 border="2px solid transparent"
//                 _hover={{
//                   bg: "#f8fafc",
//                   borderColor: "white",
//                 }}
//                 transition="all 0.2s ease"
//               >
//                 Sign In
//               </Button>
//             </Link>
//           )}
//         </Flex>
//       </Flex>

//       {/* Mobile Search Bar */}
//       <Box px={4} pb={3} display={{ base: "block", md: "none" }}>
//         <InputGroup size="sm">
//           <InputLeftElement pointerEvents="none" h="full">
//             <Icon as={FaSearch} color="gray.400" />
//           </InputLeftElement>
//           <Input
//             type="search"
//             placeholder="Search subjects..."
//             bg="white"
//             color="gray.800"
//             border="1px solid"
//             borderColor="gray.200"
//             borderRadius="8px"
//             fontSize="14px"
//             h="38px"
//             pl="36px"
//             _placeholder={{ color: "gray.500" }}
//             _focus={{
//               borderColor: "#60a5fa",
//               boxShadow: "0 0 0 1px #60a5fa",
//               outline: "none",
//             }}
//           />
//         </InputGroup>
//       </Box>
//     </Box>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Input,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { getCookies } from "../helpers/cookies";

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const cookie = await getCookies("success");
      setIsSignedIn(!!cookie);
    };
    checkAuth();
  }, []);

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="#527ec4"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 3, md: 4 }}
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: 3, md: 4 }}
      >
        {/* Logo */}
        <Box flex={{ base: "0 0 auto", md: "0 0 200px" }}>
          <Link to="/">
            <Text
              fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
              fontWeight="700"
              letterSpacing={{ base: "0.5px", md: "1px" }}
              color="white"
              cursor="pointer"
              whiteSpace="nowrap"
              _hover={{ color: "#e0f2fe" }}
            >
              Revision Karlo
            </Text>
          </Link>
        </Box>

        {/* Search Bar — desktop */}
        <Box
          flex="1"
          maxW={{ base: "300px", md: "400px", lg: "500px" }}
          display={{ base: "none", md: "block" }}
        >
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none" h="full">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search subjects..."
              bg="#F1F5F9"
              color="gray.800"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              fontSize="15px"
              h="42px"
              pl="40px"
              _placeholder={{ color: "gray.500" }}
              _focus={{ outline: "none" }}
            />
          </InputGroup>
        </Box>

        {/* Auth */}
        <Flex alignItems="center" gap={3}>
          {isSignedIn ? (
            <Box cursor="pointer" _hover={{ opacity: 0.8 }}>
              <Icon
                as={FaRegUserCircle}
                fontSize={{ base: "28px", md: "32px" }}
                color="white"
              />
            </Box>
          ) : (
            <Link to="/auth/signin">
              <Button
                rightIcon={<FaRegUserCircle />}
                bg="white"
                color="#1e293b"
                size={{ base: "sm", md: "md" }}
                fontWeight="600"
                borderRadius="8px"
                px={{ base: 4, md: 6 }}
                border="2px solid transparent"
                _hover={{ bg: "#f8fafc", borderColor: "white" }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>

      {/* Search Bar — mobile */}
      <Box px={4} pb={3} display={{ base: "block", md: "none" }}>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none" h="full">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search subjects..."
            bg="white"
            color="gray.800"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            fontSize="14px"
            h="38px"
            pl="36px"
            _placeholder={{ color: "gray.500" }}
            _focus={{
              borderColor: "#60a5fa",
              boxShadow: "0 0 0 1px #60a5fa",
              outline: "none",
            }}
          />
        </InputGroup>
      </Box>
    </Box>
  );
};

export default Navbar;