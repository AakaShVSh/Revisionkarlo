// // // import React, { useEffect, useState } from "react";
// // // import { BsFillJournalBookmarkFill } from "react-icons/bs";
// // // import {
// // //   Box,
// // //   Button,
// // //   Center,
// // //   Container,
// // //   Drawer,
// // //   DrawerBody,
// // //   DrawerCloseButton,
// // //   DrawerContent,
// // //   DrawerHeader,
// // //   DrawerOverlay,
// // //   Flex,
// // //   Grid,
// // //   HStack,
// // //   Text,
// // //   VStack,
// // //   useDisclosure,
// // //   useMediaQuery,
// // //   Badge,
// // //   Divider,
// // //   Icon,
// // // } from "@chakra-ui/react";
// // // import { Link } from "react-router-dom";
// // // import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// // // import { HamburgerIcon } from "@chakra-ui/icons";
// // // import ReportQuestionDropdown from "./ReportQuestionDropdown";
// // // import { FiCheckCircle, FiXCircle, FiBookmark } from "react-icons/fi";

// // // const ReviewTest = () => {
// // //   const [question, setQuestion] = useState([]);
// // //   const [score, setscore] = useState(null);
// // //   const [category, setcategory] = useState(null);
// // //   const [allAns, setallAnswer] = useState({});
// // //   const [answeredQuestion, setAnsweredQuestion] = useState([]);
// // //   const [notAnswer, setNotAnswer] = useState([]);
// // //   const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
// // //   const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
// // //   const [currentquestion, setcurrentQuestion] = useState(0);
// // //   const [isMobile] = useMediaQuery("(max-width: 768px)");
// // //   const [size, setSize] = useState("");
// // //   const { isOpen, onOpen, onClose } = useDisclosure();

// // //   const handleQuestion = (con = null) => {
// // //     if (con !== null) {
// // //       setcurrentQuestion(con);
// // //     } else {
// // //       if (currentquestion < question.length - 1) {
// // //         setcurrentQuestion(currentquestion + 1);
// // //       }
// // //     }
// // //   };

// // //   const handlePrevious = () => {
// // //     if (currentquestion > 0) {
// // //       setcurrentQuestion(currentquestion - 1);
// // //     }
// // //   };

// // //   const handleClick = (newSize) => {
// // //     setSize(newSize);
// // //     onOpen();
// // //   };

// // //   useEffect(() => {
// // //     const getData = () => {
// // //       const data = getLocalStorage("test");
// // //       if (data && data[0]) {
// // //         setQuestion(data[0].questions || []);
// // //         setscore(data[0].score);
// // //         setcategory(data[0].category);
// // //         setallAnswer(data[0].allAnswer || {});
// // //         setAnsweredQuestion(data[0].answeredQuestion || []);
// // //         setNotAnswer(data[0].notAnswer || []);
// // //         setMarkedAndAnswer(data[0].markedAndAnswer || []);
// // //         setMarkedNotAnswer(data[0].markedNotAnswer || []);
// // //       }
// // //     };
// // //     getData();
// // //   }, []);

// // //   const save = (quest) => {
// // //     let savedata = getLocalStorage("saveData") || [];
// // //     let savequsnoqusdata = getLocalStorage("qusno") || [];

// // //     if (!Array.isArray(savedata)) {
// // //       savedata = [];
// // //       savequsnoqusdata = [];
// // //     }

// // //     const newQuestion = question[quest];
// // //     const newQuestionnoqus = question[quest]?.qus;

// // //     if (savequsnoqusdata.includes(newQuestionnoqus)) {
// // //       alert("Question already bookmarked!");
// // //       return;
// // //     }

// // //     if (savedata.length === 0) {
// // //       const sub = getLocalStorage("Subject");
// // //       const updatedData = [{ subject: sub }, newQuestion];
// // //       setLocalStorage("saveData", updatedData);
// // //       const updatedDataqusnoqus = [...savequsnoqusdata, newQuestionnoqus];
// // //       setLocalStorage("qusno", updatedDataqusnoqus);
// // //       alert("Question bookmarked successfully!");
// // //       return;
// // //     }

// // //     const updatedData = [...savedata, newQuestion];
// // //     setLocalStorage("saveData", updatedData);
// // //     const updatedDataqusnoqus = [...savequsnoqusdata, newQuestionnoqus];
// // //     setLocalStorage("qusno", updatedDataqusnoqus);
// // //     alert("Question bookmarked successfully!");
// // //   };

// // //   const isCorrectAnswer = (optionIndex) => {
// // //     return question[currentquestion]?.answer - 1 === optionIndex;
// // //   };

// // //   const isUserAnswer = (option) => {
// // //     return allAns[currentquestion] === option;
// // //   };

// // //   const getOptionBgColor = (option, index) => {
// // //     const correct = isCorrectAnswer(index);
// // //     const userSelected = isUserAnswer(option);

// // //     if (correct && userSelected) {
// // //       return "green.500"; // Correct answer selected by user
// // //     } else if (correct) {
// // //       return "green.500"; // Correct answer
// // //     } else if (userSelected) {
// // //       return "red.500"; // Wrong answer selected by user
// // //     }
// // //     return "white";
// // //   };

// // //   const getOptionTextColor = (option, index) => {
// // //     const correct = isCorrectAnswer(index);
// // //     const userSelected = isUserAnswer(option);

// // //     if (correct || userSelected) {
// // //       return "white";
// // //     }
// // //     return "gray.700";
// // //   };

// // //   // Sidebar Component
// // //   const QuestionSidebar = () => (
// // //     <VStack spacing={4} align="stretch" h="100%">
// // //       <Box>
// // //         <Text fontSize="xl" fontWeight="bold" color="white">
// // //           Test Review
// // //         </Text>
// // //       </Box>

// // //       <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
// // //         <VStack spacing={3} align="stretch">
// // //           <HStack justify="space-between">
// // //             <Text color="white" fontSize="sm">
// // //               Marked
// // //             </Text>
// // //             <Center
// // //               minW="28px"
// // //               h="28px"
// // //               bg="purple.500"
// // //               color="white"
// // //               borderRadius="full"
// // //               fontSize="sm"
// // //               fontWeight="600"
// // //             >
// // //               {markedNotAnswer.length}
// // //             </Center>
// // //           </HStack>

// // //           <HStack justify="space-between">
// // //             <Text color="white" fontSize="sm">
// // //               Not visited
// // //             </Text>
// // //             <Center
// // //               minW="28px"
// // //               h="28px"
// // //               bg="white"
// // //               color="gray.600"
// // //               border="1px solid"
// // //               borderColor="gray.300"
// // //               borderRadius="4px"
// // //               fontSize="sm"
// // //               fontWeight="600"
// // //             >
// // //               {question.length -
// // //                 (markedAndAnswer.length +
// // //                   markedNotAnswer.length +
// // //                   answeredQuestion.length +
// // //                   notAnswer.length)}
// // //             </Center>
// // //           </HStack>

// // //           <HStack justify="space-between">
// // //             <Text color="white" fontSize="sm">
// // //               Answered
// // //             </Text>
// // //             <Center
// // //               minW="28px"
// // //               h="28px"
// // //               bg="green.500"
// // //               color="white"
// // //               borderRadius="50% 50% 0 0"
// // //               fontSize="sm"
// // //               fontWeight="600"
// // //             >
// // //               {answeredQuestion.length}
// // //             </Center>
// // //           </HStack>

// // //           <HStack justify="space-between">
// // //             <Text color="white" fontSize="sm">
// // //               Not Answered
// // //             </Text>
// // //             <Center
// // //               minW="28px"
// // //               h="28px"
// // //               bg="red.500"
// // //               color="white"
// // //               borderRadius="0 0 50% 50%"
// // //               fontSize="sm"
// // //               fontWeight="600"
// // //             >
// // //               {notAnswer.length}
// // //             </Center>
// // //           </HStack>

// // //           <HStack justify="space-between">
// // //             <Text color="white" fontSize="sm">
// // //               Marked & Answered
// // //             </Text>
// // //             <Center
// // //               minW="28px"
// // //               h="28px"
// // //               bg="purple.500"
// // //               color="white"
// // //               borderRadius="full"
// // //               fontSize="sm"
// // //               fontWeight="600"
// // //             >
// // //               {markedAndAnswer.length}
// // //             </Center>
// // //           </HStack>
// // //         </VStack>
// // //       </Box>

// // //       <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
// // //         <Text color="white" fontSize="sm" mb={3}>
// // //           Section: Elementary maths
// // //         </Text>
// // //       </Box>

// // //       <Box
// // //         flex="1"
// // //         overflowY="auto"
// // //         css={{
// // //           "&::-webkit-scrollbar": {
// // //             width: "4px",
// // //           },
// // //           "&::-webkit-scrollbar-track": {
// // //             background: "rgba(255,255,255,0.1)",
// // //           },
// // //           "&::-webkit-scrollbar-thumb": {
// // //             background: "rgba(255,255,255,0.3)",
// // //             borderRadius: "2px",
// // //           },
// // //         }}
// // //       >
// // //         <Grid templateColumns="repeat(5, 1fr)" gap={3}>
// // //           {question?.map((d, i) => (
// // //             <Center
// // //               key={i}
// // //               w="100%"
// // //               h="40px"
// // //               bg={
// // //                 markedNotAnswer.includes(i)
// // //                   ? "purple.500"
// // //                   : answeredQuestion.includes(i)
// // //                     ? "green.500"
// // //                     : notAnswer.includes(i)
// // //                       ? "red.500"
// // //                       : markedAndAnswer.includes(i)
// // //                         ? "purple.500"
// // //                         : "white"
// // //               }
// // //               color={
// // //                 markedNotAnswer.includes(i) ||
// // //                 answeredQuestion.includes(i) ||
// // //                 notAnswer.includes(i) ||
// // //                 markedAndAnswer.includes(i)
// // //                   ? "white"
// // //                   : "gray.600"
// // //               }
// // //               borderRadius={
// // //                 markedAndAnswer.includes(i)
// // //                   ? "full"
// // //                   : markedNotAnswer.includes(i)
// // //                     ? "full"
// // //                     : answeredQuestion.includes(i)
// // //                       ? "50% 50% 0 0"
// // //                       : notAnswer.includes(i)
// // //                         ? "0 0 50% 50%"
// // //                         : "4px"
// // //               }
// // //               border="1px solid"
// // //               borderColor={
// // //                 markedNotAnswer.includes(i) ||
// // //                 answeredQuestion.includes(i) ||
// // //                 notAnswer.includes(i) ||
// // //                 markedAndAnswer.includes(i)
// // //                   ? "transparent"
// // //                   : "gray.300"
// // //               }
// // //               cursor="pointer"
// // //               onClick={() => handleQuestion(i)}
// // //               transition="all 0.2s"
// // //               _hover={{
// // //                 transform: "scale(1.05)",
// // //                 shadow: "md",
// // //               }}
// // //               fontSize="sm"
// // //               fontWeight="600"
// // //             >
// // //               {markedAndAnswer.includes(i) ? <>{i + 1} ✓</> : i + 1}
// // //             </Center>
// // //           ))}
// // //         </Grid>
// // //       </Box>

// // //       <VStack spacing={3} pt={4} borderTop="1px solid rgba(255,255,255,0.2)">
// // //         <Link to="/" style={{ width: "100%" }}>
// // //           <Button
// // //             w="100%"
// // //             bg="transparent"
// // //             border="1px solid #01bfbd"
// // //             color="#01bfbd"
// // //             fontSize="12px"
// // //             fontWeight="600"
// // //             h="36px"
// // //             _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// // //           >
// // //             Take More Tests
// // //           </Button>
// // //         </Link>
// // //         <Link to="/test-result" style={{ width: "100%" }}>
// // //           <Button
// // //             w="100%"
// // //             bg="transparent"
// // //             border="1px solid #01bfbd"
// // //             color="#01bfbd"
// // //             fontSize="12px"
// // //             fontWeight="600"
// // //             h="36px"
// // //             _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// // //           >
// // //             View Results
// // //           </Button>
// // //         </Link>
// // //       </VStack>
// // //     </VStack>
// // //   );

// // //   return (
// // //     <Box
// // //       h={{ base: "", md: "91vh", lg: "91vh" }}
// // //       display="flex"
// // //       flexDirection="column"
// // //       bg="white"
// // //     >
// // //       {/* Header */}
// // //       <Flex
// // //         bg="#4285f4"
// // //         color="white"
// // //         px={{ base: 3, md: 6 }}
// // //         py={3}
// // //         align="center"
// // //         justify="space-between"
// // //         wrap="wrap"
// // //         gap={4}
// // //       >
// // //         {/* LEFT SIDE */}
// // //         <HStack spacing={4} align="center" flexWrap="wrap">
// // //           <Text fontSize="sm" fontWeight="500">
// // //             SECTIONS |
// // //             <Box as="span" fontWeight="600" ml={1}>
// // //               Elementary maths
// // //             </Box>
// // //           </Text>

// // //           {/* Bookmark Button */}
// // //           <Button
// // //             size="sm"
// // //             leftIcon={<BsFillJournalBookmarkFill />}
// // //             variant="outline"
// // //             borderWidth="2px"
// // //             borderColor="#c2e3e2"
// // //             color="#aedbda"
// // //             fontSize="13px"
// // //             fontWeight="600"
// // //             h="36px"
// // //             px={5}
// // //             borderRadius="10px"
// // //             bg="transparent"
// // //             _hover={{
// // //               bg: "#01bfbd",
// // //               color: "white",
// // //             }}
// // //             _active={{
// // //               transform: "scale(0.97)",
// // //             }}
// // //             onClick={() => save(currentquestion)}
// // //           >
// // //             Bookmark
// // //           </Button>
// // //         </HStack>

// // //         {/* RIGHT SIDE */}
// // //         <HStack spacing={3} align="center">
// // //           <ReportQuestionDropdown />

// // //           <Link to="/">
// // //             {/* Reattempt Button */}
// // //             <Button
// // //               size="sm"
// // //               variant="outline"
// // //               borderWidth="2px"
// // //               borderColor="#bee9e8"
// // //               color="#bae1e0"
// // //               fontSize="13px"
// // //               fontWeight="600"
// // //               h="36px"
// // //               px={5}
// // //               borderRadius="10px"
// // //               bg="transparent"
// // //               _hover={{
// // //                 bg: "#01bfbd",
// // //                 color: "white",
// // //               }}
// // //               _active={{
// // //                 transform: "scale(0.97)",
// // //               }}
// // //             >
// // //               Reattempt This Test
// // //             </Button>
// // //           </Link>
// // //         </HStack>
// // //       </Flex>

// // //       {/* Main Content */}
// // //       <Flex flex="1" overflow="hidden">
// // //         {/* Question Area */}
// // //         <VStack flex="1" spacing={0} align="stretch" overflow="hidden">
// // //           {/* Section Header */}

// // //           {/* Question Number & Status */}
// // //           <Box
// // //             px={6}
// // //             py={3}
// // //             bg="white"
// // //             borderBottom="1px solid"
// // //             borderColor="gray.200"
// // //           >
// // //             <HStack justify="space-between">
// // //               <Text fontWeight="600" fontSize="md">
// // //                 Question no {currentquestion + 1}
// // //               </Text>
// // //               <HStack spacing={2}>
// // //                 {isCorrectAnswer(
// // //                   question[currentquestion]?.options.indexOf(
// // //                     allAns[currentquestion],
// // //                   ),
// // //                 ) ? (
// // //                   <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
// // //                     <HStack spacing={1}>
// // //                       <Icon as={FiCheckCircle} />
// // //                       <Text>Correct</Text>
// // //                     </HStack>
// // //                   </Badge>
// // //                 ) : allAns[currentquestion] ? (
// // //                   <Badge colorScheme="red" fontSize="sm" px={3} py={1}>
// // //                     <HStack spacing={1}>
// // //                       <Icon as={FiXCircle} />
// // //                       <Text>Incorrect</Text>
// // //                     </HStack>
// // //                   </Badge>
// // //                 ) : (
// // //                   <Badge colorScheme="gray" fontSize="sm" px={3} py={1}>
// // //                     Not Answered
// // //                   </Badge>
// // //                 )}
// // //               </HStack>
// // //             </HStack>
// // //           </Box>

// // //           {/* Question Content */}
// // //           <Box
// // //             flex="1"
// // //             overflow="auto"
// // //             px={6}
// // //             py={4}
// // //             bg="white"
// // //             css={{
// // //               "&::-webkit-scrollbar": {
// // //                 width: "8px",
// // //               },
// // //               "&::-webkit-scrollbar-track": {
// // //                 background: "#f1f1f1",
// // //               },
// // //               "&::-webkit-scrollbar-thumb": {
// // //                 background: "#888",
// // //                 borderRadius: "4px",
// // //               },
// // //             }}
// // //           >
// // //             <Text mb={6} fontSize="md" lineHeight="tall" fontWeight="500">
// // //               {question[currentquestion]?.qus}
// // //             </Text>

// // //             <VStack align="stretch" spacing={3} mb={6}>
// // //               {question[currentquestion]?.options.map((d, i) => {
// // //                 const bgColor = getOptionBgColor(d, i);
// // //                 const textColor = getOptionTextColor(d, i);
// // //                 const isCorrect = isCorrectAnswer(i);
// // //                 const isSelected = isUserAnswer(d);

// // //                 return (
// // //                   <Box
// // //                     key={i}
// // //                     p={4}
// // //                     borderRadius="md"
// // //                     border="2px solid"
// // //                     borderColor={bgColor === "white" ? "gray.200" : bgColor}
// // //                     bg={bgColor}
// // //                     color={textColor}
// // //                     position="relative"
// // //                   >
// // //                     <HStack justify="space-between">
// // //                       <Text
// // //                         fontWeight={isCorrect || isSelected ? "600" : "400"}
// // //                       >
// // //                         {d}
// // //                       </Text>
// // //                       {isCorrect && <Icon as={FiCheckCircle} boxSize={5} />}
// // //                       {isSelected && !isCorrect && (
// // //                         <Icon as={FiXCircle} boxSize={5} />
// // //                       )}
// // //                     </HStack>
// // //                   </Box>
// // //                 );
// // //               })}
// // //             </VStack>

// // //             <Divider my={6} />

// // //             {/* Explanation Section */}
// // //             <Box
// // //               bg="blue.50"
// // //               p={5}
// // //               borderRadius="lg"
// // //               border="1px solid"
// // //               borderColor="blue.200"
// // //             >
// // //               <Text fontWeight="bold" fontSize="md" mb={3} color="blue.900">
// // //                 📚 Explanation:
// // //               </Text>
// // //               <Text color="gray.700" lineHeight="tall">
// // //                 {question[currentquestion]?.explanation ||
// // //                   "No explanation available for this question."}
// // //               </Text>
// // //             </Box>
// // //           </Box>

// // //           {/* Bottom Navigation */}
// // //           <Flex
// // //             px={6}
// // //             py={3}
// // //             borderTop="1px solid"
// // //             borderColor="gray.200"
// // //             justify="space-between"
// // //             align="center"
// // //             bg="white"
// // //             flexShrink={0}
// // //           >
// // //             <Button
// // //               size="sm"
// // //               bg="transparent"
// // //               border="1px solid #01bfbd"
// // //               color="#01bfbd"
// // //               fontSize="12px"
// // //               fontWeight="500"
// // //               h="32px"
// // //               px={4}
// // //               _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// // //               onClick={handlePrevious}
// // //               isDisabled={currentquestion === 0}
// // //             >
// // //               Previous
// // //             </Button>

// // //             <Text fontSize="sm" color="gray.600" fontWeight="500">
// // //               {currentquestion + 1} / {question.length}
// // //             </Text>

// // //             <Button
// // //               size="sm"
// // //               bg="transparent"
// // //               border="1px solid #01bfbd"
// // //               color="#01bfbd"
// // //               fontSize="12px"
// // //               fontWeight="500"
// // //               h="32px"
// // //               px={4}
// // //               _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// // //               onClick={() => handleQuestion(null)}
// // //               isDisabled={currentquestion === question.length - 1}
// // //             >
// // //               Next
// // //             </Button>
// // //           </Flex>
// // //         </VStack>

// // //         {/* Sidebar - Desktop Only */}
// // //         {!isMobile && (
// // //           <Box
// // //             w="320px"
// // //             bg="#4285f4"
// // //             p={6}
// // //             borderLeft="1px solid"
// // //             borderColor="gray.200"
// // //             flexShrink={0}
// // //           >
// // //             <QuestionSidebar />
// // //           </Box>
// // //         )}
// // //       </Flex>

// // //       {/* Mobile Drawer */}
// // //       {isMobile && (
// // //         <>
// // //           <Button
// // //             position="fixed"
// // //             bottom="4"
// // //             right="4"
// // //             colorScheme="blue"
// // //             onClick={() => handleClick("xs")}
// // //             borderRadius="full"
// // //             w="56px"
// // //             h="56px"
// // //             shadow="lg"
// // //             zIndex={999}
// // //           >
// // //             <HamburgerIcon w={6} h={6} />
// // //           </Button>

// // //           <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="right">
// // //             <DrawerOverlay />
// // //             <DrawerContent bg="#4285f4">
// // //               <DrawerCloseButton color="white" />
// // //               <DrawerHeader
// // //                 color="white"
// // //                 borderBottom="1px solid rgba(255,255,255,0.2)"
// // //               >
// // //                 Test Review
// // //               </DrawerHeader>
// // //               <DrawerBody p={6}>
// // //                 <QuestionSidebar />
// // //               </DrawerBody>
// // //             </DrawerContent>
// // //           </Drawer>
// // //         </>
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // export default ReviewTest;

// // import React, { useEffect, useState } from "react";
// // import { BsFillJournalBookmarkFill } from "react-icons/bs";
// // import {
// //   Box,
// //   Button,
// //   Center,
// //   Container,
// //   Drawer,
// //   DrawerBody,
// //   DrawerCloseButton,
// //   DrawerContent,
// //   DrawerHeader,
// //   DrawerOverlay,
// //   Flex,
// //   Grid,
// //   HStack,
// //   Text,
// //   VStack,
// //   useDisclosure,
// //   useMediaQuery,
// //   Badge,
// //   Divider,
// //   Icon,
// // } from "@chakra-ui/react";
// // import { Link } from "react-router-dom";
// // import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// // import { HamburgerIcon } from "@chakra-ui/icons";
// // import ReportQuestionDropdown from "./ReportQuestionDropdown";
// // import { FiCheckCircle, FiXCircle, FiBookmark } from "react-icons/fi";

// // const ReviewTest = () => {
// //   const [question, setQuestion] = useState([]);
// //   const [score, setscore] = useState(null);
// //   const [category, setcategory] = useState(null);
// //   const [allAns, setallAnswer] = useState({});
// //   const [answeredQuestion, setAnsweredQuestion] = useState([]);
// //   const [notAnswer, setNotAnswer] = useState([]);
// //   const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
// //   const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
// //   const [currentquestion, setcurrentQuestion] = useState(0);
// //   const [isMobile] = useMediaQuery("(max-width: 768px)");
// //   const [size, setSize] = useState("");
// //   const { isOpen, onOpen, onClose } = useDisclosure();
// //   // track which questions are bookmarked in this session so the icon reacts
// //   const [bookmarkedSet, setBookmarkedSet] = useState(new Set());

// //   const handleQuestion = (con = null) => {
// //     if (con !== null) {
// //       setcurrentQuestion(con);
// //     } else {
// //       if (currentquestion < question.length - 1) {
// //         setcurrentQuestion(currentquestion + 1);
// //       }
// //     }
// //   };

// //   const handlePrevious = () => {
// //     if (currentquestion > 0) {
// //       setcurrentQuestion(currentquestion - 1);
// //     }
// //   };

// //   const handleClick = (newSize) => {
// //     setSize(newSize);
// //     onOpen();
// //   };

// //   useEffect(() => {
// //     const getData = () => {
// //       const data = getLocalStorage("test");
// //       if (data && data[0]) {
// //         setQuestion(data[0].questions || []);
// //         setscore(data[0].score);
// //         setcategory(data[0].category);
// //         setallAnswer(data[0].allAnswer || {});
// //         setAnsweredQuestion(data[0].answeredQuestion || []);
// //         setNotAnswer(data[0].notAnswer || []);
// //         setMarkedAndAnswer(data[0].markedAndAnswer || []);
// //         setMarkedNotAnswer(data[0].markedNotAnswer || []);
// //       }
// //     };
// //     getData();

// //     // build the set of already-bookmarked question texts so UI shows correctly on mount
// //     const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
// //     const flat = Object.values(allSaved).flat();
// //     setBookmarkedSet(new Set(flat.map((q) => q.qus)));
// //   }, []);

// //   // ---------------------------------------------------------------------------
// //   // UPDATED save() — stores questions grouped by subject key
// //   // localStorage key: "savedQuestionsBySubject"
// //   //   shape: { english: [qObj, ...], mathematics: [qObj, ...], ... }
// //   // "qusno" kept in sync as a flat array of question texts (duplicate guard)
// //   // ---------------------------------------------------------------------------
// //   const save = (quest) => {
// //     const newQuestion = question[quest];
// //     if (!newQuestion) return;

// //     // figure out which subject bucket this question belongs to
// //     const sub = (getLocalStorage("Subject") || "").toLowerCase();
// //     // map common Subject values → the card titles used in SaveQuestion
// //     const subjectKeyMap = {
// //       english: "english",
// //       eng: "english",
// //       mathematics: "mathematics",
// //       math: "mathematics",
// //       reasoning: "reasoning",
// //       "general studies": "general studies",
// //       gs: "general studies",
// //     };
// //     const subjectKey = subjectKeyMap[sub] || sub || "other";

// //     // load existing grouped data (new structure)
// //     const savedBySubject = getLocalStorage("savedQuestionsBySubject") || {};

// //     // ensure the bucket exists
// //     if (!savedBySubject[subjectKey]) {
// //       savedBySubject[subjectKey] = [];
// //     }

// //     // duplicate check inside that bucket
// //     const alreadyExists = savedBySubject[subjectKey].some(
// //       (q) => q.qus === newQuestion.qus,
// //     );
// //     if (alreadyExists) {
// //       alert("Question already bookmarked!");
// //       return;
// //     }

// //     // add question
// //     savedBySubject[subjectKey].push(newQuestion);
// //     setLocalStorage("savedQuestionsBySubject", savedBySubject);

// //     // keep legacy "qusno" flat array in sync (used nowhere critical but safe)
// //     const qusno = getLocalStorage("qusno") || [];
// //     if (!qusno.includes(newQuestion.qus)) {
// //       qusno.push(newQuestion.qus);
// //       setLocalStorage("qusno", qusno);
// //     }

// //     // update react state so bookmark button reacts immediately
// //     setBookmarkedSet((prev) => new Set(prev).add(newQuestion.qus));

// //     alert("Question bookmarked successfully!");
// //   };

// //   const isCorrectAnswer = (optionIndex) => {
// //     return question[currentquestion]?.answer - 1 === optionIndex;
// //   };

// //   const isUserAnswer = (option) => {
// //     return allAns[currentquestion] === option;
// //   };

// //   const getOptionBgColor = (option, index) => {
// //     const correct = isCorrectAnswer(index);
// //     const userSelected = isUserAnswer(option);

// //     if (correct && userSelected) {
// //       return "green.500";
// //     } else if (correct) {
// //       return "green.500";
// //     } else if (userSelected) {
// //       return "red.500";
// //     }
// //     return "white";
// //   };

// //   const getOptionTextColor = (option, index) => {
// //     const correct = isCorrectAnswer(index);
// //     const userSelected = isUserAnswer(option);

// //     if (correct || userSelected) {
// //       return "white";
// //     }
// //     return "gray.700";
// //   };

// //   // is current question already bookmarked?
// //   const isCurrentBookmarked =
// //     question[currentquestion] &&
// //     bookmarkedSet.has(question[currentquestion].qus);

// //   // Sidebar Component
// //   const QuestionSidebar = () => (
// //     <VStack spacing={4} align="stretch" h="100%">
// //       <Box>
// //         <Text fontSize="xl" fontWeight="bold" color="white">
// //           Test Review
// //         </Text>
// //       </Box>

// //       <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
// //         <VStack spacing={3} align="stretch">
// //           <HStack justify="space-between">
// //             <Text color="white" fontSize="sm">
// //               Marked
// //             </Text>
// //             <Center
// //               minW="28px"
// //               h="28px"
// //               bg="purple.500"
// //               color="white"
// //               borderRadius="full"
// //               fontSize="sm"
// //               fontWeight="600"
// //             >
// //               {markedNotAnswer.length}
// //             </Center>
// //           </HStack>

// //           <HStack justify="space-between">
// //             <Text color="white" fontSize="sm">
// //               Not visited
// //             </Text>
// //             <Center
// //               minW="28px"
// //               h="28px"
// //               bg="white"
// //               color="gray.600"
// //               border="1px solid"
// //               borderColor="gray.300"
// //               borderRadius="4px"
// //               fontSize="sm"
// //               fontWeight="600"
// //             >
// //               {question.length -
// //                 (markedAndAnswer.length +
// //                   markedNotAnswer.length +
// //                   answeredQuestion.length +
// //                   notAnswer.length)}
// //             </Center>
// //           </HStack>

// //           <HStack justify="space-between">
// //             <Text color="white" fontSize="sm">
// //               Answered
// //             </Text>
// //             <Center
// //               minW="28px"
// //               h="28px"
// //               bg="green.500"
// //               color="white"
// //               borderRadius="50% 50% 0 0"
// //               fontSize="sm"
// //               fontWeight="600"
// //             >
// //               {answeredQuestion.length}
// //             </Center>
// //           </HStack>

// //           <HStack justify="space-between">
// //             <Text color="white" fontSize="sm">
// //               Not Answered
// //             </Text>
// //             <Center
// //               minW="28px"
// //               h="28px"
// //               bg="red.500"
// //               color="white"
// //               borderRadius="0 0 50% 50%"
// //               fontSize="sm"
// //               fontWeight="600"
// //             >
// //               {notAnswer.length}
// //             </Center>
// //           </HStack>

// //           <HStack justify="space-between">
// //             <Text color="white" fontSize="sm">
// //               Marked & Answered
// //             </Text>
// //             <Center
// //               minW="28px"
// //               h="28px"
// //               bg="purple.500"
// //               color="white"
// //               borderRadius="full"
// //               fontSize="sm"
// //               fontWeight="600"
// //             >
// //               {markedAndAnswer.length}
// //             </Center>
// //           </HStack>
// //         </VStack>
// //       </Box>

// //       <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
// //         <Text color="white" fontSize="sm" mb={3}>
// //           Section: Elementary maths
// //         </Text>
// //       </Box>

// //       <Box
// //         flex="1"
// //         overflowY="auto"
// //         css={{
// //           "&::-webkit-scrollbar": {
// //             width: "4px",
// //           },
// //           "&::-webkit-scrollbar-track": {
// //             background: "rgba(255,255,255,0.1)",
// //           },
// //           "&::-webkit-scrollbar-thumb": {
// //             background: "rgba(255,255,255,0.3)",
// //             borderRadius: "2px",
// //           },
// //         }}
// //       >
// //         <Grid templateColumns="repeat(5, 1fr)" gap={3}>
// //           {question?.map((d, i) => (
// //             <Center
// //               key={i}
// //               w="100%"
// //               h="40px"
// //               bg={
// //                 markedNotAnswer.includes(i)
// //                   ? "purple.500"
// //                   : answeredQuestion.includes(i)
// //                     ? "green.500"
// //                     : notAnswer.includes(i)
// //                       ? "red.500"
// //                       : markedAndAnswer.includes(i)
// //                         ? "purple.500"
// //                         : "white"
// //               }
// //               color={
// //                 markedNotAnswer.includes(i) ||
// //                 answeredQuestion.includes(i) ||
// //                 notAnswer.includes(i) ||
// //                 markedAndAnswer.includes(i)
// //                   ? "white"
// //                   : "gray.600"
// //               }
// //               borderRadius={
// //                 markedAndAnswer.includes(i)
// //                   ? "full"
// //                   : markedNotAnswer.includes(i)
// //                     ? "full"
// //                     : answeredQuestion.includes(i)
// //                       ? "50% 50% 0 0"
// //                       : notAnswer.includes(i)
// //                         ? "0 0 50% 50%"
// //                         : "4px"
// //               }
// //               border="1px solid"
// //               borderColor={
// //                 markedNotAnswer.includes(i) ||
// //                 answeredQuestion.includes(i) ||
// //                 notAnswer.includes(i) ||
// //                 markedAndAnswer.includes(i)
// //                   ? "transparent"
// //                   : "gray.300"
// //               }
// //               cursor="pointer"
// //               onClick={() => handleQuestion(i)}
// //               transition="all 0.2s"
// //               _hover={{
// //                 transform: "scale(1.05)",
// //                 shadow: "md",
// //               }}
// //               fontSize="sm"
// //               fontWeight="600"
// //             >
// //               {markedAndAnswer.includes(i) ? <>{i + 1} ✓</> : i + 1}
// //             </Center>
// //           ))}
// //         </Grid>
// //       </Box>

// //       <VStack spacing={3} pt={4} borderTop="1px solid rgba(255,255,255,0.2)">
// //         <Link to="/" style={{ width: "100%" }}>
// //           <Button
// //             w="100%"
// //             bg="transparent"
// //             border="1px solid #01bfbd"
// //             color="#01bfbd"
// //             fontSize="12px"
// //             fontWeight="600"
// //             h="36px"
// //             _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// //           >
// //             Take More Tests
// //           </Button>
// //         </Link>
// //         <Link to="/test-result" style={{ width: "100%" }}>
// //           <Button
// //             w="100%"
// //             bg="transparent"
// //             border="1px solid #01bfbd"
// //             color="#01bfbd"
// //             fontSize="12px"
// //             fontWeight="600"
// //             h="36px"
// //             _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// //           >
// //             View Results
// //           </Button>
// //         </Link>
// //       </VStack>
// //     </VStack>
// //   );

// //   return (
// //     <Box
// //       h={{ base: "", md: "91vh", lg: "91vh" }}
// //       display="flex"
// //       flexDirection="column"
// //       bg="white"
// //     >
// //       {/* Header */}
// //       <Flex
// //         bg="#4285f4"
// //         color="white"
// //         px={{ base: 3, md: 6 }}
// //         py={3}
// //         align="center"
// //         justify="space-between"
// //         wrap="wrap"
// //         gap={4}
// //       >
// //         {/* LEFT SIDE */}
// //         <HStack spacing={4} align="center" flexWrap="wrap">
// //           <Text fontSize="sm" fontWeight="500">
// //             SECTIONS |
// //             <Box as="span" fontWeight="600" ml={1}>
// //               Elementary maths
// //             </Box>
// //           </Text>

// //           {/* Bookmark Button — colour flips when already saved */}
// //           <Button
// //             size="sm"
// //             leftIcon={<BsFillJournalBookmarkFill />}
// //             variant="outline"
// //             borderWidth="2px"
// //             borderColor={isCurrentBookmarked ? "#01bfbd" : "#c2e3e2"}
// //             color={isCurrentBookmarked ? "white" : "#aedbda"}
// //             fontSize="13px"
// //             fontWeight="600"
// //             h="36px"
// //             px={5}
// //             borderRadius="10px"
// //             bg={isCurrentBookmarked ? "#01bfbd" : "transparent"}
// //             _hover={{
// //               bg: "#01bfbd",
// //               color: "white",
// //             }}
// //             _active={{
// //               transform: "scale(0.97)",
// //             }}
// //             onClick={() => save(currentquestion)}
// //           >
// //             {isCurrentBookmarked ? "Bookmarked" : "Bookmark"}
// //           </Button>
// //         </HStack>

// //         {/* RIGHT SIDE */}
// //         <HStack spacing={3} align="center">
// //           <ReportQuestionDropdown />

// //           <Link to="/">
// //             {/* Reattempt Button */}
// //             <Button
// //               size="sm"
// //               variant="outline"
// //               borderWidth="2px"
// //               borderColor="#bee9e8"
// //               color="#bae1e0"
// //               fontSize="13px"
// //               fontWeight="600"
// //               h="36px"
// //               px={5}
// //               borderRadius="10px"
// //               bg="transparent"
// //               _hover={{
// //                 bg: "#01bfbd",
// //                 color: "white",
// //               }}
// //               _active={{
// //                 transform: "scale(0.97)",
// //               }}
// //             >
// //               Reattempt This Test
// //             </Button>
// //           </Link>
// //         </HStack>
// //       </Flex>

// //       {/* Main Content */}
// //       <Flex flex="1" overflow="hidden">
// //         {/* Question Area */}
// //         <VStack flex="1" spacing={0} align="stretch" overflow="hidden">
// //           {/* Question Number & Status */}
// //           <Box
// //             px={6}
// //             py={3}
// //             bg="white"
// //             borderBottom="1px solid"
// //             borderColor="gray.200"
// //           >
// //             <HStack justify="space-between">
// //               <Text fontWeight="600" fontSize="md">
// //                 Question no {currentquestion + 1}
// //               </Text>
// //               <HStack spacing={2}>
// //                 {isCorrectAnswer(
// //                   question[currentquestion]?.options.indexOf(
// //                     allAns[currentquestion],
// //                   ),
// //                 ) ? (
// //                   <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
// //                     <HStack spacing={1}>
// //                       <Icon as={FiCheckCircle} />
// //                       <Text>Correct</Text>
// //                     </HStack>
// //                   </Badge>
// //                 ) : allAns[currentquestion] ? (
// //                   <Badge colorScheme="red" fontSize="sm" px={3} py={1}>
// //                     <HStack spacing={1}>
// //                       <Icon as={FiXCircle} />
// //                       <Text>Incorrect</Text>
// //                     </HStack>
// //                   </Badge>
// //                 ) : (
// //                   <Badge colorScheme="gray" fontSize="sm" px={3} py={1}>
// //                     Not Answered
// //                   </Badge>
// //                 )}
// //               </HStack>
// //             </HStack>
// //           </Box>

// //           {/* Question Content */}
// //           <Box
// //             flex="1"
// //             overflow="auto"
// //             px={6}
// //             py={4}
// //             bg="white"
// //             css={{
// //               "&::-webkit-scrollbar": {
// //                 width: "8px",
// //               },
// //               "&::-webkit-scrollbar-track": {
// //                 background: "#f1f1f1",
// //               },
// //               "&::-webkit-scrollbar-thumb": {
// //                 background: "#888",
// //                 borderRadius: "4px",
// //               },
// //             }}
// //           >
// //             <Text mb={6} fontSize="md" lineHeight="tall" fontWeight="500">
// //               {question[currentquestion]?.qus}
// //             </Text>

// //             <VStack align="stretch" spacing={3} mb={6}>
// //               {question[currentquestion]?.options.map((d, i) => {
// //                 const bgColor = getOptionBgColor(d, i);
// //                 const textColor = getOptionTextColor(d, i);
// //                 const isCorrect = isCorrectAnswer(i);
// //                 const isSelected = isUserAnswer(d);

// //                 return (
// //                   <Box
// //                     key={i}
// //                     p={4}
// //                     borderRadius="md"
// //                     border="2px solid"
// //                     borderColor={bgColor === "white" ? "gray.200" : bgColor}
// //                     bg={bgColor}
// //                     color={textColor}
// //                     position="relative"
// //                   >
// //                     <HStack justify="space-between">
// //                       <Text
// //                         fontWeight={isCorrect || isSelected ? "600" : "400"}
// //                       >
// //                         {d}
// //                       </Text>
// //                       {isCorrect && <Icon as={FiCheckCircle} boxSize={5} />}
// //                       {isSelected && !isCorrect && (
// //                         <Icon as={FiXCircle} boxSize={5} />
// //                       )}
// //                     </HStack>
// //                   </Box>
// //                 );
// //               })}
// //             </VStack>

// //             <Divider my={6} />

// //             {/* Explanation Section */}
// //             <Box
// //               bg="blue.50"
// //               p={5}
// //               borderRadius="lg"
// //               border="1px solid"
// //               borderColor="blue.200"
// //             >
// //               <Text fontWeight="bold" fontSize="md" mb={3} color="blue.900">
// //                 📚 Explanation:
// //               </Text>
// //               <Text color="gray.700" lineHeight="tall">
// //                 {question[currentquestion]?.explanation ||
// //                   "No explanation available for this question."}
// //               </Text>
// //             </Box>
// //           </Box>

// //           {/* Bottom Navigation */}
// //           <Flex
// //             px={6}
// //             py={3}
// //             borderTop="1px solid"
// //             borderColor="gray.200"
// //             justify="space-between"
// //             align="center"
// //             bg="white"
// //             flexShrink={0}
// //           >
// //             <Button
// //               size="sm"
// //               bg="transparent"
// //               border="1px solid #01bfbd"
// //               color="#01bfbd"
// //               fontSize="12px"
// //               fontWeight="500"
// //               h="32px"
// //               px={4}
// //               _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// //               onClick={handlePrevious}
// //               isDisabled={currentquestion === 0}
// //             >
// //               Previous
// //             </Button>

// //             <Text fontSize="sm" color="gray.600" fontWeight="500">
// //               {currentquestion + 1} / {question.length}
// //             </Text>

// //             <Button
// //               size="sm"
// //               bg="transparent"
// //               border="1px solid #01bfbd"
// //               color="#01bfbd"
// //               fontSize="12px"
// //               fontWeight="500"
// //               h="32px"
// //               px={4}
// //               _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
// //               onClick={() => handleQuestion(null)}
// //               isDisabled={currentquestion === question.length - 1}
// //             >
// //               Next
// //             </Button>
// //           </Flex>
// //         </VStack>

// //         {/* Sidebar - Desktop Only */}
// //         {!isMobile && (
// //           <Box
// //             w="320px"
// //             bg="#4285f4"
// //             p={6}
// //             borderLeft="1px solid"
// //             borderColor="gray.200"
// //             flexShrink={0}
// //           >
// //             <QuestionSidebar />
// //           </Box>
// //         )}
// //       </Flex>

// //       {/* Mobile Drawer */}
// //       {isMobile && (
// //         <>
// //           <Button
// //             position="fixed"
// //             bottom="4"
// //             right="4"
// //             colorScheme="blue"
// //             onClick={() => handleClick("xs")}
// //             borderRadius="full"
// //             w="56px"
// //             h="56px"
// //             shadow="lg"
// //             zIndex={999}
// //           >
// //             <HamburgerIcon w={6} h={6} />
// //           </Button>

// //           <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="right">
// //             <DrawerOverlay />
// //             <DrawerContent bg="#4285f4">
// //               <DrawerCloseButton color="white" />
// //               <DrawerHeader
// //                 color="white"
// //                 borderBottom="1px solid rgba(255,255,255,0.2)"
// //               >
// //                 Test Review
// //               </DrawerHeader>
// //               <DrawerBody p={6}>
// //                 <QuestionSidebar />
// //               </DrawerBody>
// //             </DrawerContent>
// //           </Drawer>
// //         </>
// //       )}
// //     </Box>
// //   );
// // };

// // export default ReviewTest;

// import React, { useEffect, useState } from "react";
// import { BsFillJournalBookmarkFill } from "react-icons/bs";
// import {
//   Box,
//   Button,
//   Center,
//   Container,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   Flex,
//   Grid,
//   HStack,
//   Text,
//   VStack,
//   useDisclosure,
//   useMediaQuery,
//   Badge,
//   Divider,
//   Icon,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import ReportQuestionDropdown from "./ReportQuestionDropdown";
// import { FiCheckCircle, FiXCircle, FiBookmark } from "react-icons/fi";

// const ReviewTest = () => {
//   const [question, setQuestion] = useState([]);
//   const [score, setscore] = useState(null);
//   const [category, setcategory] = useState(null);
//   const [allAns, setallAnswer] = useState({});
//   const [answeredQuestion, setAnsweredQuestion] = useState([]);
//   const [notAnswer, setNotAnswer] = useState([]);
//   const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
//   const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
//   const [currentquestion, setcurrentQuestion] = useState(0);
//   const [isMobile] = useMediaQuery("(max-width: 768px)");
//   const [size, setSize] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   // track which questions are bookmarked in this session so the icon reacts
//   const [bookmarkedSet, setBookmarkedSet] = useState(new Set());

//   const handleQuestion = (con = null) => {
//     if (con !== null) {
//       setcurrentQuestion(con);
//     } else {
//       if (currentquestion < question.length - 1) {
//         setcurrentQuestion(currentquestion + 1);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentquestion > 0) {
//       setcurrentQuestion(currentquestion - 1);
//     }
//   };

//   const handleClick = (newSize) => {
//     setSize(newSize);
//     onOpen();
//   };

//   useEffect(() => {
//     const getData = () => {
//       const data = getLocalStorage("test");
//       if (data && data[0]) {
//         setQuestion(data[0].questions || []);
//         setscore(data[0].score);
//         setcategory(data[0].category);
//         setallAnswer(data[0].allAnswer || {});
//         setAnsweredQuestion(data[0].answeredQuestion || []);
//         setNotAnswer(data[0].notAnswer || []);
//         setMarkedAndAnswer(data[0].markedAndAnswer || []);
//         setMarkedNotAnswer(data[0].markedNotAnswer || []);
//       }
//     };
//     getData();

//     // build the set of already-bookmarked question texts so UI shows correctly on mount
//     const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
//     const flat = Object.values(allSaved).flat();
//     setBookmarkedSet(new Set(flat.map((q) => q.qus)));
//   }, []);

//   // ---------------------------------------------------------------------------
//   // UPDATED save() — stores questions grouped by subject key
//   // localStorage key: "savedQuestionsBySubject"
//   //   shape: { english: [qObj, ...], mathematics: [qObj, ...], ... }
//   // "qusno" kept in sync as a flat array of question texts (duplicate guard)
//   // ---------------------------------------------------------------------------
//   const save = (quest) => {
//     const newQuestion = question[quest];
//     if (!newQuestion) return;

//     // figure out which subject bucket this question belongs to
//     const sub = (getLocalStorage("Subject") || "").toLowerCase();
//     // map common Subject values → the card titles used in SaveQuestion
//     const subjectKeyMap = {
//       english: "english",
//       eng: "english",
//       mathematics: "mathematics",
//       math: "mathematics",
//       reasoning: "reasoning",
//       "general studies": "general studies",
//       gs: "general studies",
//       vocabulary: "vocabulary",
//       vocab: "vocabulary",
//     };
//     const subjectKey = subjectKeyMap[sub] || sub || "other";

//     // load existing grouped data (new structure)
//     const savedBySubject = getLocalStorage("savedQuestionsBySubject") || {};

//     // ensure the bucket exists
//     if (!savedBySubject[subjectKey]) {
//       savedBySubject[subjectKey] = [];
//     }

//     // duplicate check inside that bucket
//     const alreadyExists = savedBySubject[subjectKey].some(
//       (q) => q.qus === newQuestion.qus,
//     );
//     if (alreadyExists) {
//       alert("Question already bookmarked!");
//       return;
//     }

//     // add question
//     savedBySubject[subjectKey].push(newQuestion);
//     setLocalStorage("savedQuestionsBySubject", savedBySubject);

//     // keep legacy "qusno" flat array in sync (used nowhere critical but safe)
//     const qusno = getLocalStorage("qusno") || [];
//     if (!qusno.includes(newQuestion.qus)) {
//       qusno.push(newQuestion.qus);
//       setLocalStorage("qusno", qusno);
//     }

//     // update react state so bookmark button reacts immediately
//     setBookmarkedSet((prev) => new Set(prev).add(newQuestion.qus));

//     alert("Question bookmarked successfully!");
//   };

//   const isCorrectAnswer = (optionIndex) => {
//     return question[currentquestion]?.answer - 1 === optionIndex;
//   };

//   const isUserAnswer = (option) => {
//     return allAns[currentquestion] === option;
//   };

//   const getOptionBgColor = (option, index) => {
//     const correct = isCorrectAnswer(index);
//     const userSelected = isUserAnswer(option);

//     if (correct && userSelected) {
//       return "green.500";
//     } else if (correct) {
//       return "green.500";
//     } else if (userSelected) {
//       return "red.500";
//     }
//     return "white";
//   };

//   const getOptionTextColor = (option, index) => {
//     const correct = isCorrectAnswer(index);
//     const userSelected = isUserAnswer(option);

//     if (correct || userSelected) {
//       return "white";
//     }
//     return "gray.700";
//   };

//   // is current question already bookmarked?
//   const isCurrentBookmarked =
//     question[currentquestion] &&
//     bookmarkedSet.has(question[currentquestion].qus);

//   // Sidebar Component
//   const QuestionSidebar = () => (
//     <VStack spacing={4} align="stretch" h="100%">
//       <Box>
//         <Text fontSize="xl" fontWeight="bold" color="white">
//           Test Review
//         </Text>
//       </Box>

//       <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
//         <VStack spacing={3} align="stretch">
//           <HStack justify="space-between">
//             <Text color="white" fontSize="sm">
//               Marked
//             </Text>
//             <Center
//               minW="28px"
//               h="28px"
//               bg="purple.500"
//               color="white"
//               borderRadius="full"
//               fontSize="sm"
//               fontWeight="600"
//             >
//               {markedNotAnswer.length}
//             </Center>
//           </HStack>

//           <HStack justify="space-between">
//             <Text color="white" fontSize="sm">
//               Not visited
//             </Text>
//             <Center
//               minW="28px"
//               h="28px"
//               bg="white"
//               color="gray.600"
//               border="1px solid"
//               borderColor="gray.300"
//               borderRadius="4px"
//               fontSize="sm"
//               fontWeight="600"
//             >
//               {question.length -
//                 (markedAndAnswer.length +
//                   markedNotAnswer.length +
//                   answeredQuestion.length +
//                   notAnswer.length)}
//             </Center>
//           </HStack>

//           <HStack justify="space-between">
//             <Text color="white" fontSize="sm">
//               Answered
//             </Text>
//             <Center
//               minW="28px"
//               h="28px"
//               bg="green.500"
//               color="white"
//               borderRadius="50% 50% 0 0"
//               fontSize="sm"
//               fontWeight="600"
//             >
//               {answeredQuestion.length}
//             </Center>
//           </HStack>

//           <HStack justify="space-between">
//             <Text color="white" fontSize="sm">
//               Not Answered
//             </Text>
//             <Center
//               minW="28px"
//               h="28px"
//               bg="red.500"
//               color="white"
//               borderRadius="0 0 50% 50%"
//               fontSize="sm"
//               fontWeight="600"
//             >
//               {notAnswer.length}
//             </Center>
//           </HStack>

//           <HStack justify="space-between">
//             <Text color="white" fontSize="sm">
//               Marked & Answered
//             </Text>
//             <Center
//               minW="28px"
//               h="28px"
//               bg="purple.500"
//               color="white"
//               borderRadius="full"
//               fontSize="sm"
//               fontWeight="600"
//             >
//               {markedAndAnswer.length}
//             </Center>
//           </HStack>
//         </VStack>
//       </Box>

//       <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
//         <Text color="white" fontSize="sm" mb={3}>
//           Section: Elementary maths
//         </Text>
//       </Box>

//       <Box
//         flex="1"
//         overflowY="auto"
//         css={{
//           "&::-webkit-scrollbar": {
//             width: "4px",
//           },
//           "&::-webkit-scrollbar-track": {
//             background: "rgba(255,255,255,0.1)",
//           },
//           "&::-webkit-scrollbar-thumb": {
//             background: "rgba(255,255,255,0.3)",
//             borderRadius: "2px",
//           },
//         }}
//       >
//         <Grid templateColumns="repeat(5, 1fr)" gap={3}>
//           {question?.map((d, i) => (
//             <Center
//               key={i}
//               w="100%"
//               h="40px"
//               bg={
//                 markedNotAnswer.includes(i)
//                   ? "purple.500"
//                   : answeredQuestion.includes(i)
//                     ? "green.500"
//                     : notAnswer.includes(i)
//                       ? "red.500"
//                       : markedAndAnswer.includes(i)
//                         ? "purple.500"
//                         : "white"
//               }
//               color={
//                 markedNotAnswer.includes(i) ||
//                 answeredQuestion.includes(i) ||
//                 notAnswer.includes(i) ||
//                 markedAndAnswer.includes(i)
//                   ? "white"
//                   : "gray.600"
//               }
//               borderRadius={
//                 markedAndAnswer.includes(i)
//                   ? "full"
//                   : markedNotAnswer.includes(i)
//                     ? "full"
//                     : answeredQuestion.includes(i)
//                       ? "50% 50% 0 0"
//                       : notAnswer.includes(i)
//                         ? "0 0 50% 50%"
//                         : "4px"
//               }
//               border="1px solid"
//               borderColor={
//                 markedNotAnswer.includes(i) ||
//                 answeredQuestion.includes(i) ||
//                 notAnswer.includes(i) ||
//                 markedAndAnswer.includes(i)
//                   ? "transparent"
//                   : "gray.300"
//               }
//               cursor="pointer"
//               onClick={() => handleQuestion(i)}
//               transition="all 0.2s"
//               _hover={{
//                 transform: "scale(1.05)",
//                 shadow: "md",
//               }}
//               fontSize="sm"
//               fontWeight="600"
//             >
//               {markedAndAnswer.includes(i) ? <>{i + 1} ✓</> : i + 1}
//             </Center>
//           ))}
//         </Grid>
//       </Box>

//       <VStack spacing={3} pt={4} borderTop="1px solid rgba(255,255,255,0.2)">
//         <Link to="/" style={{ width: "100%" }}>
//           <Button
//             w="100%"
//             bg="transparent"
//             border="1px solid #01bfbd"
//             color="#01bfbd"
//             fontSize="12px"
//             fontWeight="600"
//             h="36px"
//             _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
//           >
//             Take More Tests
//           </Button>
//         </Link>
//         <Link to="/test-result" style={{ width: "100%" }}>
//           <Button
//             w="100%"
//             bg="transparent"
//             border="1px solid #01bfbd"
//             color="#01bfbd"
//             fontSize="12px"
//             fontWeight="600"
//             h="36px"
//             _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
//           >
//             View Results
//           </Button>
//         </Link>
//       </VStack>
//     </VStack>
//   );

//   return (
//     <Box
//       h={{ base: "", md: "91vh", lg: "91vh" }}
//       display="flex"
//       flexDirection="column"
//       bg="white"
//     >
//       {/* Header */}
//       <Flex
//         bg="#4285f4"
//         color="white"
//         px={{ base: 3, md: 6 }}
//         py={3}
//         align="center"
//         justify="space-between"
//         wrap="wrap"
//         gap={4}
//       >
//         {/* LEFT SIDE */}
//         <HStack spacing={4} align="center" flexWrap="wrap">
//           <Text fontSize="sm" fontWeight="500">
//             SECTIONS |
//             <Box as="span" fontWeight="600" ml={1}>
//               Elementary maths
//             </Box>
//           </Text>

//           {/* Bookmark Button — colour flips when already saved */}
//           <Button
//             size="sm"
//             leftIcon={<BsFillJournalBookmarkFill />}
//             variant="outline"
//             borderWidth="2px"
//             borderColor={isCurrentBookmarked ? "#01bfbd" : "#c2e3e2"}
//             color={isCurrentBookmarked ? "white" : "#aedbda"}
//             fontSize="13px"
//             fontWeight="600"
//             h="36px"
//             px={5}
//             borderRadius="10px"
//             bg={isCurrentBookmarked ? "#01bfbd" : "transparent"}
//             _hover={{
//               bg: "#01bfbd",
//               color: "white",
//             }}
//             _active={{
//               transform: "scale(0.97)",
//             }}
//             onClick={() => save(currentquestion)}
//           >
//             {isCurrentBookmarked ? "Bookmarked" : "Bookmark"}
//           </Button>
//         </HStack>

//         {/* RIGHT SIDE */}
//         <HStack spacing={3} align="center">
//           <ReportQuestionDropdown />

//           <Link to="/">
//             {/* Reattempt Button */}
//             <Button
//               size="sm"
//               variant="outline"
//               borderWidth="2px"
//               borderColor="#bee9e8"
//               color="#bae1e0"
//               fontSize="13px"
//               fontWeight="600"
//               h="36px"
//               px={5}
//               borderRadius="10px"
//               bg="transparent"
//               _hover={{
//                 bg: "#01bfbd",
//                 color: "white",
//               }}
//               _active={{
//                 transform: "scale(0.97)",
//               }}
//             >
//               Reattempt This Test
//             </Button>
//           </Link>
//         </HStack>
//       </Flex>

//       {/* Main Content */}
//       <Flex flex="1" overflow="hidden">
//         {/* Question Area */}
//         <VStack flex="1" spacing={0} align="stretch" overflow="hidden">
//           {/* Question Number & Status */}
//           <Box
//             px={6}
//             py={3}
//             bg="white"
//             borderBottom="1px solid"
//             borderColor="gray.200"
//           >
//             <HStack justify="space-between">
//               <Text fontWeight="600" fontSize="md">
//                 Question no {currentquestion + 1}
//               </Text>
//               <HStack spacing={2}>
//                 {isCorrectAnswer(
//                   question[currentquestion]?.options.indexOf(
//                     allAns[currentquestion],
//                   ),
//                 ) ? (
//                   <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
//                     <HStack spacing={1}>
//                       <Icon as={FiCheckCircle} />
//                       <Text>Correct</Text>
//                     </HStack>
//                   </Badge>
//                 ) : allAns[currentquestion] ? (
//                   <Badge colorScheme="red" fontSize="sm" px={3} py={1}>
//                     <HStack spacing={1}>
//                       <Icon as={FiXCircle} />
//                       <Text>Incorrect</Text>
//                     </HStack>
//                   </Badge>
//                 ) : (
//                   <Badge colorScheme="gray" fontSize="sm" px={3} py={1}>
//                     Not Answered
//                   </Badge>
//                 )}
//               </HStack>
//             </HStack>
//           </Box>

//           {/* Question Content */}
//           <Box
//             flex="1"
//             overflow="auto"
//             px={6}
//             py={4}
//             bg="white"
//             css={{
//               "&::-webkit-scrollbar": {
//                 width: "8px",
//               },
//               "&::-webkit-scrollbar-track": {
//                 background: "#f1f1f1",
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 background: "#888",
//                 borderRadius: "4px",
//               },
//             }}
//           >
//             <Text mb={6} fontSize="md" lineHeight="tall" fontWeight="500">
//               {question[currentquestion]?.qus}
//             </Text>

//             <VStack align="stretch" spacing={3} mb={6}>
//               {question[currentquestion]?.options.map((d, i) => {
//                 const bgColor = getOptionBgColor(d, i);
//                 const textColor = getOptionTextColor(d, i);
//                 const isCorrect = isCorrectAnswer(i);
//                 const isSelected = isUserAnswer(d);

//                 return (
//                   <Box
//                     key={i}
//                     p={4}
//                     borderRadius="md"
//                     border="2px solid"
//                     borderColor={bgColor === "white" ? "gray.200" : bgColor}
//                     bg={bgColor}
//                     color={textColor}
//                     position="relative"
//                   >
//                     <HStack justify="space-between">
//                       <Text
//                         fontWeight={isCorrect || isSelected ? "600" : "400"}
//                       >
//                         {d}
//                       </Text>
//                       {isCorrect && <Icon as={FiCheckCircle} boxSize={5} />}
//                       {isSelected && !isCorrect && (
//                         <Icon as={FiXCircle} boxSize={5} />
//                       )}
//                     </HStack>
//                   </Box>
//                 );
//               })}
//             </VStack>

//             <Divider my={6} />

//             {/* Explanation Section */}
//             <Box
//               bg="blue.50"
//               p={5}
//               borderRadius="lg"
//               border="1px solid"
//               borderColor="blue.200"
//             >
//               <Text fontWeight="bold" fontSize="md" mb={3} color="blue.900">
//                 📚 Explanation:
//               </Text>
//               <Text color="gray.700" lineHeight="tall">
//                 {question[currentquestion]?.explanation ||
//                   "No explanation available for this question."}
//               </Text>
//             </Box>
//           </Box>

//           {/* Bottom Navigation */}
//           <Flex
//             px={6}
//             py={3}
//             borderTop="1px solid"
//             borderColor="gray.200"
//             justify="space-between"
//             align="center"
//             bg="white"
//             flexShrink={0}
//           >
//             <Button
//               size="sm"
//               bg="transparent"
//               border="1px solid #01bfbd"
//               color="#01bfbd"
//               fontSize="12px"
//               fontWeight="500"
//               h="32px"
//               px={4}
//               _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
//               onClick={handlePrevious}
//               isDisabled={currentquestion === 0}
//             >
//               Previous
//             </Button>

//             <Text fontSize="sm" color="gray.600" fontWeight="500">
//               {currentquestion + 1} / {question.length}
//             </Text>

//             <Button
//               size="sm"
//               bg="transparent"
//               border="1px solid #01bfbd"
//               color="#01bfbd"
//               fontSize="12px"
//               fontWeight="500"
//               h="32px"
//               px={4}
//               _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
//               onClick={() => handleQuestion(null)}
//               isDisabled={currentquestion === question.length - 1}
//             >
//               Next
//             </Button>
//           </Flex>
//         </VStack>

//         {/* Sidebar - Desktop Only */}
//         {!isMobile && (
//           <Box
//             w="320px"
//             bg="#4285f4"
//             p={6}
//             borderLeft="1px solid"
//             borderColor="gray.200"
//             flexShrink={0}
//           >
//             <QuestionSidebar />
//           </Box>
//         )}
//       </Flex>

//       {/* Mobile Drawer */}
//       {isMobile && (
//         <>
//           <Button
//             position="fixed"
//             bottom="4"
//             right="4"
//             colorScheme="blue"
//             onClick={() => handleClick("xs")}
//             borderRadius="full"
//             w="56px"
//             h="56px"
//             shadow="lg"
//             zIndex={999}
//           >
//             <HamburgerIcon w={6} h={6} />
//           </Button>

//           <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="right">
//             <DrawerOverlay />
//             <DrawerContent bg="#4285f4">
//               <DrawerCloseButton color="white" />
//               <DrawerHeader
//                 color="white"
//                 borderBottom="1px solid rgba(255,255,255,0.2)"
//               >
//                 Test Review
//               </DrawerHeader>
//               <DrawerBody p={6}>
//                 <QuestionSidebar />
//               </DrawerBody>
//             </DrawerContent>
//           </Drawer>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ReviewTest;

import React, { useEffect, useState } from "react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import {
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
  Badge,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { HamburgerIcon } from "@chakra-ui/icons";
import ReportQuestionDropdown from "./ReportQuestionDropdown";
import { FiCheckCircle, FiXCircle, FiBookmark } from "react-icons/fi";

const ReviewTest = () => {
  const [question, setQuestion] = useState([]);
  const [score, setscore] = useState(null);
  const [category, setcategory] = useState(null);
  const [allAns, setallAnswer] = useState({});
  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const [notAnswer, setNotAnswer] = useState([]);
  const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
  const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
  const [currentquestion, setcurrentQuestion] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [size, setSize] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());

  const handleQuestion = (con = null) => {
    if (con !== null) {
      setcurrentQuestion(con);
    } else {
      if (currentquestion < question.length - 1) {
        setcurrentQuestion(currentquestion + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentquestion > 0) {
      setcurrentQuestion(currentquestion - 1);
    }
  };

  const handleClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  useEffect(() => {
    const data = getLocalStorage("test");
    if (data && data[0]) {
      setQuestion(data[0].questions || []);
      setscore(data[0].score);
      setcategory(data[0].category);
      setallAnswer(data[0].allAnswer || {});
      setAnsweredQuestion(data[0].answeredQuestion || []);
      setNotAnswer(data[0].notAnswer || []);
      setMarkedAndAnswer(data[0].markedAndAnswer || []);
      setMarkedNotAnswer(data[0].markedNotAnswer || []);
    }

    const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
    const flat = Object.values(allSaved).flat();
    setBookmarkedSet(new Set(flat.map((q) => q.qus)));
  }, []);

  const save = (quest) => {
    const newQuestion = question[quest];
    if (!newQuestion) return;

    const sub = (getLocalStorage("Subject") || "").toLowerCase();
    const subjectKeyMap = {
      english: "english",
      eng: "english",
      mathematics: "mathematics",
      math: "mathematics",
      reasoning: "reasoning",
      "general studies": "general studies",
      gs: "general studies",
      vocabulary: "vocabulary",
      vocab: "vocabulary",
    };
    const subjectKey = subjectKeyMap[sub] || sub || "other";

    const savedBySubject = getLocalStorage("savedQuestionsBySubject") || {};
    if (!savedBySubject[subjectKey]) savedBySubject[subjectKey] = [];

    const alreadyExists = savedBySubject[subjectKey].some(
      (q) => q.qus === newQuestion.qus,
    );
    if (alreadyExists) {
      alert("Question already bookmarked!");
      return;
    }

    savedBySubject[subjectKey].push(newQuestion);
    setLocalStorage("savedQuestionsBySubject", savedBySubject);

    const qusno = getLocalStorage("qusno") || [];
    if (!qusno.includes(newQuestion.qus)) {
      qusno.push(newQuestion.qus);
      setLocalStorage("qusno", qusno);
    }

    setBookmarkedSet((prev) => new Set(prev).add(newQuestion.qus));
    alert("Question bookmarked successfully!");
  };

  const isCorrectAnswer = (optionIndex) =>
    question[currentquestion]?.answer - 1 === optionIndex;

  const isUserAnswer = (option) => allAns[currentquestion] === option;

  const getOptionBgColor = (option, index) => {
    const correct = isCorrectAnswer(index);
    const userSelected = isUserAnswer(option);
    if (correct) return "green.500";
    if (userSelected) return "red.500";
    return "white";
  };

  const getOptionTextColor = (option, index) => {
    const correct = isCorrectAnswer(index);
    const userSelected = isUserAnswer(option);
    if (correct || userSelected) return "white";
    return "gray.700";
  };

  const isCurrentBookmarked =
    question[currentquestion] &&
    bookmarkedSet.has(question[currentquestion].qus);

  const QuestionSidebar = () => (
    <VStack spacing={4} align="stretch" h="100%">
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="white">
          Test Review
        </Text>
      </Box>

      <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <Text color="white" fontSize="sm">
              Marked
            </Text>
            <Center
              minW="28px"
              h="28px"
              bg="purple.500"
              color="white"
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
            >
              {markedNotAnswer.length}
            </Center>
          </HStack>

          <HStack justify="space-between">
            <Text color="white" fontSize="sm">
              Not visited
            </Text>
            <Center
              minW="28px"
              h="28px"
              bg="white"
              color="gray.600"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="4px"
              fontSize="sm"
              fontWeight="600"
            >
              {question.length -
                (markedAndAnswer.length +
                  markedNotAnswer.length +
                  answeredQuestion.length +
                  notAnswer.length)}
            </Center>
          </HStack>

          <HStack justify="space-between">
            <Text color="white" fontSize="sm">
              Answered
            </Text>
            <Center
              minW="28px"
              h="28px"
              bg="green.500"
              color="white"
              borderRadius="50% 50% 0 0"
              fontSize="sm"
              fontWeight="600"
            >
              {answeredQuestion.length}
            </Center>
          </HStack>

          <HStack justify="space-between">
            <Text color="white" fontSize="sm">
              Not Answered
            </Text>
            <Center
              minW="28px"
              h="28px"
              bg="red.500"
              color="white"
              borderRadius="0 0 50% 50%"
              fontSize="sm"
              fontWeight="600"
            >
              {notAnswer.length}
            </Center>
          </HStack>

          <HStack justify="space-between">
            <Text color="white" fontSize="sm">
              Marked & Answered
            </Text>
            <Center
              minW="28px"
              h="28px"
              bg="purple.500"
              color="white"
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
            >
              {markedAndAnswer.length}
            </Center>
          </HStack>
        </VStack>
      </Box>

      <Box
        flex="1"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.1)" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: "2px",
          },
        }}
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={3}>
          {question?.map((d, i) => (
            <Center
              key={i}
              w="100%"
              h="40px"
              bg={
                markedNotAnswer.includes(i)
                  ? "purple.500"
                  : answeredQuestion.includes(i)
                    ? "green.500"
                    : notAnswer.includes(i)
                      ? "red.500"
                      : markedAndAnswer.includes(i)
                        ? "purple.500"
                        : "white"
              }
              color={
                markedNotAnswer.includes(i) ||
                answeredQuestion.includes(i) ||
                notAnswer.includes(i) ||
                markedAndAnswer.includes(i)
                  ? "white"
                  : "gray.600"
              }
              borderRadius={
                markedAndAnswer.includes(i) || markedNotAnswer.includes(i)
                  ? "full"
                  : answeredQuestion.includes(i)
                    ? "50% 50% 0 0"
                    : notAnswer.includes(i)
                      ? "0 0 50% 50%"
                      : "4px"
              }
              border="1px solid"
              borderColor={
                markedNotAnswer.includes(i) ||
                answeredQuestion.includes(i) ||
                notAnswer.includes(i) ||
                markedAndAnswer.includes(i)
                  ? "transparent"
                  : "gray.300"
              }
              cursor="pointer"
              onClick={() => handleQuestion(i)}
              transition="all 0.2s"
              _hover={{ transform: "scale(1.05)", shadow: "md" }}
              fontSize="sm"
              fontWeight="600"
            >
              {markedAndAnswer.includes(i) ? <>{i + 1} ✓</> : i + 1}
            </Center>
          ))}
        </Grid>
      </Box>

      <VStack spacing={3} pt={4} borderTop="1px solid rgba(255,255,255,0.2)">
        <Link to="/" style={{ width: "100%" }}>
          <Button
            w="100%"
            bg="transparent"
            border="1px solid #01bfbd"
            color="#01bfbd"
            fontSize="12px"
            fontWeight="600"
            h="36px"
            _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
          >
            Take More Tests
          </Button>
        </Link>
        <Link to="/test-result" style={{ width: "100%" }}>
          <Button
            w="100%"
            bg="transparent"
            border="1px solid #01bfbd"
            color="#01bfbd"
            fontSize="12px"
            fontWeight="600"
            h="36px"
            _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
          >
            View Results
          </Button>
        </Link>
      </VStack>
    </VStack>
  );

  return (
    <Box
      h={{ base: "", md: "91vh", lg: "91vh" }}
      display="flex"
      flexDirection="column"
      bg="white"
    >
      {/* Header */}
      <Flex
        bg="#4285f4"
        color="white"
        px={{ base: 3, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={4}
      >
        <HStack spacing={4} align="center" flexWrap="wrap">
          <Text fontSize="sm" fontWeight="500">
            SECTIONS |{" "}
            <Box as="span" fontWeight="600">
              {category || "Test"}
            </Box>
          </Text>

          <Button
            size="sm"
            leftIcon={<BsFillJournalBookmarkFill />}
            variant="outline"
            borderWidth="2px"
            borderColor={isCurrentBookmarked ? "#01bfbd" : "#c2e3e2"}
            color={isCurrentBookmarked ? "white" : "#aedbda"}
            bg={isCurrentBookmarked ? "rgba(1,191,189,0.25)" : "transparent"}
            fontSize="12px"
            fontWeight="600"
            h="36px"
            px={4}
            borderRadius="10px"
            _hover={{ bg: "rgba(1, 191, 189, 0.15)", color: "white" }}
            onClick={() => save(currentquestion)}
          >
            {isCurrentBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </HStack>

        <HStack spacing={3} align="center">
          <ReportQuestionDropdown />
          <Link to="/">
            <Button
              size="sm"
              variant="outline"
              borderWidth="2px"
              borderColor="#bee9e8"
              color="#bae1e0"
              fontSize="13px"
              fontWeight="600"
              h="36px"
              px={5}
              borderRadius="10px"
              bg="transparent"
              _hover={{ bg: "#01bfbd", color: "white" }}
              _active={{ transform: "scale(0.97)" }}
            >
              Reattempt This Test
            </Button>
          </Link>
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex flex="1" overflow="hidden">
        {/* Question Area */}
        <VStack flex="1" spacing={0} align="stretch" overflow="hidden">
          {/* Question Number & Status */}
          <Box
            px={6}
            py={3}
            bg="white"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            <HStack justify="space-between">
              <Text fontWeight="600" fontSize="md">
                Question no {currentquestion + 1}
              </Text>
              <HStack spacing={2}>
                {isCorrectAnswer(
                  question[currentquestion]?.options.indexOf(
                    allAns[currentquestion],
                  ),
                ) ? (
                  <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                    <HStack spacing={1}>
                      <Icon as={FiCheckCircle} />
                      <Text>Correct</Text>
                    </HStack>
                  </Badge>
                ) : allAns[currentquestion] ? (
                  <Badge colorScheme="red" fontSize="sm" px={3} py={1}>
                    <HStack spacing={1}>
                      <Icon as={FiXCircle} />
                      <Text>Incorrect</Text>
                    </HStack>
                  </Badge>
                ) : (
                  <Badge colorScheme="gray" fontSize="sm" px={3} py={1}>
                    Not Answered
                  </Badge>
                )}
              </HStack>
            </HStack>
          </Box>

          {/* Question Content */}
          <Box
            flex="1"
            overflow="auto"
            px={6}
            py={4}
            bg="white"
            css={{
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
            }}
          >
            <Text mb={6} fontSize="md" lineHeight="tall" fontWeight="500">
              {question[currentquestion]?.qus}
            </Text>

            <VStack align="stretch" spacing={3} mb={6}>
              {question[currentquestion]?.options.map((d, i) => {
                const bgColor = getOptionBgColor(d, i);
                const textColor = getOptionTextColor(d, i);
                const isCorrect = isCorrectAnswer(i);
                const isSelected = isUserAnswer(d);

                return (
                  <Box
                    key={i}
                    p={4}
                    borderRadius="md"
                    border="2px solid"
                    borderColor={bgColor === "white" ? "gray.200" : bgColor}
                    bg={bgColor}
                    color={textColor}
                    position="relative"
                  >
                    <HStack justify="space-between">
                      <Text
                        fontWeight={isCorrect || isSelected ? "600" : "400"}
                      >
                        {d}
                      </Text>
                      {isCorrect && <Icon as={FiCheckCircle} boxSize={5} />}
                      {isSelected && !isCorrect && (
                        <Icon as={FiXCircle} boxSize={5} />
                      )}
                    </HStack>
                  </Box>
                );
              })}
            </VStack>

            <Divider my={6} />

            {/* Explanation */}
            <Box
              bg="blue.50"
              p={5}
              borderRadius="lg"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontWeight="bold" fontSize="md" mb={3} color="blue.900">
                📚 Explanation:
              </Text>
              <Text color="gray.700" lineHeight="tall">
                {question[currentquestion]?.explanation ||
                  "No explanation available for this question."}
              </Text>
            </Box>
          </Box>

          {/* Bottom Navigation */}
          <Flex
            px={6}
            py={3}
            borderTop="1px solid"
            borderColor="gray.200"
            justify="space-between"
            align="center"
            bg="white"
            flexShrink={0}
          >
            <Button
              size="sm"
              bg="transparent"
              border="1px solid #01bfbd"
              color="#01bfbd"
              fontSize="12px"
              fontWeight="500"
              h="32px"
              px={4}
              _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
              onClick={handlePrevious}
              isDisabled={currentquestion === 0}
            >
              Previous
            </Button>

            <Text fontSize="sm" color="gray.600" fontWeight="500">
              {currentquestion + 1} / {question.length}
            </Text>

            <Button
              size="sm"
              bg="transparent"
              border="1px solid #01bfbd"
              color="#01bfbd"
              fontSize="12px"
              fontWeight="500"
              h="32px"
              px={4}
              _hover={{ bg: "rgba(1, 191, 189, 0.1)" }}
              onClick={() => handleQuestion(null)}
              isDisabled={currentquestion === question.length - 1}
            >
              Next
            </Button>
          </Flex>
        </VStack>

        {/* Sidebar — Desktop */}
        {!isMobile && (
          <Box
            w="320px"
            bg="#4285f4"
            p={6}
            borderLeft="1px solid"
            borderColor="gray.200"
            flexShrink={0}
          >
            <QuestionSidebar />
          </Box>
        )}
      </Flex>

      {/* Mobile Drawer */}
      {isMobile && (
        <>
          <Button
            position="fixed"
            bottom="4"
            right="4"
            colorScheme="blue"
            onClick={() => handleClick("xs")}
            borderRadius="full"
            w="56px"
            h="56px"
            shadow="lg"
            zIndex={999}
          >
            <HamburgerIcon w={6} h={6} />
          </Button>

          <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="right">
            <DrawerOverlay />
            <DrawerContent bg="#4285f4">
              <DrawerCloseButton color="white" />
              <DrawerHeader
                color="white"
                borderBottom="1px solid rgba(255,255,255,0.2)"
              >
                Test Review
              </DrawerHeader>
              <DrawerBody p={6}>
                <QuestionSidebar />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default ReviewTest;