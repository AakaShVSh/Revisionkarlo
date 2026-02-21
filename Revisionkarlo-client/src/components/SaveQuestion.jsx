// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   SimpleGrid,
// //   Text,
// //   Divider,
// //   Heading,
// //   Container,
// // } from "@chakra-ui/react";
// // import { useNavigate } from "react-router-dom";
// // import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// // import CollapseEx from "./CreateTest";

// // const SaveQuestion = ({ MathSubject = "", currentSub = "" }) => {
// //   const navigate = useNavigate();

// //   const subjects = [
// //     {
// //       title: "English",
// //       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //       icon: "📚",
// //       description: "Language & Literature",
// //     },
// //     {
// //       title: "Mathematics",
// //       gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
// //       icon: "∑",
// //       description: "Numbers & Logic",
// //     },
// //     {
// //       title: "Reasoning",
// //       gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
// //       icon: "🧩",
// //       description: "Critical Thinking",
// //     },
// //     {
// //       title: "General Studies",
// //       gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
// //       icon: "🌍",
// //       description: "Knowledge & Awareness",
// //     },
// //   ];

// //   const handleNavigation = (subject) => {
// //     console.log(subject, "Selected subject");
// //     setLocalStorage("savedtopic", subject.title.toLowerCase());
// //     navigate("/savedData");
// //   };

// //   return (
// //     <Box
// //       minH="100vh"
// //       bg="linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)"
// //       py={8}
// //     >
// //       <Container maxW="1200px">
// //         {/* Header Section */}
// //         <Box
// //           bg="white"
// //           borderRadius="2xl"
// //           boxShadow="0 10px 40px rgba(0,0,0,0.08)"
// //           p={{ base: 6, md: 8 }}
// //           mb={8}
// //           position="relative"
// //           overflow="hidden"
// //         >
// //           {/* Decorative Element */}
// //           <Box
// //             position="absolute"
// //             top="-50px"
// //             right="-50px"
// //             width="200px"
// //             height="200px"
// //             borderRadius="full"
// //             bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
// //             opacity={0.1}
// //             filter="blur(40px)"
// //           />

// //           <Heading
// //             size={{ base: "lg", md: "xl" }}
// //             bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
// //             bgClip="text"
// //             fontWeight="800"
// //             letterSpacing="-0.02em"
// //             mb={2}
// //             position="relative"
// //           >
// //             {MathSubject || currentSub || "Saved Questions"}
// //           </Heading>

// //           <Text
// //             color="gray.600"
// //             fontSize={{ base: "sm", md: "md" }}
// //             fontWeight="500"
// //           >
// //             Select a subject to view your saved questions
// //           </Text>
// //         </Box>

// //         {/* Subject Cards Grid */}
// //         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
// //           {subjects.map((subject, index) => (
// //             <Box
// //               key={index}
// //               onClick={() => handleNavigation(subject)}
// //               cursor="pointer"
// //               bg="white"
// //               borderRadius="xl"
// //               boxShadow="0 4px 20px rgba(0,0,0,0.06)"
// //               overflow="hidden"
// //               transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
// //               position="relative"
// //               _hover={{
// //                 transform: "translateY(-8px)",
// //                 boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
// //               }}
// //               role="button"
// //               tabIndex={0}
// //               onKeyPress={(e) => {
// //                 if (e.key === "Enter") handleNavigation(subject);
// //               }}
// //             >
// //               {/* Gradient Header */}
// //               <Box h="8px" background={subject.gradient} />

// //               {/* Card Content */}
// //               <Box p={8}>
// //                 <Box display="flex" alignItems="center" mb={4}>
// //                   <Box
// //                     w="60px"
// //                     h="60px"
// //                     borderRadius="xl"
// //                     background={subject.gradient}
// //                     display="flex"
// //                     alignItems="center"
// //                     justifyContent="center"
// //                     fontSize="2xl"
// //                     mr={4}
// //                     boxShadow="0 8px 16px rgba(0,0,0,0.1)"
// //                   >
// //                     {subject.icon}
// //                   </Box>

// //                   <Box flex="1">
// //                     <Heading
// //                       size="md"
// //                       color="gray.800"
// //                       fontWeight="700"
// //                       mb={1}
// //                       letterSpacing="-0.01em"
// //                     >
// //                       {subject.title}
// //                     </Heading>
// //                     <Text fontSize="sm" color="gray.500" fontWeight="500">
// //                       {subject.description}
// //                     </Text>
// //                   </Box>
// //                 </Box>

// //                 {/* View Button Indicator */}
// //                 <Box
// //                   display="flex"
// //                   alignItems="center"
// //                   justifyContent="flex-end"
// //                   color="gray.400"
// //                   fontSize="sm"
// //                   fontWeight="600"
// //                   transition="all 0.3s"
// //                   _groupHover={{
// //                     color: "gray.600",
// //                   }}
// //                 >
// //                   <Text mr={2}>View Questions</Text>
// //                   <Box
// //                     as="span"
// //                     fontSize="lg"
// //                     transition="transform 0.3s"
// //                     sx={{
// //                       "div:hover &": {
// //                         transform: "translateX(4px)",
// //                       },
// //                     }}
// //                   >
// //                     →
// //                   </Box>
// //                 </Box>
// //               </Box>

// //               {/* Shine Effect on Hover */}
// //               <Box
// //                 position="absolute"
// //                 top="0"
// //                 left="-100%"
// //                 width="100%"
// //                 height="100%"
// //                 background="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
// //                 transition="left 0.5s"
// //                 pointerEvents="none"
// //                 sx={{
// //                   "div:hover &": {
// //                     left: "100%",
// //                   },
// //                 }}
// //               />
// //             </Box>
// //           ))}
// //         </SimpleGrid>

// //         {/* Footer Stats (Optional) */}
// //         <Box
// //           mt={8}
// //           p={6}
// //           bg="white"
// //           borderRadius="xl"
// //           boxShadow="0 4px 20px rgba(0,0,0,0.06)"
// //         >
// //           <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
// //             {[
// //               { label: "Total Questions", value: "156" },
// //               { label: "Subjects", value: "4" },
// //               { label: "Last Updated", value: "Today" },
// //               { label: "Completion", value: "78%" },
// //             ].map((stat, idx) => (
// //               <Box key={idx} textAlign="center">
// //                 <Text
// //                   fontSize="2xl"
// //                   fontWeight="800"
// //                   bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
// //                   bgClip="text"
// //                   mb={1}
// //                 >
// //                   {stat.value}
// //                 </Text>
// //                 <Text
// //                   fontSize="xs"
// //                   color="gray.500"
// //                   fontWeight="600"
// //                   textTransform="uppercase"
// //                   letterSpacing="wide"
// //                 >
// //                   {stat.label}
// //                 </Text>
// //               </Box>
// //             ))}
// //           </SimpleGrid>
// //         </Box>
// //       </Container>

// //       <style jsx>{`
// //         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap");

// //         * {
// //           font-family:
// //             "Inter",
// //             -apple-system,
// //             BlinkMacSystemFont,
// //             "Segoe UI",
// //             sans-serif;
// //         }
// //       `}</style>
// //     </Box>
// //   );
// // };

// // export default SaveQuestion;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   SimpleGrid,
//   Text,
//   Heading,
//   Container,
//   Button,
//   Flex,
//   HStack,
//   VStack,
//   Badge,
//   Icon,
//   Input,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
// import { MdAddBox } from "react-icons/md";
// import { CheckIcon } from "@chakra-ui/icons";

// const SaveQuestion = ({
//   MathSubject = "",
//   currentSub = "",
//   setQuestions,
//   handleFullScreen,
//   settestTitle,
// }) => {
//   const navigate = useNavigate();

//   // ----------------------------------------------------------------------
//   // state
//   // ----------------------------------------------------------------------
//   // null  = show subject cards   |   string = show saved list for that key
//   const [activeSubject, setActiveSubject] = useState(null);
//   const [savedQuestions, setSavedQuestions] = useState([]);
//   const [selected, setSelected] = useState(new Set());
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [testName, setTestName] = useState("Saved Test");

//   // ----------------------------------------------------------------------
//   // subject cards — exactly the same as before
//   // ----------------------------------------------------------------------
//   const subjects = [
//     {
//       title: "English",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       icon: "📚",
//       description: "Language & Literature",
//       key: "english",
//     },
//     {
//       title: "Mathematics",
//       gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//       icon: "∑",
//       description: "Numbers & Logic",
//       key: "mathematics",
//     },
//     {
//       title: "Reasoning",
//       gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//       icon: "🧩",
//       description: "Critical Thinking",
//       key: "reasoning",
//     },
//     {
//       title: "General Studies",
//       gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//       icon: "🌍",
//       description: "Knowledge & Awareness",
//       key: "general studies",
//     },
//   ];

//   // ----------------------------------------------------------------------
//   // helpers
//   // ----------------------------------------------------------------------
//   const loadQuestions = (key) => {
//     const all = getLocalStorage("savedQuestionsBySubject") || {};
//     return all[key] || [];
//   };

//   const countForSubject = (key) => loadQuestions(key).length;

//   // open saved list for a subject
//   const handleNavigation = (subject) => {
//     setLocalStorage("savedtopic", subject.key);
//     const qs = loadQuestions(subject.key);
//     setSavedQuestions(qs);
//     setActiveSubject(subject.key);
//     setSelected(new Set());
//   };

//   // go back to subject cards
//   const handleBack = () => {
//     setActiveSubject(null);
//     setSelected(new Set());
//     setIsCreateOpen(false);
//   };

//   // toggle one question in the selection set
//   const toggleSelect = (idx) => {
//     setSelected((prev) => {
//       const next = new Set(prev);
//       next.has(idx) ? next.delete(idx) : next.add(idx);
//       return next;
//     });
//   };

//   // select / deselect every question
//   const toggleAll = () => {
//     if (selected.size === savedQuestions.length) {
//       setSelected(new Set());
//     } else {
//       setSelected(new Set(savedQuestions.map((_, i) => i)));
//     }
//   };

//   // delete a single bookmarked question
//   const deleteQuestion = (idx) => {
//     const all = getLocalStorage("savedQuestionsBySubject") || {};
//     const bucket = all[activeSubject] || [];
//     bucket.splice(idx, 1);
//     all[activeSubject] = bucket;
//     setLocalStorage("savedQuestionsBySubject", all);

//     // keep qusno in sync
//     const qusno = (getLocalStorage("qusno") || []).filter(
//       (t) => t !== savedQuestions[idx]?.qus,
//     );
//     setLocalStorage("qusno", qusno);

//     // refresh local state
//     setSavedQuestions([...bucket]);
//     // fix selection indices
//     const newSel = new Set();
//     selected.forEach((s) => {
//       if (s < idx) newSel.add(s);
//       else if (s > idx) newSel.add(s - 1);
//     });
//     setSelected(newSel);
//   };

//   // create a test from the currently selected (or all) questions
//   const createTest = () => {
//     const indices =
//       selected.size > 0 ? [...selected] : savedQuestions.map((_, i) => i);

//     if (indices.length === 0) {
//       alert("Please select at least one question.");
//       return;
//     }

//     const questionsForTest = indices.map((i) => savedQuestions[i]);

//     // mirror the maketest pattern from MathQuestionlist
//     if (setQuestions) setQuestions(questionsForTest);
//     if (handleFullScreen) handleFullScreen(true);
//     if (settestTitle) settestTitle(testName || "Saved Test");

//     navigate("/test");
//   };

//   // ----------------------------------------------------------------------
//   // render — SUBJECT CARDS (original UI, untouched)
//   // ----------------------------------------------------------------------
//   if (!activeSubject) {
//     return (
//       <Box
//         minH="100vh"
//         bg="linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)"
//         py={8}
//       >
//         <Container maxW="1200px">
//           {/* Header Section */}
//           <Box
//             bg="white"
//             borderRadius="2xl"
//             boxShadow="0 10px 40px rgba(0,0,0,0.08)"
//             p={{ base: 6, md: 8 }}
//             mb={8}
//             position="relative"
//             overflow="hidden"
//           >
//             <Box
//               position="absolute"
//               top="-50px"
//               right="-50px"
//               width="200px"
//               height="200px"
//               borderRadius="full"
//               bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//               opacity={0.1}
//               filter="blur(40px)"
//             />

//             <Heading
//               size={{ base: "lg", md: "xl" }}
//               bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//               bgClip="text"
//               fontWeight="800"
//               letterSpacing="-0.02em"
//               mb={2}
//               position="relative"
//             >
//               {MathSubject || currentSub || "Saved Questions"}
//             </Heading>

//             <Text
//               color="gray.600"
//               fontSize={{ base: "sm", md: "md" }}
//               fontWeight="500"
//             >
//               Select a subject to view your saved questions
//             </Text>
//           </Box>

//           {/* Subject Cards Grid */}
//           <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
//             {subjects.map((subject, index) => {
//               const count = countForSubject(subject.key);
//               return (
//                 <Box
//                   key={index}
//                   onClick={() => handleNavigation(subject)}
//                   cursor="pointer"
//                   bg="white"
//                   borderRadius="xl"
//                   boxShadow="0 4px 20px rgba(0,0,0,0.06)"
//                   overflow="hidden"
//                   transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//                   position="relative"
//                   _hover={{
//                     transform: "translateY(-8px)",
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
//                   }}
//                   role="button"
//                   tabIndex={0}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") handleNavigation(subject);
//                   }}
//                 >
//                   {/* Gradient Header */}
//                   <Box h="8px" background={subject.gradient} />

//                   {/* Card Content */}
//                   <Box p={8}>
//                     <Box display="flex" alignItems="center" mb={4}>
//                       <Box
//                         w="60px"
//                         h="60px"
//                         borderRadius="xl"
//                         background={subject.gradient}
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                         fontSize="2xl"
//                         mr={4}
//                         boxShadow="0 8px 16px rgba(0,0,0,0.1)"
//                       >
//                         {subject.icon}
//                       </Box>

//                       <Box flex="1">
//                         <Heading
//                           size="md"
//                           color="gray.800"
//                           fontWeight="700"
//                           mb={1}
//                           letterSpacing="-0.01em"
//                         >
//                           {subject.title}
//                         </Heading>
//                         <Text fontSize="sm" color="gray.500" fontWeight="500">
//                           {subject.description}
//                         </Text>
//                       </Box>

//                       {/* badge showing how many questions saved */}
//                       {count > 0 && (
//                         <Badge
//                           colorScheme="purple"
//                           fontSize="sm"
//                           px={3}
//                           py={1}
//                           borderRadius="full"
//                           fontWeight="600"
//                         >
//                           {count} saved
//                         </Badge>
//                       )}
//                     </Box>

//                     {/* View Button Indicator */}
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="flex-end"
//                       color="gray.400"
//                       fontSize="sm"
//                       fontWeight="600"
//                       transition="all 0.3s"
//                       _groupHover={{
//                         color: "gray.600",
//                       }}
//                     >
//                       <Text mr={2}>
//                         {count > 0 ? "View Questions" : "No saved questions"}
//                       </Text>
//                       <Box
//                         as="span"
//                         fontSize="lg"
//                         transition="transform 0.3s"
//                         sx={{
//                           "div:hover &": {
//                             transform: "translateX(4px)",
//                           },
//                         }}
//                       >
//                         →
//                       </Box>
//                     </Box>
//                   </Box>

//                   {/* Shine Effect */}
//                   <Box
//                     position="absolute"
//                     top="0"
//                     left="-100%"
//                     width="100%"
//                     height="100%"
//                     background="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
//                     transition="left 0.5s"
//                     pointerEvents="none"
//                     sx={{
//                       "div:hover &": {
//                         left: "100%",
//                       },
//                     }}
//                   />
//                 </Box>
//               );
//             })}
//           </SimpleGrid>

//           {/* Footer Stats */}
//           <Box
//             mt={8}
//             p={6}
//             bg="white"
//             borderRadius="xl"
//             boxShadow="0 4px 20px rgba(0,0,0,0.06)"
//           >
//             <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
//               {[
//                 {
//                   label: "Total Saved",
//                   value: String(
//                     subjects.reduce(
//                       (s, sub) => s + countForSubject(sub.key),
//                       0,
//                     ),
//                   ),
//                 },
//                 { label: "Subjects", value: "4" },
//                 { label: "Last Updated", value: "Today" },
//                 {
//                   label: "Completion",
//                   value: "78%",
//                 },
//               ].map((stat, idx) => (
//                 <Box key={idx} textAlign="center">
//                   <Text
//                     fontSize="2xl"
//                     fontWeight="800"
//                     bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//                     bgClip="text"
//                     mb={1}
//                   >
//                     {stat.value}
//                   </Text>
//                   <Text
//                     fontSize="xs"
//                     color="gray.500"
//                     fontWeight="600"
//                     textTransform="uppercase"
//                     letterSpacing="wide"
//                   >
//                     {stat.label}
//                   </Text>
//                 </Box>
//               ))}
//             </SimpleGrid>
//           </Box>
//         </Container>

//         <style jsx>{`
//           @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap");
//           * {
//             font-family:
//               "Inter",
//               -apple-system,
//               BlinkMacSystemFont,
//               "Segoe UI",
//               sans-serif;
//           }
//         `}</style>
//       </Box>
//     );
//   }

//   // ----------------------------------------------------------------------
//   // render — SAVED QUESTIONS LIST (new view, same visual language)
//   // ----------------------------------------------------------------------
//   const subjectLabel =
//     subjects.find((s) => s.key === activeSubject)?.title || activeSubject;
//   const subjectGradient =
//     subjects.find((s) => s.key === activeSubject)?.gradient ||
//     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
//   const allSelected =
//     selected.size === savedQuestions.length && savedQuestions.length > 0;

//   return (
//     <Box
//       minH="100vh"
//       bg="linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)"
//       py={8}
//     >
//       <Container maxW="1200px">
//         {/* Header */}
//         <Box
//           bg="white"
//           borderRadius="2xl"
//           boxShadow="0 10px 40px rgba(0,0,0,0.08)"
//           p={{ base: 6, md: 8 }}
//           mb={6}
//           position="relative"
//           overflow="hidden"
//         >
//           <Box
//             position="absolute"
//             top="-50px"
//             right="-50px"
//             width="200px"
//             height="200px"
//             borderRadius="full"
//             bg={subjectGradient}
//             opacity={0.1}
//             filter="blur(40px)"
//           />

//           {/* back arrow + title row */}
//           <Flex align="center" mb={2} position="relative">
//             <Box
//               onClick={handleBack}
//               cursor="pointer"
//               mr={3}
//               display="flex"
//               alignItems="center"
//               color="gray.500"
//               _hover={{ color: "gray.800" }}
//               transition="color 0.2s"
//             >
//               <Icon as={FiArrowLeft} boxSize={5} />
//             </Box>
//             <Heading
//               size={{ base: "lg", md: "xl" }}
//               bgGradient={subjectGradient}
//               bgClip="text"
//               fontWeight="800"
//               letterSpacing="-0.02em"
//             >
//               {subjectLabel} — Saved Questions
//             </Heading>
//             <Badge
//               ml={3}
//               colorScheme="purple"
//               fontSize="sm"
//               px={3}
//               py={1}
//               borderRadius="full"
//               fontWeight="600"
//             >
//               {savedQuestions.length} questions
//             </Badge>
//           </Flex>

//           <Text
//             color="gray.600"
//             fontSize={{ base: "sm", md: "md" }}
//             fontWeight="500"
//             position="relative"
//           >
//             Select questions and create a test, or manage your bookmarks
//           </Text>
//         </Box>

//         {/* action bar: select-all toggle + create test collapse */}
//         <Box
//           bg="white"
//           borderRadius="xl"
//           boxShadow="0 4px 20px rgba(0,0,0,0.06)"
//           p={4}
//           mb={4}
//         >
//           <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
//             <HStack spacing={3}>
//               {/* select-all checkbox */}
//               <Box
//                 w="24px"
//                 h="24px"
//                 borderRadius="6px"
//                 border="2px solid"
//                 borderColor={allSelected ? "#667eea" : "gray.300"}
//                 bg={allSelected ? "#667eea" : "white"}
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 cursor="pointer"
//                 onClick={toggleAll}
//                 transition="all 0.2s"
//               >
//                 {allSelected && (
//                   <Icon as={CheckIcon} color="white" boxSize={3} />
//                 )}
//               </Box>
//               <Text
//                 fontSize="sm"
//                 fontWeight="600"
//                 color="gray.700"
//                 cursor="pointer"
//                 onClick={toggleAll}
//               >
//                 {allSelected ? "Deselect All" : "Select All"}
//               </Text>
//               {selected.size > 0 && (
//                 <Badge colorScheme="blue" borderRadius="full" px={2}>
//                   {selected.size} selected
//                 </Badge>
//               )}
//             </HStack>

//             {/* create test button */}
//             <Button
//               size="sm"
//               leftIcon={<MdAddBox />}
//               bg="#667eea"
//               color="white"
//               fontWeight="600"
//               fontSize="13px"
//               borderRadius="10px"
//               _hover={{ bg: "#5a6fd6" }}
//               onClick={() => setIsCreateOpen(!isCreateOpen)}
//               isDisabled={savedQuestions.length === 0}
//             >
//               Create Test
//             </Button>
//           </Flex>

//           {/* collapsible create-test panel */}
//           {isCreateOpen && (
//             <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.200">
//               <Text fontSize="sm" color="gray.600" mb={2} fontWeight="500">
//                 {selected.size > 0
//                   ? `Creating test from ${selected.size} selected question(s)`
//                   : `Creating test from all ${savedQuestions.length} question(s)`}
//               </Text>
//               <Flex gap={3} align="center" wrap="wrap">
//                 <Input
//                   size="sm"
//                   placeholder="Test name"
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   borderRadius="8px"
//                   maxW="240px"
//                   borderColor="gray.300"
//                   _focus={{ borderColor: "#667eea", boxShadow: "none" }}
//                 />
//                 <Button
//                   size="sm"
//                   bg="#01bfbd"
//                   color="white"
//                   fontWeight="600"
//                   borderRadius="8px"
//                   _hover={{ bg: "#00a8a6" }}
//                   onClick={createTest}
//                 >
//                   Start Test
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   borderColor="gray.300"
//                   color="gray.600"
//                   borderRadius="8px"
//                   _hover={{ bg: "gray.50" }}
//                   onClick={() => setIsCreateOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//               </Flex>
//             </Box>
//           )}
//         </Box>

//         {/* question list */}
//         {savedQuestions.length === 0 ? (
//           <Box
//             bg="white"
//             borderRadius="xl"
//             boxShadow="0 4px 20px rgba(0,0,0,0.06)"
//             p={12}
//             textAlign="center"
//           >
//             <Text fontSize="4xl" mb={4}>
//               📭
//             </Text>
//             <Text fontSize="lg" fontWeight="600" color="gray.600" mb={2}>
//               No saved questions yet
//             </Text>
//             <Text fontSize="sm" color="gray.400">
//               Go to Review Test and bookmark questions to see them here
//             </Text>
//           </Box>
//         ) : (
//           <VStack spacing={3} align="stretch">
//             {savedQuestions.map((q, idx) => {
//               const isSelected = selected.has(idx);
//               return (
//                 <Box
//                   key={idx}
//                   bg="white"
//                   borderRadius="xl"
//                   boxShadow="0 4px 20px rgba(0,0,0,0.06)"
//                   border="2px solid"
//                   borderColor={isSelected ? "#667eea" : "transparent"}
//                   transition="all 0.2s"
//                   overflow="hidden"
//                 >
//                   {/* top colour stripe — same gradient as subject */}
//                   <Box h="3px" background={subjectGradient} />

//                   <Box p={5}>
//                     {/* row: checkbox  |  question text  |  delete */}
//                     <Flex align="flex-start" gap={3}>
//                       {/* checkbox */}
//                       <Box
//                         flexShrink={0}
//                         mt="2px"
//                         w="22px"
//                         h="22px"
//                         borderRadius="6px"
//                         border="2px solid"
//                         borderColor={isSelected ? "#667eea" : "gray.300"}
//                         bg={isSelected ? "#667eea" : "white"}
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                         cursor="pointer"
//                         onClick={() => toggleSelect(idx)}
//                         transition="all 0.2s"
//                       >
//                         {isSelected && (
//                           <Icon as={CheckIcon} color="white" boxSize={3} />
//                         )}
//                       </Box>

//                       {/* question content — click anywhere here also toggles */}
//                       <Box
//                         flex="1"
//                         cursor="pointer"
//                         onClick={() => toggleSelect(idx)}
//                       >
//                         <Flex align="center" mb={2} gap={2}>
//                           <Badge
//                             bg="gray.100"
//                             color="gray.600"
//                             fontSize="xs"
//                             px={2}
//                             py={0.5}
//                             borderRadius="full"
//                             fontWeight="600"
//                           >
//                             Q {idx + 1}
//                           </Badge>
//                         </Flex>

//                         <Text
//                           fontSize="sm"
//                           fontWeight="600"
//                           color="gray.800"
//                           lineHeight="tall"
//                           mb={3}
//                         >
//                           {q.qus}
//                         </Text>

//                         {/* options preview */}
//                         <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
//                           {q.options?.map((opt, oi) => {
//                             const isAns = q.answer - 1 === oi;
//                             return (
//                               <Box
//                                 key={oi}
//                                 px={3}
//                                 py={2}
//                                 borderRadius="8px"
//                                 bg={isAns ? "green.50" : "gray.50"}
//                                 border="1px solid"
//                                 borderColor={isAns ? "green.300" : "gray.200"}
//                                 display="flex"
//                                 alignItems="center"
//                                 gap={2}
//                               >
//                                 {isAns && (
//                                   <Icon
//                                     as={CheckIcon}
//                                     color="green.500"
//                                     boxSize={3}
//                                     flexShrink={0}
//                                   />
//                                 )}
//                                 <Text
//                                   fontSize="xs"
//                                   color={isAns ? "green.700" : "gray.600"}
//                                   fontWeight={isAns ? "600" : "400"}
//                                   noOfLines={2}
//                                 >
//                                   {opt}
//                                 </Text>
//                               </Box>
//                             );
//                           })}
//                         </SimpleGrid>
//                       </Box>

//                       {/* delete button */}
//                       <Box
//                         flexShrink={0}
//                         cursor="pointer"
//                         color="gray.300"
//                         _hover={{ color: "red.500" }}
//                         transition="color 0.2s"
//                         onClick={() => deleteQuestion(idx)}
//                         pt="2px"
//                       >
//                         <Icon as={FiTrash2} boxSize={4} />
//                       </Box>
//                     </Flex>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </VStack>
//         )}
//       </Container>

//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap");
//         * {
//           font-family:
//             "Inter",
//             -apple-system,
//             BlinkMacSystemFont,
//             "Segoe UI",
//             sans-serif;
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default SaveQuestion;

import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Container,
  Button,
  Flex,
  HStack,
  VStack,
  Badge,
  Icon,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { MdAddBox } from "react-icons/md";
import { CheckIcon } from "@chakra-ui/icons";

const SaveQuestion = ({
  MathSubject = "",
  currentSub = "",
  setQuestions,
  handleFullScreen,
  settestTitle,
}) => {
  const navigate = useNavigate();

  // ----------------------------------------------------------------------
  // state
  // ----------------------------------------------------------------------
  // null  = show subject cards   |   string = show saved list for that key
  const [activeSubject, setActiveSubject] = useState(null);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [testName, setTestName] = useState("Saved Test");

  // ----------------------------------------------------------------------
  // subject cards — exactly the same as before
  // ----------------------------------------------------------------------
  const subjects = [
    {
      title: "English",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "📚",
      description: "Language & Literature",
      key: "english",
    },
    {
      title: "Mathematics",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "∑",
      description: "Numbers & Logic",
      key: "mathematics",
    },
    {
      title: "Reasoning",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "🧩",
      description: "Critical Thinking",
      key: "reasoning",
    },
    {
      title: "General Studies",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "🌍",
      description: "Knowledge & Awareness",
      key: "general studies",
    },
    {
      title: "Vocabulary",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: "📖",
      description: "Words & Meanings",
      key: "vocabulary",
    },
  ];

  // ----------------------------------------------------------------------
  // helpers
  // ----------------------------------------------------------------------
  const loadQuestions = (key) => {
    const all = getLocalStorage("savedQuestionsBySubject") || {};
    return all[key] || [];
  };

  const countForSubject = (key) => loadQuestions(key).length;

  // open saved list for a subject
  const handleNavigation = (subject) => {
    setLocalStorage("savedtopic", subject.key);
    const qs = loadQuestions(subject.key);
    setSavedQuestions(qs);
    setActiveSubject(subject.key);
    setSelected(new Set());
  };

  // go back to subject cards
  const handleBack = () => {
    setActiveSubject(null);
    setSelected(new Set());
    setIsCreateOpen(false);
  };

  // toggle one question in the selection set
  const toggleSelect = (idx) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  // select / deselect every question
  const toggleAll = () => {
    if (selected.size === savedQuestions.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(savedQuestions.map((_, i) => i)));
    }
  };

  // delete a single bookmarked question
  const deleteQuestion = (idx) => {
    const all = getLocalStorage("savedQuestionsBySubject") || {};
    const bucket = all[activeSubject] || [];
    bucket.splice(idx, 1);
    all[activeSubject] = bucket;
    setLocalStorage("savedQuestionsBySubject", all);

    // keep qusno in sync
    const qusno = (getLocalStorage("qusno") || []).filter(
      (t) => t !== savedQuestions[idx]?.qus,
    );
    setLocalStorage("qusno", qusno);

    // refresh local state
    setSavedQuestions([...bucket]);
    // fix selection indices
    const newSel = new Set();
    selected.forEach((s) => {
      if (s < idx) newSel.add(s);
      else if (s > idx) newSel.add(s - 1);
    });
    setSelected(newSel);
  };

  // create a test from the currently selected (or all) questions
  const createTest = () => {
    const indices =
      selected.size > 0 ? [...selected] : savedQuestions.map((_, i) => i);

    if (indices.length === 0) {
      alert("Please select at least one question.");
      return;
    }

    const questionsForTest = indices.map((i) => savedQuestions[i]);

    // ── persist to localStorage — TakeTest reads these on mount ──
    setLocalStorage("savedTestQuestions", questionsForTest);
    setLocalStorage("savedTestTitle", testName || "Saved Test");
    setLocalStorage("Subject", activeSubject);
    setLocalStorage("category", testName || "Saved Test");

    // ── also call parent setters if they exist (belt & suspenders) ──
    if (setQuestions) setQuestions(questionsForTest);
    if (handleFullScreen) handleFullScreen(true);
    if (settestTitle) settestTitle(testName || "Saved Test");

    navigate("/test");
  };

  // ----------------------------------------------------------------------
  // render — SUBJECT CARDS (original UI, untouched)
  // ----------------------------------------------------------------------
  if (!activeSubject) {
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)"
        py={8}
      >
        <Container maxW="1200px">
          {/* Header Section */}
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="0 10px 40px rgba(0,0,0,0.08)"
            p={{ base: 6, md: 8 }}
            mb={8}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="-50px"
              right="-50px"
              width="200px"
              height="200px"
              borderRadius="full"
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              opacity={0.1}
              filter="blur(40px)"
            />

            <Heading
              size={{ base: "lg", md: "xl" }}
              bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              bgClip="text"
              fontWeight="800"
              letterSpacing="-0.02em"
              mb={2}
              position="relative"
            >
              {MathSubject || currentSub || "Saved Questions"}
            </Heading>

            <Text
              color="gray.600"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="500"
            >
              Select a subject to view your saved questions
            </Text>
          </Box>

          {/* Subject Cards Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {subjects.map((subject, index) => {
              const count = countForSubject(subject.key);
              return (
                <Box
                  key={index}
                  onClick={() => handleNavigation(subject)}
                  cursor="pointer"
                  bg="white"
                  borderRadius="xl"
                  boxShadow="0 4px 20px rgba(0,0,0,0.06)"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  position="relative"
                  _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleNavigation(subject);
                  }}
                >
                  {/* Gradient Header */}
                  <Box h="8px" background={subject.gradient} />

                  {/* Card Content */}
                  <Box p={8}>
                    <Box display="flex" alignItems="center" mb={4}>
                      <Box
                        w="60px"
                        h="60px"
                        borderRadius="xl"
                        background={subject.gradient}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="2xl"
                        mr={4}
                        boxShadow="0 8px 16px rgba(0,0,0,0.1)"
                      >
                        {subject.icon}
                      </Box>

                      <Box flex="1">
                        <Heading
                          size="md"
                          color="gray.800"
                          fontWeight="700"
                          mb={1}
                          letterSpacing="-0.01em"
                        >
                          {subject.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.500" fontWeight="500">
                          {subject.description}
                        </Text>
                      </Box>

                      {/* badge showing how many questions saved */}
                      {count > 0 && (
                        <Badge
                          colorScheme="purple"
                          fontSize="sm"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontWeight="600"
                        >
                          {count} saved
                        </Badge>
                      )}
                    </Box>

                    {/* View Button Indicator */}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                      color="gray.400"
                      fontSize="sm"
                      fontWeight="600"
                      transition="all 0.3s"
                      _groupHover={{
                        color: "gray.600",
                      }}
                    >
                      <Text mr={2}>
                        {count > 0 ? "View Questions" : "No saved questions"}
                      </Text>
                      <Box
                        as="span"
                        fontSize="lg"
                        transition="transform 0.3s"
                        sx={{
                          "div:hover &": {
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        →
                      </Box>
                    </Box>
                  </Box>

                  {/* Shine Effect */}
                  <Box
                    position="absolute"
                    top="0"
                    left="-100%"
                    width="100%"
                    height="100%"
                    background="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                    transition="left 0.5s"
                    pointerEvents="none"
                    sx={{
                      "div:hover &": {
                        left: "100%",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </SimpleGrid>

          {/* Footer Stats */}
          <Box
            mt={8}
            p={6}
            bg="white"
            borderRadius="xl"
            boxShadow="0 4px 20px rgba(0,0,0,0.06)"
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {[
                {
                  label: "Total Saved",
                  value: String(
                    subjects.reduce(
                      (s, sub) => s + countForSubject(sub.key),
                      0,
                    ),
                  ),
                },
                { label: "Subjects", value: String(subjects.length) },
                { label: "Last Updated", value: "Today" },
                {
                  label: "Completion",
                  value: "78%",
                },
              ].map((stat, idx) => (
                <Box key={idx} textAlign="center">
                  <Text
                    fontSize="2xl"
                    fontWeight="800"
                    bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    bgClip="text"
                    mb={1}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Container>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap");
          * {
            font-family:
              "Inter",
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
          }
        `}</style>
      </Box>
    );
  }

  // ----------------------------------------------------------------------
  // render — SAVED QUESTIONS LIST (new view, same visual language)
  // ----------------------------------------------------------------------
  const subjectLabel =
    subjects.find((s) => s.key === activeSubject)?.title || activeSubject;
  const subjectGradient =
    subjects.find((s) => s.key === activeSubject)?.gradient ||
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const allSelected =
    selected.size === savedQuestions.length && savedQuestions.length > 0;

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)"
      py={8}
    >
      <Container maxW="1200px">
        {/* Header */}
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="0 10px 40px rgba(0,0,0,0.08)"
          p={{ base: 6, md: 8 }}
          mb={6}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-50px"
            right="-50px"
            width="200px"
            height="200px"
            borderRadius="full"
            bg={subjectGradient}
            opacity={0.1}
            filter="blur(40px)"
          />

          {/* back arrow + title row */}
          <Flex align="center" mb={2} position="relative">
            <Box
              onClick={handleBack}
              cursor="pointer"
              mr={3}
              display="flex"
              alignItems="center"
              color="gray.500"
              _hover={{ color: "gray.800" }}
              transition="color 0.2s"
            >
              <Icon as={FiArrowLeft} boxSize={5} />
            </Box>
            <Heading
              size={{ base: "lg", md: "xl" }}
              bgGradient={subjectGradient}
              bgClip="text"
              fontWeight="800"
              letterSpacing="-0.02em"
            >
              {subjectLabel} — Saved Questions
            </Heading>
            <Badge
              ml={3}
              colorScheme="purple"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="600"
            >
              {savedQuestions.length} questions
            </Badge>
          </Flex>

          <Text
            color="gray.600"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="500"
            position="relative"
          >
            Select questions and create a test, or manage your bookmarks
          </Text>
        </Box>

        {/* action bar: select-all toggle + create test collapse */}
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="0 4px 20px rgba(0,0,0,0.06)"
          p={4}
          mb={4}
        >
          <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
            <HStack spacing={3}>
              {/* select-all checkbox */}
              <Box
                w="24px"
                h="24px"
                borderRadius="6px"
                border="2px solid"
                borderColor={allSelected ? "#667eea" : "gray.300"}
                bg={allSelected ? "#667eea" : "white"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={toggleAll}
                transition="all 0.2s"
              >
                {allSelected && (
                  <Icon as={CheckIcon} color="white" boxSize={3} />
                )}
              </Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="gray.700"
                cursor="pointer"
                onClick={toggleAll}
              >
                {allSelected ? "Deselect All" : "Select All"}
              </Text>
              {selected.size > 0 && (
                <Badge colorScheme="blue" borderRadius="full" px={2}>
                  {selected.size} selected
                </Badge>
              )}
            </HStack>

            {/* create test button */}
            <Button
              size="sm"
              leftIcon={<MdAddBox />}
              bg="#667eea"
              color="white"
              fontWeight="600"
              fontSize="13px"
              borderRadius="10px"
              _hover={{ bg: "#5a6fd6" }}
              onClick={() => setIsCreateOpen(!isCreateOpen)}
              isDisabled={savedQuestions.length === 0}
            >
              Create Test
            </Button>
          </Flex>

          {/* collapsible create-test panel */}
          {isCreateOpen && (
            <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.200">
              <Text fontSize="sm" color="gray.600" mb={2} fontWeight="500">
                {selected.size > 0
                  ? `Creating test from ${selected.size} selected question(s)`
                  : `Creating test from all ${savedQuestions.length} question(s)`}
              </Text>
              <Flex gap={3} align="center" wrap="wrap">
                <Input
                  size="sm"
                  placeholder="Test name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  borderRadius="8px"
                  maxW="240px"
                  borderColor="gray.300"
                  _focus={{ borderColor: "#667eea", boxShadow: "none" }}
                />
                <Button
                  size="sm"
                  bg="#01bfbd"
                  color="white"
                  fontWeight="600"
                  borderRadius="8px"
                  _hover={{ bg: "#00a8a6" }}
                  onClick={createTest}
                >
                  Start Test
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.600"
                  borderRadius="8px"
                  _hover={{ bg: "gray.50" }}
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          )}
        </Box>

        {/* question list */}
        {savedQuestions.length === 0 ? (
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="0 4px 20px rgba(0,0,0,0.06)"
            p={12}
            textAlign="center"
          >
            <Text fontSize="4xl" mb={4}>
              📭
            </Text>
            <Text fontSize="lg" fontWeight="600" color="gray.600" mb={2}>
              No saved questions yet
            </Text>
            <Text fontSize="sm" color="gray.400">
              Go to Review Test and bookmark questions to see them here
            </Text>
          </Box>
        ) : (
          <VStack spacing={3} align="stretch">
            {savedQuestions.map((q, idx) => {
              const isSelected = selected.has(idx);
              return (
                <Box
                  key={idx}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="0 4px 20px rgba(0,0,0,0.06)"
                  border="2px solid"
                  borderColor={isSelected ? "#667eea" : "transparent"}
                  transition="all 0.2s"
                  overflow="hidden"
                >
                  {/* top colour stripe — same gradient as subject */}
                  <Box h="3px" background={subjectGradient} />

                  <Box p={5}>
                    {/* row: checkbox  |  question text  |  delete */}
                    <Flex align="flex-start" gap={3}>
                      {/* checkbox */}
                      <Box
                        flexShrink={0}
                        mt="2px"
                        w="22px"
                        h="22px"
                        borderRadius="6px"
                        border="2px solid"
                        borderColor={isSelected ? "#667eea" : "gray.300"}
                        bg={isSelected ? "#667eea" : "white"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={() => toggleSelect(idx)}
                        transition="all 0.2s"
                      >
                        {isSelected && (
                          <Icon as={CheckIcon} color="white" boxSize={3} />
                        )}
                      </Box>

                      {/* question content — click anywhere here also toggles */}
                      <Box
                        flex="1"
                        cursor="pointer"
                        onClick={() => toggleSelect(idx)}
                      >
                        <Flex align="center" mb={2} gap={2}>
                          <Badge
                            bg="gray.100"
                            color="gray.600"
                            fontSize="xs"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            fontWeight="600"
                          >
                            Q {idx + 1}
                          </Badge>
                        </Flex>

                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="gray.800"
                          lineHeight="tall"
                          mb={3}
                        >
                          {q.qus}
                        </Text>

                        {/* options preview */}
                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
                          {q.options?.map((opt, oi) => {
                            const isAns = q.answer - 1 === oi;
                            return (
                              <Box
                                key={oi}
                                px={3}
                                py={2}
                                borderRadius="8px"
                                bg={isAns ? "green.50" : "gray.50"}
                                border="1px solid"
                                borderColor={isAns ? "green.300" : "gray.200"}
                                display="flex"
                                alignItems="center"
                                gap={2}
                              >
                                {isAns && (
                                  <Icon
                                    as={CheckIcon}
                                    color="green.500"
                                    boxSize={3}
                                    flexShrink={0}
                                  />
                                )}
                                <Text
                                  fontSize="xs"
                                  color={isAns ? "green.700" : "gray.600"}
                                  fontWeight={isAns ? "600" : "400"}
                                  noOfLines={2}
                                >
                                  {opt}
                                </Text>
                              </Box>
                            );
                          })}
                        </SimpleGrid>
                      </Box>

                      {/* delete button */}
                      <Box
                        flexShrink={0}
                        cursor="pointer"
                        color="gray.300"
                        _hover={{ color: "red.500" }}
                        transition="color 0.2s"
                        onClick={() => deleteQuestion(idx)}
                        pt="2px"
                      >
                        <Icon as={FiTrash2} boxSize={4} />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </VStack>
        )}
      </Container>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap");
        * {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }
      `}</style>
    </Box>
  );
};

export default SaveQuestion;