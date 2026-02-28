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

// src/components/Navbar.jsx
// Uses: Chakra UI, react-router-dom, react-icons
// Auth: reads token + user from sessionStorage (key: "token", "user")
// Dropdown: Coaching → /coaching | Sign Out → clears session + navigate /
// NO coaching button in nav bar — only in avatar dropdown

// src/components/Navbar.jsx
//
// Two triggers that update the avatar:
//   1. "sessionchange" custom event — fired by signInApi/signOutApi IMMEDIATELY
//   2. location.pathname change — catches browser back/forward navigation
//
// Both read sessionStorage("user") which auth.js writes on sign-in.

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { signOutApi } from "../apis/auth";

const NAV_LINKS = [
  { label: "Home",     to: "/"            },
  { label: "Practice", to: "/questionList" },
  { label: "Feedback", to: "/GiveFeedback" },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dropRef   = useRef(null);

  const [user,     setUser]     = useState(null);
  const [dropOpen, setDropOpen] = useState(false);

  // ── Read user from sessionStorage ─────────────────────────────────────
  const syncUser = useCallback(() => {
    try {
      const stored = sessionStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, []);

  // Trigger 1: fire immediately when auth.js calls saveUser/clearUser
  useEffect(() => {
    window.addEventListener("sessionchange", syncUser);
    return () => window.removeEventListener("sessionchange", syncUser);
  }, [syncUser]);

  // Trigger 2: also sync on every route change (handles page refresh + back nav)
  useEffect(() => {
    syncUser();
  }, [location.pathname, syncUser]);

  // ── Close dropdown on outside click ───────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Sign out ──────────────────────────────────────────────────────────
  const doSignOut = async () => {
    setDropOpen(false);
    await signOutApi();  // clears sessionStorage + fires "sessionchange" → syncUser runs
    navigate("/");
  };

  const initial = user
    ? (user.Name || user.Email || "U")[0].toUpperCase()
    : "";

  return (
    <Box
      as="nav"
      position="sticky" top={0} zIndex={900}
      bg="#4a72b8"
      boxShadow="0 2px 20px rgba(0,0,0,0.18)"
      fontFamily="'Sora', sans-serif"
    >
      <Flex
        maxW="1400px" mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        h={{ base: "56px", md: "64px" }}
        align="center" gap={{ base: 3, md: 6 }}
      >
        {/* ── Logo ────────────────────────────────────────────────────── */}
        <Link to="/">
          <Text
            fontSize={{ base: "18px", md: "22px" }}
            fontWeight={800} color="white"
            letterSpacing="-0.4px" whiteSpace="nowrap"
            _hover={{ color: "#dbeafe" }} transition="color .15s"
          >
            Revision Karlo
          </Text>
        </Link>

        {/* ── Nav links (desktop) ─────────────────────────────────────── */}
        <Flex display={{ base: "none", md: "flex" }} align="center" gap={1}>
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to}>
              <Box
                px={3} py="7px" borderRadius="8px" fontSize="13px"
                fontWeight={location.pathname === l.to ? 700 : 500}
                color={location.pathname === l.to ? "white" : "rgba(255,255,255,.82)"}
                bg={location.pathname === l.to ? "rgba(255,255,255,.2)" : "transparent"}
                _hover={{ bg: "rgba(255,255,255,.18)", color: "white" }}
                transition="all .15s"
              >
                {l.label}
              </Box>
            </Link>
          ))}
        </Flex>

        <Box flex={1} />

        {/* ── Right: avatar or Sign In ────────────────────────────────── */}
        {user ? (
          <Box position="relative" ref={dropRef}>

            {/* Avatar row */}
            <Flex
              align="center" gap={2} cursor="pointer"
              px={2} py="6px" borderRadius="10px"
              _hover={{ bg: "rgba(255,255,255,.15)" }}
              transition="all .15s"
              onClick={() => setDropOpen(v => !v)}
            >
              {/* Initial circle */}
              <Flex
                w="34px" h="34px" borderRadius="full"
                bg="rgba(255,255,255,.22)"
                border="2px solid rgba(255,255,255,.45)"
                align="center" justify="center"
                fontSize="14px" fontWeight={800} color="white"
                flexShrink={0}
              >
                {initial}
              </Flex>

              {/* Name — desktop only */}
              <Text
                display={{ base: "none", md: "block" }}
                fontSize="13px" fontWeight={600} color="white"
                maxW="120px"
                overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap"
              >
                {user.Name || "Account"}
              </Text>

              <Icon
                as={FaChevronDown} color="white" fontSize="10px"
                display={{ base: "none", md: "block" }}
                transform={dropOpen ? "rotate(180deg)" : "rotate(0)"}
                transition="transform .2s"
              />
            </Flex>

            {/* Dropdown */}
            {dropOpen && (
              <Box
                position="absolute" right={0} top="calc(100% + 8px)"
                w="210px" bg="white" borderRadius="14px"
                boxShadow="0 12px 48px rgba(0,0,0,.18)"
                border="1px solid rgba(0,0,0,.06)"
                overflow="hidden" zIndex={9999}
                sx={{
                  animation: "ddin .15s ease",
                  "@keyframes ddin": {
                    from: { opacity: 0, transform: "translateY(-6px)" },
                    to:   { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                {/* User info strip */}
                <Box px={4} py={3} bg="#f8fafc" borderBottom="1px solid #f1f5f9">
                  <Text
                    fontSize="10px" color="#94a3b8" fontWeight={700}
                    textTransform="uppercase" letterSpacing=".8px"
                  >
                    Signed in as
                  </Text>
                  <Text
                    fontSize="13px" fontWeight={700} color="#0f172a"
                    noOfLines={1} mt="2px"
                  >
                    {user.Name || user.Email}
                  </Text>
                  {user.Email && (
                    <Text fontSize="11px" color="#94a3b8" noOfLines={1} mt="1px">
                      {user.Email}
                    </Text>
                  )}
                </Box>

                {/* Coaching */}
                <Flex
                  px={4} py="12px" align="center" gap={3} cursor="pointer"
                  _hover={{ bg: "#f0f7ff" }} transition="background .12s"
                  onClick={() => { setDropOpen(false); navigate("/coaching"); }}
                >
                  <Flex
                    w="30px" h="30px" bg="#eff6ff" borderRadius="8px"
                    align="center" justify="center" flexShrink={0}
                  >
                    <Icon as={FaChalkboardTeacher} fontSize="13px" color="#4a72b8" />
                  </Flex>
                  <Text fontSize="13px" fontWeight={600} color="#374151">
                    Coaching
                  </Text>
                </Flex>

                {/* Sign out */}
                <Flex
                  px={4} py="12px" align="center" gap={3} cursor="pointer"
                  _hover={{ bg: "#fff5f5" }} transition="background .12s"
                  borderTop="1px solid #f1f5f9"
                  onClick={doSignOut}
                >
                  <Flex
                    w="30px" h="30px" bg="#fef2f2" borderRadius="8px"
                    align="center" justify="center" flexShrink={0}
                  >
                    <Icon as={FaSignOutAlt} fontSize="13px" color="#ef4444" />
                  </Flex>
                  <Text fontSize="13px" fontWeight={600} color="#ef4444">
                    Sign Out
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>

        ) : (
          /* Not signed in */
          <Link to="/auth/signin">
            <Flex
              align="center" gap="7px" px={4} py="8px"
              bg="white" borderRadius="9px"
              fontSize="13px" fontWeight={700} color="#1e293b"
              _hover={{ bg: "#f0f7ff", boxShadow: "0 2px 10px rgba(0,0,0,.12)" }}
              transition="all .2s"
            >
              <Icon as={FaUserCircle} fontSize="15px" />
              Sign In
            </Flex>
          </Link>
        )}
      </Flex>
    </Box>
  );
}