import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  CheckboxGroup,
  Stack,
  Alert,
  AlertIcon,
  Badge,
  Icon,
  Divider,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaCheckCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaLink,
  FaUserGraduate,
  FaClipboardList,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  createCoaching,
  fetchCoachingBySlug,
  fetchUserTestData,
} from "../apis/question";
import { getCurrentUser } from "../apis/auth";

const EXAM_TYPES = [
  { value: "SSC", label: "SSC", color: "#2563eb" },
  { value: "UPSC", label: "UPSC", color: "#7c3aed" },
  { value: "BANK", label: "Banking", color: "#0891b2" },
  { value: "RAILWAY", label: "Railway", color: "#ea580c" },
  { value: "STATE", label: "State PSC", color: "#16a34a" },
  { value: "DEFENCE", label: "Defence", color: "#dc2626" },
  { value: "OTHER", label: "Other", color: "#6b7280" },
];

// ── Small copyable link row ───────────────────────────────────────────────────
const CopyRow = ({ label, url }) => {
  const { hasCopied, onCopy } = useClipboard(url);
  return (
    <Box>
      <Text
        fontSize="11px"
        color="#94a3b8"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.8px"
        mb={2}
      >
        {label}
      </Text>
      <Flex
        align="center"
        gap={3}
        bg="white"
        border="1px solid #e2e8f0"
        borderRadius="10px"
        px={4}
        py={3}
      >
        <Text
          flex="1"
          fontSize="13px"
          color="#2563eb"
          fontWeight="600"
          noOfLines={1}
          fontFamily="monospace"
        >
          {url}
        </Text>
        <Tooltip
          label={hasCopied ? "Copied!" : "Copy"}
          placement="top"
          hasArrow
        >
          <Flex
            w="30px"
            h="30px"
            borderRadius="7px"
            cursor="pointer"
            align="center"
            justify="center"
            bg={hasCopied ? "#dcfce7" : "#f1f5f9"}
            color={hasCopied ? "#16a34a" : "#64748b"}
            _hover={{ bg: hasCopied ? "#dcfce7" : "#e2e8f0" }}
            onClick={onCopy}
            transition="all 0.15s"
          >
            <Icon as={hasCopied ? FaCheck : FaCopy} fontSize="12px" />
          </Flex>
        </Tooltip>
        <Tooltip label="Open in new tab" placement="top" hasArrow>
          <Flex
            w="30px"
            h="30px"
            borderRadius="7px"
            cursor="pointer"
            align="center"
            justify="center"
            bg="#f1f5f9"
            color="#64748b"
            _hover={{ bg: "#e2e8f0" }}
            as="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            transition="all 0.15s"
          >
            <Icon as={FaExternalLinkAlt} fontSize="11px" />
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const CoachingRegister = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredCoaching, setRegisteredCoaching] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [studentTests, setStudentTests] = useState([]);
  const [isLoadingTests, setIsLoadingTests] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    examTypes: [],
    city: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setIsSignedIn(true);
        setUserId(user._id);
      }
    });
  }, []);

  useEffect(() => {
    const savedSlug = localStorage.getItem("_myCoachingSlug");
    if (!savedSlug) return;
    fetchCoachingBySlug(savedSlug)
      .then((data) => {
        if (data) setRegisteredCoaching(data);
      })
      .catch(() => localStorage.removeItem("_myCoachingSlug"));
  }, []);

  const loadTests = useCallback(async () => {
    setIsLoadingTests(true);
    try {
      const tests = await fetchUserTestData();
      setStudentTests(tests ?? []);
    } catch {
      setStudentTests([]);
    } finally {
      setIsLoadingTests(false);
    }
  }, []);

  useEffect(() => {
    if (registeredCoaching) loadTests();
  }, [registeredCoaching, loadTests]);

  const setField = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setFieldErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Coaching name is required";
    if (form.examTypes.length === 0)
      errs.examTypes = "Select at least one exam type";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Invalid email address";
    if (form.website && !/^https?:\/\//.test(form.website))
      errs.website = "URL must start with https://";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        ...(userId ? { owner: userId } : {}),
      };
      const created = await createCoaching(payload);
      localStorage.setItem("_myCoachingSlug", created.slug);
      setRegisteredCoaching(created);
    } catch (err) {
      setError(err.message ?? "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // DASHBOARD — shown after registration
  // ══════════════════════════════════════════════════════════════════════════
  if (registeredCoaching) {
    const origin = window.location.origin;
    const coachingUrl = `${origin}/coaching/${registeredCoaching.slug}`;
    const testUrl = `${origin}/test?coaching=${registeredCoaching.slug}`;

    return (
      <Box minH="100vh" bg="#f8fafc">
        {/* Hero */}
        <Box
          bg="linear-gradient(135deg, #1e3a5f 0%, #2d5fa8 60%, #527ec4 100%)"
          px={{ base: 4, md: 8 }}
          pt={{ base: 10, md: 16 }}
          pb={{ base: 12, md: 20 }}
        >
          <Box maxW="900px" mx="auto">
            <Flex align="flex-start" gap={{ base: 4, md: 6 }}>
              <Flex
                w={{ base: "56px", md: "72px" }}
                h={{ base: "56px", md: "72px" }}
                flexShrink={0}
                bg="rgba(255,255,255,0.12)"
                border="2px solid rgba(255,255,255,0.2)"
                borderRadius="18px"
                align="center"
                justify="center"
                fontSize={{ base: "24px", md: "30px" }}
                fontWeight="900"
                color="white"
              >
                {registeredCoaching.name?.[0]?.toUpperCase()}
              </Flex>
              <Box flex="1">
                <Flex align="center" gap={3} mb={1} flexWrap="wrap">
                  <Text
                    fontSize={{ base: "24px", md: "36px" }}
                    fontWeight="800"
                    color="white"
                    lineHeight="1.15"
                    letterSpacing="-0.5px"
                  >
                    {registeredCoaching.name}
                  </Text>
                  <Flex
                    align="center"
                    gap={1.5}
                    bg="rgba(34,197,94,0.2)"
                    border="1px solid rgba(34,197,94,0.35)"
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    <Icon as={FaCheckCircle} color="#4ade80" fontSize="11px" />
                    <Text fontSize="11px" fontWeight="700" color="#4ade80">
                      Active
                    </Text>
                  </Flex>
                </Flex>
                {registeredCoaching.city && (
                  <Flex align="center" gap={1.5} mb={4}>
                    <Icon
                      as={FaMapMarkerAlt}
                      color="rgba(255,255,255,0.55)"
                      fontSize="12px"
                    />
                    <Text color="rgba(255,255,255,0.65)" fontSize="14px">
                      {registeredCoaching.city}
                    </Text>
                  </Flex>
                )}
                <Flex flexWrap="wrap" gap={2}>
                  {registeredCoaching.examTypes?.map((exam) => (
                    <Box
                      key={exam}
                      bg="rgba(255,255,255,0.12)"
                      border="1px solid rgba(255,255,255,0.2)"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="12px"
                      fontWeight="700"
                    >
                      {exam}
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Stats pulled up over hero */}
        <Box maxW="900px" mx="auto" px={{ base: 4, md: 8 }} mt="-24px" mb={8}>
          <Flex gap={4} flexWrap="wrap">
            {[
              {
                icon: FaUserGraduate,
                label: "Students",
                value: studentTests.length,
                color: "#2563eb",
              },
              {
                icon: FaClipboardList,
                label: "Tests Taken",
                value: studentTests.length,
                color: "#7c3aed",
              },
              {
                icon: FaChalkboardTeacher,
                label: "Exam Types",
                value: registeredCoaching.examTypes?.length ?? 0,
                color: "#ea580c",
              },
            ].map(({ icon, label, value, color }) => (
              <Flex
                key={label}
                align="center"
                gap={3}
                bg="white"
                borderRadius="14px"
                p={4}
                border="1px solid #e2e8f0"
                boxShadow="0 4px 16px rgba(0,0,0,0.06)"
                flex="1"
                minW="140px"
              >
                <Flex
                  w="42px"
                  h="42px"
                  bg={`${color}10`}
                  borderRadius="11px"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={icon} fontSize="17px" color={color} />
                </Flex>
                <Box>
                  <Text
                    fontSize="24px"
                    fontWeight="800"
                    color="#0f172a"
                    lineHeight="1"
                  >
                    {value}
                  </Text>
                  <Text
                    fontSize="12px"
                    color="#94a3b8"
                    fontWeight="600"
                    mt={0.5}
                  >
                    {label}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>

        <Box maxW="900px" mx="auto" px={{ base: 4, md: 8 }} pb={12}>
          {/* Links section */}
          <Box mb={6}>
            <Flex align="center" gap={2} mb={5}>
              <Flex
                w="32px"
                h="32px"
                bg="#527ec410"
                borderRadius="8px"
                align="center"
                justify="center"
              >
                <Icon as={FaLink} fontSize="13px" color="#527ec4" />
              </Flex>
              <Text fontSize="16px" fontWeight="800" color="#0f172a">
                Your Shareable Links
              </Text>
            </Flex>
            <Box
              bg="#f8fafc"
              borderRadius="14px"
              border="1px solid #e2e8f0"
              p={5}
            >
              <Stack spacing={4}>
                <CopyRow label="Coaching Profile Page" url={coachingUrl} />
                <CopyRow
                  label="Student Test Link — Share with your students"
                  url={testUrl}
                />
              </Stack>
              <Flex
                align="flex-start"
                gap={3}
                mt={5}
                bg="#fffbeb"
                border="1px solid #fde68a"
                borderRadius="10px"
                p={4}
              >
                <Text fontSize="16px" flexShrink={0}>
                  💡
                </Text>
                <Text fontSize="13px" color="#92400e" lineHeight="1.7">
                  Share the <Text as="strong">Student Test Link</Text> with your
                  students. When they open it, they can take a test directly
                  linked to your coaching centre.
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* Student tests */}
          <Box>
            <Flex align="center" justify="space-between" mb={5}>
              <Flex align="center" gap={2}>
                <Flex
                  w="32px"
                  h="32px"
                  bg="#7c3aed10"
                  borderRadius="8px"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaClipboardList} fontSize="13px" color="#7c3aed" />
                </Flex>
                <Text fontSize="16px" fontWeight="800" color="#0f172a">
                  Student Tests
                </Text>
              </Flex>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="purple"
                onClick={loadTests}
                isLoading={isLoadingTests}
              >
                Refresh
              </Button>
            </Flex>

            <Box
              bg="white"
              borderRadius="14px"
              border="1px solid #e2e8f0"
              overflow="hidden"
            >
              {isLoadingTests ? (
                <Flex py={12} justify="center">
                  <Spinner color="#7c3aed" thickness="3px" />
                </Flex>
              ) : studentTests.length === 0 ? (
                <Box py={14} textAlign="center">
                  <Icon
                    as={FaUserGraduate}
                    fontSize="40px"
                    color="#e2e8f0"
                    display="block"
                    mx="auto"
                    mb={4}
                  />
                  <Text fontSize="15px" color="#94a3b8" fontWeight="700">
                    No tests taken yet
                  </Text>
                  <Text fontSize="13px" color="#cbd5e1" mt={1}>
                    Share your test link with students to get started
                  </Text>
                </Box>
              ) : (
                <TableContainer>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr bg="#f8fafc">
                        <Th
                          fontSize="11px"
                          color="#94a3b8"
                          fontWeight="700"
                          py={3}
                          borderColor="#f1f5f9"
                        >
                          Student
                        </Th>
                        <Th
                          fontSize="11px"
                          color="#94a3b8"
                          fontWeight="700"
                          borderColor="#f1f5f9"
                        >
                          Test Name
                        </Th>
                        <Th
                          fontSize="11px"
                          color="#94a3b8"
                          fontWeight="700"
                          borderColor="#f1f5f9"
                        >
                          Score
                        </Th>
                        <Th
                          fontSize="11px"
                          color="#94a3b8"
                          fontWeight="700"
                          borderColor="#f1f5f9"
                        >
                          Date
                        </Th>
                        <Th
                          fontSize="11px"
                          color="#94a3b8"
                          fontWeight="700"
                          borderColor="#f1f5f9"
                        >
                          Status
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {studentTests.map((t, i) => {
                        const pct =
                          t.results?.correctAnswers != null
                            ? Math.round(
                                (t.results.correctAnswers / (t.noOfQus || 1)) *
                                  100,
                              )
                            : null;
                        return (
                          <Tr key={t._id ?? i} _hover={{ bg: "#f8fafc" }}>
                            <Td borderColor="#f1f5f9">
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                color="#334155"
                              >
                                {t.studentName ?? t.userId ?? "—"}
                              </Text>
                            </Td>
                            <Td borderColor="#f1f5f9">
                              <Text
                                fontSize="13px"
                                color="#475569"
                                noOfLines={1}
                                maxW="160px"
                              >
                                {t.testName ?? "Unnamed Test"}
                              </Text>
                            </Td>
                            <Td borderColor="#f1f5f9">
                              {pct !== null ? (
                                <Text
                                  fontSize="13px"
                                  fontWeight="700"
                                  color={
                                    pct >= 80
                                      ? "#16a34a"
                                      : pct >= 60
                                        ? "#d97706"
                                        : "#ef4444"
                                  }
                                >
                                  {pct}%
                                </Text>
                              ) : (
                                <Text fontSize="13px" color="#cbd5e1">
                                  —
                                </Text>
                              )}
                            </Td>
                            <Td borderColor="#f1f5f9">
                              <Text fontSize="12px" color="#94a3b8">
                                {t.createdAt
                                  ? new Date(t.createdAt).toLocaleDateString(
                                      "en-IN",
                                    )
                                  : "—"}
                              </Text>
                            </Td>
                            <Td borderColor="#f1f5f9">
                              <Box
                                display="inline-block"
                                fontSize="10px"
                                px={2}
                                py="3px"
                                borderRadius="full"
                                fontWeight="700"
                                bg={
                                  t.results?.correctAnswers != null
                                    ? "#dcfce7"
                                    : "#f1f5f9"
                                }
                                color={
                                  t.results?.correctAnswers != null
                                    ? "#16a34a"
                                    : "#94a3b8"
                                }
                              >
                                {t.results?.correctAnswers != null
                                  ? "Completed"
                                  : "Pending"}
                              </Box>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // REGISTRATION FORM — no wrapping card box, clean full-width layout
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <Box minH="100vh" bg="#f8fafc">
      {/* Hero */}
      <Box
        bg="linear-gradient(135deg, #1e3a5f 0%, #2d5fa8 60%, #527ec4 100%)"
        px={{ base: 4, md: 8 }}
        pt={{ base: 10, md: 16 }}
        pb={{ base: 14, md: 24 }}
      >
        <Box maxW="660px" mx="auto">
          <Flex
            align="center"
            gap={2}
            mb={8}
            cursor="pointer"
            color="rgba(255,255,255,0.55)"
            w="fit-content"
            _hover={{ color: "white" }}
            transition="color 0.15s"
            onClick={() => navigate(-1)}
          >
            <Icon as={FaArrowLeft} fontSize="12px" />
            <Text fontSize="13px" fontWeight="600">
              Back
            </Text>
          </Flex>

          <Flex align="center" gap={4}>
            <Flex
              w="56px"
              h="56px"
              bg="rgba(255,255,255,0.12)"
              border="2px solid rgba(255,255,255,0.2)"
              borderRadius="16px"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Icon as={FaChalkboardTeacher} fontSize="24px" color="white" />
            </Flex>
            <Box>
              <Text
                fontSize={{ base: "26px", md: "34px" }}
                fontWeight="800"
                color="white"
                lineHeight="1.15"
                letterSpacing="-0.5px"
              >
                Register Your Coaching
              </Text>
              <Text color="rgba(255,255,255,0.6)" fontSize="15px" mt={1}>
                Get listed · Share test links · Track student progress
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Form — pulled up over hero with shadow */}
      <Box maxW="660px" mx="auto" px={{ base: 4, md: 8 }} mt="-40px" pb={12}>
        <Box
          bg="white"
          borderRadius="20px"
          boxShadow="0 8px 40px rgba(0,0,0,0.1)"
          border="1px solid #e2e8f0"
          overflow="hidden"
        >
          <Box px={{ base: 6, md: 8 }} py={8}>
            {!isSignedIn && (
              <Alert status="info" borderRadius="10px" mb={6} fontSize="14px">
                <AlertIcon />
                <Text>
                  <Text
                    as="a"
                    href="/auth/signin"
                    color="blue.600"
                    fontWeight="700"
                    textDecoration="underline"
                  >
                    Sign in
                  </Text>{" "}
                  to link this coaching to your account and manage it later.
                </Text>
              </Alert>
            )}

            {error && (
              <Alert status="error" borderRadius="10px" mb={6}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Stack spacing={6}>
              {/* Name */}
              <FormControl isRequired isInvalid={!!fieldErrors.name}>
                <FormLabel
                  fontSize="13px"
                  fontWeight="700"
                  color="#374151"
                  mb={1.5}
                >
                  Coaching Name
                </FormLabel>
                <Input
                  placeholder="e.g. Vision IAS, Mahendra's..."
                  value={form.name}
                  onChange={setField("name")}
                  borderRadius="10px"
                  h="46px"
                  fontSize="15px"
                  borderColor={fieldErrors.name ? "red.400" : "#e2e8f0"}
                  _focus={{
                    borderColor: "#527ec4",
                    boxShadow: "0 0 0 1px #527ec4",
                  }}
                />
                <FormErrorMessage>{fieldErrors.name}</FormErrorMessage>
              </FormControl>

              {/* Exam Types */}
              <FormControl isRequired isInvalid={!!fieldErrors.examTypes}>
                <FormLabel
                  fontSize="13px"
                  fontWeight="700"
                  color="#374151"
                  mb={1.5}
                >
                  Exam Types
                </FormLabel>
                <Box
                  border="1px solid"
                  p={4}
                  borderRadius="10px"
                  borderColor={fieldErrors.examTypes ? "red.400" : "#e2e8f0"}
                  bg="#f8fafc"
                >
                  <CheckboxGroup
                    value={form.examTypes}
                    onChange={(vals) => {
                      setForm((p) => ({ ...p, examTypes: vals }));
                      setFieldErrors((p) => ({ ...p, examTypes: "" }));
                    }}
                  >
                    <Flex flexWrap="wrap" gap={3}>
                      {EXAM_TYPES.map(({ value, label, color }) => (
                        <Checkbox key={value} value={value} colorScheme="blue">
                          <Box
                            bg={`${color}12`}
                            color={color}
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="12px"
                            fontWeight="700"
                            cursor="pointer"
                          >
                            {label}
                          </Box>
                        </Checkbox>
                      ))}
                    </Flex>
                  </CheckboxGroup>
                </Box>
                <FormErrorMessage>{fieldErrors.examTypes}</FormErrorMessage>
              </FormControl>

              {/* Description */}
              <FormControl>
                <FormLabel
                  fontSize="13px"
                  fontWeight="700"
                  color="#374151"
                  mb={1.5}
                >
                  About Your Coaching{" "}
                  <Text as="span" color="#94a3b8" fontWeight="400">
                    (optional)
                  </Text>
                </FormLabel>
                <Textarea
                  placeholder="Teaching methodology, achievements, batch details..."
                  value={form.description}
                  onChange={setField("description")}
                  borderRadius="10px"
                  rows={3}
                  fontSize="14px"
                  borderColor="#e2e8f0"
                  _focus={{
                    borderColor: "#527ec4",
                    boxShadow: "0 0 0 1px #527ec4",
                  }}
                  resize="vertical"
                />
              </FormControl>

              <Box h="1px" bg="#f1f5f9" />

              {/* City + Email */}
              <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                <FormControl flex="1">
                  <FormLabel
                    fontSize="13px"
                    fontWeight="700"
                    color="#374151"
                    mb={1.5}
                  >
                    City
                  </FormLabel>
                  <Input
                    placeholder="Delhi, Mumbai..."
                    value={form.city}
                    onChange={setField("city")}
                    borderRadius="10px"
                    h="46px"
                    fontSize="14px"
                    borderColor="#e2e8f0"
                    _focus={{
                      borderColor: "#527ec4",
                      boxShadow: "0 0 0 1px #527ec4",
                    }}
                  />
                </FormControl>
                <FormControl flex="1" isInvalid={!!fieldErrors.email}>
                  <FormLabel
                    fontSize="13px"
                    fontWeight="700"
                    color="#374151"
                    mb={1.5}
                  >
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="contact@yourcoaching.com"
                    value={form.email}
                    onChange={setField("email")}
                    borderRadius="10px"
                    h="46px"
                    fontSize="14px"
                    borderColor={fieldErrors.email ? "red.400" : "#e2e8f0"}
                    _focus={{
                      borderColor: "#527ec4",
                      boxShadow: "0 0 0 1px #527ec4",
                    }}
                  />
                  <FormErrorMessage>{fieldErrors.email}</FormErrorMessage>
                </FormControl>
              </Flex>

              {/* Phone + Website */}
              <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                <FormControl flex="1">
                  <FormLabel
                    fontSize="13px"
                    fontWeight="700"
                    color="#374151"
                    mb={1.5}
                  >
                    Phone
                  </FormLabel>
                  <Input
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={setField("phone")}
                    borderRadius="10px"
                    h="46px"
                    fontSize="14px"
                    borderColor="#e2e8f0"
                    _focus={{
                      borderColor: "#527ec4",
                      boxShadow: "0 0 0 1px #527ec4",
                    }}
                  />
                </FormControl>
                <FormControl flex="1" isInvalid={!!fieldErrors.website}>
                  <FormLabel
                    fontSize="13px"
                    fontWeight="700"
                    color="#374151"
                    mb={1.5}
                  >
                    Website
                  </FormLabel>
                  <Input
                    placeholder="https://yourcoaching.com"
                    value={form.website}
                    onChange={setField("website")}
                    borderRadius="10px"
                    h="46px"
                    fontSize="14px"
                    borderColor={fieldErrors.website ? "red.400" : "#e2e8f0"}
                    _focus={{
                      borderColor: "#527ec4",
                      boxShadow: "0 0 0 1px #527ec4",
                    }}
                  />
                  <FormErrorMessage>{fieldErrors.website}</FormErrorMessage>
                </FormControl>
              </Flex>

              {/* Submit */}
              <Button
                h="52px"
                borderRadius="12px"
                bg="linear-gradient(135deg, #527ec4, #1e3a5f)"
                color="white"
                fontWeight="800"
                fontSize="15px"
                isLoading={isSubmitting}
                loadingText="Registering..."
                onClick={handleSubmit}
                _hover={{
                  opacity: 0.92,
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 24px rgba(82,126,196,0.4)",
                }}
                _active={{ transform: "none" }}
                transition="all 0.2s"
                leftIcon={<FaChalkboardTeacher />}
                letterSpacing="0.3px"
              >
                Register Coaching Centre
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CoachingRegister;
