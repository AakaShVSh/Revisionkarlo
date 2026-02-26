// Fixed ResultPage.jsx - Added reactive bookmark state
// Key changes:
// 1. Bookmark state updates when questions change
// 2. Better localStorage synchronization
// 3. Added useCallback for performance

import {
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  Badge,
  Progress,
  Container,
  Grid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Circle,
  VStack,
  HStack,
  IconButton,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import {
  FiTarget,
  FiCheckCircle,
  FiXCircle,
  FiCircle,
  FiArrowLeft,
  FiFlag,
  FiAlertCircle,
  FiBookmark,
} from "react-icons/fi";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { useEffect, useState, useCallback } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { Link } from "react-router-dom";
import AdBanner from "./AdBanner";
import FloatingVideoAd from "./FloatingVideoAd";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
);

const ResultPage = () => {
  const [totalMark, setTotalMark] = useState(0);
  const [TotalQuestion, SetTotalQuestion] = useState([]);
  const [allAnswers, setAllAnswers] = useState({});
  const [savedQuestionIndices, setSavedQuestionIndices] = useState(new Set());
  const [testData, setTestData] = useState(null);
  const toast = useToast();

  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const [correctQus, setCorrectQus] = useState([]);
  const [wrongAnsQus, setWrongAnsQus] = useState([]);
  const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
  const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
  const [notAnswer, setNotAnswer] = useState([]);

  // ✅ FIXED: Made loadSavedQuestions a useCallback so it can be a dependency
  const loadSavedQuestions = useCallback(() => {
    if (TotalQuestion.length === 0) return;

    const subject = getLocalStorage("Subject");
    const subjectKey = subject?.toLowerCase() || "general studies";
    const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
    const savedForSubject = allSaved[subjectKey] || [];
    const savedTexts = new Set(savedForSubject.map((q) => q.qus));
    const savedIndices = new Set();

    TotalQuestion.forEach((q, idx) => {
      if (savedTexts.has(q.qus)) savedIndices.add(idx);
    });

    setSavedQuestionIndices(savedIndices);

    console.log("🔄 Loaded saved questions:", {
      subject: subjectKey,
      totalSaved: savedIndices.size,
      indices: Array.from(savedIndices),
    });
  }, [TotalQuestion]);

  useEffect(() => {
    const savedTest = getLocalStorage("test");
    if (!savedTest || !savedTest[0]) return;

    const data = savedTest[0];
    SetTotalQuestion(data.questions || []);
    setTotalMark(data.score || 0);
    setAllAnswers(data.allAnswer || {});
    setTestData(data);
    setAnsweredQuestion(data.answeredQuestion || []);
    setCorrectQus(data.correctQus || []);
    setWrongAnsQus(data.wrongansqus || []);
    setMarkedAndAnswer(data.markedAndAnswer || []);
    setMarkedNotAnswer(data.markedNotAnswer || []);
    setNotAnswer(data.notAnswer || []);
  }, []);

  // ✅ FIXED: Reload bookmarks when questions change
  useEffect(() => {
    loadSavedQuestions();
  }, [loadSavedQuestions]);

  // ✅ NEW: Listen for storage changes (if user bookmarks in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "savedQuestionsBySubject") {
        console.log("📡 Storage changed, reloading bookmarks");
        loadSavedQuestions();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadSavedQuestions]);

  const toggleSaveQuestion = (question, index) => {
    const subject = getLocalStorage("Subject");
    const subjectKey = subject?.toLowerCase() || "general studies";
    const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
    const savedForSubject = allSaved[subjectKey] || [];
    const existingIndex = savedForSubject.findIndex(
      (q) => q.qus === question.qus,
    );

    if (existingIndex >= 0) {
      // Remove bookmark
      savedForSubject.splice(existingIndex, 1);
      allSaved[subjectKey] = savedForSubject;
      setLocalStorage("savedQuestionsBySubject", allSaved);

      const qusno = (getLocalStorage("qusno") || []).filter(
        (t) => t !== question.qus,
      );
      setLocalStorage("qusno", qusno);

      setSavedQuestionIndices((prev) => {
        const s = new Set(prev);
        s.delete(index);
        return s;
      });

      toast({
        title: "Question removed",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      // Add bookmark
      savedForSubject.push(question);
      allSaved[subjectKey] = savedForSubject;
      setLocalStorage("savedQuestionsBySubject", allSaved);

      const qusno = getLocalStorage("qusno") || [];
      if (!qusno.includes(question.qus)) {
        qusno.push(question.qus);
        setLocalStorage("qusno", qusno);
      }

      setSavedQuestionIndices((prev) => new Set(prev).add(index));

      toast({
        title: "Question saved!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const totalQ = TotalQuestion.length;
  const correctCount = correctQus.length;
  const wrongCount = wrongAnsQus.length;
  const answeredCount = answeredQuestion.length;
  const markedAndAnswerCount = markedAndAnswer.length;
  const markedNotAnswerCount = markedNotAnswer.length;
  const markedTotal = markedAndAnswerCount + markedNotAnswerCount;
  const notAnswerCount = notAnswer.length;
  const accuracy = totalQ > 0 ? (correctCount / totalQ) * 100 : 0;
  const completion =
    totalQ > 0
      ? Math.round(((answeredCount + markedAndAnswerCount) / totalQ) * 100)
      : 0;

  const getStatus = (index) => {
    if (correctQus.includes(index)) return "correct";
    if (wrongAnsQus.includes(index)) return "incorrect";
    if (markedAndAnswer.includes(index)) return "markedAnswered";
    if (markedNotAnswer.includes(index)) return "markedNotAnswered";
    if (notAnswer.includes(index)) return "notAnswered";
    if (answeredQuestion.includes(index)) return "answered";
    return "notVisited";
  };

  const STATUS_CFG = {
    correct: {
      color: "green",
      text: "Correct",
      icon: FiCheckCircle,
      border: "green.200",
    },
    incorrect: {
      color: "red",
      text: "Incorrect",
      icon: FiXCircle,
      border: "red.200",
    },
    markedAnswered: {
      color: "purple",
      text: "Marked & Answered",
      icon: FiFlag,
      border: "purple.200",
    },
    markedNotAnswered: {
      color: "orange",
      text: "Marked (No Answer)",
      icon: FiFlag,
      border: "orange.200",
    },
    notAnswered: {
      color: "gray",
      text: "Not Attempted",
      icon: FiCircle,
      border: "gray.100",
    },
    answered: {
      color: "blue",
      text: "Answered",
      icon: FiCheckCircle,
      border: "blue.200",
    },
    notVisited: {
      color: "gray",
      text: "Not Visited",
      icon: FiCircle,
      border: "gray.100",
    },
  };

  const doughnutData = {
    labels: ["Correct", "Incorrect", "Not Attempted"],
    datasets: [
      {
        data: [correctCount, wrongCount, notAnswerCount],
        backgroundColor: ["#48BB78", "#F56565", "#CBD5E0"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        borderRadius: 8,
      },
    },
  };

  // QuestionCard component - same as before but with reactive bookmark
  const QuestionCard = ({ question, index }) => {
    if (!question) return null;
    const userAnswer = allAnswers[index] ?? allAnswers[String(index)];
    const correctIdx = question.answer - 1;
    const correctAnswerText = question.options?.[correctIdx];
    const status = getStatus(index);
    const cfg = STATUS_CFG[status] || STATUS_CFG.notVisited;
    const isSaved = savedQuestionIndices.has(index);

    return (
      <Card
        mb={{ base: 3, md: 4 }}
        bg="white"
        shadow="md"
        borderRadius={{ base: "md", md: "lg" }}
        border="2px"
        borderColor={cfg.border}
        width="100%"
      >
        <CardBody p={{ base: 3, sm: 4, md: 5 }}>
          <Flex
            justify="space-between"
            align="flex-start"
            mb={{ base: 3, md: 4 }}
            gap={2}
            wrap="wrap"
          >
            <HStack spacing={{ base: 1.5, sm: 2, md: 3 }} wrap="wrap" flex="1">
              <Circle
                size={{ base: "24px", sm: "28px", md: "32px" }}
                bg="gray.100"
                fontWeight="bold"
                fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                color="gray.700"
              >
                {index + 1}
              </Circle>
              <Badge
                colorScheme={cfg.color}
                px={{ base: 1.5, sm: 2, md: 3 }}
                py={1}
                borderRadius="full"
                fontSize="2xs"
              >
                <HStack spacing={1}>
                  <Icon as={cfg.icon} boxSize={{ base: 2.5, md: 3 }} />
                  <Text>{cfg.text}</Text>
                </HStack>
              </Badge>
            </HStack>
            <Tooltip
              label={isSaved ? "Remove from saved" : "Save question"}
              placement="top"
              hasArrow
            >
              <IconButton
                icon={<FiBookmark />}
                size={{ base: "sm", md: "md" }}
                variant={isSaved ? "solid" : "outline"}
                colorScheme={isSaved ? "purple" : "gray"}
                aria-label={isSaved ? "Remove bookmark" : "Bookmark question"}
                onClick={() => toggleSaveQuestion(question, index)}
                _hover={{ transform: "scale(1.1)", shadow: "md" }}
                transition="all 0.2s"
              />
            </Tooltip>
          </Flex>

          <Text
            fontSize={{ base: "xs", sm: "sm", md: "md" }}
            fontWeight="semibold"
            color="gray.700"
            mb={{ base: 3, md: 4 }}
            lineHeight="tall"
          >
            {question.qus}
          </Text>

          <VStack
            align="stretch"
            spacing={{ base: 2, md: 3 }}
            mb={{ base: 3, md: 4 }}
          >
            {question.options?.map((option, optIndex) => {
              const isUserAns = userAnswer === option;
              const isCorrectOption = optIndex === correctIdx;
              const isWrongPick = isUserAns && status === "incorrect";

              let borderColor = "gray.200";
              let bgColor = "transparent";
              let circleBg = "gray.300";

              if (isCorrectOption) {
                borderColor = "green.400";
                bgColor = "green.50";
                circleBg = "green.500";
              } else if (isWrongPick) {
                borderColor = "red.400";
                bgColor = "red.50";
                circleBg = "red.500";
              }

              return (
                <Box
                  key={optIndex}
                  p={{ base: 2, sm: 2.5, md: 3 }}
                  borderRadius="md"
                  border="2px"
                  borderColor={borderColor}
                  bg={bgColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    gap={2}
                    wrap="wrap"
                  >
                    <HStack spacing={{ base: 2, md: 3 }} flex="1" minW="0">
                      <Circle
                        size={{ base: "20px", sm: "22px", md: "24px" }}
                        bg={circleBg}
                        color="white"
                        fontSize="2xs"
                        fontWeight="bold"
                        flexShrink={0}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </Circle>
                      <Text
                        fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                        color="gray.700"
                        fontWeight={
                          isUserAns || isCorrectOption ? "semibold" : "normal"
                        }
                        wordBreak="break-word"
                      >
                        {option}
                      </Text>
                    </HStack>
                    <HStack spacing={1} flexShrink={0}>
                      {isCorrectOption && (
                        <Badge colorScheme="green" fontSize="2xs">
                          Correct Answer
                        </Badge>
                      )}
                      {isUserAns && status === "correct" && (
                        <Badge colorScheme="green" fontSize="2xs">
                          Your Answer ✓
                        </Badge>
                      )}
                      {isWrongPick && (
                        <Badge colorScheme="red" fontSize="2xs">
                          Your Answer ✗
                        </Badge>
                      )}
                      {isUserAns && status === "markedAnswered" && (
                        <Badge colorScheme="purple" fontSize="2xs">
                          Your Answer
                        </Badge>
                      )}
                    </HStack>
                  </Flex>
                </Box>
              );
            })}
          </VStack>

          {question.explanation && (
            <Box
              p={{ base: 2.5, sm: 3, md: 4 }}
              bg="blue.50"
              borderRadius="md"
              borderLeft="4px"
              borderColor="blue.400"
              mb={{ base: 3, md: 4 }}
            >
              <HStack spacing={2} mb={2}>
                <Icon
                  as={FiAlertCircle}
                  color="blue.500"
                  boxSize={{ base: 3.5, sm: 4, md: 5 }}
                />
                <Text
                  fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                  fontWeight="bold"
                  color="blue.700"
                >
                  Explanation
                </Text>
              </HStack>
              <Text
                fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                color="blue.800"
                lineHeight="tall"
              >
                {question.explanation}
              </Text>
            </Box>
          )}

          <Box pt={{ base: 3, md: 4 }} borderTop="1px" borderColor="gray.200">
            <Flex
              justify="space-between"
              align={{ base: "flex-start", sm: "center" }}
              gap={{ base: 2, md: 3 }}
              direction={{ base: "column", sm: "row" }}
            >
              <VStack align="start" spacing={1} flex="1">
                <Text
                  fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                  color="gray.600"
                >
                  Your Answer:{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color={
                      status === "correct"
                        ? "green.600"
                        : status === "incorrect"
                          ? "red.600"
                          : "gray.500"
                    }
                  >
                    {userAnswer || "Not Attempted"}
                  </Text>
                </Text>
                <Text
                  fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                  color="gray.600"
                >
                  Correct Answer:{" "}
                  <Text as="span" fontWeight="bold" color="green.600">
                    {correctAnswerText}
                  </Text>
                </Text>
              </VStack>
              {status === "correct" && (
                <Badge colorScheme="green" px={3} py={1} fontSize="2xs">
                  +1 Point
                </Badge>
              )}
              {status === "incorrect" && (
                <Badge colorScheme="red" px={3} py={1} fontSize="2xs">
                  0 Points
                </Badge>
              )}
              {status === "markedAnswered" && (
                <Badge colorScheme="purple" px={3} py={1} fontSize="2xs">
                  Marked
                </Badge>
              )}
              {status === "markedNotAnswered" && (
                <Badge colorScheme="orange" px={3} py={1} fontSize="2xs">
                  Marked
                </Badge>
              )}
              {(status === "notAnswered" || status === "notVisited") && (
                <Badge colorScheme="gray" px={3} py={1} fontSize="2xs">
                  Not Attempted
                </Badge>
              )}
            </Flex>
          </Box>
        </CardBody>
      </Card>
    );
  };

  const renderQuestions = (indices) => {
    if (!indices || indices.length === 0) {
      return (
        <Box textAlign="center" py={{ base: 6, md: 10 }}>
          <Icon
            as={FiAlertCircle}
            boxSize={{ base: 8, sm: 10, md: 12 }}
            color="gray.300"
            mb={4}
          />
          <Text color="gray.500" fontSize={{ base: "xs", sm: "sm", md: "md" }}>
            No questions in this category
          </Text>
        </Box>
      );
    }
    return indices.map((qIndex) => {
      const q = TotalQuestion[qIndex];
      if (!q) return null;
      return <QuestionCard key={qIndex} question={q} index={qIndex} />;
    });
  };

  const allIndices = Array.from({ length: totalQ }, (_, i) => i);
  const markedAllIndices = [...markedNotAnswer, ...markedAndAnswer];

  const MetricCard = ({ icon, label, value, subtext, color, bgColor }) => (
    <Card
      bg="white"
      shadow="sm"
      borderRadius={{ base: "lg", md: "xl" }}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ shadow: "md", transform: "translateY(-4px)" }}
      border="1px"
      borderColor="gray.100"
      height="100%"
    >
      <CardBody p={{ base: 3, sm: 4, md: 5 }}>
        <Flex
          align="center"
          justify="space-between"
          mb={{ base: 2, md: 3 }}
          direction={{ base: "column", sm: "row" }}
          gap={2}
        >
          <Circle size={{ base: "36px", sm: "40px", md: "48px" }} bg={bgColor}>
            <Icon as={icon} boxSize={{ base: 3, sm: 4, md: 5 }} color={color} />
          </Circle>
          <Badge
            colorScheme={color.split(".")[0]}
            fontSize={{ base: "2xs", md: "xs" }}
            px={{ base: 2, md: 3 }}
            py={1}
            borderRadius="full"
          >
            {subtext}
          </Badge>
        </Flex>
        <Stat>
          <StatLabel
            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
            color="gray.500"
            mb={1}
          >
            {label}
          </StatLabel>
          <StatNumber
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            fontWeight="bold"
            color="gray.700"
          >
            {value}
          </StatNumber>
        </Stat>
      </CardBody>
    </Card>
  );

  const ScoreItem = ({ icon, label, value, color }) => (
    <Flex align="center" py={{ base: 2, md: 3 }}>
      <Circle
        size={{ base: "32px", sm: "36px", md: "40px" }}
        bg={`${color}.50`}
        mr={{ base: 2, md: 3 }}
      >
        <Icon
          as={icon}
          color={`${color}.600`}
          boxSize={{ base: 3, sm: 4, md: 5 }}
        />
      </Circle>
      <Box flex="1">
        <Text
          fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
          color="gray.600"
          mb={1}
        >
          {label}
        </Text>
        <Text
          fontSize={{ base: "sm", sm: "md", md: "lg" }}
          fontWeight="semibold"
          color="gray.700"
        >
          {value}
        </Text>
      </Box>
    </Flex>
  );

  const TABS = [
    {
      label: "All Questions",
      count: totalQ,
      indices: allIndices,
      headingColor: "gray.700",
      desc: "Every question with its status, your answer, and the correct answer.",
    },
    {
      label: "Answered",
      count: answeredCount,
      indices: answeredQuestion,
      headingColor: "blue.600",
      desc: "All questions you submitted an answer for (correct + incorrect).",
    },
    {
      label: "Correct",
      count: correctCount,
      indices: correctQus,
      headingColor: "green.600",
      desc: "Questions you answered correctly. 🎉",
    },
    {
      label: "Incorrect",
      count: wrongCount,
      indices: wrongAnsQus,
      headingColor: "red.600",
      desc: "Review these to improve. 💡 Bookmark them for later practice!",
    },
    {
      label: "Marked",
      count: markedTotal,
      indices: markedAllIndices,
      headingColor: "orange.600",
      desc: null,
    },
    {
      label: "Not Attempted",
      count: notAnswerCount,
      indices: notAnswer,
      headingColor: "gray.600",
      desc: "Questions you skipped entirely.",
    },
  ];

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.50, purple.50)"
      py={{ base: 3, sm: 4, md: 6, lg: 8 }}
      px={{ base: 2, sm: 3, md: 6, lg: 10 }}
    >
      <Container maxW="1400px" px={{ base: 2, sm: 3, md: 4 }}>
        {/* Header */}
        <Flex align="center" mb={{ base: 4, sm: 6, md: 8 }}>
          <Link to="/">
            <Icon
              as={FiArrowLeft}
              boxSize={{ base: 4, sm: 5, md: 6 }}
              color="purple.600"
              cursor="pointer"
              mr={{ base: 2, sm: 3, md: 4 }}
              _hover={{ transform: "translateX(-4px)" }}
              transition="all 0.2s"
            />
          </Link>
          <Box>
            <Heading
              fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="bold"
              color="gray.700"
              mb={1}
            >
              Test Results
            </Heading>
            <Text
              color="gray.500"
              fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
              display={{ base: "none", sm: "block" }}
            >
              Detailed performance analysis and insights
            </Text>
          </Box>
          <Box
            ml="auto"
            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
            fontWeight="medium"
            bg="blue.600"
            color="white"
            px={{ base: 2, sm: 2.5, md: 3 }}
            py={{ base: 1, sm: 1.5, md: 2 }}
            borderRadius="md"
            whiteSpace="nowrap"
          >
            <Link to="/Review-Test">Review Test</Link>
          </Box>
        </Flex>

        <VStack spacing={{ base: 4, md: 6 }} mb={{ base: 4, md: 6, lg: 8 }}>
          {/* Doughnut Chart */}
          <Card
            bg="white"
            shadow="lg"
            borderRadius={{ base: "lg", md: "2xl" }}
            overflow="hidden"
            border="1px"
            borderColor="gray.100"
            width="100%"
          >
            <CardBody p={{ base: 3, sm: 4, md: 6 }}>
              <Box
                h={{ base: "180px", sm: "220px", md: "280px" }}
                position="relative"
                mb={{ base: 3, sm: 4, md: 6 }}
              >
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  direction="column"
                  align="center"
                >
                  <Text
                    fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color="purple.600"
                  >
                    {totalMark}
                  </Text>
                  <Text
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    color="gray.500"
                  >
                    / {totalQ}
                  </Text>
                  <Text
                    fontSize={{ base: "2xs", md: "xs" }}
                    color="gray.400"
                    mt={1}
                  >
                    Score
                  </Text>
                </Flex>
              </Box>

              <Divider mb={{ base: 3, md: 4 }} />

              <Box
                display="flex"
                flexDirection="row"
                gap="10"
                justifyContent="center"
                flexWrap="wrap"
              >
                <ScoreItem
                  icon={FiCheckCircle}
                  label="Correct Answers"
                  value={correctCount}
                  color="green"
                />
                <ScoreItem
                  icon={FiXCircle}
                  label="Incorrect Answers"
                  value={wrongCount}
                  color="red"
                />
                <ScoreItem
                  icon={FiCheckCircle}
                  label="Answered (total)"
                  value={answeredCount}
                  color="blue"
                />
                <ScoreItem
                  icon={FiFlag}
                  label="Marked & Answered"
                  value={markedAndAnswerCount}
                  color="purple"
                />
                <ScoreItem
                  icon={FiFlag}
                  label="Marked (No Answer)"
                  value={markedNotAnswerCount}
                  color="orange"
                />
                <ScoreItem
                  icon={FiCircle}
                  label="Not Attempted"
                  value={notAnswerCount}
                  color="gray"
                />
              </Box>
            </CardBody>
          </Card>

          {/* Ad Banner */}
          <Box w="100%">
            <AdBanner
              type="horizontal"
              height={{ base: "90px", md: "100px" }}
              width="100%"
              label="Sponsored"
            />
          </Box>

          {/* Metric Cards */}
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={{ base: 2, sm: 3, md: 4 }}
            width="100%"
          >
            <MetricCard
              icon={FiTarget}
              label="Accuracy"
              value={`${accuracy.toFixed(1)}%`}
              subtext="Performance"
              color="green.600"
              bgColor="green.50"
            />
            <MetricCard
              icon={FiCheckCircle}
              label="Completion"
              value={`${completion}%`}
              subtext="Attempted"
              color="orange.600"
              bgColor="orange.50"
            />
            <MetricCard
              icon={FiFlag}
              label="Marked"
              value={markedTotal}
              subtext="For Review"
              color="purple.600"
              bgColor="purple.50"
            />
            <MetricCard
              icon={FiCircle}
              label="Not Attempted"
              value={notAnswerCount}
              subtext="Skipped"
              color="gray.600"
              bgColor="gray.50"
            />
          </Grid>

          {/* Progress Bar */}
          <Card
            bg="white"
            shadow="sm"
            borderRadius={{ base: "lg", md: "xl" }}
            border="1px"
            borderColor="gray.100"
            width="100%"
          >
            <CardBody p={{ base: 3, sm: 4, md: 6 }}>
              <Flex
                justify="space-between"
                align="center"
                mb={{ base: 2, md: 3 }}
              >
                <Text
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                  fontWeight="semibold"
                  color="gray.700"
                >
                  Overall Performance
                </Text>
                <Text
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  fontWeight="bold"
                  color="purple.600"
                >
                  {accuracy.toFixed(1)}%
                </Text>
              </Flex>
              <Progress
                value={accuracy}
                size={{ base: "sm", md: "lg" }}
                borderRadius="full"
                colorScheme="purple"
                hasStripe
                isAnimated
              />
              <Flex justify="space-between" mt={2}>
                <Text fontSize="2xs" color="gray.500">
                  0%
                </Text>
                <Text fontSize="2xs" color="gray.500">
                  100%
                </Text>
              </Flex>
            </CardBody>
          </Card>
        </VStack>

        {/* Tabs */}
        <Card
          bg="white"
          shadow="lg"
          borderRadius={{ base: "lg", md: "2xl" }}
          overflow="hidden"
          border="1px"
          borderColor="gray.100"
        >
          <CardBody p={0}>
            <Tabs colorScheme="purple" variant="soft-rounded">
              <Box
                px={{ base: 2, sm: 3, md: 6 }}
                pt={{ base: 3, sm: 4, md: 6 }}
              >
                <Box
                  bg="gray.50"
                  p={1}
                  borderRadius="xl"
                  overflowX="auto"
                  css={{
                    "&::-webkit-scrollbar": { height: "4px" },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#CBD5E0",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <TabList
                    border="none"
                    gap={{ base: 1, md: 2 }}
                    minWidth="max-content"
                  >
                    {TABS.map(({ label, count }) => (
                      <Tab
                        key={label}
                        fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                        fontWeight="medium"
                        px={{ base: 2, sm: 2.5, md: 3 }}
                        py={{ base: 1, sm: 1.5, md: 2 }}
                        _selected={{ bg: "purple.600", color: "white" }}
                        whiteSpace="nowrap"
                      >
                        {label} ({count})
                      </Tab>
                    ))}
                  </TabList>
                </Box>
              </Box>

              <TabPanels>
                {TABS.map(({ label, count, indices, headingColor, desc }) => (
                  <TabPanel key={label} p={{ base: 2, sm: 3, md: 6 }}>
                    <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
                      <Box mb={{ base: 1, sm: 2, md: 4 }}>
                        <Heading
                          size={{ base: "xs", sm: "sm", md: "md" }}
                          mb={{ base: 1, md: 2 }}
                          color={headingColor}
                        >
                          {label} ({count})
                        </Heading>
                        {label === "Marked" && (
                          <HStack spacing={3} mb={2} wrap="wrap">
                            <Badge
                              colorScheme="purple"
                              fontSize="xs"
                              px={2}
                              py={1}
                              borderRadius="full"
                            >
                              Marked + Answered: {markedAndAnswerCount}
                            </Badge>
                            <Badge
                              colorScheme="orange"
                              fontSize="xs"
                              px={2}
                              py={1}
                              borderRadius="full"
                            >
                              Marked (No Answer): {markedNotAnswerCount}
                            </Badge>
                          </HStack>
                        )}
                        {desc && (
                          <Text
                            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                            color="gray.500"
                          >
                            {desc}
                          </Text>
                        )}
                      </Box>
                      {renderQuestions(indices)}
                    </VStack>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </Container>

      <FloatingVideoAd />
    </Box>
  );
};

export default ResultPage;

// import {
//   Box,
//   Flex,
//   Heading,
//   Icon,
//   Text,
//   Badge,
//   Progress,
//   Container,
//   Grid,
//   Card,
//   CardBody,
//   Stat,
//   StatLabel,
//   StatNumber,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Divider,
//   Circle,
//   VStack,
//   HStack,
//   IconButton,
//   useToast,
//   Tooltip,
// } from "@chakra-ui/react";
// import {
//   FiTarget,
//   FiCheckCircle,
//   FiXCircle,
//   FiCircle,
//   FiArrowLeft,
//   FiFlag,
//   FiAlertCircle,
//   FiBookmark,
// } from "react-icons/fi";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
// } from "chart.js";
// import { useEffect, useState } from "react";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
// import { Link } from "react-router-dom";
// import AdBanner from "./AdBanner";
// import FloatingVideoAd from "./FloatingVideoAd";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartTooltip,
//   Legend,
// );

// const ResultPage = () => {
//   const [totalMark, setTotalMark] = useState(0);
//   const [TotalQuestion, SetTotalQuestion] = useState([]);
//   const [allAnswers, setAllAnswers] = useState({});
//   const [savedQuestionIndices, setSavedQuestionIndices] = useState(new Set());
//   const [testData, setTestData] = useState(null);
//   const toast = useToast();

//   const [answeredQuestion, setAnsweredQuestion] = useState([]);
//   const [correctQus, setCorrectQus] = useState([]);
//   const [wrongAnsQus, setWrongAnsQus] = useState([]);
//   const [markedAndAnswer, setMarkedAndAnswer] = useState([]);
//   const [markedNotAnswer, setMarkedNotAnswer] = useState([]);
//   const [notAnswer, setNotAnswer] = useState([]);

//   useEffect(() => {
//     const savedTest = getLocalStorage("test");
//     if (!savedTest || !savedTest[0]) return;

//     const data = savedTest[0];
//     SetTotalQuestion(data.questions || []);
//     setTotalMark(data.score || 0);
//     setAllAnswers(data.allAnswer || {});
//     setTestData(data);
//     setAnsweredQuestion(data.answeredQuestion || []);
//     setCorrectQus(data.correctQus || []);
//     setWrongAnsQus(data.wrongansqus || []);
//     setMarkedAndAnswer(data.markedAndAnswer || []);
//     setMarkedNotAnswer(data.markedNotAnswer || []);
//     setNotAnswer(data.notAnswer || []);
//   }, []);

//   useEffect(() => {
//     if (TotalQuestion.length > 0) loadSavedQuestions();
//   }, [TotalQuestion]);

//   const loadSavedQuestions = () => {
//     const subject = getLocalStorage("Subject");
//     const subjectKey = subject?.toLowerCase() || "general studies";
//     const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
//     const savedForSubject = allSaved[subjectKey] || [];
//     const savedTexts = new Set(savedForSubject.map((q) => q.qus));
//     const savedIndices = new Set();
//     TotalQuestion.forEach((q, idx) => {
//       if (savedTexts.has(q.qus)) savedIndices.add(idx);
//     });
//     setSavedQuestionIndices(savedIndices);
//   };

//   const toggleSaveQuestion = (question, index) => {
//     const subject = getLocalStorage("Subject");
//     const subjectKey = subject?.toLowerCase() || "general studies";
//     const allSaved = getLocalStorage("savedQuestionsBySubject") || {};
//     const savedForSubject = allSaved[subjectKey] || [];
//     const existingIndex = savedForSubject.findIndex(
//       (q) => q.qus === question.qus,
//     );

//     if (existingIndex >= 0) {
//       savedForSubject.splice(existingIndex, 1);
//       allSaved[subjectKey] = savedForSubject;
//       setLocalStorage("savedQuestionsBySubject", allSaved);
//       const qusno = (getLocalStorage("qusno") || []).filter(
//         (t) => t !== question.qus,
//       );
//       setLocalStorage("qusno", qusno);
//       setSavedQuestionIndices((prev) => {
//         const s = new Set(prev);
//         s.delete(index);
//         return s;
//       });
//       toast({
//         title: "Question removed",
//         status: "info",
//         duration: 2000,
//         isClosable: true,
//         position: "top",
//       });
//     } else {
//       savedForSubject.push(question);
//       allSaved[subjectKey] = savedForSubject;
//       setLocalStorage("savedQuestionsBySubject", allSaved);
//       const qusno = getLocalStorage("qusno") || [];
//       if (!qusno.includes(question.qus)) {
//         qusno.push(question.qus);
//         setLocalStorage("qusno", qusno);
//       }
//       setSavedQuestionIndices((prev) => new Set(prev).add(index));
//       toast({
//         title: "Question saved!",
//         status: "success",
//         duration: 2000,
//         isClosable: true,
//         position: "top",
//       });
//     }
//   };

//   const totalQ = TotalQuestion.length;
//   const correctCount = correctQus.length;
//   const wrongCount = wrongAnsQus.length;
//   const answeredCount = answeredQuestion.length;
//   const markedAndAnswerCount = markedAndAnswer.length;
//   const markedNotAnswerCount = markedNotAnswer.length;
//   const markedTotal = markedAndAnswerCount + markedNotAnswerCount;
//   const notAnswerCount = notAnswer.length;
//   const accuracy = totalQ > 0 ? (correctCount / totalQ) * 100 : 0;
//   const completion =
//     totalQ > 0
//       ? Math.round(((answeredCount + markedAndAnswerCount) / totalQ) * 100)
//       : 0;

//   const getStatus = (index) => {
//     if (correctQus.includes(index)) return "correct";
//     if (wrongAnsQus.includes(index)) return "incorrect";
//     if (markedAndAnswer.includes(index)) return "markedAnswered";
//     if (markedNotAnswer.includes(index)) return "markedNotAnswered";
//     if (notAnswer.includes(index)) return "notAnswered";
//     if (answeredQuestion.includes(index)) return "answered";
//     return "notVisited";
//   };

//   const STATUS_CFG = {
//     correct: {
//       color: "green",
//       text: "Correct",
//       icon: FiCheckCircle,
//       border: "green.200",
//     },
//     incorrect: {
//       color: "red",
//       text: "Incorrect",
//       icon: FiXCircle,
//       border: "red.200",
//     },
//     markedAnswered: {
//       color: "purple",
//       text: "Marked & Answered",
//       icon: FiFlag,
//       border: "purple.200",
//     },
//     markedNotAnswered: {
//       color: "orange",
//       text: "Marked (No Answer)",
//       icon: FiFlag,
//       border: "orange.200",
//     },
//     notAnswered: {
//       color: "gray",
//       text: "Not Attempted",
//       icon: FiCircle,
//       border: "gray.100",
//     },
//     answered: {
//       color: "blue",
//       text: "Answered",
//       icon: FiCheckCircle,
//       border: "blue.200",
//     },
//     notVisited: {
//       color: "gray",
//       text: "Not Visited",
//       icon: FiCircle,
//       border: "gray.100",
//     },
//   };

//   const doughnutData = {
//     labels: ["Correct", "Incorrect", "Not Attempted"],
//     datasets: [
//       {
//         data: [correctCount, wrongCount, notAnswerCount],
//         backgroundColor: ["#48BB78", "#F56565", "#CBD5E0"],
//         borderWidth: 0,
//         cutout: "75%",
//       },
//     ],
//   };

//   const doughnutOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: "rgba(0,0,0,0.8)",
//         padding: 12,
//         borderRadius: 8,
//       },
//     },
//   };

//   const QuestionCard = ({ question, index }) => {
//     if (!question) return null;
//     const userAnswer = allAnswers[index] ?? allAnswers[String(index)];
//     const correctIdx = question.answer - 1;
//     const correctAnswerText = question.options?.[correctIdx];
//     const status = getStatus(index);
//     const cfg = STATUS_CFG[status] || STATUS_CFG.notVisited;
//     const isSaved = savedQuestionIndices.has(index);

//     return (
//       <Card
//         mb={{ base: 3, md: 4 }}
//         bg="white"
//         shadow="md"
//         borderRadius={{ base: "md", md: "lg" }}
//         border="2px"
//         borderColor={cfg.border}
//         width="100%"
//       >
//         <CardBody p={{ base: 3, sm: 4, md: 5 }}>
//           <Flex
//             justify="space-between"
//             align="flex-start"
//             mb={{ base: 3, md: 4 }}
//             gap={2}
//             wrap="wrap"
//           >
//             <HStack spacing={{ base: 1.5, sm: 2, md: 3 }} wrap="wrap" flex="1">
//               <Circle
//                 size={{ base: "24px", sm: "28px", md: "32px" }}
//                 bg="gray.100"
//                 fontWeight="bold"
//                 fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                 color="gray.700"
//               >
//                 {index + 1}
//               </Circle>
//               <Badge
//                 colorScheme={cfg.color}
//                 px={{ base: 1.5, sm: 2, md: 3 }}
//                 py={1}
//                 borderRadius="full"
//                 fontSize="2xs"
//               >
//                 <HStack spacing={1}>
//                   <Icon as={cfg.icon} boxSize={{ base: 2.5, md: 3 }} />
//                   <Text>{cfg.text}</Text>
//                 </HStack>
//               </Badge>
//             </HStack>
//             <Tooltip
//               label={isSaved ? "Remove from saved" : "Save question"}
//               placement="top"
//               hasArrow
//             >
//               <IconButton
//                 icon={<FiBookmark />}
//                 size={{ base: "sm", md: "md" }}
//                 variant={isSaved ? "solid" : "outline"}
//                 colorScheme={isSaved ? "purple" : "gray"}
//                 aria-label={isSaved ? "Remove bookmark" : "Bookmark question"}
//                 onClick={() => toggleSaveQuestion(question, index)}
//                 _hover={{ transform: "scale(1.1)", shadow: "md" }}
//                 transition="all 0.2s"
//               />
//             </Tooltip>
//           </Flex>

//           <Text
//             fontSize={{ base: "xs", sm: "sm", md: "md" }}
//             fontWeight="semibold"
//             color="gray.700"
//             mb={{ base: 3, md: 4 }}
//             lineHeight="tall"
//           >
//             {question.qus}
//           </Text>

//           <VStack
//             align="stretch"
//             spacing={{ base: 2, md: 3 }}
//             mb={{ base: 3, md: 4 }}
//           >
//             {question.options?.map((option, optIndex) => {
//               const isUserAns = userAnswer === option;
//               const isCorrectOption = optIndex === correctIdx;
//               const isWrongPick = isUserAns && status === "incorrect";

//               let borderColor = "gray.200";
//               let bgColor = "transparent";
//               let circleBg = "gray.300";

//               if (isCorrectOption) {
//                 borderColor = "green.400";
//                 bgColor = "green.50";
//                 circleBg = "green.500";
//               } else if (isWrongPick) {
//                 borderColor = "red.400";
//                 bgColor = "red.50";
//                 circleBg = "red.500";
//               }

//               return (
//                 <Box
//                   key={optIndex}
//                   p={{ base: 2, sm: 2.5, md: 3 }}
//                   borderRadius="md"
//                   border="2px"
//                   borderColor={borderColor}
//                   bg={bgColor}
//                 >
//                   <Flex
//                     justify="space-between"
//                     align="center"
//                     gap={2}
//                     wrap="wrap"
//                   >
//                     <HStack spacing={{ base: 2, md: 3 }} flex="1" minW="0">
//                       <Circle
//                         size={{ base: "20px", sm: "22px", md: "24px" }}
//                         bg={circleBg}
//                         color="white"
//                         fontSize="2xs"
//                         fontWeight="bold"
//                         flexShrink={0}
//                       >
//                         {String.fromCharCode(65 + optIndex)}
//                       </Circle>
//                       <Text
//                         fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                         color="gray.700"
//                         fontWeight={
//                           isUserAns || isCorrectOption ? "semibold" : "normal"
//                         }
//                         wordBreak="break-word"
//                       >
//                         {option}
//                       </Text>
//                     </HStack>
//                     <HStack spacing={1} flexShrink={0}>
//                       {isCorrectOption && (
//                         <Badge colorScheme="green" fontSize="2xs">
//                           Correct Answer
//                         </Badge>
//                       )}
//                       {isUserAns && status === "correct" && (
//                         <Badge colorScheme="green" fontSize="2xs">
//                           Your Answer ✓
//                         </Badge>
//                       )}
//                       {isWrongPick && (
//                         <Badge colorScheme="red" fontSize="2xs">
//                           Your Answer ✗
//                         </Badge>
//                       )}
//                       {isUserAns && status === "markedAnswered" && (
//                         <Badge colorScheme="purple" fontSize="2xs">
//                           Your Answer
//                         </Badge>
//                       )}
//                     </HStack>
//                   </Flex>
//                 </Box>
//               );
//             })}
//           </VStack>

//           {question.explanation && (
//             <Box
//               p={{ base: 2.5, sm: 3, md: 4 }}
//               bg="blue.50"
//               borderRadius="md"
//               borderLeft="4px"
//               borderColor="blue.400"
//               mb={{ base: 3, md: 4 }}
//             >
//               <HStack spacing={2} mb={2}>
//                 <Icon
//                   as={FiAlertCircle}
//                   color="blue.500"
//                   boxSize={{ base: 3.5, sm: 4, md: 5 }}
//                 />
//                 <Text
//                   fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                   fontWeight="bold"
//                   color="blue.700"
//                 >
//                   Explanation
//                 </Text>
//               </HStack>
//               <Text
//                 fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                 color="blue.800"
//                 lineHeight="tall"
//               >
//                 {question.explanation}
//               </Text>
//             </Box>
//           )}

//           <Box pt={{ base: 3, md: 4 }} borderTop="1px" borderColor="gray.200">
//             <Flex
//               justify="space-between"
//               align={{ base: "flex-start", sm: "center" }}
//               gap={{ base: 2, md: 3 }}
//               direction={{ base: "column", sm: "row" }}
//             >
//               <VStack align="start" spacing={1} flex="1">
//                 <Text
//                   fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                   color="gray.600"
//                 >
//                   Your Answer:{" "}
//                   <Text
//                     as="span"
//                     fontWeight="bold"
//                     color={
//                       status === "correct"
//                         ? "green.600"
//                         : status === "incorrect"
//                           ? "red.600"
//                           : "gray.500"
//                     }
//                   >
//                     {userAnswer || "Not Attempted"}
//                   </Text>
//                 </Text>
//                 <Text
//                   fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                   color="gray.600"
//                 >
//                   Correct Answer:{" "}
//                   <Text as="span" fontWeight="bold" color="green.600">
//                     {correctAnswerText}
//                   </Text>
//                 </Text>
//               </VStack>
//               {status === "correct" && (
//                 <Badge colorScheme="green" px={3} py={1} fontSize="2xs">
//                   +1 Point
//                 </Badge>
//               )}
//               {status === "incorrect" && (
//                 <Badge colorScheme="red" px={3} py={1} fontSize="2xs">
//                   0 Points
//                 </Badge>
//               )}
//               {status === "markedAnswered" && (
//                 <Badge colorScheme="purple" px={3} py={1} fontSize="2xs">
//                   Marked
//                 </Badge>
//               )}
//               {status === "markedNotAnswered" && (
//                 <Badge colorScheme="orange" px={3} py={1} fontSize="2xs">
//                   Marked
//                 </Badge>
//               )}
//               {(status === "notAnswered" || status === "notVisited") && (
//                 <Badge colorScheme="gray" px={3} py={1} fontSize="2xs">
//                   Not Attempted
//                 </Badge>
//               )}
//             </Flex>
//           </Box>
//         </CardBody>
//       </Card>
//     );
//   };

//   const renderQuestions = (indices) => {
//     if (!indices || indices.length === 0) {
//       return (
//         <Box textAlign="center" py={{ base: 6, md: 10 }}>
//           <Icon
//             as={FiAlertCircle}
//             boxSize={{ base: 8, sm: 10, md: 12 }}
//             color="gray.300"
//             mb={4}
//           />
//           <Text color="gray.500" fontSize={{ base: "xs", sm: "sm", md: "md" }}>
//             No questions in this category
//           </Text>
//         </Box>
//       );
//     }
//     return indices.map((qIndex) => {
//       const q = TotalQuestion[qIndex];
//       if (!q) return null;
//       return <QuestionCard key={qIndex} question={q} index={qIndex} />;
//     });
//   };

//   const allIndices = Array.from({ length: totalQ }, (_, i) => i);
//   const markedAllIndices = [...markedNotAnswer, ...markedAndAnswer];

//   const MetricCard = ({ icon, label, value, subtext, color, bgColor }) => (
//     <Card
//       bg="white"
//       shadow="sm"
//       borderRadius={{ base: "lg", md: "xl" }}
//       overflow="hidden"
//       transition="all 0.3s"
//       _hover={{ shadow: "md", transform: "translateY(-4px)" }}
//       border="1px"
//       borderColor="gray.100"
//       height="100%"
//     >
//       <CardBody p={{ base: 3, sm: 4, md: 5 }}>
//         <Flex
//           align="center"
//           justify="space-between"
//           mb={{ base: 2, md: 3 }}
//           direction={{ base: "column", sm: "row" }}
//           gap={2}
//         >
//           <Circle size={{ base: "36px", sm: "40px", md: "48px" }} bg={bgColor}>
//             <Icon as={icon} boxSize={{ base: 3, sm: 4, md: 5 }} color={color} />
//           </Circle>
//           <Badge
//             colorScheme={color.split(".")[0]}
//             fontSize={{ base: "2xs", md: "xs" }}
//             px={{ base: 2, md: 3 }}
//             py={1}
//             borderRadius="full"
//           >
//             {subtext}
//           </Badge>
//         </Flex>
//         <Stat>
//           <StatLabel
//             fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//             color="gray.500"
//             mb={1}
//           >
//             {label}
//           </StatLabel>
//           <StatNumber
//             fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
//             fontWeight="bold"
//             color="gray.700"
//           >
//             {value}
//           </StatNumber>
//         </Stat>
//       </CardBody>
//     </Card>
//   );

//   const ScoreItem = ({ icon, label, value, color }) => (
//     <Flex align="center" py={{ base: 2, md: 3 }}>
//       <Circle
//         size={{ base: "32px", sm: "36px", md: "40px" }}
//         bg={`${color}.50`}
//         mr={{ base: 2, md: 3 }}
//       >
//         <Icon
//           as={icon}
//           color={`${color}.600`}
//           boxSize={{ base: 3, sm: 4, md: 5 }}
//         />
//       </Circle>
//       <Box flex="1">
//         <Text
//           fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//           color="gray.600"
//           mb={1}
//         >
//           {label}
//         </Text>
//         <Text
//           fontSize={{ base: "sm", sm: "md", md: "lg" }}
//           fontWeight="semibold"
//           color="gray.700"
//         >
//           {value}
//         </Text>
//       </Box>
//     </Flex>
//   );

//   const TABS = [
//     {
//       label: "All Questions",
//       count: totalQ,
//       indices: allIndices,
//       headingColor: "gray.700",
//       desc: "Every question with its status, your answer, and the correct answer.",
//     },
//     {
//       label: "Answered",
//       count: answeredCount,
//       indices: answeredQuestion,
//       headingColor: "blue.600",
//       desc: "All questions you submitted an answer for (correct + incorrect).",
//     },
//     {
//       label: "Correct",
//       count: correctCount,
//       indices: correctQus,
//       headingColor: "green.600",
//       desc: "Questions you answered correctly. 🎉",
//     },
//     {
//       label: "Incorrect",
//       count: wrongCount,
//       indices: wrongAnsQus,
//       headingColor: "red.600",
//       desc: "Review these to improve. 💡 Bookmark them for later practice!",
//     },
//     {
//       label: "Marked",
//       count: markedTotal,
//       indices: markedAllIndices,
//       headingColor: "orange.600",
//       desc: null,
//     },
//     {
//       label: "Not Attempted",
//       count: notAnswerCount,
//       indices: notAnswer,
//       headingColor: "gray.600",
//       desc: "Questions you skipped entirely.",
//     },
//   ];

//   return (
//     <Box
//       minH="100vh"
//       bgGradient="linear(to-br, blue.50, purple.50)"
//       py={{ base: 3, sm: 4, md: 6, lg: 8 }}
//       px={{ base: 2, sm: 3, md: 6, lg: 10 }}
//     >
//       <Container maxW="1400px" px={{ base: 2, sm: 3, md: 4 }}>
//         {/* Header */}
//         <Flex align="center" mb={{ base: 4, sm: 6, md: 8 }}>
//           <Link to="/">
//             <Icon
//               as={FiArrowLeft}
//               boxSize={{ base: 4, sm: 5, md: 6 }}
//               color="purple.600"
//               cursor="pointer"
//               mr={{ base: 2, sm: 3, md: 4 }}
//               _hover={{ transform: "translateX(-4px)" }}
//               transition="all 0.2s"
//             />
//           </Link>
//           <Box>
//             <Heading
//               fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
//               fontWeight="bold"
//               color="gray.700"
//               mb={1}
//             >
//               Test Results
//             </Heading>
//             <Text
//               color="gray.500"
//               fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//               display={{ base: "none", sm: "block" }}
//             >
//               Detailed performance analysis and insights
//             </Text>
//           </Box>
//           <Box
//             ml="auto"
//             fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//             fontWeight="medium"
//             bg="blue.600"
//             color="white"
//             px={{ base: 2, sm: 2.5, md: 3 }}
//             py={{ base: 1, sm: 1.5, md: 2 }}
//             borderRadius="md"
//             whiteSpace="nowrap"
//           >
//             <Link to="/Review-Test">Review Test</Link>
//           </Box>
//         </Flex>

//         <VStack spacing={{ base: 4, md: 6 }} mb={{ base: 4, md: 6, lg: 8 }}>
//           {/* Doughnut Chart */}
//           <Card
//             bg="white"
//             shadow="lg"
//             borderRadius={{ base: "lg", md: "2xl" }}
//             overflow="hidden"
//             border="1px"
//             borderColor="gray.100"
//             width="100%"
//           >
//             <CardBody p={{ base: 3, sm: 4, md: 6 }}>
//               <Box
//                 h={{ base: "180px", sm: "220px", md: "280px" }}
//                 position="relative"
//                 mb={{ base: 3, sm: 4, md: 6 }}
//               >
//                 <Doughnut data={doughnutData} options={doughnutOptions} />
//                 <Flex
//                   position="absolute"
//                   top="50%"
//                   left="50%"
//                   transform="translate(-50%, -50%)"
//                   direction="column"
//                   align="center"
//                 >
//                   <Text
//                     fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
//                     fontWeight="bold"
//                     color="purple.600"
//                   >
//                     {totalMark}
//                   </Text>
//                   <Text
//                     fontSize={{ base: "sm", sm: "md", md: "lg" }}
//                     color="gray.500"
//                   >
//                     / {totalQ}
//                   </Text>
//                   <Text
//                     fontSize={{ base: "2xs", md: "xs" }}
//                     color="gray.400"
//                     mt={1}
//                   >
//                     Score
//                   </Text>
//                 </Flex>
//               </Box>

//               <Divider mb={{ base: 3, md: 4 }} />

//               <Box
//                 display="flex"
//                 flexDirection="row"
//                 gap="10"
//                 justifyContent="center"
//               >
//                 <ScoreItem
//                   icon={FiCheckCircle}
//                   label="Correct Answers"
//                   value={correctCount}
//                   color="green"
//                 />
//                 <ScoreItem
//                   icon={FiXCircle}
//                   label="Incorrect Answers"
//                   value={wrongCount}
//                   color="red"
//                 />
//                 <ScoreItem
//                   icon={FiCheckCircle}
//                   label="Answered (total)"
//                   value={answeredCount}
//                   color="blue"
//                 />
//                 <ScoreItem
//                   icon={FiFlag}
//                   label="Marked & Answered"
//                   value={markedAndAnswerCount}
//                   color="purple"
//                 />
//                 <ScoreItem
//                   icon={FiFlag}
//                   label="Marked (No Answer)"
//                   value={markedNotAnswerCount}
//                   color="orange"
//                 />
//                 <ScoreItem
//                   icon={FiCircle}
//                   label="Not Attempted"
//                   value={notAnswerCount}
//                   color="gray"
//                 />
//               </Box>
//             </CardBody>
//           </Card>

//           {/* Ad Banner */}
//           <Box w="100%">
//             <AdBanner
//               type="horizontal"
//               height={{ base: "90px", md: "100px" }}
//               width="100%"
//               label="Sponsored"
//             />
//           </Box>

//           {/* Metric Cards */}
//           <Grid
//             templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
//             gap={{ base: 2, sm: 3, md: 4 }}
//             width="100%"
//           >
//             <MetricCard
//               icon={FiTarget}
//               label="Accuracy"
//               value={`${accuracy.toFixed(1)}%`}
//               subtext="Performance"
//               color="green.600"
//               bgColor="green.50"
//             />
//             <MetricCard
//               icon={FiCheckCircle}
//               label="Completion"
//               value={`${completion}%`}
//               subtext="Attempted"
//               color="orange.600"
//               bgColor="orange.50"
//             />
//             <MetricCard
//               icon={FiFlag}
//               label="Marked"
//               value={markedTotal}
//               subtext="For Review"
//               color="purple.600"
//               bgColor="purple.50"
//             />
//             <MetricCard
//               icon={FiCircle}
//               label="Not Attempted"
//               value={notAnswerCount}
//               subtext="Skipped"
//               color="gray.600"
//               bgColor="gray.50"
//             />
//           </Grid>

//           {/* Progress Bar */}
//           <Card
//             bg="white"
//             shadow="sm"
//             borderRadius={{ base: "lg", md: "xl" }}
//             border="1px"
//             borderColor="gray.100"
//             width="100%"
//           >
//             <CardBody p={{ base: 3, sm: 4, md: 6 }}>
//               <Flex
//                 justify="space-between"
//                 align="center"
//                 mb={{ base: 2, md: 3 }}
//               >
//                 <Text
//                   fontSize={{ base: "xs", sm: "sm", md: "md" }}
//                   fontWeight="semibold"
//                   color="gray.700"
//                 >
//                   Overall Performance
//                 </Text>
//                 <Text
//                   fontSize={{ base: "md", sm: "lg", md: "xl" }}
//                   fontWeight="bold"
//                   color="purple.600"
//                 >
//                   {accuracy.toFixed(1)}%
//                 </Text>
//               </Flex>
//               <Progress
//                 value={accuracy}
//                 size={{ base: "sm", md: "lg" }}
//                 borderRadius="full"
//                 colorScheme="purple"
//                 hasStripe
//                 isAnimated
//               />
//               <Flex justify="space-between" mt={2}>
//                 <Text fontSize="2xs" color="gray.500">
//                   0%
//                 </Text>
//                 <Text fontSize="2xs" color="gray.500">
//                   100%
//                 </Text>
//               </Flex>
//             </CardBody>
//           </Card>
//         </VStack>

//         {/* Tabs */}
//         <Card
//           bg="white"
//           shadow="lg"
//           borderRadius={{ base: "lg", md: "2xl" }}
//           overflow="hidden"
//           border="1px"
//           borderColor="gray.100"
//         >
//           <CardBody p={0}>
//             <Tabs colorScheme="purple" variant="soft-rounded">
//               <Box
//                 px={{ base: 2, sm: 3, md: 6 }}
//                 pt={{ base: 3, sm: 4, md: 6 }}
//               >
//                 <Box
//                   bg="gray.50"
//                   p={1}
//                   borderRadius="xl"
//                   overflowX="auto"
//                   css={{
//                     "&::-webkit-scrollbar": { height: "4px" },
//                     "&::-webkit-scrollbar-thumb": {
//                       background: "#CBD5E0",
//                       borderRadius: "10px",
//                     },
//                   }}
//                 >
//                   <TabList
//                     border="none"
//                     gap={{ base: 1, md: 2 }}
//                     minWidth="max-content"
//                   >
//                     {TABS.map(({ label, count }) => (
//                       <Tab
//                         key={label}
//                         fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                         fontWeight="medium"
//                         px={{ base: 2, sm: 2.5, md: 3 }}
//                         py={{ base: 1, sm: 1.5, md: 2 }}
//                         _selected={{ bg: "purple.600", color: "white" }}
//                         whiteSpace="nowrap"
//                       >
//                         {label} ({count})
//                       </Tab>
//                     ))}
//                   </TabList>
//                 </Box>
//               </Box>

//               <TabPanels>
//                 {TABS.map(({ label, count, indices, headingColor, desc }) => (
//                   <TabPanel key={label} p={{ base: 2, sm: 3, md: 6 }}>
//                     <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
//                       <Box mb={{ base: 1, sm: 2, md: 4 }}>
//                         <Heading
//                           size={{ base: "xs", sm: "sm", md: "md" }}
//                           mb={{ base: 1, md: 2 }}
//                           color={headingColor}
//                         >
//                           {label} ({count})
//                         </Heading>
//                         {label === "Marked" && (
//                           <HStack spacing={3} mb={2} wrap="wrap">
//                             <Badge
//                               colorScheme="purple"
//                               fontSize="xs"
//                               px={2}
//                               py={1}
//                               borderRadius="full"
//                             >
//                               Marked + Answered: {markedAndAnswerCount}
//                             </Badge>
//                             <Badge
//                               colorScheme="orange"
//                               fontSize="xs"
//                               px={2}
//                               py={1}
//                               borderRadius="full"
//                             >
//                               Marked (No Answer): {markedNotAnswerCount}
//                             </Badge>
//                           </HStack>
//                         )}
//                         {desc && (
//                           <Text
//                             fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
//                             color="gray.500"
//                           >
//                             {desc}
//                           </Text>
//                         )}
//                       </Box>
//                       {renderQuestions(indices)}
//                     </VStack>
//                   </TabPanel>
//                 ))}
//               </TabPanels>
//             </Tabs>
//           </CardBody>
//         </Card>
//       </Container>

//       <FloatingVideoAd />
//     </Box>
//   );
// };

// export default ResultPage;
