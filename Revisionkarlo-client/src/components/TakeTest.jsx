// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Center,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   Flex,
//   Grid,
//   Heading,
//   Radio,
//   RadioGroup,
//   Text,
//   useDisclosure,
//   useMediaQuery,
//   VStack,
//   HStack,
//   useToast,
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
// } from "@chakra-ui/react";
// import ModalPause from "./ModalPause";
// import { useNavigate } from "react-router-dom";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// import { useDispatch } from "react-redux";
// import {
//   userTestDataApi,
//   userTestFetchDataApi,
// } from "../redux/userTestData/userTestData_ActionType.js";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import ReportQuestionDropdown from "./ReportQuestionDropdown.jsx";
// import { saveTestScore } from "../helpers/testProgressHelper";
// import { getCookies } from "../helpers/cookies.jsx";

// const TakeTest = ({ quest, handleFullScreen }) => {
//   const [currentquestion, setcurrentquestion] = useState(0);
//   const shuffleArray = (arr) => [...arr]?.sort(() => Math.random() - 0.5);

//   const effectiveQuest =
//     quest && quest.length > 0
//       ? quest
//       : getLocalStorage("savedTestQuestions") || [];
//   const shuffledQuest = shuffleArray(effectiveQuest);
//   const [question] = useState(shuffledQuest);

//   const [answeredQuestion, setAnsweredQuestion] = useState([]);
//   const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
//   const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
//   const [notAnswer, setNotAnswer] = useState([]);
//   const [answer, setans] = useState(null);
//   const [wrongans, setwrong] = useState(0);
//   const [wrongansqus, setwrongansqus] = useState([]);
//   const [allAns, setAllAns] = useState({});
//   const [mark, setMark] = useState(0);
//   const [isMobile] = useMediaQuery("(max-width: 768px)");
//   const [correctQus, setcorrectQus] = useState([]);
//   const dispatch = useDispatch();

//   // COUNT UP timer (single subcategory)
//   const [hour, sethour] = useState(0);
//   const [min, setmin] = useState(0);
//   const [sec, setsec] = useState(0);

//   // COUNTDOWN timer (multiple subcategories)
//   const [reversehour, setreversehour] = useState(0);
//   const [reversemin, setreversemin] = useState(0);
//   const [reversesec, setreversesec] = useState(0);

//   const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
//   const [size, setSize] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();

//   const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
//   const cancelSubmitRef = React.useRef();

//   const [isFullscreenActive, setIsFullscreenActive] = useState(false);
//   const [hasExitedFullscreen, setHasExitedFullscreen] = useState(false);

//   const [collectAns, setcollectAns] = useState([[]]);
//   const [correctAns, setCorrectAns] = useState([]);
//   const navigate = useNavigate();
//   const [testData, setTestData] = useState({
//     allAnswer: null,
//     answeredQuestion: null,
//     notAnswer: null,
//     markedAndAnswer: null,
//     markedNotAnswer: null,
//   });

//   // Initialize time based on Testdata from localStorage
//   useEffect(() => {
//     const Testdata = getLocalStorage("Testdata") || [];
//     const totalQuestions = question.length;

//     console.log("=== Timer Initialization ===", {
//       TestdataLength: Testdata.length,
//       totalQuestions: totalQuestions,
//       Testdata: Testdata,
//     });

//     if (Testdata.length > 1) {
//       // Multiple subcategories: COUNTDOWN timer
//       const calculatedTimeInSeconds = totalQuestions * 30;
//       setTotalTimeInSeconds(calculatedTimeInSeconds);

//       const totalHours = Math.floor(calculatedTimeInSeconds / 3600);
//       const totalMinutes = Math.floor((calculatedTimeInSeconds % 3600) / 60);
//       const totalSeconds = calculatedTimeInSeconds % 60;

//       setreversehour(totalHours);
//       setreversemin(totalMinutes);
//       setreversesec(totalSeconds);

//       console.log("✅ MULTIPLE SUBCATEGORIES - COUNTDOWN FROM:", {
//         subcategories: Testdata.length,
//         totalQuestions: totalQuestions,
//         startTime: `${totalHours}:${totalMinutes}:${totalSeconds}`,
//         totalSeconds: calculatedTimeInSeconds,
//       });
//     } else {
//       // Single subcategory: COUNT UP from 0
//       sethour(0);
//       setmin(0);
//       setsec(0);

//       console.log("✅ SINGLE SUBCATEGORY - COUNT UP FROM 00:00:00");
//     }
//   }, [question.length]);

//   // Prevent fullscreen exit and navigation
//   useEffect(() => {
//     let isRequestingFullscreen = false;

//     const requestFullscreen = async () => {
//       if (isRequestingFullscreen) return;
//       isRequestingFullscreen = true;
//       const elem = document.documentElement;

//       try {
//         if (elem.requestFullscreen) {
//           await elem.requestFullscreen();
//         } else if (elem.webkitRequestFullscreen) {
//           await elem.webkitRequestFullscreen();
//         } else if (elem.msRequestFullscreen) {
//           await elem.msRequestFullscreen();
//         }
//         setIsFullscreenActive(true);
//       } catch (error) {
//         console.log("Fullscreen request failed:", error);
//         if (hasExitedFullscreen) {
//           toast({
//             title: "Fullscreen Required",
//             description:
//               "Please click anywhere on the screen to re-enter fullscreen mode.",
//             status: "warning",
//             duration: 5000,
//             isClosable: true,
//             position: "top",
//           });
//         }
//       } finally {
//         isRequestingFullscreen = false;
//       }
//     };

//     const handleFullscreenChange = () => {
//       const isCurrentlyFullscreen = !!(
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.msFullscreenElement
//       );

//       if (!isCurrentlyFullscreen && isFullscreenActive) {
//         setIsFullscreenActive(false);
//         setHasExitedFullscreen(true);

//         toast({
//           title: "Fullscreen Exited",
//           description:
//             "Click anywhere to re-enter fullscreen mode. You must stay in fullscreen during the test.",
//           status: "warning",
//           duration: 5000,
//           isClosable: true,
//           position: "top",
//         });
//       } else if (isCurrentlyFullscreen) {
//         setIsFullscreenActive(true);
//       }
//     };

//     const handleClickToFullscreen = () => {
//       if (!isFullscreenActive && hasExitedFullscreen && !isMobile) {
//         requestFullscreen();
//       }
//     };

//     const handleBackButton = (e) => {
//       e.preventDefault();
//       window.history.pushState(null, "", window.location.href);
//       toast({
//         title: "Navigation Blocked",
//         description:
//           "You cannot go back during the test. Please submit to exit.",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//     };

//     const handleBeforeUnload = (e) => {
//       e.preventDefault();
//       e.returnValue =
//         "Are you sure you want to leave? Your test progress may be lost.";
//       return e.returnValue;
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//     document.addEventListener("MSFullscreenChange", handleFullscreenChange);
//     document.addEventListener("click", handleClickToFullscreen);

//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handleBackButton);
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener(
//         "webkitfullscreenchange",
//         handleFullscreenChange,
//       );
//       document.removeEventListener(
//         "MSFullscreenChange",
//         handleFullscreenChange,
//       );
//       document.removeEventListener("click", handleClickToFullscreen);
//       window.removeEventListener("popstate", handleBackButton);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isMobile, isFullscreenActive, hasExitedFullscreen]);

//   // Prevent right-click context menu
//   useEffect(() => {
//     const handleContextMenu = (e) => {
//       e.preventDefault();
//       return false;
//     };

//     document.addEventListener("contextmenu", handleContextMenu);
//     return () => {
//       document.removeEventListener("contextmenu", handleContextMenu);
//     };
//   }, []);

//   // Prevent common keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "F11") {
//         e.preventDefault();
//       }
//       if (e.key === "Escape") {
//         e.preventDefault();
//       }
//       if (e.altKey && e.key === "F4") {
//         e.preventDefault();
//       }
//       if (e.ctrlKey && e.key === "w") {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const handlequestion = (con) => {
//     if (con === "svn") {
//       if (
//         answer !== null &&
//         allAns[currentquestion] !== undefined &&
//         !answeredQuestion.includes(currentquestion)
//       ) {
//         if (markedNotAnswer.includes(currentquestion)) {
//           let removeFromMarkedNotAnswer =
//             markedNotAnswer.indexOf(currentquestion);
//           markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
//         }

//         if (notAnswer.includes(currentquestion)) {
//           let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
//           notAnswer.splice(removeFromNotAnswer, 1);
//         }

//         if (markedAndAnswer.includes(currentquestion)) {
//           let removeFromMarkedAndAnswer =
//             markedAndAnswer.indexOf(currentquestion);
//           markedAndAnswer.splice(removeFromMarkedAndAnswer, 1);
//         }

//         setAnsweredQuestion([...answeredQuestion, currentquestion]);

//         if (question.length - 1 > currentquestion) {
//           setcurrentquestion(currentquestion + 1);
//         }
//       } else if (allAns[currentquestion] === undefined && answer === null) {
//         if (!notAnswer.includes(currentquestion)) {
//           if (markedNotAnswer.includes(currentquestion)) {
//             let removeFromMarkedNotAnswer =
//               markedNotAnswer.indexOf(currentquestion);
//             markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
//           }
//           if (markedAndAnswer.includes(currentquestion)) {
//             let removeFromMarAndAnswer =
//               markedAndAnswer.indexOf(currentquestion);
//             markedAndAnswer.splice(removeFromMarAndAnswer, 1);
//           }
//           if (answeredQuestion.includes(currentquestion)) {
//             let removeFromAnswerQuestion =
//               answeredQuestion.indexOf(currentquestion);
//             answeredQuestion.splice(removeFromAnswerQuestion, 1);
//           }

//           setNotAnswer([...notAnswer, currentquestion]);
//         }
//       }
//       if (question.length - 1 > currentquestion) {
//         setcurrentquestion(currentquestion + 1);
//       }
//     } else {
//       if (
//         answer !== null &&
//         allAns[currentquestion] !== undefined &&
//         !answeredQuestion.includes(currentquestion)
//       ) {
//         if (markedNotAnswer.includes(currentquestion)) {
//           let removeFromMarkedNotAnswer =
//             markedNotAnswer.indexOf(currentquestion);
//           markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
//         }

//         if (notAnswer.includes(currentquestion)) {
//           let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
//           notAnswer.splice(removeFromNotAnswer, 1);
//         }

//         if (markedAndAnswer.includes(currentquestion)) {
//           let removeFromMarkedAndAnswer =
//             markedAndAnswer.indexOf(currentquestion);
//           markedAndAnswer.splice(removeFromMarkedAndAnswer, 1);
//         }

//         setAnsweredQuestion([...answeredQuestion, currentquestion]);
//         if (question.length - 1 > currentquestion) {
//           setcurrentquestion(con);
//         }
//       } else if (
//         answer === null &&
//         allAns[currentquestion] === undefined &&
//         !notAnswer.includes(currentquestion) &&
//         currentquestion !== con
//       ) {
//         if (markedNotAnswer.includes(currentquestion)) {
//           let removeFromMarkedNotAnswer =
//             markedNotAnswer.indexOf(currentquestion);
//           markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
//         }

//         if (markedAndAnswer.includes(currentquestion)) {
//           let removeFromMarkedAndAnswer =
//             markedAndAnswer.indexOf(currentquestion);
//           markedAndAnswer.splice(removeFromMarkedAndAnswer, 1);
//         }

//         if (answeredQuestion.includes(currentquestion)) {
//           let removeFromMarkedAndAnswer =
//             answeredQuestion.indexOf(currentquestion);
//           answeredQuestion.splice(removeFromMarkedAndAnswer, 1);
//         }
//         setNotAnswer([...notAnswer, currentquestion]);

//         if (question.length - 1 > currentquestion) {
//           setcurrentquestion(con);
//         }
//       }
//       if (con !== isNaN) {
//         setcurrentquestion(con);
//       }
//     }
//     setans(null);
//   };

//   const markedQuestion = () => {
//     if (allAns[currentquestion] === undefined && answer !== null) {
//       setAllAns((prevState) => ({
//         ...prevState,
//         [currentquestion]: answer,
//       }));
//     }
//     if (
//       allAns[currentquestion] !== undefined &&
//       !markedAndAnswer.includes(currentquestion)
//     ) {
//       if (answeredQuestion.includes(currentquestion)) {
//         let removeFromAnswer = answeredQuestion.indexOf(currentquestion);
//         answeredQuestion.splice(removeFromAnswer, 1);
//       }

//       if (markedNotAnswer.includes(currentquestion)) {
//         let removeFromMarkNotAnswer = markedNotAnswer.indexOf(currentquestion);
//         notAnswer.splice(removeFromMarkNotAnswer, 1);
//       }

//       if (notAnswer.includes(currentquestion)) {
//         let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
//         notAnswer.splice(removeFromNotAnswer, 1);
//       }
//       setMarkedAndAnswer([...markedAndAnswer, currentquestion]);
//       setans(null);
//     } else if (
//       allAns[currentquestion] === undefined &&
//       !markedNotAnswer.includes(currentquestion)
//     ) {
//       setAllAns((prevState) => {
//         const updatedState = { ...prevState };
//         delete updatedState[currentquestion];
//         return updatedState;
//       });
//       if (answeredQuestion.includes(currentquestion)) {
//         let removeFromAnswer = answeredQuestion.indexOf(currentquestion);
//         answeredQuestion.splice(removeFromAnswer, 1);
//       }

//       if (markedAndAnswer.includes(currentquestion)) {
//         let removeFromMarkAndAnswer = markedAndAnswer.indexOf(currentquestion);
//         notAnswer.splice(removeFromMarkAndAnswer, 1);
//       }
//       if (notAnswer.includes(currentquestion)) {
//         let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
//         notAnswer.splice(removeFromNotAnswer, 1);
//       }
//       setMarkedNotAnswer([...markedNotAnswer, currentquestion]);
//     }
//     if (question.length - 1 > currentquestion) {
//       setcurrentquestion(currentquestion + 1);
//     }
//   };

//   const handleAnswer = (ans, qus) => {
//     setans(ans);
//     if (
//       question[currentquestion].answer === qus + 1 &&
//       !correctAns.includes(currentquestion)
//     ) {
//       if (wrongansqus.includes(currentquestion)) {
//         setwrong(wrongans - 1);
//         let removeFromwrongansqus = wrongansqus.indexOf(currentquestion);
//         wrongansqus.splice(removeFromwrongansqus, 1);
//       }
//       setMark(mark + 1);
//       setcorrectQus([...correctQus, currentquestion]);
//       setCorrectAns([...correctAns, currentquestion]);
//     } else if (
//       question[currentquestion].answer !== qus + 1 &&
//       correctAns.includes(currentquestion)
//     ) {
//       let removeFromCorrectAns = correctAns.indexOf(currentquestion);
//       correctAns.splice(removeFromCorrectAns, 1);
//       let removecorrectQus = correctQus.indexOf(currentquestion);
//       correctQus.splice(removecorrectQus, 1);
//       setMark(mark - 1);
//       setwrong(wrongans + 1);
//     }
//     if (
//       question[currentquestion].answer !== qus + 1 &&
//       !correctAns.includes(currentquestion) &&
//       !wrongansqus.includes(currentquestion)
//     ) {
//       setwrong(wrongans + 1);
//       setwrongansqus([...wrongansqus, currentquestion]);
//     }
//     setAllAns((prevState) => ({
//       ...prevState,
//       [currentquestion]: ans,
//     }));
//   };

//   const handleClearAnswer = (questionIndex) => {
//     if (answeredQuestion.includes(currentquestion)) {
//       let removeFromAnswer = answeredQuestion.indexOf(currentquestion);
//       answeredQuestion.splice(removeFromAnswer, 1);
//     }

//     if (markedAndAnswer.includes(currentquestion)) {
//       let removeFromMarkAndAnswer = markedAndAnswer.indexOf(currentquestion);
//       markedAndAnswer.splice(removeFromMarkAndAnswer, 1);
//     }

//     if (markedNotAnswer.includes(currentquestion)) {
//       let removeFromMarkNotAnswer = markedNotAnswer.indexOf(currentquestion);
//       markedNotAnswer.splice(removeFromMarkNotAnswer, 1);
//     }

//     setAllAns((prevState) => {
//       const updatedState = { ...prevState };
//       delete updatedState[questionIndex];
//       return updatedState;
//     });
//     if (!notAnswer.includes(currentquestion)) {
//       setNotAnswer([...notAnswer, currentquestion]);
//     }
//   };

//   const handleSubmitClick = () => {
//     setIsSubmitDialogOpen(true);
//   };

//   const handleCancelSubmit = () => {
//     setIsSubmitDialogOpen(false);
//   };

//   const handleConfirmSubmit = () => {
//     setIsSubmitDialogOpen(false);
//     giveMark();
//   };

//   const giveMark = async () => {
//     try {
//       const category = getLocalStorage("category");
//       const user = await getCookies("_user");
//       const subject = getLocalStorage("Subject");

//       const scorePercentage =
//         question.length > 0 ? (mark / question.length) * 100 : 0;

//       const testIndex = getLocalStorage("currentTestIndex") || 0;
//       const subcategory = getLocalStorage("currentSubcategory") || category;
//       const currentCategory = getLocalStorage("currentCategory") || subject;

//       saveTestScore(currentCategory, subcategory, testIndex, scorePercentage);

//       console.log("✅ Test Score Saved:", {
//         category: currentCategory,
//         subcategory: subcategory,
//         testIndex: testIndex,
//         score: scorePercentage.toFixed(1) + "%",
//         passed: scorePercentage >= 80,
//       });

//       const newTestData = {
//         user: user,
//         subject: subject,
//         rank: 0,
//         wrongans: wrongans,
//         correctQus: correctQus,
//         score: mark,
//         allAnswer: allAns,
//         wrongansqus: wrongansqus,
//         answeredQuestion: answeredQuestion,
//         notAnswer: notAnswer,
//         markedAndAnswer: markedAndAnswer,
//         markedNotAnswer: markedNotAnswer,
//         section: category,
//         questions: question,
//       };

//       setTestData(newTestData);
//       dispatch(userTestDataApi(newTestData));
//       const d = userTestFetchDataApi();

//       setLocalStorage("Total", mark);
//       setLocalStorage("test", [newTestData]);
//       setLocalStorage("savedTestQuestions", null);

//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       }

//       if (handleFullScreen) handleFullScreen(false);
//       navigate("/test-result");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Timer effect - Using Testdata to determine timer type
//   useEffect(() => {
//     const Testdata = getLocalStorage("Testdata") || [];

//     const timer = setTimeout(() => {
//       if ((Testdata.length + 1) > 1) {
//         // MULTIPLE SUBCATEGORIES: COUNTDOWN
//         console.log("in");

//         const currentTimeInSeconds =
//           reversehour * 3600 + reversemin * 60 + reversesec;

//         if (currentTimeInSeconds <= 0) {
//           toast({
//             title: "Time's Up!",
//             description: "Your test will be submitted automatically.",
//             status: "warning",
//             duration: 3000,
//             isClosable: true,
//             position: "top",
//           });
//           giveMark();
//           return;
//         }

//         // Decrement by 1 second
//         if (reversesec > 0) {
//           setreversesec(reversesec - 1);
//         } else if (reversemin > 0) {
//           setreversemin(reversemin - 1);
//           setreversesec(59);
//         } else if (reversehour > 0) {
//           setreversehour(reversehour - 1);
//           setreversemin(59);
//           setreversesec(59);
//         }

//         console.log(
//           "⏱️ COUNTDOWN:",
//           `${reversehour}:${reversemin}:${reversesec}`,
//         );
//       } else {
//         // SINGLE SUBCATEGORY: COUNT UP
//         console.log("in sec");
//         if (sec < 59) {
//           setsec(sec + 1);
//         } else {
//           setsec(0);
//           if (min < 59) {
//             setmin(min + 1);
//           } else {
//             setmin(0);
//             sethour(hour + 1);
//           }
//         }

//         console.log("⏱️ COUNT UP:", `${hour}:${min}:${sec}`);
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [hour, min, sec, reversehour, reversemin, reversesec]);

//   const handleClick = (newSize) => {
//     setSize(newSize);
//     onOpen();
//   };

//   const enterFullscreen = async () => {
//     const elem = document.documentElement;

//     try {
//       if (elem.requestFullscreen) {
//         await elem.requestFullscreen();
//       } else if (elem.webkitRequestFullscreen) {
//         await elem.webkitRequestFullscreen();
//       } else if (elem.msRequestFullscreen) {
//         await elem.msRequestFullscreen();
//       }
//       setIsFullscreenActive(true);
//     } catch (error) {
//       console.log("Fullscreen request failed:", error);
//       toast({
//         title: "Fullscreen Failed",
//         description: "Unable to enter fullscreen mode. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//     }
//   };

//   // Check if multiple subcategories for display
//   const Testdata = getLocalStorage("Testdata") || [];
//   const isMultipleSubcategories = Testdata.length > 1;

//   const QuestionSidebar = () => (
//     <VStack spacing={4} align="stretch" h="100%">
//       <Box>
//         <Text fontSize="xl" fontWeight="bold" color="white">
//           Pablo
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
//               onClick={() => handlequestion(i)}
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
//         <Button
//           w="100%"
//           bg="white"
//           color="#4285f4"
//           fontWeight="600"
//           _hover={{ bg: "gray.100" }}
//         >
//           Instructions
//         </Button>
//         <Button
//           w="100%"
//           bg="#01bfbd"
//           color="white"
//           fontWeight="600"
//           _hover={{ bg: "#00a8a6" }}
//           onClick={handleSubmitClick}
//         >
//           Submit Test
//         </Button>
//       </VStack>
//     </VStack>
//   );

//   return (
//     <Box
//       h="100vh"
//       display="flex"
//       flexDirection="column"
//       bg="white"
//       position="relative"
//     >
//       {!isMobile && !isFullscreenActive && hasExitedFullscreen && (
//         <Box
//           position="fixed"
//           top="0"
//           left="0"
//           right="0"
//           bottom="0"
//           bg="rgba(0,0,0,0.85)"
//           zIndex="9999"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           onClick={enterFullscreen}
//           cursor="pointer"
//         >
//           <VStack spacing={4} color="white" textAlign="center" p={8}>
//             <Heading size="xl">⚠️ Fullscreen Required</Heading>
//             <Text fontSize="lg">
//               You must stay in fullscreen mode during the test.
//             </Text>
//             <Button
//               size="lg"
//               colorScheme="blue"
//               onClick={enterFullscreen}
//               mt={4}
//             >
//               Click Here to Re-enter Fullscreen
//             </Button>
//             <Text fontSize="sm" color="gray.300">
//               You can only exit fullscreen by submitting the test
//             </Text>
//           </VStack>
//         </Box>
//       )}

//       <Flex
//         bg="#4285f4"
//         color="white"
//         px={{ base: 3, sm: 4, md: 6 }}
//         py={{ base: 2, sm: 3 }}
//         align="center"
//         justify="space-between"
//         flexShrink={0}
//         gap={{ base: 2, sm: 3 }}
//       >
//         <Text
//           fontSize={{ base: "md", sm: "lg", md: "2xl" }}
//           fontWeight="bold"
//           flexShrink={0}
//         >
//           Revision Karle
//         </Text>

//         <Center
//           bg="#01bfbd"
//           px={{ base: 2, sm: 3, md: 4 }}
//           py={{ base: 1.5, sm: 2 }}
//           borderRadius="md"
//           fontWeight="600"
//           fontSize={{ base: "xs", sm: "sm", md: "md" }}
//           minW={{ base: "100px", sm: "130px", md: "160px" }}
//           flexShrink={0}
//         >
//           <HStack spacing={{ base: 0.5, sm: 1 }}>
//             <Text display={{ base: "none", sm: "inline" }}>
//               {isMultipleSubcategories ? "Time Left" : "Time"}
//             </Text>
//             <Text>
//               {isMultipleSubcategories
//                 ? `${reversehour < 10 ? `0${reversehour}` : reversehour}:${reversemin < 10 ? `0${reversemin}` : reversemin}:${reversesec < 10 ? `0${reversesec}` : reversesec}`
//                 : `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`}
//             </Text>
//           </HStack>
//         </Center>

//         <HStack spacing={{ base: 1, sm: 2 }} flexShrink={0}>
//           {!isMobile && !isFullscreenActive && (
//             <Button
//               size={{ base: "xs", sm: "sm" }}
//               variant="solid"
//               bg="#01bfbd"
//               color="white"
//               _hover={{ bg: "#00a8a6" }}
//               onClick={enterFullscreen}
//               fontSize={{ base: "xs", sm: "sm" }}
//               px={{ base: 2, sm: 3 }}
//               fontWeight="600"
//             >
//               Enter Fullscreen
//             </Button>
//           )}
//           <ModalPause
//             markedAndAnswer={markedAndAnswer}
//             question={question}
//             markedNotAnswer={markedNotAnswer}
//             notAnswer={notAnswer}
//             answered={answeredQuestion}
//           />
//         </HStack>
//       </Flex>

//       {isMultipleSubcategories && (
//         <Box
//           bg="orange.50"
//           borderBottom="2px solid"
//           borderColor="orange.300"
//           px={6}
//           py={3}
//         >
//           <Flex align="center" justify="center" gap={2} flexWrap="wrap">
//             <HStack spacing={2}>
//               <Text fontSize="sm" fontWeight="600" color="orange.800">
//                 ⏱️ Time Limit:
//               </Text>
//               <Text fontSize="sm" fontWeight="700" color="orange.900">
//                 {totalTimeInSeconds >= 3600
//                   ? `${Math.floor(totalTimeInSeconds / 3600)} hour${Math.floor(totalTimeInSeconds / 3600) > 1 ? "s" : ""} ${Math.floor((totalTimeInSeconds % 3600) / 60)} minute${Math.floor((totalTimeInSeconds % 3600) / 60) !== 1 ? "s" : ""}`
//                   : `${Math.floor(totalTimeInSeconds / 60)} minute${Math.floor(totalTimeInSeconds / 60) !== 1 ? "s" : ""}`}
//               </Text>
//             </HStack>
//             <Text fontSize="xs" color="orange.600">
//               ({question.length} questions × 30 seconds each)
//             </Text>
//           </Flex>
//         </Box>
//       )}

//       <Flex flex="1" overflow="hidden">
//         <VStack flex="1" spacing={0} align="stretch" overflow="hidden">
//           <Flex
//             px={6}
//             py={3}
//             borderBottom="1px solid"
//             borderColor="gray.200"
//             justify="space-between"
//             align="center"
//             bg="gray.50"
//           >
//             <Text fontSize="sm" color="gray.600">
//               SECTIONS |{" "}
//               <Text as="span" fontWeight="600">
//                 Elementary maths
//               </Text>
//             </Text>
//             <ReportQuestionDropdown />
//           </Flex>

//           <Box px={6} py={3} bg="white">
//             <Text fontWeight="600" fontSize="md">
//               Question no {currentquestion + 1}
//             </Text>
//           </Box>

//           <Box
//             flex="1"
//             overflow="auto"
//             px={6}
//             py={4}
//             bg="white"
//             borderTop="1px solid"
//             borderColor="gray.200"
//           >
//             <Text mb={6} fontSize="md" lineHeight="tall">
//               {question[currentquestion]?.qus}
//             </Text>

//             <RadioGroup
//               value={allAns[currentquestion] || ""}
//               onChange={(value) => handleAnswer(currentquestion, value)}
//             >
//               <VStack align="stretch" spacing={3}>
//                 {question[currentquestion]?.options.map((d, i) => (
//                   <Box
//                     key={i}
//                     p={3}
//                     borderRadius="md"
//                     border="1px solid"
//                     borderColor={
//                       allAns[currentquestion] === d ? "blue.400" : "gray.200"
//                     }
//                     bg={allAns[currentquestion] === d ? "blue.50" : "white"}
//                     cursor="pointer"
//                     transition="all 0.2s"
//                     _hover={{
//                       borderColor: "blue.300",
//                       bg: "gray.50",
//                     }}
//                     onClick={() => handleAnswer(d, i)}
//                   >
//                     <Radio
//                       value={d}
//                       isChecked={allAns[currentquestion] === d}
//                       colorScheme="blue"
//                     >
//                       <Text ml={2}>{d}</Text>
//                     </Radio>
//                   </Box>
//                 ))}
//               </VStack>
//             </RadioGroup>
//           </Box>

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
//             <HStack spacing={2}>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 colorScheme="blue"
//                 onClick={() => markedQuestion()}
//               >
//                 Review & Next
//               </Button>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 colorScheme="blue"
//                 onClick={() => handleClearAnswer(currentquestion)}
//               >
//                 Clear Response
//               </Button>
//             </HStack>

//             <Button
//               size="sm"
//               display={{ base: "none", md: "inline-flex", lg: "inline-flex" }}
//               colorScheme="blue"
//               onClick={() => handlequestion("svn")}
//             >
//               Save & Next
//             </Button>
//           </Flex>
//           <Button
//             size="sm"
//             display={{ base: "flex", md: "none" }}
//             w="90%"
//             mx="auto"
//             mt={0}
//             colorScheme="blue"
//             onClick={() => handlequestion("svn")}
//           >
//             Save & Next
//           </Button>
//         </VStack>

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
//                 Revision Karle
//               </DrawerHeader>
//               <DrawerBody p={6}>
//                 <QuestionSidebar />
//               </DrawerBody>
//             </DrawerContent>
//           </Drawer>
//         </>
//       )}

//       <AlertDialog
//         isOpen={isSubmitDialogOpen}
//         leastDestructiveRef={cancelSubmitRef}
//         onClose={handleCancelSubmit}
//         isCentered
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent mx={4}>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Submit Test
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               <VStack align="start" spacing={3}>
//                 <Text>Are you sure you want to submit the test?</Text>
//                 <Box w="100%" p={3} bg="gray.50" borderRadius="md">
//                   <Text fontSize="sm" fontWeight="600" mb={2}>
//                     Test Summary:
//                   </Text>
//                   <Text fontSize="sm">Total Questions: {question.length}</Text>
//                   <Text fontSize="sm" color="green.600">
//                     Answered: {answeredQuestion.length}
//                   </Text>
//                   <Text fontSize="sm" color="red.600">
//                     Not Answered: {notAnswer.length}
//                   </Text>
//                   <Text fontSize="sm" color="purple.600">
//                     Marked for Review:{" "}
//                     {markedNotAnswer.length + markedAndAnswer.length}
//                   </Text>
//                   <Text fontSize="sm" color="gray.600">
//                     Not Visited:{" "}
//                     {question.length -
//                       (markedAndAnswer.length +
//                         markedNotAnswer.length +
//                         answeredQuestion.length +
//                         notAnswer.length)}
//                   </Text>
//                 </Box>
//                 <Text fontSize="sm" color="red.500" fontWeight="500">
//                   ⚠️ Once submitted, you cannot change your answers.
//                 </Text>
//               </VStack>
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelSubmitRef} onClick={handleCancelSubmit}>
//                 Cancel
//               </Button>
//               <Button colorScheme="blue" onClick={handleConfirmSubmit} ml={3}>
//                 Yes, Submit
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>
//     </Box>
//   );
// };

// export default TakeTest;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
  HStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import ModalPause from "./ModalPause";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { useDispatch } from "react-redux";
import {
  userTestDataApi,
  userTestFetchDataApi,
} from "../redux/userTestData/userTestData_ActionType.js";
import { HamburgerIcon } from "@chakra-ui/icons";
import ReportQuestionDropdown from "./ReportQuestionDropdown.jsx";
import { saveTestScore } from "../helpers/testProgressHelper";
import { getCookies } from "../helpers/cookies.jsx";

const TakeTest = ({ quest, handleFullScreen }) => {
  const [currentquestion, setcurrentquestion] = useState(0);
  const shuffleArray = (arr) => [...arr]?.sort(() => Math.random() - 0.5);

  const effectiveQuest =
    quest && quest.length > 0
      ? quest
      : getLocalStorage("savedTestQuestions") || [];
  const shuffledQuest = shuffleArray(effectiveQuest);
  const [question] = useState(shuffledQuest);

  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
  const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
  const [notAnswer, setNotAnswer] = useState([]);
  const [answer, setans] = useState(null);
  const [wrongans, setwrong] = useState(0);
  const [wrongansqus, setwrongansqus] = useState([]);
  const [allAns, setAllAns] = useState({});
  const [mark, setMark] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [correctQus, setcorrectQus] = useState([]);
  const dispatch = useDispatch();

  // COUNT UP timer (single subcategory)
  const [hour, sethour] = useState(0);
  const [min, setmin] = useState(0);
  const [sec, setsec] = useState(0);

  // COUNTDOWN timer (multiple subcategories)
  const [reversehour, setreversehour] = useState(0);
  const [reversemin, setreversemin] = useState(0);
  const [reversesec, setreversesec] = useState(0);

  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const [size, setSize] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const cancelSubmitRef = React.useRef();

  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [hasExitedFullscreen, setHasExitedFullscreen] = useState(false);

  const [collectAns, setcollectAns] = useState([[]]);
  const [correctAns, setCorrectAns] = useState([]);
  const navigate = useNavigate();
  const [testData, setTestData] = useState({
    allAnswer: null,
    answeredQuestion: null,
    notAnswer: null,
    markedAndAnswer: null,
    markedNotAnswer: null,
  });

  // Initialize time based on Testdata from localStorage
  useEffect(() => {
    const Testdata = getLocalStorage("Testdata") || [];
    const totalQuestions = question.length;

    console.log("=== Timer Initialization ===", {
      TestdataLength: Testdata.length,
      totalQuestions: totalQuestions,
      Testdata: Testdata,
    });

    if (Testdata.length > 1) {
      // Multiple subcategories: COUNTDOWN timer
      const calculatedTimeInSeconds = totalQuestions * 30;
      setTotalTimeInSeconds(calculatedTimeInSeconds);

      const totalHours = Math.floor(calculatedTimeInSeconds / 3600);
      const totalMinutes = Math.floor((calculatedTimeInSeconds % 3600) / 60);
      const totalSeconds = calculatedTimeInSeconds % 60;

      setreversehour(totalHours);
      setreversemin(totalMinutes);
      setreversesec(totalSeconds);

      console.log("✅ MULTIPLE SUBCATEGORIES - COUNTDOWN FROM:", {
        subcategories: Testdata.length,
        totalQuestions: totalQuestions,
        startTime: `${totalHours}:${totalMinutes}:${totalSeconds}`,
        totalSeconds: calculatedTimeInSeconds,
      });
    } else {
      // Single subcategory: COUNT UP from 0
      sethour(0);
      setmin(0);
      setsec(0);

      console.log("✅ SINGLE SUBCATEGORY - COUNT UP FROM 00:00:00");
    }
  }, [question.length]);

  // Prevent fullscreen exit and navigation
  useEffect(() => {
    let isRequestingFullscreen = false;

    const requestFullscreen = async () => {
      if (isRequestingFullscreen) return;
      isRequestingFullscreen = true;
      const elem = document.documentElement;

      try {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
        setIsFullscreenActive(true);
      } catch (error) {
        console.log("Fullscreen request failed:", error);
        if (hasExitedFullscreen) {
          toast({
            title: "Fullscreen Required",
            description:
              "Please click anywhere on the screen to re-enter fullscreen mode.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } finally {
        isRequestingFullscreen = false;
      }
    };

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );

      if (!isCurrentlyFullscreen && isFullscreenActive) {
        setIsFullscreenActive(false);
        setHasExitedFullscreen(true);

        toast({
          title: "Fullscreen Exited",
          description:
            "Click anywhere to re-enter fullscreen mode. You must stay in fullscreen during the test.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (isCurrentlyFullscreen) {
        setIsFullscreenActive(true);
      }
    };

    const handleClickToFullscreen = () => {
      if (!isFullscreenActive && hasExitedFullscreen && !isMobile) {
        requestFullscreen();
      }
    };

    const handleBackButton = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
      toast({
        title: "Navigation Blocked",
        description:
          "You cannot go back during the test. Please submit to exit.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your test progress may be lost.";
      return e.returnValue;
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    document.addEventListener("click", handleClickToFullscreen);

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
      document.removeEventListener("click", handleClickToFullscreen);
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isMobile, isFullscreenActive, hasExitedFullscreen]);

  // Prevent right-click context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Prevent common keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F11") {
        e.preventDefault();
      }
      if (e.key === "Escape") {
        e.preventDefault();
      }
      if (e.altKey && e.key === "F4") {
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "w") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlequestion = (con) => {
    if (con === "svn") {
      if (
        answer !== null &&
        allAns[currentquestion] !== undefined &&
        !answeredQuestion.includes(currentquestion)
      ) {
        if (markedNotAnswer.includes(currentquestion)) {
          let removeFromMarkedNotAnswer =
            markedNotAnswer.indexOf(currentquestion);
          markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
        }

        if (notAnswer.includes(currentquestion)) {
          let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
          notAnswer.splice(removeFromNotAnswer, 1);
        }

        if (markedAndAnswer.includes(currentquestion)) {
          let removeFromMarkedAndAnswer =
            markedAndAnswer.indexOf(currentquestion);
          markedAndAnswer.splice(removeFromMarkedAndAnswer, 1);
        }

        setAnsweredQuestion([...answeredQuestion, currentquestion]);

        if (question.length - 1 > currentquestion) {
          setcurrentquestion(currentquestion + 1);
        }
      } else if (allAns[currentquestion] === undefined && answer === null) {
        if (!notAnswer.includes(currentquestion)) {
          if (markedNotAnswer.includes(currentquestion)) {
            let removeFromMarkedNotAnswer =
              markedNotAnswer.indexOf(currentquestion);
            markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
          }
          if (markedAndAnswer.includes(currentquestion)) {
            let removeFromMarAndAnswer =
              markedAndAnswer.indexOf(currentquestion);
            markedAndAnswer.splice(removeFromMarAndAnswer, 1);
          }
          if (answeredQuestion.includes(currentquestion)) {
            let removeFromAnswerQuestion =
              answeredQuestion.indexOf(currentquestion);
            answeredQuestion.splice(removeFromAnswerQuestion, 1);
          }

          setNotAnswer([...notAnswer, currentquestion]);
        }
      }
      if (question.length - 1 > currentquestion) {
        setcurrentquestion(currentquestion + 1);
      }
    } else {
      if (
        answer !== null &&
        allAns[currentquestion] !== undefined &&
        !answeredQuestion.includes(currentquestion)
      ) {
        if (markedNotAnswer.includes(currentquestion)) {
          let removeFromMarkedNotAnswer =
            markedNotAnswer.indexOf(currentquestion);
          markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
        }

        if (notAnswer.includes(currentquestion)) {
          let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
          notAnswer.splice(removeFromNotAnswer, 1);
        }

        if (markedAndAnswer.includes(currentquestion)) {
          let removeFromMarkedAndAnswer =
            markedAndAnswer.indexOf(currentquestion);
          markedAndAnswer.splice(removeFromMarkedAndAnswer, 1);
        }

        setAnsweredQuestion([...answeredQuestion, currentquestion]);
        if (question.length - 1 > currentquestion) {
          setcurrentquestion(con);
        }
      } else if (
        answer === null &&
        allAns[currentquestion] === undefined &&
        !notAnswer.includes(currentquestion) &&
        currentquestion !== con
      ) {
        if (markedNotAnswer.includes(currentquestion)) {
          let removeFromMarkedNotAnswer =
            markedNotAnswer.indexOf(currentquestion);
          markedNotAnswer.splice(removeFromMarkedNotAnswer, 1);
        }

        if (markedAndAnswer.includes(currentquestion)) {
          let removeFromMarkedAndAnswer =
            markedAndAnswer.indexOf(currentquestion);
          markedAndAnswer.splice(removeFromMarkedAndAnswer, 1);
        }

        if (answeredQuestion.includes(currentquestion)) {
          let removeFromMarkedAndAnswer =
            answeredQuestion.indexOf(currentquestion);
          answeredQuestion.splice(removeFromMarkedAndAnswer, 1);
        }
        setNotAnswer([...notAnswer, currentquestion]);

        if (question.length - 1 > currentquestion) {
          setcurrentquestion(con);
        }
      }
      if (con !== isNaN) {
        setcurrentquestion(con);
      }
    }
    setans(null);
  };

  const markedQuestion = () => {
    if (allAns[currentquestion] === undefined && answer !== null) {
      setAllAns((prevState) => ({
        ...prevState,
        [currentquestion]: answer,
      }));
    }
    if (
      allAns[currentquestion] !== undefined &&
      !markedAndAnswer.includes(currentquestion)
    ) {
      if (answeredQuestion.includes(currentquestion)) {
        let removeFromAnswer = answeredQuestion.indexOf(currentquestion);
        answeredQuestion.splice(removeFromAnswer, 1);
      }

      if (markedNotAnswer.includes(currentquestion)) {
        let removeFromMarkNotAnswer = markedNotAnswer.indexOf(currentquestion);
        notAnswer.splice(removeFromMarkNotAnswer, 1);
      }

      if (notAnswer.includes(currentquestion)) {
        let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
        notAnswer.splice(removeFromNotAnswer, 1);
      }
      setMarkedAndAnswer([...markedAndAnswer, currentquestion]);
      setans(null);
    } else if (
      allAns[currentquestion] === undefined &&
      !markedNotAnswer.includes(currentquestion)
    ) {
      setAllAns((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[currentquestion];
        return updatedState;
      });
      if (answeredQuestion.includes(currentquestion)) {
        let removeFromAnswer = answeredQuestion.indexOf(currentquestion);
        answeredQuestion.splice(removeFromAnswer, 1);
      }

      if (markedAndAnswer.includes(currentquestion)) {
        let removeFromMarkAndAnswer = markedAndAnswer.indexOf(currentquestion);
        notAnswer.splice(removeFromMarkAndAnswer, 1);
      }
      if (notAnswer.includes(currentquestion)) {
        let removeFromNotAnswer = notAnswer.indexOf(currentquestion);
        notAnswer.splice(removeFromNotAnswer, 1);
      }
      setMarkedNotAnswer([...markedNotAnswer, currentquestion]);
    }
    if (question.length - 1 > currentquestion) {
      setcurrentquestion(currentquestion + 1);
    }
  };

  const handleAnswer = (ans, qus) => {
    setans(ans);
    if (
      question[currentquestion].answer === qus + 1 &&
      !correctAns.includes(currentquestion)
    ) {
      if (wrongansqus.includes(currentquestion)) {
        setwrong(wrongans - 1);
        let removeFromwrongansqus = wrongansqus.indexOf(currentquestion);
        wrongansqus.splice(removeFromwrongansqus, 1);
      }
      setMark(mark + 1);
      setcorrectQus([...correctQus, currentquestion]);
      setCorrectAns([...correctAns, currentquestion]);
    } else if (
      question[currentquestion].answer !== qus + 1 &&
      correctAns.includes(currentquestion)
    ) {
      let removeFromCorrectAns = correctAns.indexOf(currentquestion);
      correctAns.splice(removeFromCorrectAns, 1);
      let removecorrectQus = correctQus.indexOf(currentquestion);
      correctQus.splice(removecorrectQus, 1);
      setMark(mark - 1);
      setwrong(wrongans + 1);
    }
    if (
      question[currentquestion].answer !== qus + 1 &&
      !correctAns.includes(currentquestion) &&
      !wrongansqus.includes(currentquestion)
    ) {
      setwrong(wrongans + 1);
      setwrongansqus([...wrongansqus, currentquestion]);
    }
    setAllAns((prevState) => ({
      ...prevState,
      [currentquestion]: ans,
    }));
  };

  const handleClearAnswer = (questionIndex) => {
    if (answeredQuestion.includes(currentquestion)) {
      let removeFromAnswer = answeredQuestion.indexOf(currentquestion);
      answeredQuestion.splice(removeFromAnswer, 1);
    }

    if (markedAndAnswer.includes(currentquestion)) {
      let removeFromMarkAndAnswer = markedAndAnswer.indexOf(currentquestion);
      markedAndAnswer.splice(removeFromMarkAndAnswer, 1);
    }

    if (markedNotAnswer.includes(currentquestion)) {
      let removeFromMarkNotAnswer = markedNotAnswer.indexOf(currentquestion);
      markedNotAnswer.splice(removeFromMarkNotAnswer, 1);
    }

    setAllAns((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[questionIndex];
      return updatedState;
    });
    if (!notAnswer.includes(currentquestion)) {
      setNotAnswer([...notAnswer, currentquestion]);
    }
  };

  const handleSubmitClick = () => {
    setIsSubmitDialogOpen(true);
  };

  const handleCancelSubmit = () => {
    setIsSubmitDialogOpen(false);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitDialogOpen(false);
    giveMark();
  };

  const giveMark = async () => {
    try {
      const category = getLocalStorage("category");
      const user = await getCookies("_user");
      const subject = getLocalStorage("Subject");

      const scorePercentage =
        question.length > 0 ? (mark / question.length) * 100 : 0;

      const testIndex = getLocalStorage("currentTestIndex") || 0;
      const subcategory = getLocalStorage("currentSubcategory") || category;
      const currentCategory = getLocalStorage("currentCategory") || subject;

      // ✅ NEW: Detect if this is an individual test or custom multi-subcategory test
      // Check if Testdata has multiple subcategories (custom test)
      const Testdata = getLocalStorage("Testdata") || [];
      const isIndividualTest = Testdata.length <= 1;

      // ✅ NEW: Pass isIndividualTest flag to saveTestScore
      // Only saves progress if it's an individual subcategory test
      if (isIndividualTest) {
        saveTestScore(
          currentCategory,
          subcategory,
          testIndex,
          scorePercentage,
          true,
        );
        console.log("✅ Test Score Saved:", {
          category: currentCategory,
          subcategory: subcategory,
          testIndex: testIndex,
          score: scorePercentage.toFixed(1) + "%",
          passed: scorePercentage >= 80,
          type: "Individual Subcategory Test",
        });
      } else {
        console.log("⚠️ Custom Multi-Subcategory Test - Progress NOT Saved:", {
          testType: "Custom Test",
          subcategoriesSelected: Testdata.length,
          score: scorePercentage.toFixed(1) + "%",
          note: "Progress only saved for individual subcategory tests",
        });
      }

      const newTestData = {
        user: user,
        subject: subject,
        rank: 0,
        wrongans: wrongans,
        correctQus: correctQus,
        score: mark,
        allAnswer: allAns,
        wrongansqus: wrongansqus,
        answeredQuestion: answeredQuestion,
        notAnswer: notAnswer,
        markedAndAnswer: markedAndAnswer,
        markedNotAnswer: markedNotAnswer,
        section: category,
        questions: question,
      };

      setTestData(newTestData);
      dispatch(userTestDataApi(newTestData));
      const d = userTestFetchDataApi();

      setLocalStorage("Total", mark);
      setLocalStorage("test", [newTestData]);
      setLocalStorage("savedTestQuestions", null);

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      if (handleFullScreen) handleFullScreen(false);
      navigate("/test-result");
    } catch (error) {
      console.log(error);
    }
  };

  // Timer effect - Using Testdata to determine timer type
  useEffect(() => {
    const Testdata = getLocalStorage("Testdata") || [];

    const timer = setTimeout(() => {
      if (Testdata.length + 1 > 1) {
        // MULTIPLE SUBCATEGORIES: COUNTDOWN
        console.log("in");

        const currentTimeInSeconds =
          reversehour * 3600 + reversemin * 60 + reversesec;

        if (currentTimeInSeconds <= 0) {
          toast({
            title: "Time's Up!",
            description: "Your test will be submitted automatically.",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          giveMark();
          return;
        }

        // Decrement by 1 second
        if (reversesec > 0) {
          setreversesec(reversesec - 1);
        } else if (reversemin > 0) {
          setreversemin(reversemin - 1);
          setreversesec(59);
        } else if (reversehour > 0) {
          setreversehour(reversehour - 1);
          setreversemin(59);
          setreversesec(59);
        }

        console.log(
          "⏱️ COUNTDOWN:",
          `${reversehour}:${reversemin}:${reversesec}`,
        );
      } else {
        // SINGLE SUBCATEGORY: COUNT UP
        console.log("in sec");
        if (sec < 59) {
          setsec(sec + 1);
        } else {
          setsec(0);
          if (min < 59) {
            setmin(min + 1);
          } else {
            setmin(0);
            sethour(hour + 1);
          }
        }

        console.log("⏱️ COUNT UP:", `${hour}:${min}:${sec}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [hour, min, sec, reversehour, reversemin, reversesec]);

  const handleClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const enterFullscreen = async () => {
    const elem = document.documentElement;

    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }
      setIsFullscreenActive(true);
    } catch (error) {
      console.log("Fullscreen request failed:", error);
      toast({
        title: "Fullscreen Failed",
        description: "Unable to enter fullscreen mode. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Check if multiple subcategories for display
  const Testdata = getLocalStorage("Testdata") || [];
  const isMultipleSubcategories = Testdata.length > 1;

  const QuestionSidebar = () => (
    <VStack spacing={4} align="stretch" h="100%">
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="white">
          Pablo
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

      <Box borderTop="1px solid rgba(255,255,255,0.2)" pt={4}>
        <Text color="white" fontSize="sm" mb={3}>
          Section: Elementary maths
        </Text>
      </Box>

      <Box
        flex="1"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.1)",
          },
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
                markedAndAnswer.includes(i)
                  ? "full"
                  : markedNotAnswer.includes(i)
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
              onClick={() => handlequestion(i)}
              transition="all 0.2s"
              _hover={{
                transform: "scale(1.05)",
                shadow: "md",
              }}
              fontSize="sm"
              fontWeight="600"
            >
              {markedAndAnswer.includes(i) ? <>{i + 1} ✓</> : i + 1}
            </Center>
          ))}
        </Grid>
      </Box>

      <VStack spacing={3} pt={4} borderTop="1px solid rgba(255,255,255,0.2)">
        <Button
          w="100%"
          bg="white"
          color="#4285f4"
          fontWeight="600"
          _hover={{ bg: "gray.100" }}
        >
          Instructions
        </Button>
        <Button
          w="100%"
          bg="#01bfbd"
          color="white"
          fontWeight="600"
          _hover={{ bg: "#00a8a6" }}
          onClick={handleSubmitClick}
        >
          Submit Test
        </Button>
      </VStack>
    </VStack>
  );

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      bg="white"
      position="relative"
    >
      {!isMobile && !isFullscreenActive && hasExitedFullscreen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.85)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={enterFullscreen}
          cursor="pointer"
        >
          <VStack spacing={4} color="white" textAlign="center" p={8}>
            <Heading size="xl">⚠️ Fullscreen Required</Heading>
            <Text fontSize="lg">
              You must stay in fullscreen mode during the test.
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={enterFullscreen}
              mt={4}
            >
              Click Here to Re-enter Fullscreen
            </Button>
            <Text fontSize="sm" color="gray.300">
              You can only exit fullscreen by submitting the test
            </Text>
          </VStack>
        </Box>
      )}

      <Flex
        bg="#4285f4"
        color="white"
        px={{ base: 3, sm: 4, md: 6 }}
        py={{ base: 2, sm: 3 }}
        align="center"
        justify="space-between"
        flexShrink={0}
        gap={{ base: 2, sm: 3 }}
      >
        <Text
          fontSize={{ base: "md", sm: "lg", md: "2xl" }}
          fontWeight="bold"
          flexShrink={0}
        >
          Revision Karle
        </Text>

        <Center
          bg="#01bfbd"
          px={{ base: 2, sm: 3, md: 4 }}
          py={{ base: 1.5, sm: 2 }}
          borderRadius="md"
          fontWeight="600"
          fontSize={{ base: "xs", sm: "sm", md: "md" }}
          minW={{ base: "100px", sm: "130px", md: "160px" }}
          flexShrink={0}
        >
          <HStack spacing={{ base: 0.5, sm: 1 }}>
            <Text display={{ base: "none", sm: "inline" }}>
              {isMultipleSubcategories ? "Time Left" : "Time"}
            </Text>
            <Text>
              {isMultipleSubcategories
                ? `${reversehour < 10 ? `0${reversehour}` : reversehour}:${reversemin < 10 ? `0${reversemin}` : reversemin}:${reversesec < 10 ? `0${reversesec}` : reversesec}`
                : `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`}
            </Text>
          </HStack>
        </Center>

        <HStack spacing={{ base: 1, sm: 2 }} flexShrink={0}>
          {!isMobile && !isFullscreenActive && (
            <Button
              size={{ base: "xs", sm: "sm" }}
              variant="solid"
              bg="#01bfbd"
              color="white"
              _hover={{ bg: "#00a8a6" }}
              onClick={enterFullscreen}
              fontSize={{ base: "xs", sm: "sm" }}
              px={{ base: 2, sm: 3 }}
              fontWeight="600"
            >
              Enter Fullscreen
            </Button>
          )}
          <ModalPause
            markedAndAnswer={markedAndAnswer}
            question={question}
            markedNotAnswer={markedNotAnswer}
            notAnswer={notAnswer}
            answered={answeredQuestion}
          />
        </HStack>
      </Flex>

      {isMultipleSubcategories && (
        <Box
          bg="orange.50"
          borderBottom="2px solid"
          borderColor="orange.300"
          px={6}
          py={3}
        >
          <Flex align="center" justify="center" gap={2} flexWrap="wrap">
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight="600" color="orange.800">
                ⏱️ Time Limit:
              </Text>
              <Text fontSize="sm" fontWeight="700" color="orange.900">
                {totalTimeInSeconds >= 3600
                  ? `${Math.floor(totalTimeInSeconds / 3600)} hour${Math.floor(totalTimeInSeconds / 3600) > 1 ? "s" : ""} ${Math.floor((totalTimeInSeconds % 3600) / 60)} minute${Math.floor((totalTimeInSeconds % 3600) / 60) !== 1 ? "s" : ""}`
                  : `${Math.floor(totalTimeInSeconds / 60)} minute${Math.floor(totalTimeInSeconds / 60) !== 1 ? "s" : ""}`}
              </Text>
            </HStack>
            <Text fontSize="xs" color="orange.600">
              ({question.length} questions × 30 seconds each)
            </Text>
          </Flex>
        </Box>
      )}

      <Flex flex="1" overflow="hidden">
        <VStack flex="1" spacing={0} align="stretch" overflow="hidden">
          <Flex
            px={6}
            py={3}
            borderBottom="1px solid"
            borderColor="gray.200"
            justify="space-between"
            align="center"
            bg="gray.50"
          >
            <Text fontSize="sm" color="gray.600">
              SECTIONS |{" "}
              <Text as="span" fontWeight="600">
                Elementary maths
              </Text>
            </Text>
            <ReportQuestionDropdown />
          </Flex>

          <Box px={6} py={3} bg="white">
            <Text fontWeight="600" fontSize="md">
              Question no {currentquestion + 1}
            </Text>
          </Box>

          <Box
            flex="1"
            overflow="auto"
            px={6}
            py={4}
            bg="white"
            borderTop="1px solid"
            borderColor="gray.200"
          >
            <Text mb={6} fontSize="md" lineHeight="tall">
              {question[currentquestion]?.qus}
            </Text>

            <RadioGroup
              value={allAns[currentquestion] || ""}
              onChange={(value) => handleAnswer(currentquestion, value)}
            >
              <VStack align="stretch" spacing={3}>
                {question[currentquestion]?.options.map((d, i) => (
                  <Box
                    key={i}
                    p={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={
                      allAns[currentquestion] === d ? "blue.400" : "gray.200"
                    }
                    bg={allAns[currentquestion] === d ? "blue.50" : "white"}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "blue.300",
                      bg: "gray.50",
                    }}
                    onClick={() => handleAnswer(d, i)}
                  >
                    <Radio
                      value={d}
                      isChecked={allAns[currentquestion] === d}
                      colorScheme="blue"
                    >
                      <Text ml={2}>{d}</Text>
                    </Radio>
                  </Box>
                ))}
              </VStack>
            </RadioGroup>
          </Box>

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
            <HStack spacing={2}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={() => markedQuestion()}
              >
                Review & Next
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={() => handleClearAnswer(currentquestion)}
              >
                Clear Response
              </Button>
            </HStack>

            <Button
              size="sm"
              display={{ base: "none", md: "inline-flex", lg: "inline-flex" }}
              colorScheme="blue"
              onClick={() => handlequestion("svn")}
            >
              Save & Next
            </Button>
          </Flex>
          <Button
            size="sm"
            display={{ base: "flex", md: "none" }}
            w="90%"
            mx="auto"
            mt={0}
            colorScheme="blue"
            onClick={() => handlequestion("svn")}
          >
            Save & Next
          </Button>
        </VStack>

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
                Revision Karle
              </DrawerHeader>
              <DrawerBody p={6}>
                <QuestionSidebar />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}

      <AlertDialog
        isOpen={isSubmitDialogOpen}
        leastDestructiveRef={cancelSubmitRef}
        onClose={handleCancelSubmit}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Submit Test
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align="start" spacing={3}>
                <Text>Are you sure you want to submit the test?</Text>
                <Box w="100%" p={3} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" fontWeight="600" mb={2}>
                    Test Summary:
                  </Text>
                  <Text fontSize="sm">Total Questions: {question.length}</Text>
                  <Text fontSize="sm" color="green.600">
                    Answered: {answeredQuestion.length}
                  </Text>
                  <Text fontSize="sm" color="red.600">
                    Not Answered: {notAnswer.length}
                  </Text>
                  <Text fontSize="sm" color="purple.600">
                    Marked for Review:{" "}
                    {markedNotAnswer.length + markedAndAnswer.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Not Visited:{" "}
                    {question.length -
                      (markedAndAnswer.length +
                        markedNotAnswer.length +
                        answeredQuestion.length +
                        notAnswer.length)}
                  </Text>
                </Box>
                <Text fontSize="sm" color="red.500" fontWeight="500">
                  ⚠️ Once submitted, you cannot change your answers.
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelSubmitRef} onClick={handleCancelSubmit}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleConfirmSubmit} ml={3}>
                Yes, Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default TakeTest;