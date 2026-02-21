// import {
//   Box,
//   Divider,
//   Heading,
//   Text,
//   Badge,
//   Card,
//   CardBody,
//   VStack,
//   HStack,
//   IconButton,
//   Flex,
//   Tooltip,
//   Icon,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Spinner,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   useDisclosure,
//   Progress,
//   Grid,
//   GridItem,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// import CollapseEx from "./CreateTest";
// import { GrCheckboxSelected } from "react-icons/gr";
// import {
//   AddIcon,
//   MinusIcon,
//   LockIcon,
//   CheckCircleIcon,
//   ChevronRightIcon,
//   InfoIcon,
//   RepeatIcon,
// } from "@chakra-ui/icons";
// import { FaBook, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import {
//   isTestUnlocked,
//   isSubcategoryUnlocked,
//   getTestScore,
//   isSubcategoryCompleted,
//   isCategoryCompleted,
//   getSubcategoryStats,
// } from "../helpers/testProgressHelper";
// import UserTestDataList from "./UserTestDataList";

// const MathQuestionlist = ({
//   category,
//   chooseSub,
//   currentSub: currentSubProp,
//   setQuestions,
//   handleFullScreen,
//   settestTitle,
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);
//   const [totalques, settotalques] = useState(false);
//   const [currentSub, setCurrentSub] = useState("");
//   const [MathSubject, setMathSubject] = useState("");
//   const [h, seth] = useState([]);
//   const [selectallstate, setselectallstate] = useState(false);
//   const [directTest, setdirectTest] = useState([]);
//   const [check, setcheck] = useState(false);
//   const [currentTopic, setcurrentTopic] = useState([]);
//   const [dataTypeWiseTest, setdataTypeWiseTest] = useState([]);
//   const [data, setdata] = useState([]);
//   const [list, setlist] = useState([]);
//   const [totaltestno, settotaltestno] = useState(10);
//   const [quslist, setquslist] = useState([]);
//   const [name, setname] = useState("Test");
//   const [sum, setsum] = useState(0);
//   const [noOfQus, setnoOfQus] = useState(3);
//   const [categoryCompleted, setCategoryCompleted] = useState(false);
//   const [categoryData, setCategoryData] = useState([]);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [Vocabularydata] = useState([
//     "One Word Substitution",
//     "Idioms",
//     "Antonyms",
//     "Synonyms",
//     "Phrasal Verbs",
//   ]);
//   const [sscCglMathsSyllabus] = useState([
//     "Number System",
//     "L.C.M and H.C.F",
//     "Surds and Indices",
//     "Algebraic Identities",
//     "Percentage",
//     "Profit and Loss",
//     "Simple Interest",
//     "Compound Interest",
//     "Average",
//     "Ratio and Proportion",
//     "Partnership",
//     "Problems with Ages",
//     "Time and Distance",
//     "Pipe and Cistern",
//     "Mixture and Alligation",
//     "Problems based on Train, Boat, and Stream",
//     "Mensuration 2D & 3D",
//     "Coordinate Geometry",
//     "Trigonometry",
//     "Data Interpretation",
//     "General Studies",
//   ]);

//   const [englishTopics] = useState([
//     "Spot the Error",
//     "Reading Comprehension",
//     "Synonyms",
//     "Antonyms",
//     "Fill in the Blanks",
//     "Sentence Improvement",
//     "Spotting Errors",
//     "Para Jumbles",
//     "Idioms & Phrases",
//     "One Word Substitution",
//     "Active and Passive Voice",
//     "Direct and Indirect Speech",
//     "Cloze Test",
//     "Sentence Completion",
//     "Vocabulary",
//     "Prepositions",
//     "Articles",
//     "Tenses",
//     "Subject-Verb Agreement",
//     "Phrasal Verbs",
//   ]);

//   const [mathtwo] = useState([
//     "Average Wala",
//     "mathtwo",
//     "Police and Thief",
//     "Time and Distance (Meeting Wala)",
//     "Time and distance basic",
//     "Train Wala (Relative Speed)",
//   ]);
//   const [Gs] = useState(["Vedic age", "Polity", "Ancient History"]);
//   const navigate = useNavigate();

//   const getTopicListForCategory = (categorySub) => {
//     const hh = getLocalStorage("cat");

//     if (categorySub === "mathtwo") {
//       return mathtwo;
//     } else if (categorySub === "Eng" && hh == null) {
//       return englishTopics;
//     } else if (categorySub === "math") {
//       return sscCglMathsSyllabus;
//     } else if (categorySub === "gs") {
//       return Gs;
//     } else if (categorySub === "vocabulary") {
//       return Vocabularydata;
//     }
//     return [];
//   };

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setIsLoading(true);

//       try {
//         const savedCurrentSub = getLocalStorage("currentCategoryView");
//         const currentCategory = savedCurrentSub || currentSubProp;

//         console.log("Initial Load - Setting currentSub:", currentCategory);
//         setCurrentSub(currentCategory);

//         const savedMathSubject = getLocalStorage("currentSubcategoryView");

//         console.log("Loading data:", {
//           savedCurrentSub,
//           currentSubProp,
//           currentCategory,
//           savedMathSubject,
//         });

//         let categoryDataToUse = [];

//         if (category && category.length > 0) {
//           categoryDataToUse = category;
//           setLocalStorage("questiondata", category);
//           setLocalStorage("fullCategoryData_" + currentCategory, category);
//         } else {
//           const savedQuestionData = getLocalStorage("questiondata");
//           const savedFullCategoryData = getLocalStorage(
//             "fullCategoryData_" + currentCategory,
//           );

//           categoryDataToUse = savedFullCategoryData || savedQuestionData || [];

//           console.log("Restored from localStorage:", {
//             questionDataLength: savedQuestionData?.length,
//             fullCategoryDataLength: savedFullCategoryData?.length,
//             using: categoryDataToUse.length,
//           });
//         }

//         setCategoryData(categoryDataToUse);

//         const topicList = getTopicListForCategory(currentCategory);
//         setcurrentTopic(topicList);

//         console.log("Topic list:", {
//           currentCategory,
//           topicListLength: topicList.length,
//         });

//         if (savedMathSubject && topicList.includes(savedMathSubject)) {
//           console.log("Restoring subcategory view:", savedMathSubject);
//           setMathSubject(savedMathSubject);
//         } else if (savedMathSubject && !topicList.includes(savedMathSubject)) {
//           console.log("Invalid subcategory, clearing:", savedMathSubject);
//           setMathSubject("");
//           localStorage.removeItem("currentSubcategoryView");
//         } else {
//           console.log("No subcategory, staying in category view");
//           setMathSubject("");
//         }

//         const savedTests = getLocalStorage("allTypeWiseTests");
//         if (savedTests) {
//           console.log(savedTests, "in");
//           setdataTypeWiseTest(savedTests);
//         }

//         const completionStatus = isCategoryCompleted(currentCategory);
//         setCategoryCompleted(completionStatus);

//         await new Promise((resolve) => setTimeout(resolve, 300));
//       } catch (error) {
//         console.error("Error loading data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     if (currentSub) {
//       console.log("Saving currentSub to localStorage:", currentSub);
//       setLocalStorage("currentCategoryView", currentSub);
//     }
//   }, [currentSub]);

//   useEffect(() => {
//     if (currentSubProp && currentSubProp !== currentSub) {
//       console.log("Syncing currentSub from prop:", currentSubProp);
//       setCurrentSub(currentSubProp);
//     }
//   }, [currentSubProp]);

//   useEffect(() => {
//     if (MathSubject) {
//       setLocalStorage("currentSubcategoryView", MathSubject);
//     } else {
//       localStorage.removeItem("currentSubcategoryView");
//     }
//   }, [MathSubject]);

//   useEffect(() => {
//     console.log("=== Current State ===", {
//       currentSub,
//       MathSubject,
//       categoryDataLength: categoryData.length,
//       currentTopicLength: currentTopic.length,
//       savedCurrentSub: getLocalStorage("currentCategoryView"),
//       savedMathSubject: getLocalStorage("currentSubcategoryView"),
//     });
//   }, [currentSub, MathSubject, categoryData, currentTopic]);

//   useEffect(() => {
//     if (category && category.length > 0 && currentSub) {
//       console.log(
//         "Category prop updated, length:",
//         category.length,
//         "for:",
//         currentSub,
//       );
//       setCategoryData(category);
//       setLocalStorage("questiondata", category);
//       setLocalStorage("fullCategoryData_" + currentSub, category);

//       const topicList = getTopicListForCategory(currentSub);
//       setcurrentTopic(topicList);

//       if (topicList.length > 0) {
//         setLocalStorage("topicList_" + currentSub, topicList);
//         setLocalStorage("currentTopicList_" + currentSub, topicList);
//       }

//       const subcategoryData = {};
//       topicList.forEach((topic) => {
//         const testsForTopic = category.filter((item) => item.topic === topic);
//         if (testsForTopic.length > 0) {
//           subcategoryData[topic] = testsForTopic;
//         }
//       });
//       setLocalStorage("subcategoryData_" + currentSub, subcategoryData);

//       setCategoryCompleted(isCategoryCompleted(currentSub));
//     }
//   }, [category, currentSub]);

//   useEffect(() => {
//     const savedTests = getLocalStorage("allTypeWiseTests");
//     if (savedTests) {
//       setdataTypeWiseTest(savedTests);
//     }
//   }, [name]);

//   const maketest = (qus, full, sec) => {
//     setQuestions(qus);
//     handleFullScreen(full);
//     settestTitle(sec);
//     navigate("/test");
//   };

//   const getCategoryDisplayName = () => {
//     const categoryNames = {
//       Eng: "English",
//       math: "Mathematics",
//       gs: "General Studies",
//       vocabulary: "Vocabulary",
//       mathtwo: "Math Advanced",
//       Reasoning: "Reasoning",
//     };
//     return categoryNames[currentSub] || currentSub;
//   };

//   const updateCounter = (index, operation) => {
//     setquslist((prevQuslist) => {
//       let newQuslist = [...prevQuslist];
//       const currentItem = newQuslist[index];
//       const updatedItem = {
//         ...currentItem,
//         count:
//           operation === "increment"
//             ? currentItem.count + 1
//             : Math.max(1, currentItem.count - 1),
//       };

//       newQuslist[index] = updatedItem;

//       const totalQuestions = newQuslist.reduce(
//         (acc, item) => acc + item.count,
//         0,
//       );

//       if (totalQuestions > noOfQus) {
//         let diff = totalQuestions - noOfQus;
//         let adjustmentIndex = 0;

//         while (diff > 0 && adjustmentIndex < newQuslist.length) {
//           if (newQuslist[adjustmentIndex].count > 1) {
//             newQuslist[adjustmentIndex].count -= 1;
//             diff--;
//           }
//           adjustmentIndex++;
//         }
//       }

//       return newQuslist;
//     });
//   };

//   const [devidedqus, setdevidedqus] = useState();
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const [allquestotaltaketest, setallquestotaltaketest] = useState([]);

//   const findtotal = () => {
//     const dataToUse =
//       categoryData.length > 0
//         ? categoryData
//         : getLocalStorage("questiondata") || [];

//     if (!dataToUse || !Array.isArray(dataToUse)) {
//       console.error("Category data is missing or invalid.");
//       return;
//     }

//     let filtered = dataToUse.filter((e) => e.topic === MathSubject);
//     let total = filtered.reduce((sum, e) => sum + e.question.length, 0);
//     let totalSections = filtered.length;

//     setTotalQuestions(total);

//     if (totalSections === 0) {
//       setdevidedqus([]);
//       return;
//     }

//     let baseCount = Math.floor(total / totalSections);
//     let extra = total % totalSections;
//     let distribution = filtered.map((e) =>
//       Math.min(e.question.length, baseCount),
//     );

//     for (let i = 0; i < extra; i++) {
//       if (distribution[i] < filtered[i].question.length) {
//         distribution[i] += 1;
//       }
//     }
//     let newState = { ...allquestotaltaketest };

//     setdevidedqus(distribution);

//     filtered.forEach((e, i) => {
//       e.question.slice(0, distribution[i]).forEach((item, index) => {
//         newState[`question_${i}_${index}`] = item;
//       });
//     });

//     setallquestotaltaketest(newState);

//     let result = filtered.map((e, i) => ({
//       section: e.topic,
//       totalQuestions: e.question.length,
//       assignedQuestions: distribution[i],
//     }));
//   };

//   const setq = async () => {
//     const questionData = getLocalStorage("questiondata");
//     const p = questionData.filter((e) => list.includes(e.topic));
//     let dd = [];
//     quslist.forEach((e, i) => {
//       const g = p[i].question.slice(0, e.count);
//       dd = [...dd, ...g];
//     });
//     const testobj = {
//       testName: name,
//       quslist: quslist,
//       noOfQus: noOfQus,
//       questions: dd,
//       createdAt: new Date().toISOString(),
//       category: currentSub,
//       subcategory: MathSubject,
//     };
//     const f = getLocalStorage("allTypeWiseTests");

//     if (f != null) {
//       setLocalStorage("allTypeWiseTests", [...f, testobj]);
//       setdataTypeWiseTest([...f, testobj]);
//     } else {
//       setLocalStorage("allTypeWiseTests", [testobj]);
//       setdataTypeWiseTest([testobj]);
//     }

//     maketest(dd, true, "Test 1");
//   };

//   useEffect(() => {
//     if (list.length > 0) {
//       const totalQuestions = list.length;
//       const baseCount = Math.floor(noOfQus / totalQuestions);
//       const remainder = noOfQus % totalQuestions;

//       const updatedQuslist = list.map((item, index) => ({
//         count: index === 0 ? baseCount + remainder : baseCount,
//         qusdata: item,
//       }));

//       setquslist(updatedQuslist);
//     }
//   }, [list, noOfQus]);

//   const handleTestClick = (testData, testIndex) => {
//     const unlocked = isTestUnlocked(currentSub, MathSubject, testIndex);

//     if (unlocked) {
//       setLocalStorage("currentTestIndex", testIndex);
//       setLocalStorage("currentSubcategory", MathSubject);
//       setLocalStorage("currentCategory", currentSub);
//       maketest(testData.question, true, testData.section);
//     }
//   };

//   const handleSubcategoryClick = async (topic, topicIndex) => {
//     const unlocked = isSubcategoryUnlocked(currentSub, topicIndex);

//     if (unlocked) {
//       setIsSubcategoryLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 600));
//       setMathSubject(topic);
//       setIsSubcategoryLoading(false);
//     }
//   };

//   const getSubcategoryCompletionStatus = (subcategory) => {
//     const dataToUse =
//       categoryData.length > 0
//         ? categoryData
//         : getLocalStorage("questiondata") || [];
//     const tests = dataToUse.filter((e) => e.topic === subcategory);
//     if (tests.length === 0) return false;

//     return isSubcategoryCompleted(currentSub, subcategory, tests.length);
//   };

//   const handleCreatedTestClick = (test, index) => {
//     const testResults = getLocalStorage(`testResult_${index}`) || {};

//     setSelectedTest({
//       ...test,
//       index: index,
//       results: testResults,
//     });
//     onOpen();
//   };

//   const handleRetakeTest = () => {
//     if (selectedTest) {
//       maketest(selectedTest.questions, true, selectedTest.testName);
//       onClose();
//     }
//   };

//   const getTestStatistics = (test) => {
//     if (!test.results || !test.results.score) {
//       return {
//         attempted: 0,
//         correct: 0,
//         incorrect: 0,
//         skipped: test.noOfQus || 0,
//         score: 0,
//         percentage: 0,
//       };
//     }

//     const totalQuestions = test.noOfQus || test.questions?.length || 0;
//     const correctAnswers = test.results.correctAnswers || 0;
//     const incorrectAnswers = test.results.incorrectAnswers || 0;
//     const attempted = correctAnswers + incorrectAnswers;
//     const skipped = totalQuestions - attempted;
//     const percentage =
//       totalQuestions > 0
//         ? Math.round((correctAnswers / totalQuestions) * 100)
//         : 0;

//     return {
//       attempted,
//       correct: correctAnswers,
//       incorrect: incorrectAnswers,
//       skipped,
//       score: test.results.score || 0,
//       percentage,
//     };
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

//           <Flex direction="column" align="center" gap={2}>
//             <Text
//               color="#2d3748"
//               fontSize="24px"
//               fontWeight="700"
//               letterSpacing="0.5px"
//             >
//               Loading {getCategoryDisplayName()}
//             </Text>
//             <Text color="#718096" fontSize="14px" fontWeight="400">
//               Please wait...
//             </Text>
//           </Flex>

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

//   if (isSubcategoryLoading) {
//     return (
//       <Box
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         bg="white"
//       >
//         <Flex direction="column" align="center" gap={6}>
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

//           <Flex direction="column" align="center" gap={2}>
//             <Text
//               color="#2d3748"
//               fontSize="24px"
//               fontWeight="700"
//               letterSpacing="0.5px"
//             >
//               Loading Tests
//             </Text>
//             <Text color="#718096" fontSize="14px" fontWeight="400">
//               Preparing your questions...
//             </Text>
//           </Flex>

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
//     <Box minH="100vh" bg="#f8f9fa" py={8} px={4}>
//       <Flex
//         gap={6}
//         maxW="1400px"
//         mx="auto"
//         direction={{ base: "column", lg: "row" }}
//       >
//         {/* Main Content Area */}
//         <Box flex="1">
//           {/* Breadcrumb */}
//           <Box mb={4}>
//             <Breadcrumb
//               spacing="8px"
//               separator={<ChevronRightIcon color="gray.500" />}
//               fontSize="14px"
//             >
//               <BreadcrumbItem>
//                 <BreadcrumbLink
//                   onClick={() => {
//                     setMathSubject("");
//                     localStorage.removeItem("currentSubcategoryView");
//                     navigate("/");
//                   }}
//                   color="blue.600"
//                   fontWeight="500"
//                   _hover={{ color: "blue.700", textDecoration: "underline" }}
//                   cursor="pointer"
//                 >
//                   Home
//                 </BreadcrumbLink>
//               </BreadcrumbItem>

//               {currentSub && (
//                 <BreadcrumbItem>
//                   <BreadcrumbLink
//                     onClick={() => {
//                       if (MathSubject) {
//                         setMathSubject("");
//                         localStorage.removeItem("currentSubcategoryView");
//                       }
//                     }}
//                     color={MathSubject ? "blue.600" : "gray.700"}
//                     fontWeight="500"
//                     _hover={
//                       MathSubject
//                         ? { color: "blue.700", textDecoration: "underline" }
//                         : {}
//                     }
//                     cursor={MathSubject ? "pointer" : "default"}
//                     isCurrentPage={!MathSubject}
//                   >
//                     {getCategoryDisplayName()}
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//               )}

//               {MathSubject && (
//                 <BreadcrumbItem isCurrentPage>
//                   <BreadcrumbLink color="gray.700" fontWeight="500">
//                     {MathSubject}
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//               )}
//             </Breadcrumb>
//           </Box>

//           <Card
//             bg="white"
//             shadow="sm"
//             borderRadius="8px"
//             overflow="hidden"
//             border="1px solid"
//             borderColor="gray.300"
//           >
//             <Box
//               bg="white"
//               p={6}
//               borderBottom="1px solid"
//               borderColor="gray.300"
//             >
//               <Heading
//                 size="lg"
//                 fontWeight="600"
//                 color="gray.800"
//                 letterSpacing="-0.5px"
//               >
//                 {MathSubject !== "" ? MathSubject : getCategoryDisplayName()}
//               </Heading>
//               <Text fontSize="sm" mt={1} color="gray.500">
//                 {MathSubject
//                   ? "Select a test to begin or create a custom test"
//                   : "Choose a topic to get started"}
//               </Text>
//             </Box>

//             <CardBody p={6} bg="#fafbfc">
//               {(categoryCompleted || MathSubject !== "") && (
//                 <CollapseEx
//                   seth={seth}
//                   sum={sum}
//                   setdirecttest={setdirectTest}
//                   directTest={directTest}
//                   h={h}
//                   selectallstate={selectallstate}
//                   setselectallstate={setselectallstate}
//                   setcheck={setcheck}
//                   check={check}
//                   maketest={maketest}
//                   MathSubject={MathSubject}
//                   category={
//                     categoryData.length > 0
//                       ? categoryData
//                       : getLocalStorage("questiondata") || []
//                   }
//                   findtotal={findtotal}
//                   settotalques={settotalques}
//                   totalques={totalques}
//                   setlist={setlist}
//                   settotaltestno={settotaltestno}
//                   setq={setq}
//                   setname={setname}
//                   setnoOfQus={setnoOfQus}
//                   currentSub={currentSub}
//                 />
//               )}

//               {!categoryCompleted && MathSubject === "" && (
//                 <Box
//                   bg="blue.50"
//                   border="1px solid"
//                   borderColor="blue.200"
//                   borderRadius="6px"
//                   p={4}
//                   mb={4}
//                 >
//                   <Text fontSize="sm" color="blue.700" fontWeight="500">
//                     ℹ️ Complete all subcategories to unlock direct test creation
//                     from this category
//                   </Text>
//                 </Box>
//               )}

//               <VStack spacing={3} mt={4} align="stretch">
//                 {quslist.length > 0 ? (
//                   quslist.map((e, i) => (
//                     <Box
//                       key={i}
//                       bg="white"
//                       border="1px solid"
//                       borderColor="gray.300"
//                       borderRadius="6px"
//                       p={4}
//                       transition="all 0.2s"
//                       _hover={{
//                         borderColor: "blue.400",
//                         shadow: "sm",
//                       }}
//                     >
//                       <Flex justify="space-between" align="center">
//                         <Text fontWeight="500" fontSize="15px" color="gray.700">
//                           {e.qusdata}
//                         </Text>
//                         <HStack spacing={2}>
//                           <IconButton
//                             icon={<MinusIcon />}
//                             size="sm"
//                             variant="outline"
//                             borderColor="gray.300"
//                             color="gray.600"
//                             borderRadius="4px"
//                             onClick={() => updateCounter(i, "decrement")}
//                             _hover={{
//                               bg: "gray.50",
//                               borderColor: "gray.400",
//                             }}
//                           />
//                           <Box
//                             px={4}
//                             py={1}
//                             fontWeight="600"
//                             fontSize="15px"
//                             color="gray.700"
//                             minW="45px"
//                             textAlign="center"
//                             bg="gray.50"
//                             borderRadius="4px"
//                           >
//                             {e.count}
//                           </Box>
//                           <IconButton
//                             icon={<AddIcon />}
//                             size="sm"
//                             variant="outline"
//                             borderColor="gray.300"
//                             color="gray.600"
//                             borderRadius="4px"
//                             onClick={() => updateCounter(i, "increment")}
//                             _hover={{
//                               bg: "gray.50",
//                               borderColor: "gray.400",
//                             }}
//                           />
//                         </HStack>
//                       </Flex>
//                     </Box>
//                   ))
//                 ) : (
//                   <VStack spacing={2} align="stretch">
//                     {MathSubject ? (
//                       (() => {
//                         const dataToUse =
//                           categoryData.length > 0
//                             ? categoryData
//                             : getLocalStorage("questiondata") || [];
//                         return dataToUse.map((e, k) => {
//                           if (e.topic !== MathSubject) return null;

//                           const subcategoryTests = dataToUse.filter(
//                             (test) => test.topic === MathSubject,
//                           );
//                           const testIndex = subcategoryTests.findIndex(
//                             (test) => test.section === e.section,
//                           );

//                           const unlocked = isTestUnlocked(
//                             currentSub,
//                             MathSubject,
//                             testIndex,
//                           );
//                           const testScore = getTestScore(
//                             currentSub,
//                             MathSubject,
//                             testIndex,
//                           );

//                           return (
//                             <Tooltip
//                               key={k}
//                               label={
//                                 !unlocked
//                                   ? "Score 80%+ on previous test to unlock"
//                                   : ""
//                               }
//                               placement="top"
//                               hasArrow
//                             >
//                               <Box
//                                 bg={unlocked ? "white" : "gray.50"}
//                                 border="1px solid"
//                                 borderColor={unlocked ? "gray.300" : "gray.200"}
//                                 borderRadius="6px"
//                                 p={4}
//                                 transition="all 0.2s"
//                                 opacity={unlocked ? 1 : 0.6}
//                                 cursor={unlocked ? "pointer" : "not-allowed"}
//                                 _hover={
//                                   unlocked
//                                     ? {
//                                         borderColor: "blue.400",
//                                         bg: "gray.50",
//                                       }
//                                     : {}
//                                 }
//                                 onClick={() => handleTestClick(e, testIndex)}
//                               >
//                                 <Flex justify="space-between" align="center">
//                                   <HStack spacing={2}>
//                                     {!unlocked && (
//                                       <LockIcon color="gray.400" boxSize={4} />
//                                     )}
//                                     <Text
//                                       fontWeight="500"
//                                       fontSize="15px"
//                                       color={unlocked ? "gray.700" : "gray.400"}
//                                     >
//                                       {e.section}
//                                     </Text>
//                                   </HStack>
//                                   <HStack spacing={3}>
//                                     {testScore && (
//                                       <Badge
//                                         colorScheme={
//                                           testScore.completed
//                                             ? "green"
//                                             : "orange"
//                                         }
//                                         fontSize="12px"
//                                         px={2}
//                                         py={1}
//                                         borderRadius="4px"
//                                         fontWeight="500"
//                                       >
//                                         {testScore.score}%
//                                       </Badge>
//                                     )}
//                                     {check && unlocked && (
//                                       <Box
//                                         onClick={(event) => {
//                                           event.stopPropagation();
//                                           setdirectTest([...directTest, e]);
//                                           setsum(sum + e.question.length);
//                                           seth((prev) =>
//                                             prev.includes(k)
//                                               ? prev.filter(
//                                                   (item) => item !== k,
//                                                 )
//                                               : [...prev, k],
//                                           );
//                                         }}
//                                         cursor="pointer"
//                                         transition="all 0.2s"
//                                         _hover={{ opacity: 0.7 }}
//                                       >
//                                         <GrCheckboxSelected
//                                           size={18}
//                                           color={
//                                             h?.includes(k) || selectallstate
//                                               ? "#3182ce"
//                                               : "#a0aec0"
//                                           }
//                                         />
//                                       </Box>
//                                     )}
//                                     <Badge
//                                       bg="gray.100"
//                                       color="gray.700"
//                                       fontSize="13px"
//                                       px={3}
//                                       py={1}
//                                       borderRadius="4px"
//                                       fontWeight="500"
//                                     >
//                                       {e.question.length}
//                                     </Badge>
//                                   </HStack>
//                                 </Flex>
//                               </Box>
//                             </Tooltip>
//                           );
//                         });
//                       })()
//                     ) : (
//                       <>
//                         {currentTopic === null || currentTopic.length === 0 ? (
//                           <>
//                             {data.map((e, i) => (
//                               <Box
//                                 key={i}
//                                 bg="white"
//                                 border="1px solid"
//                                 borderColor="gray.300"
//                                 borderRadius="6px"
//                                 p={4}
//                                 cursor="pointer"
//                                 transition="all 0.2s"
//                                 _hover={{
//                                   borderColor: "blue.400",
//                                   bg: "gray.50",
//                                 }}
//                                 onClick={() =>
//                                   maketest(e.question, true, e.section)
//                                 }
//                               >
//                                 <Text
//                                   fontWeight="500"
//                                   fontSize="15px"
//                                   color="gray.700"
//                                 >
//                                   {e.section}
//                                 </Text>
//                               </Box>
//                             ))}
//                           </>
//                         ) : (
//                           currentTopic.map((topic, i) => {
//                             const unlocked = isSubcategoryUnlocked(
//                               currentSub,
//                               i,
//                             );
//                             const completed =
//                               getSubcategoryCompletionStatus(topic);
//                             const stats = getSubcategoryStats(
//                               currentSub,
//                               topic,
//                             );

//                             return (
//                               <Tooltip
//                                 key={i}
//                                 label={
//                                   !unlocked
//                                     ? "Complete previous subcategory to unlock"
//                                     : ""
//                                 }
//                                 placement="top"
//                                 hasArrow
//                               >
//                                 <Box
//                                   bg={unlocked ? "white" : "gray.50"}
//                                   border="1px solid"
//                                   borderColor={
//                                     unlocked ? "gray.300" : "gray.200"
//                                   }
//                                   borderRadius="6px"
//                                   p={4}
//                                   cursor={unlocked ? "pointer" : "not-allowed"}
//                                   transition="all 0.2s"
//                                   opacity={unlocked ? 1 : 0.6}
//                                   _hover={
//                                     unlocked
//                                       ? {
//                                           borderColor: "blue.400",
//                                           bg: "gray.50",
//                                         }
//                                       : {}
//                                   }
//                                   onClick={() =>
//                                     handleSubcategoryClick(topic, i)
//                                   }
//                                 >
//                                   <Flex justify="space-between" align="center">
//                                     <HStack spacing={2}>
//                                       {!unlocked && (
//                                         <LockIcon
//                                           color="gray.400"
//                                           boxSize={4}
//                                         />
//                                       )}
//                                       <VStack align="start" spacing={0}>
//                                         <Text
//                                           fontWeight="500"
//                                           fontSize="15px"
//                                           color={
//                                             unlocked ? "gray.700" : "gray.400"
//                                           }
//                                         >
//                                           {topic}
//                                         </Text>
//                                         {stats.totalQuestions > 0 && (
//                                           <Text fontSize="xs" color="gray.500">
//                                             {stats.totalCorrect} /{" "}
//                                             {stats.totalQuestions} correct
//                                             {stats.percentage > 0 && (
//                                               <Text
//                                                 as="span"
//                                                 ml={1}
//                                                 fontWeight="600"
//                                                 color={
//                                                   stats.percentage >= 80
//                                                     ? "green.600"
//                                                     : stats.percentage >= 60
//                                                       ? "orange.600"
//                                                       : "red.600"
//                                                 }
//                                               >
//                                                 ({stats.percentage}%)
//                                               </Text>
//                                             )}
//                                           </Text>
//                                         )}
//                                       </VStack>
//                                     </HStack>
//                                     {completed && (
//                                       <Badge
//                                         colorScheme="green"
//                                         fontSize="12px"
//                                         px={2}
//                                         py={1}
//                                         borderRadius="4px"
//                                         fontWeight="500"
//                                         display="flex"
//                                         alignItems="center"
//                                         gap={1}
//                                       >
//                                         <CheckCircleIcon boxSize={3} />
//                                         Completed
//                                       </Badge>
//                                     )}
//                                   </Flex>
//                                 </Box>
//                               </Tooltip>
//                             );
//                           })
//                         )}
//                       </>
//                     )}
//                   </VStack>
//                 )}
//               </VStack>
//             </CardBody>
//           </Card>
//         </Box>

//         {/* Sidebar - Created Tests & API Tests */}
//         <Box
//           w={{ base: "full", lg: "340px" }}
//           display={{ base: "none", md: "block" }}
//         >
//           <Card
//             bg="white"
//             shadow="sm"
//             borderRadius="8px"
//             overflow="hidden"
//             border="1px solid"
//             borderColor="gray.300"
//             position="sticky"
//             top="20px"
//           >
//             <Tabs colorScheme="purple" variant="soft-rounded">
//               <Box
//                 px={5}
//                 pt={5}
//                 pb={3}
//                 borderBottom="1px solid"
//                 borderColor="gray.300"
//               >
//                 <TabList gap={2}>
//                   <Tab
//                     fontSize="sm"
//                     fontWeight="500"
//                     px={3}
//                     py={2}
//                     _selected={{ bg: "purple.600", color: "white" }}
//                   >
//                     Created Tests
//                   </Tab>
//                   <Tab
//                     fontSize="sm"
//                     fontWeight="500"
//                     px={3}
//                     py={2}
//                     _selected={{ bg: "purple.600", color: "white" }}
//                   >
//                     Completed Tests
//                   </Tab>
//                 </TabList>
//               </Box>

//               <TabPanels>
//                 {/* Created Tests Tab */}
//                 <TabPanel p={0}>
//                   <CardBody
//                     p={0}
//                     maxH="calc(100vh - 280px)"
//                     overflowY="auto"
//                     bg="#fafbfc"
//                   >
//                     {dataTypeWiseTest && dataTypeWiseTest.length > 0 ? (
//                       <VStack spacing={0} align="stretch">
//                         {dataTypeWiseTest.map((e, i) => {
//                           const stats = getTestStatistics(e);
//                           return (
//                             <Box
//                               key={i}
//                               p={4}
//                               borderBottom="1px solid"
//                               borderColor="gray.200"
//                               transition="all 0.2s"
//                               cursor="pointer"
//                               _hover={{
//                                 bg: "gray.50",
//                               }}
//                               _last={{
//                                 borderBottom: "none",
//                               }}
//                               onClick={() => handleCreatedTestClick(e, i)}
//                             >
//                               <Flex
//                                 justify="space-between"
//                                 align="start"
//                                 mb={2}
//                               >
//                                 <Text
//                                   fontWeight="500"
//                                   fontSize="15px"
//                                   color="gray.800"
//                                 >
//                                   {e.testName || "Unnamed Test"}
//                                 </Text>
//                                 <IconButton
//                                   icon={<InfoIcon />}
//                                   size="xs"
//                                   variant="ghost"
//                                   colorScheme="blue"
//                                   aria-label="View details"
//                                 />
//                               </Flex>
//                               <HStack spacing={2} mb={2}>
//                                 <Badge
//                                   bg="blue.50"
//                                   color="blue.700"
//                                   fontSize="12px"
//                                   px={2}
//                                   py={1}
//                                   borderRadius="4px"
//                                   fontWeight="500"
//                                 >
//                                   {e.noOfQus || 0} Questions
//                                 </Badge>
//                                 {stats.percentage > 0 && (
//                                   <Badge
//                                     colorScheme={
//                                       stats.percentage >= 80
//                                         ? "green"
//                                         : stats.percentage >= 60
//                                           ? "orange"
//                                           : "red"
//                                     }
//                                     fontSize="12px"
//                                     px={2}
//                                     py={1}
//                                     borderRadius="4px"
//                                     fontWeight="500"
//                                   >
//                                     {stats.percentage}%
//                                   </Badge>
//                                 )}
//                               </HStack>
//                               {stats.percentage > 0 && (
//                                 <Progress
//                                   value={stats.percentage}
//                                   size="xs"
//                                   colorScheme={
//                                     stats.percentage >= 80
//                                       ? "green"
//                                       : stats.percentage >= 60
//                                         ? "orange"
//                                         : "red"
//                                   }
//                                   borderRadius="full"
//                                 />
//                               )}
//                             </Box>
//                           );
//                         })}
//                       </VStack>
//                     ) : (
//                       <Box p={8} textAlign="center">
//                         <Text color="gray.400" fontSize="14px" fontWeight="500">
//                           No tests created yet
//                         </Text>
//                         <Text color="gray.400" fontSize="13px" mt={2}>
//                           Create your first test to get started
//                         </Text>
//                       </Box>
//                     )}
//                   </CardBody>
//                 </TabPanel>

//                 {/* Completed Tests Tab */}
//                 <TabPanel p={0}>
//                   <CardBody
//                     p={0}
//                     maxH="calc(100vh - 280px)"
//                     overflowY="auto"
//                     bg="#fafbfc"
//                   >
//                     <UserTestDataList />
//                   </CardBody>
//                 </TabPanel>
//               </TabPanels>
//             </Tabs>
//           </Card>
//         </Box>
//       </Flex>

//       {/* Test Details Modal */}
//       <Modal isOpen={isOpen} onClose={onClose} size="xl">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader borderBottom="1px solid" borderColor="gray.200">
//             <VStack align="start" spacing={1}>
//               <Text fontSize="lg" fontWeight="600">
//                 {selectedTest?.testName || "Test Details"}
//               </Text>
//               {selectedTest?.createdAt && (
//                 <Text fontSize="sm" color="gray.500" fontWeight="400">
//                   Created:{" "}
//                   {new Date(selectedTest.createdAt).toLocaleDateString()}
//                 </Text>
//               )}
//             </VStack>
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody py={6}>
//             {selectedTest &&
//               (() => {
//                 const stats = getTestStatistics(selectedTest);
//                 return (
//                   <VStack spacing={5} align="stretch">
//                     {stats.percentage > 0 && (
//                       <Box>
//                         <Text
//                           fontSize="sm"
//                           fontWeight="600"
//                           color="gray.700"
//                           mb={3}
//                         >
//                           Performance Overview
//                         </Text>
//                         <Box
//                           bg={
//                             stats.percentage >= 80
//                               ? "green.50"
//                               : stats.percentage >= 60
//                                 ? "orange.50"
//                                 : "red.50"
//                           }
//                           border="1px solid"
//                           borderColor={
//                             stats.percentage >= 80
//                               ? "green.200"
//                               : stats.percentage >= 60
//                                 ? "orange.200"
//                                 : "red.200"
//                           }
//                           borderRadius="8px"
//                           p={4}
//                         >
//                           <Flex justify="space-between" align="center" mb={2}>
//                             <Text
//                               fontSize="2xl"
//                               fontWeight="700"
//                               color={
//                                 stats.percentage >= 80
//                                   ? "green.700"
//                                   : stats.percentage >= 60
//                                     ? "orange.700"
//                                     : "red.700"
//                               }
//                             >
//                               {stats.percentage}%
//                             </Text>
//                             <Badge
//                               colorScheme={
//                                 stats.percentage >= 80
//                                   ? "green"
//                                   : stats.percentage >= 60
//                                     ? "orange"
//                                     : "red"
//                               }
//                               fontSize="md"
//                               px={3}
//                               py={1}
//                               borderRadius="6px"
//                             >
//                               {stats.percentage >= 80
//                                 ? "Excellent"
//                                 : stats.percentage >= 60
//                                   ? "Good"
//                                   : "Needs Improvement"}
//                             </Badge>
//                           </Flex>
//                           <Progress
//                             value={stats.percentage}
//                             size="sm"
//                             colorScheme={
//                               stats.percentage >= 80
//                                 ? "green"
//                                 : stats.percentage >= 60
//                                   ? "orange"
//                                   : "red"
//                             }
//                             borderRadius="full"
//                           />
//                         </Box>
//                       </Box>
//                     )}

//                     <Box>
//                       <Text
//                         fontSize="sm"
//                         fontWeight="600"
//                         color="gray.700"
//                         mb={3}
//                       >
//                         Detailed Statistics
//                       </Text>
//                       <Grid templateColumns="repeat(2, 1fr)" gap={3}>
//                         <GridItem>
//                           <Box
//                             bg="blue.50"
//                             border="1px solid"
//                             borderColor="blue.200"
//                             borderRadius="8px"
//                             p={4}
//                             textAlign="center"
//                           >
//                             <Text
//                               fontSize="sm"
//                               color="blue.600"
//                               fontWeight="500"
//                               mb={1}
//                             >
//                               Total Questions
//                             </Text>
//                             <Text
//                               fontSize="2xl"
//                               fontWeight="700"
//                               color="blue.700"
//                             >
//                               {selectedTest.noOfQus || 0}
//                             </Text>
//                           </Box>
//                         </GridItem>
//                         <GridItem>
//                           <Box
//                             bg="purple.50"
//                             border="1px solid"
//                             borderColor="purple.200"
//                             borderRadius="8px"
//                             p={4}
//                             textAlign="center"
//                           >
//                             <Text
//                               fontSize="sm"
//                               color="purple.600"
//                               fontWeight="500"
//                               mb={1}
//                             >
//                               Attempted
//                             </Text>
//                             <Text
//                               fontSize="2xl"
//                               fontWeight="700"
//                               color="purple.700"
//                             >
//                               {stats.attempted}
//                             </Text>
//                           </Box>
//                         </GridItem>
//                         <GridItem>
//                           <Box
//                             bg="green.50"
//                             border="1px solid"
//                             borderColor="green.200"
//                             borderRadius="8px"
//                             p={4}
//                             textAlign="center"
//                           >
//                             <Flex align="center" justify="center" mb={1}>
//                               <FaCheckCircle color="#48BB78" size={14} />
//                               <Text
//                                 fontSize="sm"
//                                 color="green.600"
//                                 fontWeight="500"
//                                 ml={1}
//                               >
//                                 Correct
//                               </Text>
//                             </Flex>
//                             <Text
//                               fontSize="2xl"
//                               fontWeight="700"
//                               color="green.700"
//                             >
//                               {stats.correct}
//                             </Text>
//                           </Box>
//                         </GridItem>
//                         <GridItem>
//                           <Box
//                             bg="red.50"
//                             border="1px solid"
//                             borderColor="red.200"
//                             borderRadius="8px"
//                             p={4}
//                             textAlign="center"
//                           >
//                             <Flex align="center" justify="center" mb={1}>
//                               <FaTimesCircle color="#F56565" size={14} />
//                               <Text
//                                 fontSize="sm"
//                                 color="red.600"
//                                 fontWeight="500"
//                                 ml={1}
//                               >
//                                 Incorrect
//                               </Text>
//                             </Flex>
//                             <Text
//                               fontSize="2xl"
//                               fontWeight="700"
//                               color="red.700"
//                             >
//                               {stats.incorrect}
//                             </Text>
//                           </Box>
//                         </GridItem>
//                       </Grid>
//                     </Box>

//                     {selectedTest.quslist &&
//                       selectedTest.quslist.length > 0 && (
//                         <Box>
//                           <Text
//                             fontSize="sm"
//                             fontWeight="600"
//                             color="gray.700"
//                             mb={3}
//                           >
//                             Topics Covered ({selectedTest.quslist.length})
//                           </Text>
//                           <VStack spacing={2} align="stretch">
//                             {selectedTest.quslist.map((topic, idx) => (
//                               <Flex
//                                 key={idx}
//                                 justify="space-between"
//                                 align="center"
//                                 bg="gray.50"
//                                 p={3}
//                                 borderRadius="6px"
//                                 border="1px solid"
//                                 borderColor="gray.200"
//                               >
//                                 <Text
//                                   fontSize="sm"
//                                   color="gray.700"
//                                   fontWeight="500"
//                                 >
//                                   {topic.qusdata}
//                                 </Text>
//                                 <Badge
//                                   bg="gray.200"
//                                   color="gray.700"
//                                   fontSize="xs"
//                                   px={2}
//                                   py={1}
//                                   borderRadius="4px"
//                                 >
//                                   {topic.count} questions
//                                 </Badge>
//                               </Flex>
//                             ))}
//                           </VStack>
//                         </Box>
//                       )}

//                     {(selectedTest.category || selectedTest.subcategory) && (
//                       <Box>
//                         <Text
//                           fontSize="sm"
//                           fontWeight="600"
//                           color="gray.700"
//                           mb={3}
//                         >
//                           Test Information
//                         </Text>
//                         <VStack spacing={2} align="stretch">
//                           {selectedTest.category && (
//                             <Flex justify="space-between" align="center">
//                               <Text fontSize="sm" color="gray.600">
//                                 Category:
//                               </Text>
//                               <Badge
//                                 colorScheme="blue"
//                                 fontSize="sm"
//                                 px={3}
//                                 py={1}
//                               >
//                                 {selectedTest.category}
//                               </Badge>
//                             </Flex>
//                           )}
//                           {selectedTest.subcategory && (
//                             <Flex justify="space-between" align="center">
//                               <Text fontSize="sm" color="gray.600">
//                                 Subcategory:
//                               </Text>
//                               <Badge
//                                 colorScheme="purple"
//                                 fontSize="sm"
//                                 px={3}
//                                 py={1}
//                               >
//                                 {selectedTest.subcategory}
//                               </Badge>
//                             </Flex>
//                           )}
//                         </VStack>
//                       </Box>
//                     )}
//                   </VStack>
//                 );
//               })()}
//           </ModalBody>

//           <ModalFooter borderTop="1px solid" borderColor="gray.200">
//             <Button variant="ghost" mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button
//               colorScheme="blue"
//               leftIcon={<RepeatIcon />}
//               onClick={handleRetakeTest}
//             >
//               Retake Test
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default MathQuestionlist;

import {
  Box,
  Divider,
  Heading,
  Text,
  Badge,
  Card,
  CardBody,
  VStack,
  HStack,
  IconButton,
  Flex,
  Tooltip,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Progress,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import CollapseEx from "./CreateTest";
import { GrCheckboxSelected } from "react-icons/gr";
import {
  AddIcon,
  MinusIcon,
  LockIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  InfoIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { FaBook, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
  isTestUnlocked,
  isSubcategoryUnlocked,
  getTestScore,
  isSubcategoryCompleted,
  isCategoryCompleted,
  getSubcategoryStats,
} from "../helpers/testProgressHelper";
import UserTestDataList from "./UserTestDataList";

const MathQuestionlist = ({
  category,
  chooseSub,
  currentSub: currentSubProp,
  setQuestions,
  handleFullScreen,
  settestTitle,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);
  const [totalques, settotalques] = useState(false);
  const [currentSub, setCurrentSub] = useState("");
  const [MathSubject, setMathSubject] = useState("");
  const [h, seth] = useState([]);
  const [selectallstate, setselectallstate] = useState(false);
  const [directTest, setdirectTest] = useState([]);
  const [check, setcheck] = useState(false);
  const [currentTopic, setcurrentTopic] = useState([]);
  const [dataTypeWiseTest, setdataTypeWiseTest] = useState([]);
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([]);
  const [totaltestno, settotaltestno] = useState(10);
  const [quslist, setquslist] = useState([]);
  const [name, setname] = useState("Test");
  const [sum, setsum] = useState(0);
  const [noOfQus, setnoOfQus] = useState(3);
  const [categoryCompleted, setCategoryCompleted] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [Vocabularydata] = useState([
    "One Word Substitution",
    "Idioms",
    "Antonyms",
    "Synonyms",
    "Phrasal Verbs",
  ]);
  const [sscCglMathsSyllabus] = useState([
    "Number System",
    "L.C.M and H.C.F",
    "Surds and Indices",
    "Algebraic Identities",
    "Percentage",
    "Profit and Loss",
    "Simple Interest",
    "Compound Interest",
    "Average",
    "Ratio and Proportion",
    "Partnership",
    "Problems with Ages",
    "Time and Distance",
    "Pipe and Cistern",
    "Mixture and Alligation",
    "Problems based on Train, Boat, and Stream",
    "Mensuration 2D & 3D",
    "Coordinate Geometry",
    "Trigonometry",
    "Data Interpretation",
    "General Studies",
  ]);

  const [englishTopics] = useState([
    "Spot the Error",
    "Reading Comprehension",
    "Synonyms",
    "Antonyms",
    "Fill in the Blanks",
    "Sentence Improvement",
    "Spotting Errors",
    "Para Jumbles",
    "Idioms & Phrases",
    "One Word Substitution",
    "Active and Passive Voice",
    "Direct and Indirect Speech",
    "Cloze Test",
    "Sentence Completion",
    "Vocabulary",
    "Prepositions",
    "Articles",
    "Tenses",
    "Subject-Verb Agreement",
    "Phrasal Verbs",
  ]);

  const [mathtwo] = useState([
    "Average Wala",
    "mathtwo",
    "Police and Thief",
    "Time and Distance (Meeting Wala)",
    "Time and distance basic",
    "Train Wala (Relative Speed)",
  ]);
  const [Gs] = useState(["Vedic age", "Polity", "Ancient History"]);
  const [Reasoning] = useState([
    "Logical Reasoning",
    "Analytical Reasoning",
    "Verbal Reasoning",
    "Non-Verbal Reasoning",
    "Blood Relations",
    "Coding-Decoding",
    "Puzzles",
    "Seating Arrangement",
    "Syllogism",
    "Data Sufficiency",
  ]);
  const navigate = useNavigate();

  const getTopicListForCategory = (categorySub) => {
    const hh = getLocalStorage("cat");

    if (categorySub === "mathtwo") {
      return mathtwo;
    } else if (categorySub === "Eng" && hh == null) {
      return englishTopics;
    } else if (categorySub === "math") {
      return sscCglMathsSyllabus;
    } else if (categorySub === "gs") {
      return Gs;
    } else if (categorySub === "vocabulary") {
      return Vocabularydata;
    } else if (categorySub === "Reasoning") {
      return Reasoning;
    }
    return [];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);

      try {
        const savedCurrentSub = getLocalStorage("currentCategoryView");
        const currentCategory = savedCurrentSub || currentSubProp;

        console.log("Initial Load - Setting currentSub:", currentCategory);
        setCurrentSub(currentCategory);

        const savedMathSubject = getLocalStorage("currentSubcategoryView");

        console.log("Loading data:", {
          savedCurrentSub,
          currentSubProp,
          currentCategory,
          savedMathSubject,
        });

        let categoryDataToUse = [];

        if (category && category.length > 0) {
          categoryDataToUse = category;
          setLocalStorage("questiondata", category);
          setLocalStorage("fullCategoryData_" + currentCategory, category);
        } else {
          const savedQuestionData = getLocalStorage("questiondata");
          const savedFullCategoryData = getLocalStorage(
            "fullCategoryData_" + currentCategory,
          );

          categoryDataToUse = savedFullCategoryData || savedQuestionData || [];

          console.log("Restored from localStorage:", {
            questionDataLength: savedQuestionData?.length,
            fullCategoryDataLength: savedFullCategoryData?.length,
            using: categoryDataToUse.length,
          });
        }

        setCategoryData(categoryDataToUse);

        const topicList = getTopicListForCategory(currentCategory);
        setcurrentTopic(topicList);

        console.log("Topic list:", {
          currentCategory,
          topicListLength: topicList.length,
        });

        if (savedMathSubject && topicList.includes(savedMathSubject)) {
          console.log("Restoring subcategory view:", savedMathSubject);
          setMathSubject(savedMathSubject);
        } else if (savedMathSubject && !topicList.includes(savedMathSubject)) {
          console.log("Invalid subcategory, clearing:", savedMathSubject);
          setMathSubject("");
          localStorage.removeItem("currentSubcategoryView");
        } else {
          console.log("No subcategory, staying in category view");
          setMathSubject("");
        }

        const savedTests = getLocalStorage("allTypeWiseTests");
        if (savedTests) {
          console.log(savedTests, "in");
          setdataTypeWiseTest(savedTests);
        }

        const completionStatus = isCategoryCompleted(currentCategory);
        setCategoryCompleted(completionStatus);

        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (currentSub) {
      console.log("Saving currentSub to localStorage:", currentSub);
      setLocalStorage("currentCategoryView", currentSub);
    }
  }, [currentSub]);

  useEffect(() => {
    if (currentSubProp && currentSubProp !== currentSub) {
      console.log("Syncing currentSub from prop:", currentSubProp);
      setCurrentSub(currentSubProp);
    }
  }, [currentSubProp]);

  useEffect(() => {
    if (MathSubject) {
      setLocalStorage("currentSubcategoryView", MathSubject);
    } else {
      localStorage.removeItem("currentSubcategoryView");
    }
  }, [MathSubject]);

  useEffect(() => {
    console.log("=== Current State ===", {
      currentSub,
      MathSubject,
      categoryDataLength: categoryData.length,
      currentTopicLength: currentTopic.length,
      savedCurrentSub: getLocalStorage("currentCategoryView"),
      savedMathSubject: getLocalStorage("currentSubcategoryView"),
    });
  }, [currentSub, MathSubject, categoryData, currentTopic]);

  useEffect(() => {
    if (category && category.length > 0 && currentSub) {
      console.log(
        "Category prop updated, length:",
        category.length,
        "for:",
        currentSub,
      );
      setCategoryData(category);
      setLocalStorage("questiondata", category);
      setLocalStorage("fullCategoryData_" + currentSub, category);

      const topicList = getTopicListForCategory(currentSub);
      setcurrentTopic(topicList);

      if (topicList.length > 0) {
        setLocalStorage("topicList_" + currentSub, topicList);
        setLocalStorage("currentTopicList_" + currentSub, topicList);
      }

      const subcategoryData = {};
      topicList.forEach((topic) => {
        const testsForTopic = category.filter((item) => item.topic === topic);
        if (testsForTopic.length > 0) {
          subcategoryData[topic] = testsForTopic;
        }
      });
      setLocalStorage("subcategoryData_" + currentSub, subcategoryData);

      setCategoryCompleted(isCategoryCompleted(currentSub));
    }
  }, [category, currentSub]);

  useEffect(() => {
    const savedTests = getLocalStorage("allTypeWiseTests");
    if (savedTests) {
      setdataTypeWiseTest(savedTests);
    }
  }, [name]);

  const maketest = (qus, full, sec) => {
    setQuestions(qus);
    handleFullScreen(full);
    settestTitle(sec);
    navigate("/test");
  };

  const getCategoryDisplayName = () => {
    const categoryNames = {
      Eng: "English",
      math: "Mathematics",
      gs: "General Studies",
      vocabulary: "Vocabulary",
      mathtwo: "Math Advanced",
      Reasoning: "Reasoning",
    };
    return categoryNames[currentSub] || currentSub;
  };

  const updateCounter = (index, operation) => {
    setquslist((prevQuslist) => {
      let newQuslist = [...prevQuslist];
      const currentItem = newQuslist[index];
      const updatedItem = {
        ...currentItem,
        count:
          operation === "increment"
            ? currentItem.count + 1
            : Math.max(1, currentItem.count - 1),
      };

      newQuslist[index] = updatedItem;

      const totalQuestions = newQuslist.reduce(
        (acc, item) => acc + item.count,
        0,
      );

      if (totalQuestions > noOfQus) {
        let diff = totalQuestions - noOfQus;
        let adjustmentIndex = 0;

        while (diff > 0 && adjustmentIndex < newQuslist.length) {
          if (newQuslist[adjustmentIndex].count > 1) {
            newQuslist[adjustmentIndex].count -= 1;
            diff--;
          }
          adjustmentIndex++;
        }
      }

      return newQuslist;
    });
  };

  const [devidedqus, setdevidedqus] = useState();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [allquestotaltaketest, setallquestotaltaketest] = useState([]);

  const findtotal = () => {
    const dataToUse =
      categoryData.length > 0
        ? categoryData
        : getLocalStorage("questiondata") || [];

    if (!dataToUse || !Array.isArray(dataToUse)) {
      console.error("Category data is missing or invalid.");
      return;
    }

    let filtered = dataToUse.filter((e) => e.topic === MathSubject);
    let total = filtered.reduce((sum, e) => sum + e.question.length, 0);
    let totalSections = filtered.length;

    setTotalQuestions(total);

    if (totalSections === 0) {
      setdevidedqus([]);
      return;
    }

    let baseCount = Math.floor(total / totalSections);
    let extra = total % totalSections;
    let distribution = filtered.map((e) =>
      Math.min(e.question.length, baseCount),
    );

    for (let i = 0; i < extra; i++) {
      if (distribution[i] < filtered[i].question.length) {
        distribution[i] += 1;
      }
    }
    let newState = { ...allquestotaltaketest };

    setdevidedqus(distribution);

    filtered.forEach((e, i) => {
      e.question.slice(0, distribution[i]).forEach((item, index) => {
        newState[`question_${i}_${index}`] = item;
      });
    });

    setallquestotaltaketest(newState);

    let result = filtered.map((e, i) => ({
      section: e.topic,
      totalQuestions: e.question.length,
      assignedQuestions: distribution[i],
    }));
  };

  const setq = async () => {
    const questionData = getLocalStorage("questiondata");
    const p = questionData.filter((e) => list.includes(e.topic));
    let dd = [];
    quslist.forEach((e, i) => {
      const g = p[i].question.slice(0, e.count);
      dd = [...dd, ...g];
    });
    const testobj = {
      testName: name,
      quslist: quslist,
      noOfQus: noOfQus,
      questions: dd,
      createdAt: new Date().toISOString(),
      category: currentSub,
      subcategory: MathSubject,
    };
    const f = getLocalStorage("allTypeWiseTests");

    if (f != null) {
      setLocalStorage("allTypeWiseTests", [...f, testobj]);
      setdataTypeWiseTest([...f, testobj]);
    } else {
      setLocalStorage("allTypeWiseTests", [testobj]);
      setdataTypeWiseTest([testobj]);
    }

    maketest(dd, true, "Test 1");
  };

  useEffect(() => {
    if (list.length > 0) {
      const totalQuestions = list.length;
      const baseCount = Math.floor(noOfQus / totalQuestions);
      const remainder = noOfQus % totalQuestions;

      const updatedQuslist = list.map((item, index) => ({
        count: index === 0 ? baseCount + remainder : baseCount,
        qusdata: item,
      }));

      setquslist(updatedQuslist);
    }
  }, [list, noOfQus]);

  const handleTestClick = (testData, testIndex) => {
    const unlocked = isTestUnlocked(currentSub, MathSubject, testIndex);

    if (unlocked) {
      setLocalStorage("currentTestIndex", testIndex);
      setLocalStorage("currentSubcategory", MathSubject);
      setLocalStorage("currentCategory", currentSub);
      maketest(testData.question, true, testData.section);
    }
  };

  const handleSubcategoryClick = async (topic, topicIndex) => {
    const unlocked = isSubcategoryUnlocked(currentSub, topicIndex);

    if (unlocked) {
      setIsSubcategoryLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMathSubject(topic);
      setIsSubcategoryLoading(false);
    }
  };

  const getSubcategoryCompletionStatus = (subcategory) => {
    const dataToUse =
      categoryData.length > 0
        ? categoryData
        : getLocalStorage("questiondata") || [];
    const tests = dataToUse.filter((e) => e.topic === subcategory);
    if (tests.length === 0) return false;

    return isSubcategoryCompleted(currentSub, subcategory, tests.length);
  };

  const handleCreatedTestClick = (test, index) => {
    const testResults = getLocalStorage(`testResult_${index}`) || {};

    setSelectedTest({
      ...test,
      index: index,
      results: testResults,
    });
    onOpen();
  };

  const handleRetakeTest = () => {
    if (selectedTest) {
      maketest(selectedTest.questions, true, selectedTest.testName);
      onClose();
    }
  };

  const getTestStatistics = (test) => {
    if (!test.results || !test.results.score) {
      return {
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: test.noOfQus || 0,
        score: 0,
        percentage: 0,
      };
    }

    const totalQuestions = test.noOfQus || test.questions?.length || 0;
    const correctAnswers = test.results.correctAnswers || 0;
    const incorrectAnswers = test.results.incorrectAnswers || 0;
    const attempted = correctAnswers + incorrectAnswers;
    const skipped = totalQuestions - attempted;
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return {
      attempted,
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      skipped,
      score: test.results.score || 0,
      percentage,
    };
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

          <Flex direction="column" align="center" gap={2}>
            <Text
              color="#2d3748"
              fontSize="24px"
              fontWeight="700"
              letterSpacing="0.5px"
            >
              Loading {getCategoryDisplayName()}
            </Text>
            <Text color="#718096" fontSize="14px" fontWeight="400">
              Please wait...
            </Text>
          </Flex>

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

  if (isSubcategoryLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
      >
        <Flex direction="column" align="center" gap={6}>
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

          <Flex direction="column" align="center" gap={2}>
            <Text
              color="#2d3748"
              fontSize="24px"
              fontWeight="700"
              letterSpacing="0.5px"
            >
              Loading Tests
            </Text>
            <Text color="#718096" fontSize="14px" fontWeight="400">
              Preparing your questions...
            </Text>
          </Flex>

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
    <Box minH="100vh" bg="#f8f9fa" py={8} px={4}>
      <Flex
        gap={6}
        maxW="1400px"
        mx="auto"
        direction={{ base: "column", lg: "row" }}
      >
        {/* Main Content Area */}
        <Box flex="1">
          {/* Breadcrumb */}
          <Box mb={4}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontSize="14px"
            >
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    setMathSubject("");
                    localStorage.removeItem("currentSubcategoryView");
                    navigate("/");
                  }}
                  color="blue.600"
                  fontWeight="500"
                  _hover={{ color: "blue.700", textDecoration: "underline" }}
                  cursor="pointer"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              {currentSub && (
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => {
                      if (MathSubject) {
                        setMathSubject("");
                        localStorage.removeItem("currentSubcategoryView");
                      }
                    }}
                    color={MathSubject ? "blue.600" : "gray.700"}
                    fontWeight="500"
                    _hover={
                      MathSubject
                        ? { color: "blue.700", textDecoration: "underline" }
                        : {}
                    }
                    cursor={MathSubject ? "pointer" : "default"}
                    isCurrentPage={!MathSubject}
                  >
                    {getCategoryDisplayName()}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}

              {MathSubject && (
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color="gray.700" fontWeight="500">
                    {MathSubject}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </Breadcrumb>
          </Box>

          <Card
            bg="white"
            shadow="sm"
            borderRadius="8px"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.300"
          >
            <Box
              bg="white"
              p={6}
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              <Heading
                size="lg"
                fontWeight="600"
                color="gray.800"
                letterSpacing="-0.5px"
              >
                {MathSubject !== "" ? MathSubject : getCategoryDisplayName()}
              </Heading>
              <Text fontSize="sm" mt={1} color="gray.500">
                {MathSubject
                  ? "Select a test to begin or create a custom test"
                  : "Choose a topic to get started"}
              </Text>
            </Box>

            <CardBody p={6} bg="#fafbfc">
              {(categoryCompleted || MathSubject !== "") && (
                <CollapseEx
                  seth={seth}
                  sum={sum}
                  setdirecttest={setdirectTest}
                  directTest={directTest}
                  h={h}
                  selectallstate={selectallstate}
                  setselectallstate={setselectallstate}
                  setcheck={setcheck}
                  check={check}
                  maketest={maketest}
                  MathSubject={MathSubject}
                  category={
                    categoryData.length > 0
                      ? categoryData
                      : getLocalStorage("questiondata") || []
                  }
                  findtotal={findtotal}
                  settotalques={settotalques}
                  totalques={totalques}
                  setlist={setlist}
                  settotaltestno={settotaltestno}
                  setq={setq}
                  setname={setname}
                  setnoOfQus={setnoOfQus}
                  currentSub={currentSub}
                />
              )}

              {!categoryCompleted && MathSubject === "" && (
                <Box
                  bg="blue.50"
                  border="1px solid"
                  borderColor="blue.200"
                  borderRadius="6px"
                  p={4}
                  mb={4}
                >
                  <Text fontSize="sm" color="blue.700" fontWeight="500">
                    ℹ️ Complete all subcategories to unlock direct test creation
                    from this category
                  </Text>
                </Box>
              )}

              <VStack spacing={3} mt={4} align="stretch">
                {quslist.length > 0 ? (
                  quslist.map((e, i) => (
                    <Box
                      key={i}
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="6px"
                      p={4}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: "blue.400",
                        shadow: "sm",
                      }}
                    >
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="500" fontSize="15px" color="gray.700">
                          {e.qusdata}
                        </Text>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<MinusIcon />}
                            size="sm"
                            variant="outline"
                            borderColor="gray.300"
                            color="gray.600"
                            borderRadius="4px"
                            onClick={() => updateCounter(i, "decrement")}
                            _hover={{
                              bg: "gray.50",
                              borderColor: "gray.400",
                            }}
                          />
                          <Box
                            px={4}
                            py={1}
                            fontWeight="600"
                            fontSize="15px"
                            color="gray.700"
                            minW="45px"
                            textAlign="center"
                            bg="gray.50"
                            borderRadius="4px"
                          >
                            {e.count}
                          </Box>
                          <IconButton
                            icon={<AddIcon />}
                            size="sm"
                            variant="outline"
                            borderColor="gray.300"
                            color="gray.600"
                            borderRadius="4px"
                            onClick={() => updateCounter(i, "increment")}
                            _hover={{
                              bg: "gray.50",
                              borderColor: "gray.400",
                            }}
                          />
                        </HStack>
                      </Flex>
                    </Box>
                  ))
                ) : (
                  <VStack spacing={2} align="stretch">
                    {MathSubject ? (
                      (() => {
                        const dataToUse =
                          categoryData.length > 0
                            ? categoryData
                            : getLocalStorage("questiondata") || [];
                        return dataToUse.map((e, k) => {
                          if (e.topic !== MathSubject) return null;

                          const subcategoryTests = dataToUse.filter(
                            (test) => test.topic === MathSubject,
                          );
                          const testIndex = subcategoryTests.findIndex(
                            (test) => test.section === e.section,
                          );

                          const unlocked = isTestUnlocked(
                            currentSub,
                            MathSubject,
                            testIndex,
                          );
                          const testScore = getTestScore(
                            currentSub,
                            MathSubject,
                            testIndex,
                          );

                          return (
                            <Tooltip
                              key={k}
                              label={
                                !unlocked
                                  ? "Score 80%+ on previous test to unlock"
                                  : ""
                              }
                              placement="top"
                              hasArrow
                            >
                              <Box
                                bg={unlocked ? "white" : "gray.50"}
                                border="1px solid"
                                borderColor={unlocked ? "gray.300" : "gray.200"}
                                borderRadius="6px"
                                p={4}
                                transition="all 0.2s"
                                opacity={unlocked ? 1 : 0.6}
                                cursor={unlocked ? "pointer" : "not-allowed"}
                                _hover={
                                  unlocked
                                    ? {
                                        borderColor: "blue.400",
                                        bg: "gray.50",
                                      }
                                    : {}
                                }
                                onClick={() => handleTestClick(e, testIndex)}
                              >
                                <Flex justify="space-between" align="center">
                                  <HStack spacing={2}>
                                    {!unlocked && (
                                      <LockIcon color="gray.400" boxSize={4} />
                                    )}
                                    <Text
                                      fontWeight="500"
                                      fontSize="15px"
                                      color={unlocked ? "gray.700" : "gray.400"}
                                    >
                                      {e.section}
                                    </Text>
                                  </HStack>
                                  <HStack spacing={3}>
                                    {testScore && (
                                      <Badge
                                        colorScheme={
                                          testScore.completed
                                            ? "green"
                                            : "orange"
                                        }
                                        fontSize="12px"
                                        px={2}
                                        py={1}
                                        borderRadius="4px"
                                        fontWeight="500"
                                      >
                                        {testScore.score}%
                                      </Badge>
                                    )}
                                    {check && unlocked && (
                                      <Box
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setdirectTest([...directTest, e]);
                                          setsum(sum + e.question.length);
                                          seth((prev) =>
                                            prev.includes(k)
                                              ? prev.filter(
                                                  (item) => item !== k,
                                                )
                                              : [...prev, k],
                                          );
                                        }}
                                        cursor="pointer"
                                        transition="all 0.2s"
                                        _hover={{ opacity: 0.7 }}
                                      >
                                        <GrCheckboxSelected
                                          size={18}
                                          color={
                                            h?.includes(k) || selectallstate
                                              ? "#3182ce"
                                              : "#a0aec0"
                                          }
                                        />
                                      </Box>
                                    )}
                                    <Badge
                                      bg="gray.100"
                                      color="gray.700"
                                      fontSize="13px"
                                      px={3}
                                      py={1}
                                      borderRadius="4px"
                                      fontWeight="500"
                                    >
                                      {e.question.length}
                                    </Badge>
                                  </HStack>
                                </Flex>
                              </Box>
                            </Tooltip>
                          );
                        });
                      })()
                    ) : (
                      <>
                        {currentTopic === null || currentTopic.length === 0 ? (
                          <>
                            {data.map((e, i) => (
                              <Box
                                key={i}
                                bg="white"
                                border="1px solid"
                                borderColor="gray.300"
                                borderRadius="6px"
                                p={4}
                                cursor="pointer"
                                transition="all 0.2s"
                                _hover={{
                                  borderColor: "blue.400",
                                  bg: "gray.50",
                                }}
                                onClick={() =>
                                  maketest(e.question, true, e.section)
                                }
                              >
                                <Text
                                  fontWeight="500"
                                  fontSize="15px"
                                  color="gray.700"
                                >
                                  {e.section}
                                </Text>
                              </Box>
                            ))}
                          </>
                        ) : (
                          currentTopic.map((topic, i) => {
                            const unlocked = isSubcategoryUnlocked(
                              currentSub,
                              i,
                            );
                            const completed =
                              getSubcategoryCompletionStatus(topic);
                            const stats = getSubcategoryStats(
                              currentSub,
                              topic,
                            );

                            return (
                              <Tooltip
                                key={i}
                                label={
                                  !unlocked
                                    ? "Complete previous subcategory to unlock"
                                    : ""
                                }
                                placement="top"
                                hasArrow
                              >
                                <Box
                                  bg={unlocked ? "white" : "gray.50"}
                                  border="1px solid"
                                  borderColor={
                                    unlocked ? "gray.300" : "gray.200"
                                  }
                                  borderRadius="6px"
                                  p={4}
                                  cursor={unlocked ? "pointer" : "not-allowed"}
                                  transition="all 0.2s"
                                  opacity={unlocked ? 1 : 0.6}
                                  _hover={
                                    unlocked
                                      ? {
                                          borderColor: "blue.400",
                                          bg: "gray.50",
                                        }
                                      : {}
                                  }
                                  onClick={() =>
                                    handleSubcategoryClick(topic, i)
                                  }
                                >
                                  <Flex justify="space-between" align="center">
                                    <HStack spacing={2}>
                                      {!unlocked && (
                                        <LockIcon
                                          color="gray.400"
                                          boxSize={4}
                                        />
                                      )}
                                      <VStack align="start" spacing={0}>
                                        <Text
                                          fontWeight="500"
                                          fontSize="15px"
                                          color={
                                            unlocked ? "gray.700" : "gray.400"
                                          }
                                        >
                                          {topic}
                                        </Text>
                                        {stats.totalQuestions > 0 && (
                                          <Text fontSize="xs" color="gray.500">
                                            {stats.totalCorrect} /{" "}
                                            {stats.totalQuestions} correct
                                            {stats.percentage > 0 && (
                                              <Text
                                                as="span"
                                                ml={1}
                                                fontWeight="600"
                                                color={
                                                  stats.percentage >= 80
                                                    ? "green.600"
                                                    : stats.percentage >= 60
                                                      ? "orange.600"
                                                      : "red.600"
                                                }
                                              >
                                                ({stats.percentage}%)
                                              </Text>
                                            )}
                                          </Text>
                                        )}
                                      </VStack>
                                    </HStack>
                                    {completed && (
                                      <Badge
                                        colorScheme="green"
                                        fontSize="12px"
                                        px={2}
                                        py={1}
                                        borderRadius="4px"
                                        fontWeight="500"
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                      >
                                        <CheckCircleIcon boxSize={3} />
                                        Completed
                                      </Badge>
                                    )}
                                  </Flex>
                                </Box>
                              </Tooltip>
                            );
                          })
                        )}
                      </>
                    )}
                  </VStack>
                )}
              </VStack>
            </CardBody>
          </Card>
        </Box>

        {/* Sidebar - Created Tests & API Tests */}
        <Box
          w={{ base: "full", lg: "340px" }}
          display={{ base: "none", md: "block" }}
        >
          <Card
            bg="white"
            shadow="sm"
            borderRadius="8px"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.300"
            position="sticky"
            top="20px"
          >
            <Tabs colorScheme="purple" variant="soft-rounded">
              <Box
                px={5}
                pt={5}
                pb={3}
                borderBottom="1px solid"
                borderColor="gray.300"
              >
                <TabList gap={2}>
                  <Tab
                    fontSize="sm"
                    fontWeight="500"
                    px={3}
                    py={2}
                    _selected={{ bg: "purple.600", color: "white" }}
                  >
                    Created Tests
                  </Tab>
                  {/* <Tab
                    fontSize="sm"
                    fontWeight="500"
                    px={3}
                    py={2}
                    _selected={{ bg: "purple.600", color: "white" }}
                  >
                    Completed Tests
                  </Tab> */}
                </TabList>
              </Box>

              <TabPanels>
                {/* Created Tests Tab */}
                <TabPanel p={0}>
                  <CardBody
                    p={0}
                    maxH="calc(100vh - 280px)"
                    overflowY="auto"
                    bg="#fafbfc"
                  >
                    {dataTypeWiseTest && dataTypeWiseTest.length > 0 ? (
                      <VStack spacing={0} align="stretch">
                        {dataTypeWiseTest.map((e, i) => {
                          const stats = getTestStatistics(e);
                          return (
                            <Box
                              key={i}
                              p={4}
                              borderBottom="1px solid"
                              borderColor="gray.200"
                              transition="all 0.2s"
                              cursor="pointer"
                              _hover={{
                                bg: "gray.50",
                              }}
                              _last={{
                                borderBottom: "none",
                              }}
                              onClick={() => handleCreatedTestClick(e, i)}
                            >
                              <Flex
                                justify="space-between"
                                align="start"
                                mb={2}
                              >
                                <Text
                                  fontWeight="500"
                                  fontSize="15px"
                                  color="gray.800"
                                >
                                  {e.testName || "Unnamed Test"}
                                </Text>
                                <IconButton
                                  icon={<InfoIcon />}
                                  size="xs"
                                  variant="ghost"
                                  colorScheme="blue"
                                  aria-label="View details"
                                />
                              </Flex>
                              <HStack spacing={2} mb={2}>
                                <Badge
                                  bg="blue.50"
                                  color="blue.700"
                                  fontSize="12px"
                                  px={2}
                                  py={1}
                                  borderRadius="4px"
                                  fontWeight="500"
                                >
                                  {e.noOfQus || 0} Questions
                                </Badge>
                                {stats.percentage > 0 && (
                                  <Badge
                                    colorScheme={
                                      stats.percentage >= 80
                                        ? "green"
                                        : stats.percentage >= 60
                                          ? "orange"
                                          : "red"
                                    }
                                    fontSize="12px"
                                    px={2}
                                    py={1}
                                    borderRadius="4px"
                                    fontWeight="500"
                                  >
                                    {stats.percentage}%
                                  </Badge>
                                )}
                              </HStack>
                              {stats.percentage > 0 && (
                                <Progress
                                  value={stats.percentage}
                                  size="xs"
                                  colorScheme={
                                    stats.percentage >= 80
                                      ? "green"
                                      : stats.percentage >= 60
                                        ? "orange"
                                        : "red"
                                  }
                                  borderRadius="full"
                                />
                              )}
                            </Box>
                          );
                        })}
                      </VStack>
                    ) : (
                      <Box p={8} textAlign="center">
                        <Text color="gray.400" fontSize="14px" fontWeight="500">
                          No tests created yet
                        </Text>
                        <Text color="gray.400" fontSize="13px" mt={2}>
                          Create your first test to get started
                        </Text>
                      </Box>
                    )}
                  </CardBody>
                </TabPanel>

                {/* Completed Tests Tab */}
                <TabPanel p={0}>
                  <CardBody
                    p={0}
                    maxH="calc(100vh - 280px)"
                    overflowY="auto"
                    bg="#fafbfc"
                  >
                    <UserTestDataList />
                  </CardBody>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </Box>
      </Flex>

      {/* Test Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid" borderColor="gray.200">
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="600">
                {selectedTest?.testName || "Test Details"}
              </Text>
              {selectedTest?.createdAt && (
                <Text fontSize="sm" color="gray.500" fontWeight="400">
                  Created:{" "}
                  {new Date(selectedTest.createdAt).toLocaleDateString()}
                </Text>
              )}
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {selectedTest &&
              (() => {
                const stats = getTestStatistics(selectedTest);
                return (
                  <VStack spacing={5} align="stretch">
                    {stats.percentage > 0 && (
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="gray.700"
                          mb={3}
                        >
                          Performance Overview
                        </Text>
                        <Box
                          bg={
                            stats.percentage >= 80
                              ? "green.50"
                              : stats.percentage >= 60
                                ? "orange.50"
                                : "red.50"
                          }
                          border="1px solid"
                          borderColor={
                            stats.percentage >= 80
                              ? "green.200"
                              : stats.percentage >= 60
                                ? "orange.200"
                                : "red.200"
                          }
                          borderRadius="8px"
                          p={4}
                        >
                          <Flex justify="space-between" align="center" mb={2}>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color={
                                stats.percentage >= 80
                                  ? "green.700"
                                  : stats.percentage >= 60
                                    ? "orange.700"
                                    : "red.700"
                              }
                            >
                              {stats.percentage}%
                            </Text>
                            <Badge
                              colorScheme={
                                stats.percentage >= 80
                                  ? "green"
                                  : stats.percentage >= 60
                                    ? "orange"
                                    : "red"
                              }
                              fontSize="md"
                              px={3}
                              py={1}
                              borderRadius="6px"
                            >
                              {stats.percentage >= 80
                                ? "Excellent"
                                : stats.percentage >= 60
                                  ? "Good"
                                  : "Needs Improvement"}
                            </Badge>
                          </Flex>
                          <Progress
                            value={stats.percentage}
                            size="sm"
                            colorScheme={
                              stats.percentage >= 80
                                ? "green"
                                : stats.percentage >= 60
                                  ? "orange"
                                  : "red"
                            }
                            borderRadius="full"
                          />
                        </Box>
                      </Box>
                    )}

                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="gray.700"
                        mb={3}
                      >
                        Detailed Statistics
                      </Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <GridItem>
                          <Box
                            bg="blue.50"
                            border="1px solid"
                            borderColor="blue.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Text
                              fontSize="sm"
                              color="blue.600"
                              fontWeight="500"
                              mb={1}
                            >
                              Total Questions
                            </Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="blue.700"
                            >
                              {selectedTest.noOfQus || 0}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem>
                          <Box
                            bg="purple.50"
                            border="1px solid"
                            borderColor="purple.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Text
                              fontSize="sm"
                              color="purple.600"
                              fontWeight="500"
                              mb={1}
                            >
                              Attempted
                            </Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="purple.700"
                            >
                              {stats.attempted}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem>
                          <Box
                            bg="green.50"
                            border="1px solid"
                            borderColor="green.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Flex align="center" justify="center" mb={1}>
                              <FaCheckCircle color="#48BB78" size={14} />
                              <Text
                                fontSize="sm"
                                color="green.600"
                                fontWeight="500"
                                ml={1}
                              >
                                Correct
                              </Text>
                            </Flex>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="green.700"
                            >
                              {stats.correct}
                            </Text>
                          </Box>
                        </GridItem>
                        <GridItem>
                          <Box
                            bg="red.50"
                            border="1px solid"
                            borderColor="red.200"
                            borderRadius="8px"
                            p={4}
                            textAlign="center"
                          >
                            <Flex align="center" justify="center" mb={1}>
                              <FaTimesCircle color="#F56565" size={14} />
                              <Text
                                fontSize="sm"
                                color="red.600"
                                fontWeight="500"
                                ml={1}
                              >
                                Incorrect
                              </Text>
                            </Flex>
                            <Text
                              fontSize="2xl"
                              fontWeight="700"
                              color="red.700"
                            >
                              {stats.incorrect}
                            </Text>
                          </Box>
                        </GridItem>
                      </Grid>
                    </Box>

                    {selectedTest.quslist &&
                      selectedTest.quslist.length > 0 && (
                        <Box>
                          <Text
                            fontSize="sm"
                            fontWeight="600"
                            color="gray.700"
                            mb={3}
                          >
                            Topics Covered ({selectedTest.quslist.length})
                          </Text>
                          <VStack spacing={2} align="stretch">
                            {selectedTest.quslist.map((topic, idx) => (
                              <Flex
                                key={idx}
                                justify="space-between"
                                align="center"
                                bg="gray.50"
                                p={3}
                                borderRadius="6px"
                                border="1px solid"
                                borderColor="gray.200"
                              >
                                <Text
                                  fontSize="sm"
                                  color="gray.700"
                                  fontWeight="500"
                                >
                                  {topic.qusdata}
                                </Text>
                                <Badge
                                  bg="gray.200"
                                  color="gray.700"
                                  fontSize="xs"
                                  px={2}
                                  py={1}
                                  borderRadius="4px"
                                >
                                  {topic.count} questions
                                </Badge>
                              </Flex>
                            ))}
                          </VStack>
                        </Box>
                      )}

                    {(selectedTest.category || selectedTest.subcategory) && (
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="gray.700"
                          mb={3}
                        >
                          Test Information
                        </Text>
                        <VStack spacing={2} align="stretch">
                          {selectedTest.category && (
                            <Flex justify="space-between" align="center">
                              <Text fontSize="sm" color="gray.600">
                                Category:
                              </Text>
                              <Badge
                                colorScheme="blue"
                                fontSize="sm"
                                px={3}
                                py={1}
                              >
                                {selectedTest.category}
                              </Badge>
                            </Flex>
                          )}
                          {selectedTest.subcategory && (
                            <Flex justify="space-between" align="center">
                              <Text fontSize="sm" color="gray.600">
                                Subcategory:
                              </Text>
                              <Badge
                                colorScheme="purple"
                                fontSize="sm"
                                px={3}
                                py={1}
                              >
                                {selectedTest.subcategory}
                              </Badge>
                            </Flex>
                          )}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                );
              })()}
          </ModalBody>

          <ModalFooter borderTop="1px solid" borderColor="gray.200">
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<RepeatIcon />}
              onClick={handleRetakeTest}
            >
              Retake Test
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MathQuestionlist;