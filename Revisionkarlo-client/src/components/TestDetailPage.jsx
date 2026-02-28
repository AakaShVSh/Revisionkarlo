import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Spinner,
  Badge,
  Progress,
  Avatar,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Grid,
} from "@chakra-ui/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaClock,
  FaUsers,
  FaLock,
  FaUnlock,
  FaTrophy,
  FaCheckCircle,
  FaClipboardList,
  FaLink,
  FaCheck,
  FaChartBar,
  FaPlay,
  FaBookOpen,
  FaCrown,
  FaFire,
  FaAward,
  FaGlobe,
  FaInfoCircle,
  FaShieldAlt,
  FaListUl,
} from "react-icons/fa";

const BASE = "http://localhost:80";

const apiFetch = async (path, opts = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json;
};

const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const getLS = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
const setLS = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

// ─── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon, label, value, color = "#4a72b8", bg = "#eff6ff" }) {
  return (
    <Box bg={bg} borderRadius="14px" p={5} flex={1} minW="120px">
      <Flex align="center" gap={2} mb={2}>
        <Flex
          w="32px"
          h="32px"
          bg="white"
          borderRadius="9px"
          align="center"
          justify="center"
          boxShadow="0 2px 8px rgba(0,0,0,.08)"
        >
          <Icon as={icon} color={color} fontSize="14px" />
        </Flex>
        <Text
          fontSize="11px"
          fontWeight={700}
          color="#94a3b8"
          textTransform="uppercase"
          letterSpacing=".8px"
        >
          {label}
        </Text>
      </Flex>
      <Text
        fontSize="28px"
        fontWeight={800}
        color="#0f172a"
        letterSpacing="-1px"
      >
        {value}
      </Text>
    </Box>
  );
}

// ─── Leaderboard Row ──────────────────────────────────────────────
function LeaderRow({ rank, result, currentUserId }) {
  const name = result.studentId?.Name || result.studentId?.Email || "Student";
  const pct = result.scorePercentage ?? result.percentage ?? 0;
  const isMe = String(result.studentId?._id) === String(currentUserId);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <Flex
      px={5}
      py={3}
      align="center"
      gap={3}
      bg={isMe ? "linear-gradient(90deg,#eff6ff,#f0fdf4)" : "transparent"}
      borderLeft={isMe ? "3px solid #4a72b8" : "3px solid transparent"}
      _hover={{ bg: "#f8fafc" }}
    >
      <Text w="28px" fontSize="15px" textAlign="center">
        {rank <= 3 ? (
          medals[rank - 1]
        ) : (
          <Text as="span" fontSize="13px" fontWeight={700} color="#94a3b8">
            {rank}
          </Text>
        )}
      </Text>
      <Avatar
        size="sm"
        name={name}
        bg="#4a72b8"
        color="white"
        fontSize="12px"
      />
      <Box flex={1} minW={0}>
        <Text fontSize="13px" fontWeight={700} color="#0f172a" noOfLines={1}>
          {name}{" "}
          {isMe && (
            <Badge colorScheme="blue" fontSize="9px" ml={1}>
              You
            </Badge>
          )}
        </Text>
        <Progress
          value={pct}
          size="xs"
          colorScheme="blue"
          borderRadius="full"
          mt={1}
        />
      </Box>
      <Box textAlign="right">
        <Text
          fontSize="15px"
          fontWeight={800}
          color={pct >= 60 ? "#16a34a" : "#dc2626"}
        >
          {pct.toFixed(0)}%
        </Text>
        <Text fontSize="10px" color="#94a3b8">
          {result.timeTakenSec
            ? `${Math.floor(result.timeTakenSec / 60)}m`
            : "—"}
        </Text>
      </Box>
    </Flex>
  );
}

// ─── Test Info / Landing Page ─────────────────────────────────────
// This is shown BEFORE starting the test - shows all test details and a big Start button
function TestInfoPage({ test, stats, onStart, user, myResult }) {
  const navigate = useNavigate();
  const location = useLocation();
  const timeLimitMin = test.timeLimitMin || test.timeLimit || 30;
  const isPrivate =
    test.visibility === "private" || test.accessType === "private";
  const questionCount = test.questions?.length || 0;

  const handleStartClick = () => {
    if (!user) {
      // Redirect to signin, then come back to THIS page
      const returnPath = location.pathname + location.search;
      navigate(`/auth/signin?redirect=${encodeURIComponent(returnPath)}`);
      return;
    }
    onStart();
  };

  const RULES = [
    "Do not switch tabs or windows during the test",
    "Test will auto-submit when time runs out",
    "You can mark questions for review and come back",
    "Each question carries equal marks",
    "There is no negative marking",
  ];

  return (
    <Box minH="100vh" bg="#f8fafc" fontFamily="'Sora',sans-serif">
      {/* Hero */}
      <Box
        bg="linear-gradient(135deg,#0f1e3a 0%,#1e3a5f 50%,#2d5fa8 100%)"
        px={{ base: 4, md: 8 }}
        pt={{ base: 10, md: 14 }}
        pb={{ base: 14, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-80px"
          top="-80px"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="rgba(255,255,255,.03)"
        />
        <Box maxW="800px" mx="auto" position="relative" zIndex={1}>
          <Flex
            align="center"
            gap={2}
            mb={8}
            cursor="pointer"
            w="fit-content"
            color="rgba(255,255,255,.5)"
            _hover={{ color: "rgba(255,255,255,.9)" }}
            onClick={() => navigate(-1)}
          >
            <Icon as={FaArrowLeft} fontSize="12px" />
            <Text fontSize="13px" fontWeight={600}>
              Back
            </Text>
          </Flex>

          <Flex align="center" gap={3} mb={3} flexWrap="wrap">
            <Flex
              w="64px"
              h="64px"
              bg="rgba(255,255,255,.12)"
              border="2px solid rgba(255,255,255,.2)"
              borderRadius="18px"
              align="center"
              justify="center"
              fontSize="28px"
              flexShrink={0}
            >
              📋
            </Flex>
            <Box flex={1}>
              <Text
                fontSize={{ base: "22px", md: "36px" }}
                fontWeight={800}
                color="white"
                letterSpacing="-1px"
                lineHeight="1.1"
              >
                {test.title}
              </Text>
              {test.examType && (
                <Badge
                  mt={2}
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg="rgba(255,255,255,.15)"
                  color="white"
                  fontSize="12px"
                  fontWeight={700}
                >
                  {test.examType}
                </Badge>
              )}
            </Box>
          </Flex>

          <Flex
            gap={8}
            mt={8}
            borderTop="1px solid rgba(255,255,255,.1)"
            pt={8}
            flexWrap="wrap"
          >
            {[
              { icon: FaClipboardList, v: questionCount, l: "Questions" },
              { icon: FaClock, v: `${timeLimitMin} min`, l: "Duration" },
              { icon: FaUsers, v: stats?.totalAttempts ?? 0, l: "Attempts" },
              {
                icon: FaChartBar,
                v: stats ? `${stats.avgPercentage}%` : "—",
                l: "Avg Score",
              },
            ].map((s) => (
              <Flex key={s.l} align="center" gap={3}>
                <Icon
                  as={s.icon}
                  fontSize="14px"
                  color="rgba(255,255,255,.4)"
                />
                <Box>
                  <Text
                    fontSize="22px"
                    fontWeight={800}
                    color="white"
                    lineHeight="1"
                    letterSpacing="-1px"
                  >
                    {s.v}
                  </Text>
                  <Text
                    fontSize="10px"
                    color="rgba(255,255,255,.5)"
                    textTransform="uppercase"
                    letterSpacing=".8px"
                  >
                    {s.l}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Body */}
      <Box maxW="800px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 340px" }} gap={6}>
          {/* Left */}
          <Box>
            {/* Test Details */}
            <Box
              bg="white"
              borderRadius="16px"
              border="1px solid #e2e8f0"
              p={6}
              mb={5}
            >
              <Flex align="center" gap={2} mb={4}>
                <Icon as={FaInfoCircle} color="#4a72b8" />
                <Text fontSize="15px" fontWeight={800} color="#0f172a">
                  Test Details
                </Text>
              </Flex>
              <Grid templateColumns="1fr 1fr" gap={4}>
                {[
                  { label: "Questions", value: questionCount },
                  { label: "Duration", value: `${timeLimitMin} minutes` },
                  { label: "Language", value: test.language || "English" },
                  {
                    label: "Subject",
                    value: test.subject
                      ? test.subject.charAt(0).toUpperCase() +
                        test.subject.slice(1)
                      : "General",
                  },
                  { label: "Exam Type", value: test.examType || "General" },
                  {
                    label: "Access",
                    value: isPrivate ? "🔒 Private" : "🌐 Public",
                  },
                  { label: "Marks", value: `${questionCount} marks` },
                  { label: "Pass Mark", value: "40%" },
                ].map(({ label, value }) => (
                  <Box key={label}>
                    <Text
                      fontSize="11px"
                      fontWeight={700}
                      color="#94a3b8"
                      textTransform="uppercase"
                      letterSpacing=".8px"
                      mb={1}
                    >
                      {label}
                    </Text>
                    <Text fontSize="14px" fontWeight={600} color="#0f172a">
                      {value}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* Instructions */}
            <Box
              bg="white"
              borderRadius="16px"
              border="1px solid #e2e8f0"
              p={6}
            >
              <Flex align="center" gap={2} mb={4}>
                <Icon as={FaShieldAlt} color="#4a72b8" />
                <Text fontSize="15px" fontWeight={800} color="#0f172a">
                  Instructions
                </Text>
              </Flex>
              <Box bg="#f0f7ff" borderRadius="10px" p={4}>
                {RULES.map((rule, i) => (
                  <Flex
                    key={i}
                    gap={3}
                    mb={i < RULES.length - 1 ? 3 : 0}
                    align="flex-start"
                  >
                    <Flex
                      w="20px"
                      h="20px"
                      bg="#4a72b8"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      flexShrink={0}
                      mt="1px"
                    >
                      <Text fontSize="10px" fontWeight={800} color="white">
                        {i + 1}
                      </Text>
                    </Flex>
                    <Text fontSize="13px" color="#374151" lineHeight="1.5">
                      {rule}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right - Start Card */}
          <Box>
            <Box
              bg="white"
              borderRadius="16px"
              border="1px solid #e2e8f0"
              p={6}
              textAlign="center"
              position={{ md: "sticky" }}
              top={{ md: "20px" }}
              boxShadow="0 4px 24px rgba(0,0,0,.06)"
            >
              {myResult ? (
                <Box
                  mb={4}
                  p={3}
                  bg="#f0fdf4"
                  borderRadius="10px"
                  border="1px solid #86efac"
                >
                  <Text fontSize="12px" fontWeight={700} color="#16a34a" mb={1}>
                    Previous Attempt
                  </Text>
                  <Text
                    fontSize="28px"
                    fontWeight={800}
                    color="#16a34a"
                    letterSpacing="-1px"
                  >
                    {(
                      myResult.scorePercentage ??
                      myResult.percentage ??
                      0
                    ).toFixed(0)}
                    %
                  </Text>
                  <Text fontSize="12px" color="#64748b">
                    {myResult.correct ?? myResult.correctQus?.length ?? 0}/
                    {questionCount} correct
                  </Text>
                </Box>
              ) : (
                <Box mb={5}>
                  <Box fontSize="48px" mb={3}>
                    🎯
                  </Box>
                  <Text fontSize="16px" fontWeight={700} color="#0f172a" mb={1}>
                    Ready to begin?
                  </Text>
                  <Text fontSize="13px" color="#64748b">
                    {questionCount} questions · {timeLimitMin} min time limit
                  </Text>
                </Box>
              )}

              {!user ? (
                <>
                  <Text fontSize="13px" color="#64748b" mb={4}>
                    Please sign in to take this test
                  </Text>
                  <Button
                    w="full"
                    h="50px"
                    borderRadius="12px"
                    bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
                    color="white"
                    fontWeight={800}
                    fontSize="15px"
                    leftIcon={<FaPlay />}
                    onClick={handleStartClick}
                    _hover={{
                      opacity: 0.9,
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 24px rgba(74,114,184,.35)",
                    }}
                    transition="all .2s"
                    mb={3}
                  >
                    Sign In to Start
                  </Button>
                  <Button
                    w="full"
                    h="42px"
                    borderRadius="12px"
                    variant="outline"
                    borderColor="#4a72b8"
                    color="#4a72b8"
                    fontWeight={700}
                    fontSize="14px"
                    onClick={() => {
                      const returnPath = location.pathname + location.search;
                      navigate(
                        `/auth/signup?redirect=${encodeURIComponent(returnPath)}`,
                      );
                    }}
                    _hover={{ bg: "#eff6ff" }}
                  >
                    Create Account
                  </Button>
                </>
              ) : (
                <Button
                  w="full"
                  h="54px"
                  borderRadius="12px"
                  bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
                  color="white"
                  fontWeight={800}
                  fontSize="16px"
                  leftIcon={<FaPlay />}
                  onClick={handleStartClick}
                  _hover={{
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(74,114,184,.35)",
                  }}
                  transition="all .2s"
                >
                  {myResult ? "Retake Test" : "Start Test"}
                </Button>
              )}

              {user && (
                <Text fontSize="11px" color="#94a3b8" mt={3}>
                  Logged in as {user.Name || user.Email}
                </Text>
              )}
            </Box>

            {/* Quick Stats */}
            {stats && stats.totalAttempts > 0 && (
              <Box
                bg="white"
                borderRadius="16px"
                border="1px solid #e2e8f0"
                p={5}
                mt={4}
              >
                <Text
                  fontSize="12px"
                  fontWeight={700}
                  color="#94a3b8"
                  textTransform="uppercase"
                  letterSpacing=".8px"
                  mb={4}
                >
                  Test Stats
                </Text>
                {[
                  {
                    label: "Attempts",
                    value: stats.totalAttempts,
                    color: "#4a72b8",
                  },
                  {
                    label: "Pass Rate",
                    value: `${stats.passRate}%`,
                    color: "#16a34a",
                  },
                  {
                    label: "Avg Score",
                    value: `${stats.avgPercentage}%`,
                    color: "#7c3aed",
                  },
                  {
                    label: "Top Score",
                    value: `${stats.highestScore}%`,
                    color: "#ea580c",
                  },
                ].map(({ label, value, color }) => (
                  <Flex
                    key={label}
                    justify="space-between"
                    align="center"
                    mb={3}
                  >
                    <Text fontSize="13px" color="#64748b">
                      {label}
                    </Text>
                    <Text fontSize="14px" fontWeight={800} color={color}>
                      {value}
                    </Text>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function TestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const cancelRef = useRef();
  const user = getCurrentUser();

  const [test, setTest] = useState(null);
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myResult, setMyResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("info"); // info | leaderboard | questions
  const [copied, setCopied] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [delOpen, setDelOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const [testRes, statsRes, lbRes] = await Promise.all([
        apiFetch(`/tests/id/${id}`),
        apiFetch(`/tests/${id}/stats`).catch(() => ({ data: null })),
        apiFetch(`/tests/${id}/leaderboard`).catch(() => ({ data: [] })),
      ]);
      const t = testRes.data;
      setTest(t);
      setStats(statsRes.data);
      setLeaderboard(lbRes.data || []);

      if (user?._id) {
        apiFetch(`/results/student/${user._id}?testId=${id}`)
          .then((r) => setMyResult(r.data?.[0] || null))
          .catch(() => {});
      }
    } catch (e) {
      toast({ title: e.message, status: "error" });
    } finally {
      setLoading(false);
    }
  }, [id, user?._id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading)
    return (
      <Flex minH="80vh" align="center" justify="center">
        <Spinner size="xl" color="#4a72b8" thickness="4px" />
      </Flex>
    );

  if (!test)
    return (
      <Box textAlign="center" py={20} fontFamily="'Sora',sans-serif">
        <Text fontSize="18px" fontWeight={700} color="#374151">
          Test not found
        </Text>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );

  const isOwner = Boolean(
    user &&
    (String(user._id) === String(test.createdBy) ||
      String(user._id) === String(test.createdBy?._id)),
  );
  const isPrivate =
    test.visibility === "private" || test.accessType === "private";
  const timeLimitMin = test.timeLimitMin || test.timeLimit || 30;
  const shareUrl = `${window.location.origin}/tests/${id}`;
  const tokenUrl = test.accessToken
    ? `${window.location.origin}/tests/token/${test.accessToken}`
    : shareUrl;

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // The actual function to launch the test (prep localStorage then navigate)
  const launchTest = () => {
    if (!test.questions || test.questions.length === 0) {
      toast({ title: "This test has no questions", status: "error" });
      return;
    }

    // ✅ CRITICAL: Set Testdata as empty array [] so TakeTest uses COUNT-UP timer
    // If we set it as [test] (length=1), Testdata.length > 1 check is false, so COUNT-UP
    // The timer logic: Testdata.length > 1 → countdown, else → count up
    setLS("savedTestQuestions", test.questions);
    setLS("category", test.title);
    setLS("Subject", test.subject || "general");
    setLS("currentTestId", test._id);
    setLS("Testdata", []); // ✅ Empty array = single test = COUNT-UP timer, no auto-submit
    setLS("currentTestTimeLimitMin", timeLimitMin); // Store time limit for custom usage

    navigate("/test");
  };

  const handleStartTest = () => {
    if (!user) {
      const returnPath = location.pathname + location.search;
      navigate(`/auth/signin?redirect=${encodeURIComponent(returnPath)}`);
      return;
    }
    if (isPrivate && !isOwner) {
      setPwOpen(true);
      return;
    }
    launchTest();
  };

  const verifyPassword = () => {
    if (pwInput === test.password) {
      setPwOpen(false);
      launchTest();
    } else {
      setPwErr("Incorrect password");
    }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/tests/${id}`, { method: "DELETE" });
      toast({ title: "Test deleted", status: "success" });
      navigate(-1);
    } catch (e) {
      toast({ title: e.message, status: "error" });
    }
  };

  // If tab is "info" (default), show the full-page info/landing view
  if (tab === "info" && !isOwner) {
    return (
      <>
        <TestInfoPage
          test={test}
          stats={stats}
          onStart={handleStartTest}
          user={user}
          myResult={myResult}
        />
        {/* Password Modal */}
        <Modal isOpen={pwOpen} onClose={() => setPwOpen(false)} isCentered>
          <ModalOverlay backdropFilter="blur(4px)" />
          <ModalContent
            borderRadius="16px"
            fontFamily="'Sora',sans-serif"
            mx={4}
          >
            <ModalHeader>
              <Flex align="center" gap={2}>
                <Icon as={FaLock} color="#4a72b8" />
                <Text>Enter Test Password</Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={2}>
              <Input
                placeholder="Password"
                type="password"
                value={pwInput}
                onChange={(e) => {
                  setPwInput(e.target.value);
                  setPwErr("");
                }}
                onKeyDown={(e) => e.key === "Enter" && verifyPassword()}
                borderColor={pwErr ? "red.400" : "#e2e8f0"}
                borderRadius="10px"
                h="44px"
                _focus={{
                  borderColor: "#4a72b8",
                  boxShadow: "0 0 0 1px #4a72b8",
                }}
              />
              {pwErr && (
                <Text fontSize="12px" color="red.500" mt={1}>
                  {pwErr}
                </Text>
              )}
            </ModalBody>
            <ModalFooter gap={3}>
              <Button variant="ghost" onClick={() => setPwOpen(false)}>
                Cancel
              </Button>
              <Button
                bg="#4a72b8"
                color="white"
                borderRadius="10px"
                fontWeight={700}
                onClick={verifyPassword}
                _hover={{ bg: "#3b5fa0" }}
              >
                Enter Test
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  // Owner view — full dashboard
  const TABS = ["overview", "leaderboard", ...(isOwner ? ["questions"] : [])];

  return (
    <Box minH="100vh" bg="#f8fafc" fontFamily="'Sora',sans-serif">
      {/* ── HERO ── */}
      <Box
        bg="linear-gradient(135deg,#0f1e3a 0%,#1e3a5f 50%,#2d5fa8 100%)"
        px={{ base: 4, md: 8 }}
        pt={{ base: 10, md: 14 }}
        pb={{ base: 14, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-80px"
          top="-80px"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="rgba(255,255,255,.03)"
        />
        <Box maxW="1100px" mx="auto" position="relative" zIndex={1}>
          <Flex
            align="center"
            gap={2}
            mb={8}
            cursor="pointer"
            w="fit-content"
            color="rgba(255,255,255,.5)"
            _hover={{ color: "rgba(255,255,255,.9)" }}
            onClick={() => navigate(-1)}
          >
            <Icon as={FaArrowLeft} fontSize="12px" />
            <Text fontSize="13px" fontWeight={600}>
              Back
            </Text>
          </Flex>

          <Flex
            align="flex-start"
            gap={5}
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Flex
              w={{ base: "56px", md: "72px" }}
              h={{ base: "56px", md: "72px" }}
              flexShrink={0}
              bg="rgba(255,255,255,.12)"
              border="2px solid rgba(255,255,255,.2)"
              borderRadius="18px"
              align="center"
              justify="center"
              fontSize={{ base: "24px", md: "32px" }}
            >
              📋
            </Flex>
            <Box flex={1}>
              <Flex align="center" gap={3} flexWrap="wrap" mb={3}>
                <Text
                  fontSize={{ base: "24px", md: "38px" }}
                  fontWeight={800}
                  color="white"
                  letterSpacing="-1px"
                  lineHeight="1.1"
                >
                  {test.title}
                </Text>
                {isOwner && (
                  <Flex
                    align="center"
                    gap={2}
                    bg="rgba(255,215,0,.15)"
                    border="1px solid rgba(255,215,0,.35)"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    <Icon as={FaCrown} color="gold" fontSize="12px" />
                    <Text fontSize="12px" fontWeight={700} color="gold">
                      Your Test
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Flex flexWrap="wrap" gap={3} mb={4}>
                {test.examType && (
                  <Flex align="center" gap={1.5}>
                    <Icon
                      as={FaBookOpen}
                      color="rgba(255,255,255,.5)"
                      fontSize="12px"
                    />
                    <Text color="rgba(255,255,255,.75)" fontSize="13px">
                      {test.examType}
                    </Text>
                  </Flex>
                )}
                <Flex align="center" gap={1.5}>
                  <Icon
                    as={FaClock}
                    color="rgba(255,255,255,.5)"
                    fontSize="12px"
                  />
                  <Text color="rgba(255,255,255,.75)" fontSize="13px">
                    {timeLimitMin} min
                  </Text>
                </Flex>
                <Flex align="center" gap={1.5}>
                  <Icon
                    as={FaClipboardList}
                    color="rgba(255,255,255,.5)"
                    fontSize="12px"
                  />
                  <Text color="rgba(255,255,255,.75)" fontSize="13px">
                    {test.questions?.length || 0} Questions
                  </Text>
                </Flex>
                <Flex align="center" gap={1.5}>
                  <Icon
                    as={isPrivate ? FaLock : FaUnlock}
                    color="rgba(255,255,255,.5)"
                    fontSize="12px"
                  />
                  <Text color="rgba(255,255,255,.75)" fontSize="13px">
                    {isPrivate ? "Private" : "Public"}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                gap={8}
                borderTop="1px solid rgba(255,255,255,.1)"
                pt={6}
                flexWrap="wrap"
              >
                {[
                  {
                    icon: FaUsers,
                    v: stats?.totalAttempts ?? 0,
                    l: "Attempts",
                  },
                  {
                    icon: FaCheckCircle,
                    v: stats ? `${stats.passRate}%` : "—",
                    l: "Pass Rate",
                  },
                  {
                    icon: FaChartBar,
                    v: stats ? `${stats.avgPercentage}%` : "—",
                    l: "Avg Score",
                  },
                  {
                    icon: FaTrophy,
                    v: stats?.highestScore ? `${stats.highestScore}%` : "—",
                    l: "Top Score",
                  },
                ].map((s) => (
                  <Flex key={s.l} align="center" gap={3}>
                    <Icon
                      as={s.icon}
                      fontSize="14px"
                      color="rgba(255,255,255,.4)"
                    />
                    <Box>
                      <Text
                        fontSize="22px"
                        fontWeight={800}
                        color="white"
                        lineHeight="1"
                        letterSpacing="-1px"
                      >
                        {s.v}
                      </Text>
                      <Text
                        fontSize="10px"
                        color="rgba(255,255,255,.5)"
                        textTransform="uppercase"
                        letterSpacing=".8px"
                      >
                        {s.l}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>

          {/* Owner panel */}
          {isOwner && (
            <Box
              mt={8}
              bg="rgba(255,255,255,.08)"
              border="1px solid rgba(255,255,255,.14)"
              borderRadius="16px"
              p={{ base: 4, md: 6 }}
            >
              <Text
                fontSize="11px"
                fontWeight={800}
                color="rgba(255,255,255,.4)"
                textTransform="uppercase"
                letterSpacing="2px"
                mb={4}
              >
                Share Test Link
              </Text>
              <Flex gap={3} flexWrap={{ base: "wrap", sm: "nowrap" }} mb={3}>
                <Box
                  flex={1}
                  bg="rgba(0,0,0,.3)"
                  borderRadius="10px"
                  px={4}
                  py="11px"
                  fontFamily="monospace"
                  fontSize="12px"
                  color="rgba(255,255,255,.8)"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {isPrivate ? tokenUrl : shareUrl}
                </Box>
                <Button
                  flexShrink={0}
                  h="42px"
                  px={5}
                  borderRadius="10px"
                  bg={copied ? "#22c55e" : "white"}
                  color={copied ? "white" : "#1e3a5f"}
                  fontWeight={800}
                  fontSize="13px"
                  leftIcon={
                    <Icon as={copied ? FaCheck : FaLink} fontSize="12px" />
                  }
                  onClick={() => handleCopy(isPrivate ? tokenUrl : shareUrl)}
                  _hover={{ bg: copied ? "#16a34a" : "#f0f7ff" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Flex>
              <Flex gap={3} flexWrap="wrap">
                <Button
                  size="sm"
                  leftIcon={<FaPlay />}
                  bg="white"
                  color="#0f1e3a"
                  borderRadius="9px"
                  fontWeight={700}
                  onClick={launchTest}
                  _hover={{ bg: "#f0f7ff" }}
                >
                  Preview Test
                </Button>
                <Button
                  size="sm"
                  leftIcon={<Icon as={FaChartBar} />}
                  bg="transparent"
                  color="#fca5a5"
                  border="1px solid rgba(239,68,68,.3)"
                  borderRadius="9px"
                  fontWeight={700}
                  onClick={() => setDelOpen(true)}
                  _hover={{ bg: "rgba(239,68,68,.2)", color: "white" }}
                >
                  Delete Test
                </Button>
              </Flex>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── BODY ── */}
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        {/* Tabs */}
        <Flex gap={2} mb={6} flexWrap="wrap">
          {TABS.map((t) => (
            <Box
              key={t}
              px={4}
              py="8px"
              borderRadius="10px"
              cursor="pointer"
              bg={tab === t ? "#4a72b8" : "white"}
              color={tab === t ? "white" : "#374151"}
              border="1px solid"
              borderColor={tab === t ? "#4a72b8" : "#e2e8f0"}
              fontSize="13px"
              fontWeight={tab === t ? 700 : 500}
              onClick={() => setTab(t)}
              transition="all .15s"
              _hover={{
                borderColor: "#4a72b8",
                color: tab === t ? "white" : "#4a72b8",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Box>
          ))}
        </Flex>

        {/* Overview */}
        {tab === "overview" && (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
            }}
            gap={4}
          >
            <StatCard
              icon={FaUsers}
              label="Attempts"
              value={stats?.totalAttempts ?? 0}
            />
            <StatCard
              icon={FaCheckCircle}
              label="Pass Rate"
              value={stats ? `${stats.passRate}%` : "—"}
              color="#16a34a"
              bg="#f0fdf4"
            />
            <StatCard
              icon={FaChartBar}
              label="Avg Score"
              value={stats ? `${stats.avgPercentage}%` : "—"}
              color="#7c3aed"
              bg="#f5f3ff"
            />
            <StatCard
              icon={FaFire}
              label="Top Score"
              value={stats?.highestScore ? `${stats.highestScore}%` : "—"}
              color="#ea580c"
              bg="#fff7ed"
            />
          </Grid>
        )}

        {/* Leaderboard */}
        {tab === "leaderboard" && (
          <Box
            bg="white"
            borderRadius="16px"
            border="1px solid #e2e8f0"
            overflow="hidden"
          >
            <Flex
              px={6}
              py={4}
              align="center"
              gap={3}
              borderBottom="1px solid #f1f5f9"
            >
              <Icon as={FaTrophy} color="#f59e0b" />
              <Text fontSize="15px" fontWeight={800} color="#0f172a">
                Leaderboard
              </Text>
              <Badge colorScheme="blue" borderRadius="full">
                {leaderboard.length} entries
              </Badge>
            </Flex>
            {leaderboard.length === 0 ? (
              <Box py={16} textAlign="center">
                <Icon
                  as={FaTrophy}
                  fontSize="40px"
                  color="#e2e8f0"
                  display="block"
                  mx="auto"
                  mb={3}
                />
                <Text fontSize="14px" color="#94a3b8">
                  No attempts yet — be the first!
                </Text>
              </Box>
            ) : (
              leaderboard.map((r, i) => (
                <Box
                  key={r._id}
                  borderBottom={
                    i < leaderboard.length - 1 ? "1px solid #f1f5f9" : "none"
                  }
                >
                  <LeaderRow
                    rank={i + 1}
                    result={r}
                    currentUserId={user?._id}
                  />
                </Box>
              ))
            )}
          </Box>
        )}

        {/* Questions (owner only) */}
        {tab === "questions" && isOwner && (
          <Box
            bg="white"
            borderRadius="16px"
            border="1px solid #e2e8f0"
            overflow="hidden"
          >
            <Flex px={6} py={4} align="center" borderBottom="1px solid #f1f5f9">
              <Text fontSize="15px" fontWeight={800} color="#0f172a">
                Questions Preview
              </Text>
              <Badge ml={3} colorScheme="blue">
                {test.questions?.length}
              </Badge>
            </Flex>
            {test.questions?.map((q, i) => (
              <Box
                key={i}
                px={6}
                py={4}
                borderBottom={
                  i < test.questions.length - 1 ? "1px solid #f8fafc" : "none"
                }
              >
                <Flex gap={3} mb={2}>
                  <Text
                    fontSize="12px"
                    fontWeight={700}
                    color="#94a3b8"
                    w="20px"
                    flexShrink={0}
                  >
                    {i + 1}.
                  </Text>
                  <Text fontSize="14px" fontWeight={600} color="#0f172a">
                    {q.qus}
                  </Text>
                </Flex>
                <Flex flexWrap="wrap" gap={2} pl="23px">
                  {q.options?.map((opt, oi) => (
                    <Box
                      key={oi}
                      px={3}
                      py="4px"
                      borderRadius="7px"
                      fontSize="12px"
                      bg={oi === q.answer ? "#f0fdf4" : "#f8fafc"}
                      color={oi === q.answer ? "#16a34a" : "#64748b"}
                      border="1px solid"
                      borderColor={oi === q.answer ? "#86efac" : "#e2e8f0"}
                      fontWeight={oi === q.answer ? 700 : 400}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                      {oi === q.answer && " ✓"}
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Password Modal */}
      <Modal isOpen={pwOpen} onClose={() => setPwOpen(false)} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="16px" fontFamily="'Sora',sans-serif" mx={4}>
          <ModalHeader>
            <Flex align="center" gap={2}>
              <Icon as={FaLock} color="#4a72b8" />
              <Text>Enter Test Password</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <Input
              placeholder="Password"
              type="password"
              value={pwInput}
              onChange={(e) => {
                setPwInput(e.target.value);
                setPwErr("");
              }}
              onKeyDown={(e) => e.key === "Enter" && verifyPassword()}
              borderColor={pwErr ? "red.400" : "#e2e8f0"}
              borderRadius="10px"
              h="44px"
              _focus={{
                borderColor: "#4a72b8",
                boxShadow: "0 0 0 1px #4a72b8",
              }}
            />
            {pwErr && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {pwErr}
              </Text>
            )}
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={() => setPwOpen(false)}>
              Cancel
            </Button>
            <Button
              bg="#4a72b8"
              color="white"
              borderRadius="10px"
              fontWeight={700}
              onClick={verifyPassword}
              _hover={{ bg: "#3b5fa0" }}
            >
              Enter Test
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Dialog */}
      <AlertDialog
        isOpen={delOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setDelOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            mx={4}
            borderRadius="16px"
            fontFamily="'Sora',sans-serif"
          >
            <AlertDialogHeader fontSize="16px" fontWeight={800}>
              Delete Test?
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text fontSize="14px" color="#475569">
                This will permanently remove this test and all its results.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                onClick={() => setDelOpen(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                bg="#ef4444"
                color="white"
                borderRadius="10px"
                fontWeight={700}
                onClick={handleDelete}
                _hover={{ bg: "#dc2626" }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
