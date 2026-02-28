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
  Divider,
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
  GridItem,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
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
  FaEye,
  FaBookOpen,
  FaCrown,
  FaFire,
  FaAward,
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

const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const setLocalStorage = (key, val) => {
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
      transition="background .15s"
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

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function TestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef();
  const user = getCurrentUser();

  const [test, setTest] = useState(null);
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myResult, setMyResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview"); // overview | leaderboard | questions
  const [copied, setCopied] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [delOpen, setDelOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // seconds until test starts
  const [canStart, setCanStart] = useState(false);

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

      // My result
      if (user?._id) {
        apiFetch(`/results/student/${user._id}?testId=${id}`)
          .then((r) => setMyResult(r.data?.[0] || null))
          .catch(() => {});
      }

      // Time gate: allow entry 5 min before startsAt
      if (t.startsAt) {
        const starts = new Date(t.startsAt).getTime();
        const now = Date.now();
        const diff = starts - now;
        if (diff > 5 * 60 * 1000) {
          setCanStart(false);
          setTimeLeft(Math.floor(diff / 1000));
        } else {
          setCanStart(true);
        }
      } else {
        setCanStart(true); // no scheduled start = available now
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

  // Countdown timer for scheduled tests
  useEffect(() => {
    if (timeLeft === null || canStart) return;
    if (timeLeft <= 0) {
      setCanStart(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, canStart]);

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

  const handleStartTest = () => {
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    if (isPrivate && !isOwner) {
      setPwOpen(true);
      return;
    }
    launchTest();
  };

  const launchTest = () => {
    // Store test data in localStorage so TakeTest can pick it up
    setLocalStorage("savedTestQuestions", test.questions);
    setLocalStorage("category", test.title);
    setLocalStorage("Subject", test.subject || "general");
    setLocalStorage("currentTestId", test._id);
    setLocalStorage("Testdata", [test]); // single test = count-up timer
    navigate("/test");
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

  const fmtTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const TABS = [
    "overview",
    ...(isOwner ? ["leaderboard", "questions"] : ["leaderboard"]),
  ];

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
          {/* Back */}
          <Flex
            align="center"
            gap={2}
            mb={8}
            cursor="pointer"
            w="fit-content"
            color="rgba(255,255,255,.5)"
            _hover={{ color: "rgba(255,255,255,.9)" }}
            transition="color .15s"
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

              {/* Stats */}
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
        {/* ── My Result Banner ── */}
        {myResult && (
          <Box
            mb={6}
            bg="white"
            borderRadius="14px"
            border="1px solid #e2e8f0"
            p={5}
            borderLeft="4px solid #4a72b8"
          >
            <Flex
              align="center"
              justify="space-between"
              flexWrap="wrap"
              gap={3}
            >
              <Flex align="center" gap={3}>
                <Flex
                  w="44px"
                  h="44px"
                  bg="#eff6ff"
                  borderRadius="12px"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaAward} color="#4a72b8" fontSize="18px" />
                </Flex>
                <Box>
                  <Text fontSize="13px" fontWeight={800} color="#0f172a">
                    Your Previous Score
                  </Text>
                  <Text fontSize="12px" color="#64748b">
                    {myResult.correct ?? myResult.correctQus?.length ?? 0}/
                    {myResult.totalQuestions} correct
                  </Text>
                </Box>
              </Flex>
              <Flex align="center" gap={4}>
                <Box textAlign="center">
                  <Text
                    fontSize="28px"
                    fontWeight={800}
                    color="#4a72b8"
                    letterSpacing="-1px"
                  >
                    {(
                      myResult.scorePercentage ??
                      myResult.percentage ??
                      0
                    ).toFixed(0)}
                    %
                  </Text>
                  <Badge
                    colorScheme={
                      (myResult.scorePercentage ?? 0) >= 40 ? "green" : "red"
                    }
                    borderRadius="full"
                  >
                    {(myResult.scorePercentage ?? 0) >= 40
                      ? "Passed"
                      : "Failed"}
                  </Badge>
                </Box>
                <Button
                  size="sm"
                  onClick={() => navigate("/test-result")}
                  variant="outline"
                  colorScheme="blue"
                  borderRadius="9px"
                  fontWeight={700}
                >
                  View Result
                </Button>
              </Flex>
            </Flex>
          </Box>
        )}

        {/* ── Start Test Card ── */}
        {!isOwner && (
          <Box
            mb={6}
            bg="white"
            borderRadius="16px"
            border="1px solid #e2e8f0"
            p={6}
            textAlign="center"
          >
            {!canStart && timeLeft !== null ? (
              <>
                <Icon
                  as={FaClock}
                  fontSize="40px"
                  color="#94a3b8"
                  mb={3}
                  display="block"
                  mx="auto"
                />
                <Text fontSize="16px" fontWeight={700} color="#374151" mb={1}>
                  Test starts soon
                </Text>
                <Text fontSize="13px" color="#94a3b8" mb={4}>
                  You can join 5 minutes before the test starts
                </Text>
                <Text
                  fontSize="36px"
                  fontWeight={800}
                  color="#4a72b8"
                  letterSpacing="-2px"
                  mb={4}
                  fontFamily="monospace"
                >
                  {fmtTime(timeLeft)}
                </Text>
                <Text fontSize="11px" color="#94a3b8">
                  Test will be available at{" "}
                  {new Date(test.startsAt).toLocaleTimeString()}
                </Text>
              </>
            ) : (
              <>
                <Icon
                  as={FaPlay}
                  fontSize="36px"
                  color="#4a72b8"
                  mb={3}
                  display="block"
                  mx="auto"
                />
                <Text fontSize="16px" fontWeight={700} color="#0f172a" mb={1}>
                  {myResult ? "Retake Test" : "Start Test"}
                </Text>
                <Text fontSize="13px" color="#64748b" mb={5}>
                  {test.questions?.length} questions · {timeLimitMin} minutes
                </Text>
                <Button
                  h="50px"
                  px={10}
                  borderRadius="12px"
                  bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
                  color="white"
                  fontWeight={800}
                  fontSize="15px"
                  leftIcon={<FaPlay />}
                  onClick={handleStartTest}
                  _hover={{
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(74,114,184,.35)",
                  }}
                  transition="all .2s"
                >
                  {user
                    ? myResult
                      ? "Retake Test"
                      : "Start Test"
                    : "Sign In to Start"}
                </Button>
              </>
            )}
          </Box>
        )}

        {/* ── Tabs ── */}
        <Flex gap={2} mb={6}>
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

        {/* ── Overview Tab ── */}
        {tab === "overview" && (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
            }}
            gap={4}
            mb={6}
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

        {/* ── Leaderboard Tab ── */}
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

        {/* ── Questions Tab (owner only) ── */}
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

      {/* ── Password Modal ── */}
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

      {/* ── Delete Dialog ── */}
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
