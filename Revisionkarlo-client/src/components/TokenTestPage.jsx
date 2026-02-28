import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Spinner, Icon } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaPlay, FaExclamationTriangle } from "react-icons/fa";

const BASE = "http://localhost:80";

const setLocalStorage = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

/**
 * Handles /tests/token/:token
 * Fetches the test via access token, shows preview, then lets student start.
 */
export default function TokenTestPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    fetch(`${BASE}/tests/token/${token}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.data) throw new Error(data.message || "Test not found");
        const t = data.data;
        setTest(t);

        // Time gate: allow 5 min before scheduled start
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
          setCanStart(true);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  // Countdown
  useEffect(() => {
    if (timeLeft === null || canStart || timeLeft <= 0) {
      if (timeLeft <= 0) setCanStart(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, canStart]);

  const handleStart = () => {
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    setLocalStorage("savedTestQuestions", test.questions);
    setLocalStorage("category", test.title);
    setLocalStorage("Subject", test.subject || "general");
    setLocalStorage("currentTestId", test._id);
    setLocalStorage("Testdata", [test]);
    navigate("/test");
  };

  const fmtTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (loading)
    return (
      <Flex minH="100vh" align="center" justify="center" bg="#f8fafc">
        <Spinner size="xl" color="#4a72b8" thickness="4px" />
      </Flex>
    );

  if (error)
    return (
      <Flex minH="100vh" align="center" justify="center" bg="#f8fafc" px={4}>
        <Box textAlign="center" fontFamily="'Sora',sans-serif" maxW="400px">
          <Icon
            as={FaExclamationTriangle}
            fontSize="52px"
            color="#f59e0b"
            mb={4}
            display="block"
            mx="auto"
          />
          <Text fontSize="20px" fontWeight={800} color="#0f172a" mb={2}>
            Link Not Valid
          </Text>
          <Text fontSize="14px" color="#64748b" mb={6}>
            {error}
          </Text>
          <Button
            onClick={() => navigate("/")}
            bg="#4a72b8"
            color="white"
            borderRadius="10px"
            fontWeight={700}
          >
            Go Home
          </Button>
        </Box>
      </Flex>
    );

  const timeLimitMin = test.timeLimitMin || test.timeLimit || 30;

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="#f8fafc"
      px={4}
      fontFamily="'Sora',sans-serif"
      bgImage="radial-gradient(circle at 20% 50%, rgba(74,114,184,.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(30,58,95,.04) 0%, transparent 50%)"
    >
      <Box
        maxW="480px"
        w="full"
        bg="white"
        borderRadius="20px"
        overflow="hidden"
        boxShadow="0 20px 60px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)"
      >
        {/* Header */}
        <Box bg="linear-gradient(135deg,#0f1e3a,#2d5fa8)" px={8} pt={8} pb={6}>
          <Flex align="center" gap={2} mb={4}>
            <Icon as={FaLock} color="rgba(255,255,255,.6)" fontSize="12px" />
            <Text
              fontSize="11px"
              fontWeight={700}
              color="rgba(255,255,255,.6)"
              textTransform="uppercase"
              letterSpacing="2px"
            >
              Private Test Link
            </Text>
          </Flex>
          <Text
            fontSize="26px"
            fontWeight={800}
            color="white"
            letterSpacing="-1px"
            lineHeight="1.2"
            mb={2}
          >
            {test.title}
          </Text>
          {test.examType && (
            <Text fontSize="13px" color="rgba(255,255,255,.6)">
              {test.examType}
            </Text>
          )}
        </Box>

        {/* Content */}
        <Box px={8} py={6}>
          {/* Test Info */}
          <Flex gap={4} mb={6} flexWrap="wrap">
            {[
              { label: "Questions", value: test.questions?.length || 0 },
              { label: "Time Limit", value: `${timeLimitMin} min` },
              { label: "Subject", value: test.subject || "General" },
            ].map((info) => (
              <Box
                key={info.label}
                flex={1}
                minW="80px"
                bg="#f8fafc"
                borderRadius="12px"
                p={3}
                textAlign="center"
              >
                <Text fontSize="18px" fontWeight={800} color="#0f172a">
                  {info.value}
                </Text>
                <Text
                  fontSize="10px"
                  color="#94a3b8"
                  fontWeight={600}
                  textTransform="uppercase"
                  letterSpacing=".6px"
                  mt="2px"
                >
                  {info.label}
                </Text>
              </Box>
            ))}
          </Flex>

          {/* Time gate */}
          {!canStart && timeLeft !== null ? (
            <Box textAlign="center" py={4}>
              <Text fontSize="13px" color="#64748b" mb={3}>
                Test starts in
              </Text>
              <Text
                fontSize="48px"
                fontWeight={800}
                color="#4a72b8"
                letterSpacing="-3px"
                fontFamily="monospace"
                mb={2}
              >
                {fmtTime(timeLeft)}
              </Text>
              <Text fontSize="12px" color="#94a3b8">
                You'll be able to join 5 minutes before the test starts
              </Text>
              {test.startsAt && (
                <Text fontSize="12px" color="#94a3b8" mt={1}>
                  Scheduled: {new Date(test.startsAt).toLocaleString()}
                </Text>
              )}
            </Box>
          ) : (
            <>
              {!user && (
                <Box
                  bg="#fffbeb"
                  border="1px solid #fde68a"
                  borderRadius="10px"
                  p={4}
                  mb={4}
                >
                  <Text fontSize="13px" color="#92400e" fontWeight={600}>
                    ⚠️ Please sign in to take this test and save your results.
                  </Text>
                </Box>
              )}
              <Button
                w="full"
                h="52px"
                borderRadius="12px"
                bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
                color="white"
                fontWeight={800}
                fontSize="15px"
                leftIcon={<FaPlay />}
                onClick={handleStart}
                _hover={{
                  opacity: 0.9,
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(74,114,184,.35)",
                }}
                transition="all .2s"
              >
                {user ? "Start Test" : "Sign In & Start"}
              </Button>
            </>
          )}

          <Text fontSize="11px" color="#94a3b8" textAlign="center" mt={4}>
            This is a private test link. Do not share it with others.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
