// src/components/CoachingPage.jsx
//
// FIXES IN THIS VERSION:
//  1. Tabs built from coaching.examTypes (not from tests) → shows all 3 courses immediately
//  2. Courses stat uses coaching.examTypes.length
//  3. Default tab is "All" (not auto-selected exam type)
//  4. CreateTestDrawer receives coachingExamTypes → exam dropdown pre-fills correctly
//  5. joinToken index drop → run in mongosh: db.tests.dropIndex("joinToken_1")
//
// EXACT FLOW:
//
// /coaching (root page):
//   - Checks if logged-in user has a coaching they own
//   - IF YES → shows their CoachingDetail directly (no redirect, no navigate)
//   - IF NO  → shows the CoachingList with "Add Coaching" button
//
// After creating coaching via AddCoachingDrawer:
//   - onCreated(coaching) is called
//   - State switches to show CoachingDetail of newly created coaching
//   - NO page navigation, just state change
//
// CoachingDetail (owner view):
//   - Shows "Your Coaching" crown badge
//   - Owner panel with:
//       1. Shareable link + slug + Copy button
//       2. "Create Test" button → opens CreateTestDrawer
//       3. "Remove My Coaching" button → confirm dialog → soft delete → back to list
//   - Tests listed below with delete button per row (owner only)
//
// /coaching/:slug → CoachingDetail (public view, no owner panel unless they own it)

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Icon,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Checkbox,
  CheckboxGroup,
  Textarea,
  useDisclosure,
  useToast,
  Select,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Badge,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaArrowLeft,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
  FaExternalLinkAlt,
  FaClock,
  FaLock,
  FaUnlock,
  FaBookOpen,
  FaTrash,
  FaLink,
  FaCheck,
  FaCrown,
  FaDownload,
  FaFileExcel,
} from "react-icons/fa";
import * as XLSX from "xlsx";

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

const EXAM_TYPES = [
  "SSC",
  "UPSC",
  "BANK",
  "RAILWAY",
  "STATE",
  "DEFENCE",
  "OTHER",
];

const EXAM_COLORS = {
  SSC: { bg: "#eff6ff", color: "#2563eb" },
  UPSC: { bg: "#f5f3ff", color: "#7c3aed" },
  BANK: { bg: "#ecfeff", color: "#0891b2" },
  BANKING: { bg: "#ecfeff", color: "#0891b2" },
  RAILWAY: { bg: "#fff7ed", color: "#ea580c" },
  STATE: { bg: "#f0fdf4", color: "#16a34a" },
  STATE_PSC: { bg: "#f0fdf4", color: "#16a34a" },
  DEFENCE: { bg: "#fef2f2", color: "#dc2626" },
  OTHER: { bg: "#f8fafc", color: "#6b7280" },
  GENERAL: { bg: "#f1f5f9", color: "#475569" },
};

const toSlug = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

// ─── Excel helpers ────────────────────────────────────────────────
const downloadExcelTemplate = () => {
  const headers = [
    "Question",
    "Option A",
    "Option B",
    "Option C",
    "Option D",
    "Answer (0-3)",
    "Explanation",
  ];
  const example = [
    "What is 2 + 2?",
    "3",
    "4",
    "5",
    "6",
    "1",
    "Basic addition: 2+2=4 which is option B (index 1)",
  ];
  const ws = XLSX.utils.aoa_to_sheet([headers, example]);
  ws["!cols"] = [
    { wch: 50 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 14 },
    { wch: 35 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Questions");
  XLSX.writeFile(wb, "test_questions_template.xlsx");
};

const parseExcelFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const qs = rows
          .slice(1)
          .filter((r) => r[0])
          .map((r) => ({
            qus: String(r[0] || ""),
            options: [
              String(r[1] || ""),
              String(r[2] || ""),
              String(r[3] || ""),
              String(r[4] || ""),
            ],
            // answer is 0-based index; if user enters 1-4 convert to 0-based
            answer: (() => {
              const raw = parseInt(r[5]);
              if (isNaN(raw)) return 0;
              return raw >= 1 && raw <= 4 ? raw - 1 : raw;
            })(),
            explanation: String(r[6] || ""),
          }));
        resolve(qs);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });

// ═══════════════════════════════════════════════
// CREATE TEST DRAWER
// ═══════════════════════════════════════════════
function CreateTestDrawer({
  isOpen,
  onClose,
  coachingId,
  coachingExamTypes = [],
  onCreated,
}) {
  const toast = useToast();
  const fileRef = useRef();
  const [busy, setBusy] = useState(false);
  const [parsedQs, setParsedQs] = useState([]);
  const [fileName, setFileName] = useState("");
  const [parseError, setParseError] = useState("");
  const [form, setForm] = useState({
    title: "",
    examType: "",
    subject: "",
    timeLimitMin: 30,
    visibility: "public",
    password: "",
  });
  const [errs, setErrs] = useState({});

  // Pre-select first exam type from coaching
  useEffect(() => {
    if (coachingExamTypes.length && !form.examType) {
      setForm((p) => ({ ...p, examType: coachingExamTypes[0] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coachingExamTypes]);

  const sf = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrs((p) => ({ ...p, [k]: "" }));
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setParseError("");
    try {
      const qs = await parseExcelFile(file);
      if (!qs.length) {
        setParseError("No questions found in file.");
        return;
      }
      setParsedQs(qs);
    } catch {
      setParseError("Could not parse file. Use the correct Excel format.");
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setErrs({ title: "Test name is required" });
      return;
    }
    if (!parsedQs.length) {
      setParseError("Please upload an Excel file with questions.");
      return;
    }

    setBusy(true);
    try {
      const user = getCurrentUser();
      if (!user?._id) throw new Error("Please sign in first");

      const payload = {
        title: form.title.trim(),
        coachingId,
        examType: form.examType || "OTHER",
        subject: form.subject || undefined,
        timeLimitMin: Number(form.timeLimitMin) || 30,
        visibility: form.visibility,
        accessType: form.visibility, // sync both fields
        createdBy: user._id,
        inlineQuestions: parsedQs,
        ...(form.visibility === "private" && form.password
          ? { password: form.password }
          : {}),
      };

      const res = await apiFetch("/tests/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast({ title: "Test created!", status: "success", duration: 3000 });
      onCreated(res.data);

      // Reset form
      setForm({
        title: "",
        examType: coachingExamTypes[0] || "",
        subject: "",
        timeLimitMin: 30,
        visibility: "public",
        password: "",
      });
      setParsedQs([]);
      setFileName("");
      setParseError("");
    } catch (err) {
      toast({ title: err.message, status: "error", duration: 4000 });
    } finally {
      setBusy(false);
    }
  };

  const handleClose = () => {
    setParsedQs([]);
    setFileName("");
    setParseError("");
    setErrs({});
    onClose();
  };

  // Exam types dropdown: coaching's own types first (marked ✓), then remaining global types
  const examOptions = [
    ...coachingExamTypes,
    ...EXAM_TYPES.filter((e) => !coachingExamTypes.includes(e)),
  ];

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} placement="right" size="md">
      <DrawerOverlay backdropFilter="blur(4px)" bg="rgba(0,0,0,.45)" />
      <DrawerContent
        borderLeftRadius="20px"
        overflow="hidden"
        fontFamily="'Sora',sans-serif"
      >
        <DrawerCloseButton top={4} right={4} zIndex={10} color="white" />
        <DrawerHeader
          px={7}
          pt={7}
          pb={5}
          bg="linear-gradient(135deg,#0f1e3a,#2d5fa8)"
          color="white"
        >
          <Flex align="center" gap={3}>
            <Flex
              w="42px"
              h="42px"
              bg="rgba(255,255,255,.15)"
              borderRadius="12px"
              align="center"
              justify="center"
            >
              <Icon as={FaClipboardList} fontSize="18px" />
            </Flex>
            <Box>
              <Text fontSize="18px" fontWeight={800} lineHeight="1.2">
                Create Test
              </Text>
              <Text fontSize="12px" color="rgba(255,255,255,.6)" mt="2px">
                Upload questions via Excel
              </Text>
            </Box>
          </Flex>
        </DrawerHeader>

        <DrawerBody px={7} py={6} overflowY="auto">
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errs.title}>
              <FormLabel
                fontSize="12px"
                fontWeight={700}
                color="#374151"
                mb={1}
                textTransform="uppercase"
                letterSpacing=".8px"
              >
                Test Name
              </FormLabel>
              <Input
                value={form.title}
                onChange={sf("title")}
                placeholder="e.g. SSC CGL Mock Test 1"
                borderRadius="10px"
                h="44px"
                fontSize="14px"
                borderColor={errs.title ? "red.400" : "#e2e8f0"}
                _focus={{
                  borderColor: "#4a72b8",
                  boxShadow: "0 0 0 1px #4a72b8",
                }}
              />
              <FormErrorMessage>{errs.title}</FormErrorMessage>
            </FormControl>

            <Flex gap={3} direction={{ base: "column", sm: "row" }}>
              <FormControl flex={1}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Exam Type
                </FormLabel>
                <Select
                  value={form.examType}
                  onChange={sf("examType")}
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                >
                  <option value="">Select…</option>
                  {coachingExamTypes.length > 0 && (
                    <optgroup label="This Coaching">
                      {coachingExamTypes.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label="Other">
                    {EXAM_TYPES.filter(
                      (e) => !coachingExamTypes.includes(e),
                    ).map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </optgroup>
                </Select>
              </FormControl>
              <FormControl flex={1}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Subject
                </FormLabel>
                <Select
                  value={form.subject}
                  onChange={sf("subject")}
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                >
                  <option value="">Select…</option>
                  {[
                    "math",
                    "english",
                    "gs",
                    "vocabulary",
                    "reasoning",
                    "mathtwo",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Flex gap={3} direction={{ base: "column", sm: "row" }}>
              <FormControl flex={1}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Time Limit (min)
                </FormLabel>
                <Input
                  type="number"
                  value={form.timeLimitMin}
                  onChange={sf("timeLimitMin")}
                  min={5}
                  max={180}
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                  _focus={{
                    borderColor: "#4a72b8",
                    boxShadow: "0 0 0 1px #4a72b8",
                  }}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Access
                </FormLabel>
                <Select
                  value={form.visibility}
                  onChange={sf("visibility")}
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                >
                  <option value="public">🌐 Public</option>
                  <option value="private">🔒 Private</option>
                </Select>
              </FormControl>
            </Flex>

            {form.visibility === "private" && (
              <FormControl>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Test Password
                </FormLabel>
                <Input
                  value={form.password}
                  onChange={sf("password")}
                  placeholder="Password students must enter"
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                  _focus={{
                    borderColor: "#4a72b8",
                    boxShadow: "0 0 0 1px #4a72b8",
                  }}
                />
              </FormControl>
            )}

            <Divider />

            <Box>
              <Flex justify="space-between" align="center" mb={3}>
                <Text
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Questions via Excel
                </Text>
                <Button
                  size="xs"
                  leftIcon={<FaDownload />}
                  variant="outline"
                  colorScheme="green"
                  borderRadius="8px"
                  fontSize="11px"
                  fontWeight={700}
                  onClick={downloadExcelTemplate}
                >
                  Download Template
                </Button>
              </Flex>

              <Box
                bg="#f0fdf4"
                border="1px solid #bbf7d0"
                borderRadius="10px"
                p={4}
                mb={4}
              >
                <Text fontSize="11px" fontWeight={700} color="#15803d" mb={2}>
                  📋 COLUMN ORDER IN EXCEL:
                </Text>
                {[
                  "Question",
                  "Option A",
                  "Option B",
                  "Option C",
                  "Option D",
                  "Answer (0=A, 1=B, 2=C, 3=D)",
                  "Explanation",
                ].map((col, i) => (
                  <Flex
                    key={col}
                    gap={2}
                    mb="2px"
                    fontFamily="monospace"
                    fontSize="11px"
                    color="#166534"
                  >
                    <Text color="#94a3b8" minW="16px">
                      {i + 1}.
                    </Text>
                    <Text fontWeight={600}>{col}</Text>
                  </Flex>
                ))}
                <Text fontSize="10px" color="#16a34a" mt={2}>
                  * Answer column: 0=Option A, 1=Option B, 2=Option C, 3=Option
                  D
                </Text>
              </Box>

              <Box
                border="2px dashed"
                borderColor={
                  parsedQs.length > 0
                    ? "#16a34a"
                    : parseError
                      ? "#ef4444"
                      : "#e2e8f0"
                }
                borderRadius="12px"
                p={6}
                textAlign="center"
                bg={
                  parsedQs.length > 0
                    ? "#f0fdf4"
                    : parseError
                      ? "#fef2f2"
                      : "#f8fafc"
                }
                cursor="pointer"
                onClick={() => fileRef.current?.click()}
                transition="all .2s"
                _hover={{ borderColor: "#4a72b8", bg: "#f0f7ff" }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  style={{ display: "none" }}
                  onChange={handleFile}
                />
                {parsedQs.length > 0 ? (
                  <>
                    <Icon
                      as={FaCheck}
                      fontSize="28px"
                      color="#16a34a"
                      mb={2}
                      display="block"
                      mx="auto"
                    />
                    <Text fontSize="14px" fontWeight={700} color="#15803d">
                      {fileName}
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#16a34a"
                      mt={1}
                      fontWeight={700}
                    >
                      ✓ {parsedQs.length} questions loaded
                    </Text>
                    <Text fontSize="11px" color="#94a3b8" mt={2}>
                      Click to replace file
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon
                      as={FaFileExcel}
                      fontSize="32px"
                      color={parseError ? "#ef4444" : "#94a3b8"}
                      mb={2}
                      display="block"
                      mx="auto"
                    />
                    <Text
                      fontSize="14px"
                      fontWeight={600}
                      color={parseError ? "#ef4444" : "#374151"}
                    >
                      {parseError || "Click to upload .xlsx file"}
                    </Text>
                    <Text fontSize="12px" color="#94a3b8" mt={1}>
                      Accepts .xlsx and .xls
                    </Text>
                  </>
                )}
              </Box>
            </Box>

            <Button
              h="50px"
              borderRadius="12px"
              mt={2}
              bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
              color="white"
              fontWeight={800}
              fontSize="14px"
              isLoading={busy}
              loadingText="Creating…"
              onClick={handleSubmit}
              leftIcon={<FaPlus />}
              isDisabled={parsedQs.length === 0}
              _hover={{
                opacity: 0.9,
                transform: "translateY(-1px)",
                boxShadow: "0 8px 24px rgba(74,114,184,.35)",
              }}
              transition="all .2s"
            >
              Create Test ({parsedQs.length} Questions)
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// ═══════════════════════════════════════════════
// ADD COACHING DRAWER
// ═══════════════════════════════════════════════
function AddCoachingDrawer({ isOpen, onClose, onCreated }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [errs, setErrs] = useState({});
  const [form, setForm] = useState({
    name: "",
    description: "",
    examTypes: [],
    city: "",
    email: "",
    phone: "",
    website: "",
  });

  const sf = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrs((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Coaching name is required";
    if (!form.examTypes.length) e.examTypes = "Select at least one exam type";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email";
    if (form.website && !/^https?:\/\//.test(form.website))
      e.website = "Must start with https://";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrs(e);
      return;
    }
    setBusy(true);
    try {
      const user = getCurrentUser();
      const payload = {
        ...form,
        name: form.name.trim(),
        slug: toSlug(form.name.trim()),
        ...(user?._id ? { owner: user._id } : {}),
      };
      const res = await apiFetch("/coaching/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast({
        title: "Coaching registered!",
        status: "success",
        duration: 3000,
      });
      onCreated(res.data);
    } catch (err) {
      toast({ title: err.message, status: "error", duration: 4000 });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerOverlay backdropFilter="blur(4px)" bg="rgba(0,0,0,.45)" />
      <DrawerContent
        borderLeftRadius="20px"
        overflow="hidden"
        fontFamily="'Sora',sans-serif"
      >
        <DrawerCloseButton top={4} right={4} zIndex={10} color="white" />
        <DrawerHeader
          px={7}
          pt={7}
          pb={5}
          bg="linear-gradient(135deg,#1e3a5f,#4a72b8)"
          color="white"
        >
          <Flex align="center" gap={3}>
            <Flex
              w="42px"
              h="42px"
              bg="rgba(255,255,255,.15)"
              borderRadius="12px"
              align="center"
              justify="center"
            >
              <Icon as={FaChalkboardTeacher} fontSize="18px" />
            </Flex>
            <Box>
              <Text fontSize="18px" fontWeight={800} lineHeight="1.2">
                Register Coaching
              </Text>
              <Text fontSize="12px" color="rgba(255,255,255,.65)" mt="2px">
                Add your institute to the directory
              </Text>
            </Box>
          </Flex>
        </DrawerHeader>

        <DrawerBody px={7} py={6} overflowY="auto">
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errs.name}>
              <FormLabel
                fontSize="12px"
                fontWeight={700}
                color="#374151"
                mb={1}
                textTransform="uppercase"
                letterSpacing=".8px"
              >
                Coaching Name
              </FormLabel>
              <Input
                value={form.name}
                onChange={sf("name")}
                placeholder="e.g. Vision IAS, Mahendra's…"
                borderRadius="10px"
                h="44px"
                fontSize="14px"
                borderColor={errs.name ? "red.400" : "#e2e8f0"}
                _focus={{
                  borderColor: "#4a72b8",
                  boxShadow: "0 0 0 1px #4a72b8",
                }}
              />
              <FormErrorMessage>{errs.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errs.examTypes}>
              <FormLabel
                fontSize="12px"
                fontWeight={700}
                color="#374151"
                mb={1}
                textTransform="uppercase"
                letterSpacing=".8px"
              >
                Exam Types
              </FormLabel>
              <Box
                border="1px solid"
                borderColor={errs.examTypes ? "red.400" : "#e2e8f0"}
                borderRadius="10px"
                p={4}
                bg="#f8fafc"
              >
                <CheckboxGroup
                  value={form.examTypes}
                  onChange={(vals) => {
                    setForm((p) => ({ ...p, examTypes: vals }));
                    setErrs((p) => ({ ...p, examTypes: "" }));
                  }}
                >
                  <Flex flexWrap="wrap" gap={2}>
                    {EXAM_TYPES.map((ex) => {
                      const c = EXAM_COLORS[ex] || EXAM_COLORS.OTHER;
                      return (
                        <Checkbox key={ex} value={ex} colorScheme="blue">
                          <Box
                            bg={c.bg}
                            color={c.color}
                            px={3}
                            py="4px"
                            borderRadius="full"
                            fontSize="11px"
                            fontWeight={700}
                          >
                            {ex}
                          </Box>
                        </Checkbox>
                      );
                    })}
                  </Flex>
                </CheckboxGroup>
              </Box>
              <FormErrorMessage>{errs.examTypes}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel
                fontSize="12px"
                fontWeight={700}
                color="#374151"
                mb={1}
                textTransform="uppercase"
                letterSpacing=".8px"
              >
                About{" "}
                <Text
                  as="span"
                  color="#94a3b8"
                  textTransform="none"
                  letterSpacing="0"
                  fontWeight={400}
                >
                  (optional)
                </Text>
              </FormLabel>
              <Textarea
                value={form.description}
                onChange={sf("description")}
                placeholder="Teaching methodology, batch details…"
                borderRadius="10px"
                fontSize="14px"
                rows={3}
                resize="vertical"
                borderColor="#e2e8f0"
                _focus={{
                  borderColor: "#4a72b8",
                  boxShadow: "0 0 0 1px #4a72b8",
                }}
              />
            </FormControl>

            <Divider />

            <Flex gap={3} direction={{ base: "column", sm: "row" }}>
              <FormControl flex={1}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  City
                </FormLabel>
                <Input
                  value={form.city}
                  onChange={sf("city")}
                  placeholder="Delhi, Mumbai…"
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                  _focus={{
                    borderColor: "#4a72b8",
                    boxShadow: "0 0 0 1px #4a72b8",
                  }}
                />
              </FormControl>
              <FormControl flex={1} isInvalid={!!errs.email}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Email
                </FormLabel>
                <Input
                  type="email"
                  value={form.email}
                  onChange={sf("email")}
                  placeholder="contact@coaching.com"
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor={errs.email ? "red.400" : "#e2e8f0"}
                  _focus={{
                    borderColor: "#4a72b8",
                    boxShadow: "0 0 0 1px #4a72b8",
                  }}
                />
                <FormErrorMessage>{errs.email}</FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex gap={3} direction={{ base: "column", sm: "row" }}>
              <FormControl flex={1}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Phone
                </FormLabel>
                <Input
                  value={form.phone}
                  onChange={sf("phone")}
                  placeholder="+91 98765 43210"
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#e2e8f0"
                  _focus={{
                    borderColor: "#4a72b8",
                    boxShadow: "0 0 0 1px #4a72b8",
                  }}
                />
              </FormControl>
              <FormControl flex={1} isInvalid={!!errs.website}>
                <FormLabel
                  fontSize="12px"
                  fontWeight={700}
                  color="#374151"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing=".8px"
                >
                  Website
                </FormLabel>
                <Input
                  value={form.website}
                  onChange={sf("website")}
                  placeholder="https://coaching.com"
                  borderRadius="10px"
                  h="44px"
                  fontSize="14px"
                  borderColor={errs.website ? "red.400" : "#e2e8f0"}
                  _focus={{
                    borderColor: "#4a72b8",
                    boxShadow: "0 0 0 1px #4a72b8",
                  }}
                />
                <FormErrorMessage>{errs.website}</FormErrorMessage>
              </FormControl>
            </Flex>

            <Button
              h="50px"
              borderRadius="12px"
              mt={2}
              bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
              color="white"
              fontWeight={800}
              fontSize="14px"
              isLoading={busy}
              loadingText="Registering…"
              onClick={handleSubmit}
              leftIcon={<FaChalkboardTeacher />}
              _hover={{
                opacity: 0.9,
                transform: "translateY(-1px)",
                boxShadow: "0 8px 24px rgba(74,114,184,.35)",
              }}
              transition="all .2s"
            >
              Register Coaching
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// ═══════════════════════════════════════════════
// COACHING DETAIL
// ═══════════════════════════════════════════════
function CoachingDetail({ coaching, onDeleted }) {
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef();
  const {
    isOpen: testOpen,
    onOpen: openTest,
    onClose: closeTest,
  } = useDisclosure();
  const {
    isOpen: delOpen,
    onOpen: openDel,
    onClose: closeDel,
  } = useDisclosure();

  const [tests, setTests] = useState([]);
  const [loadingT, setLoadingT] = useState(true);
  // FIX: default activeTab is null = "All" tab
  const [activeTab, setActiveTab] = useState(null);
  const [copied, setCopied] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const user = getCurrentUser();
  const isOwner = Boolean(
    user &&
    coaching &&
    (String(user._id) === String(coaching.owner) ||
      String(user._id) === String(coaching.owner?._id)),
  );

  const shareUrl = `${window.location.origin}/coaching/${coaching.slug}`;

  const loadTests = useCallback(() => {
    setLoadingT(true);
    apiFetch(`/tests?coachingId=${coaching._id}`)
      .then((r) => {
        const ts = r.data ?? [];
        setTests(ts);
        // FIX: always start on "All" tab
        setActiveTab(null);
      })
      .catch(() => {})
      .finally(() => setLoadingT(false));
  }, [coaching._id]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleRemoveCoaching = async () => {
    try {
      await apiFetch(`/coaching/${coaching._id}`, { method: "DELETE" });
      toast({ title: "Coaching removed", status: "success", duration: 3000 });
      closeDel();
      onDeleted?.();
    } catch (err) {
      toast({ title: err.message, status: "error", duration: 4000 });
    }
  };

  const handleDeleteTest = async (testId) => {
    setDeletingId(testId);
    try {
      await apiFetch(`/tests/${testId}`, { method: "DELETE" });
      setTests((prev) => prev.filter((t) => t._id !== testId));
      toast({ title: "Test deleted", status: "success", duration: 2500 });
    } catch (err) {
      toast({ title: err.message, status: "error", duration: 4000 });
    } finally {
      setDeletingId(null);
    }
  };

  const onTestCreated = (test) => {
    closeTest();
    loadTests();
    toast({
      title: `"${test.title}" created!`,
      status: "success",
      duration: 3000,
    });
  };

  // FIX: Use coaching.examTypes as the source of truth for tabs
  // This means all exam types registered with the coaching appear immediately,
  // even before any tests are created under them.
  const coachingExamTypes = coaching.examTypes || [];

  // Collect any extra exam types used in tests but not in coaching.examTypes
  const extraExamTypes = [
    ...new Set(
      tests
        .map((t) => t.examType)
        .filter((et) => et && !coachingExamTypes.includes(et)),
    ),
  ];

  // Final tabs = coaching exam types + any extras from tests
  const tabs = [...coachingExamTypes, ...extraExamTypes];

  // Filter tests for active tab; null = all tests
  const activeTests = activeTab
    ? tests.filter((t) => t.examType === activeTab)
    : tests;

  // Total students across all tests
  const totalStu = tests.reduce((a, t) => a + (t.totalAttempts || 0), 0);

  return (
    <Box minH="100vh" bg="#f8fafc" fontFamily="'Sora',sans-serif">
      {/* Hero */}
      <Box
        bg="linear-gradient(135deg,#0f1e3a 0%,#1e3a5f 45%,#2d5fa8 100%)"
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
          w="350px"
          h="350px"
          borderRadius="full"
          bg="rgba(255,255,255,.035)"
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
            transition="color .15s"
            onClick={() => navigate("/coaching")}
          >
            <Icon as={FaArrowLeft} fontSize="12px" />
            <Text fontSize="13px" fontWeight={600}>
              All Coaching Centres
            </Text>
          </Flex>

          <Flex
            align="flex-start"
            gap={{ base: 4, md: 6 }}
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Flex
              w={{ base: "60px", md: "80px" }}
              h={{ base: "60px", md: "80px" }}
              flexShrink={0}
              bg="rgba(255,255,255,.12)"
              border="2px solid rgba(255,255,255,.18)"
              borderRadius="20px"
              align="center"
              justify="center"
              fontSize={{ base: "26px", md: "36px" }}
              fontWeight={900}
              color="white"
            >
              {coaching.name[0].toUpperCase()}
            </Flex>

            <Box flex={1} minW={0}>
              <Flex align="center" gap={3} flexWrap="wrap" mb={3}>
                <Text
                  fontSize={{ base: "26px", md: "42px" }}
                  fontWeight={800}
                  color="white"
                  letterSpacing="-1.5px"
                  lineHeight="1.1"
                >
                  {coaching.name}
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
                      Your Coaching
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Flex
                align="center"
                flexWrap="wrap"
                gap={{ base: 3, md: 5 }}
                mb={5}
              >
                {coaching.city && (
                  <Flex align="center" gap={1.5}>
                    <Icon
                      as={FaMapMarkerAlt}
                      color="rgba(255,255,255,.5)"
                      fontSize="12px"
                    />
                    <Text color="rgba(255,255,255,.7)" fontSize="14px">
                      {coaching.city}
                    </Text>
                  </Flex>
                )}
                {coaching.email && (
                  <Flex align="center" gap={1.5}>
                    <Icon
                      as={FaEnvelope}
                      color="rgba(255,255,255,.5)"
                      fontSize="12px"
                    />
                    <Text color="rgba(255,255,255,.7)" fontSize="14px">
                      {coaching.email}
                    </Text>
                  </Flex>
                )}
                {coaching.phone && (
                  <Flex align="center" gap={1.5}>
                    <Icon
                      as={FaPhone}
                      color="rgba(255,255,255,.5)"
                      fontSize="12px"
                    />
                    <Text color="rgba(255,255,255,.7)" fontSize="14px">
                      {coaching.phone}
                    </Text>
                  </Flex>
                )}
                {coaching.website && (
                  <Flex
                    as="a"
                    href={coaching.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    align="center"
                    gap={1.5}
                    cursor="pointer"
                    _hover={{ color: "white" }}
                  >
                    <Icon
                      as={FaGlobe}
                      color="rgba(255,255,255,.5)"
                      fontSize="12px"
                    />
                    <Text
                      color="rgba(255,255,255,.65)"
                      fontSize="14px"
                      textDecoration="underline"
                      textDecorationColor="rgba(255,255,255,.3)"
                    >
                      {coaching.website.replace(/^https?:\/\//, "")}
                    </Text>
                    <Icon
                      as={FaExternalLinkAlt}
                      fontSize="10px"
                      color="rgba(255,255,255,.4)"
                    />
                  </Flex>
                )}
              </Flex>

              {/* Show exam types from coaching (not derived from tests) */}
              <Flex flexWrap="wrap" gap={2}>
                {coachingExamTypes.map((ex) => (
                  <Box
                    key={ex}
                    bg="rgba(255,255,255,.12)"
                    border="1px solid rgba(255,255,255,.2)"
                    color="white"
                    px={3}
                    py="4px"
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight={700}
                  >
                    {ex}
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>

          {/* Owner controls */}
          {isOwner && (
            <Box
              mt={10}
              bg="rgba(255,255,255,.08)"
              border="1px solid rgba(255,255,255,.14)"
              borderRadius="20px"
              p={{ base: 5, md: 7 }}
            >
              <Text
                fontSize="11px"
                fontWeight={800}
                color="rgba(255,255,255,.4)"
                textTransform="uppercase"
                letterSpacing="2.5px"
                mb={6}
              >
                Owner Controls
              </Text>
              <Box mb={7}>
                <Text
                  fontSize="13px"
                  color="rgba(255,255,255,.6)"
                  fontWeight={600}
                  mb={3}
                >
                  📎 Share this link so students can join your coaching:
                </Text>
                <Flex
                  align="center"
                  gap={3}
                  flexWrap={{ base: "wrap", sm: "nowrap" }}
                >
                  <Box
                    flex={1}
                    bg="rgba(0,0,0,.35)"
                    borderRadius="12px"
                    px={4}
                    py="12px"
                    fontFamily="monospace"
                    fontSize="13px"
                    color="rgba(255,255,255,.85)"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {shareUrl}
                  </Box>
                  <Button
                    flexShrink={0}
                    h="46px"
                    px={6}
                    borderRadius="12px"
                    bg={copied ? "#22c55e" : "white"}
                    color={copied ? "white" : "#1e3a5f"}
                    fontWeight={800}
                    fontSize="13px"
                    leftIcon={
                      <Icon as={copied ? FaCheck : FaLink} fontSize="12px" />
                    }
                    onClick={handleCopy}
                    _hover={{ bg: copied ? "#16a34a" : "#f0f7ff" }}
                    boxShadow="0 2px 12px rgba(0,0,0,.25)"
                    transition="all .2s"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </Flex>
              </Box>

              <Flex gap={3} flexWrap="wrap">
                <Button
                  leftIcon={<FaPlus />}
                  onClick={openTest}
                  bg="white"
                  color="#0f1e3a"
                  borderRadius="12px"
                  fontWeight={800}
                  fontSize="13px"
                  h="46px"
                  px={6}
                  _hover={{ bg: "#f0f7ff", transform: "translateY(-2px)" }}
                  boxShadow="0 4px 16px rgba(0,0,0,.2)"
                  transition="all .2s"
                >
                  Create Test
                </Button>
                <Button
                  leftIcon={<FaTrash />}
                  onClick={openDel}
                  bg="transparent"
                  color="#fca5a5"
                  borderRadius="12px"
                  fontWeight={700}
                  fontSize="13px"
                  h="46px"
                  px={6}
                  border="1.5px solid rgba(239,68,68,.3)"
                  _hover={{
                    bg: "rgba(239,68,68,.2)",
                    color: "white",
                    borderColor: "rgba(239,68,68,.6)",
                  }}
                  transition="all .2s"
                >
                  Remove My Coaching
                </Button>
              </Flex>
            </Box>
          )}

          {/* Stats — FIX: Courses count uses coaching.examTypes.length */}
          <Flex
            mt={10}
            gap={8}
            borderTop="1px solid rgba(255,255,255,.1)"
            pt={8}
            flexWrap="wrap"
          >
            {[
              {
                icon: FaClipboardList,
                value: tests.length,
                label: "Total Tests",
              },
              { icon: FaUsers, value: totalStu, label: "Total Students" },
              {
                icon: FaBookOpen,
                value: coachingExamTypes.length || 0,
                label: "Courses",
              },
            ].map((s) => (
              <Flex key={s.label} align="center" gap={3}>
                <Icon
                  as={s.icon}
                  fontSize="16px"
                  color="rgba(255,255,255,.4)"
                />
                <Box>
                  <Text
                    fontSize="28px"
                    fontWeight={800}
                    color="white"
                    lineHeight="1"
                    letterSpacing="-1px"
                  >
                    {s.value}
                  </Text>
                  <Text
                    fontSize="11px"
                    color="rgba(255,255,255,.5)"
                    textTransform="uppercase"
                    letterSpacing=".8px"
                    mt="2px"
                  >
                    {s.label}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Body */}
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        {coaching.description && (
          <Box mb={10} pb={10} borderBottom="1px solid #e2e8f0">
            <Text
              fontSize="11px"
              fontWeight={800}
              color="#94a3b8"
              textTransform="uppercase"
              letterSpacing="2px"
              mb={4}
            >
              About
            </Text>
            <Text fontSize="16px" color="#475569" lineHeight={1.9} maxW="780px">
              {coaching.description}
            </Text>
          </Box>
        )}

        <Box>
          <Flex justify="space-between" align="center" mb={5}>
            <Text
              fontSize="11px"
              fontWeight={800}
              color="#94a3b8"
              textTransform="uppercase"
              letterSpacing="2px"
            >
              Courses &amp; Tests
            </Text>
            {isOwner && (
              <Button
                size="sm"
                leftIcon={<FaPlus />}
                onClick={openTest}
                bg="#4a72b8"
                color="white"
                borderRadius="9px"
                fontWeight={700}
                fontSize="12px"
                _hover={{ bg: "#3b5fa0" }}
              >
                Create Test
              </Button>
            )}
          </Flex>

          {/* FIX: Tabs from coaching.examTypes — visible even with 0 tests */}
          {tabs.length > 0 && (
            <Flex gap={2} mb={6} flexWrap="wrap">
              {/* "All" tab */}
              <Box
                px={4}
                py="8px"
                borderRadius="10px"
                cursor="pointer"
                border="1.5px solid"
                borderColor={!activeTab ? "#4a72b8" : "#e2e8f0"}
                bg={!activeTab ? "#eff6ff" : "white"}
                color={!activeTab ? "#2563eb" : "#374151"}
                fontSize="13px"
                fontWeight={!activeTab ? 700 : 500}
                onClick={() => setActiveTab(null)}
                transition="all .15s"
              >
                All
                <Text as="span" ml={2} fontSize="11px" opacity={0.7}>
                  ({tests.length})
                </Text>
              </Box>

              {tabs.map((tab) => {
                const isA = activeTab === tab;
                const cl = EXAM_COLORS[tab] || EXAM_COLORS.OTHER;
                const tabCount = tests.filter((t) => t.examType === tab).length;
                return (
                  <Box
                    key={tab}
                    px={4}
                    py="8px"
                    borderRadius="10px"
                    cursor="pointer"
                    border="1.5px solid"
                    borderColor={isA ? cl.color : "#e2e8f0"}
                    bg={isA ? cl.bg : "white"}
                    color={isA ? cl.color : "#374151"}
                    fontSize="13px"
                    fontWeight={isA ? 700 : 500}
                    transition="all .15s"
                    _hover={{
                      borderColor: cl.color,
                      bg: cl.bg,
                      color: cl.color,
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                    <Text as="span" ml={2} fontSize="11px" opacity={0.7}>
                      ({tabCount})
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          )}

          {/* Tests table */}
          {loadingT ? (
            <Flex justify="center" py={16}>
              <Spinner color="#4a72b8" thickness="3px" />
            </Flex>
          ) : activeTests.length === 0 ? (
            <Box
              py={16}
              textAlign="center"
              bg="white"
              borderRadius="14px"
              border="1px solid #e2e8f0"
            >
              <Icon
                as={FaClipboardList}
                fontSize="40px"
                color="#e2e8f0"
                display="block"
                mx="auto"
                mb={3}
              />
              <Text
                fontSize="15px"
                fontWeight={700}
                color="#94a3b8"
                mb={isOwner ? 5 : 0}
              >
                {isOwner
                  ? activeTab
                    ? `No tests yet for ${activeTab} — create one!`
                    : "No tests yet — create your first test for students!"
                  : activeTab
                    ? `No ${activeTab} tests yet`
                    : "No tests yet for this coaching"}
              </Text>
              {isOwner && (
                <Button
                  leftIcon={<FaPlus />}
                  onClick={openTest}
                  bg="#4a72b8"
                  color="white"
                  borderRadius="10px"
                  fontWeight={700}
                  _hover={{ bg: "#3b5fa0", transform: "translateY(-1px)" }}
                  transition="all .2s"
                >
                  Create Test
                </Button>
              )}
            </Box>
          ) : (
            <Box
              bg="white"
              borderRadius="16px"
              border="1px solid #e2e8f0"
              overflow="hidden"
            >
              <Flex px={6} py={3} bg="#f8fafc" borderBottom="1px solid #e2e8f0">
                {["Test Name", "Questions", "Time", "Attempts", "Access"].map(
                  (h, i) => (
                    <Text
                      key={h}
                      flex={i === 0 ? 3 : 1}
                      fontSize="11px"
                      fontWeight={700}
                      color="#94a3b8"
                      textTransform="uppercase"
                      letterSpacing=".8px"
                      display={{ base: i > 2 ? "none" : "block", md: "block" }}
                    >
                      {h}
                    </Text>
                  ),
                )}
                <Box w={isOwner ? "110px" : "80px"} />
              </Flex>

              {activeTests.map((t, idx) => (
                <Flex
                  key={t._id}
                  px={6}
                  py={4}
                  align="center"
                  borderBottom={
                    idx < activeTests.length - 1 ? "1px solid #f1f5f9" : "none"
                  }
                  transition="background .15s"
                  _hover={{ bg: "#f8faff" }}
                >
                  <Box
                    flex={3}
                    minW={0}
                    cursor="pointer"
                    onClick={() => navigate(`/tests/${t._id}`)}
                  >
                    <Text
                      fontSize="14px"
                      fontWeight={700}
                      color="#0f172a"
                      noOfLines={1}
                    >
                      {t.title}
                    </Text>
                    {t.subject && (
                      <Text
                        fontSize="11px"
                        color="#94a3b8"
                        mt="1px"
                        textTransform="capitalize"
                      >
                        {t.subject}
                      </Text>
                    )}
                    {t.examType && (
                      <Badge
                        fontSize="9px"
                        mt={1}
                        bg={(EXAM_COLORS[t.examType] || EXAM_COLORS.OTHER).bg}
                        color={
                          (EXAM_COLORS[t.examType] || EXAM_COLORS.OTHER).color
                        }
                        borderRadius="full"
                        px={2}
                      >
                        {t.examType}
                      </Badge>
                    )}
                  </Box>

                  <Text
                    flex={1}
                    fontSize="14px"
                    fontWeight={600}
                    color="#374151"
                    display={{ base: "none", sm: "block" }}
                  >
                    {t.totalMarks ?? t.questions?.length ?? "—"}
                  </Text>

                  <Flex
                    flex={1}
                    align="center"
                    gap={1}
                    display={{ base: "none", md: "flex" }}
                  >
                    <Icon as={FaClock} fontSize="11px" color="#94a3b8" />
                    <Text fontSize="13px" color="#64748b">
                      {t.timeLimitMin || t.timeLimit || 30}m
                    </Text>
                  </Flex>

                  <Text
                    flex={1}
                    fontSize="14px"
                    fontWeight={600}
                    color="#374151"
                    display={{ base: "none", sm: "block" }}
                  >
                    {t.totalAttempts ?? 0}
                  </Text>

                  <Box flex={1}>
                    <Flex
                      align="center"
                      gap={1}
                      w="fit-content"
                      px={2}
                      py="3px"
                      borderRadius="6px"
                      bg={
                        (t.visibility || t.accessType) === "private"
                          ? "#fef2f2"
                          : "#f0fdf4"
                      }
                      color={
                        (t.visibility || t.accessType) === "private"
                          ? "#ef4444"
                          : "#16a34a"
                      }
                    >
                      <Icon
                        as={
                          (t.visibility || t.accessType) === "private"
                            ? FaLock
                            : FaUnlock
                        }
                        fontSize="9px"
                      />
                      <Text fontSize="10px" fontWeight={700}>
                        {(t.visibility || t.accessType) === "private"
                          ? "Private"
                          : "Public"}
                      </Text>
                    </Flex>
                  </Box>

                  <Flex
                    w={isOwner ? "110px" : "80px"}
                    justify="flex-end"
                    gap={2}
                  >
                    <Box
                      px={3}
                      py="5px"
                      borderRadius="8px"
                      bg="#f0f7ff"
                      color="#4a72b8"
                      fontSize="12px"
                      fontWeight={700}
                      cursor="pointer"
                      onClick={() => navigate(`/tests/${t._id}`)}
                    >
                      View →
                    </Box>
                    {isOwner && (
                      <Box
                        px="8px"
                        py="5px"
                        borderRadius="8px"
                        bg="#fef2f2"
                        color="#ef4444"
                        fontSize="12px"
                        cursor="pointer"
                        _hover={{ bg: "#fee2e2" }}
                        opacity={deletingId === t._id ? 0.5 : 1}
                        onClick={() =>
                          deletingId !== t._id && handleDeleteTest(t._id)
                        }
                      >
                        {deletingId === t._id ? (
                          "…"
                        ) : (
                          <Icon as={FaTrash} fontSize="11px" />
                        )}
                      </Box>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Pass coachingExamTypes so exam dropdown pre-fills in the drawer */}
      <CreateTestDrawer
        isOpen={testOpen}
        onClose={closeTest}
        coachingId={coaching._id}
        coachingExamTypes={coachingExamTypes}
        onCreated={onTestCreated}
      />

      <AlertDialog
        isOpen={delOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDel}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            mx={4}
            borderRadius="16px"
            fontFamily="'Sora',sans-serif"
          >
            <AlertDialogHeader fontSize="16px" fontWeight={800}>
              Remove Coaching?
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text fontSize="14px" color="#475569">
                This will remove{" "}
                <Text as="span" fontWeight={700} color="#0f172a">
                  "{coaching.name}"
                </Text>{" "}
                from the directory.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                onClick={closeDel}
                variant="ghost"
                borderRadius="10px"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveCoaching}
                bg="#ef4444"
                color="white"
                borderRadius="10px"
                fontWeight={700}
                _hover={{ bg: "#dc2626" }}
                leftIcon={<FaTrash />}
              >
                Yes, Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

// ═══════════════════════════════════════════════
// COACHING LIST
// ═══════════════════════════════════════════════
function CoachingList({ onCoachingCreated }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [examF, setExamF] = useState("");

  const load = useCallback(() => {
    apiFetch("/coaching")
      .then((r) => {
        const d = r.data ?? [];
        setAll(d);
        setFiltered(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    let list = [...all];
    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.city?.toLowerCase().includes(q),
      );
    if (examF) list = list.filter((c) => c.examTypes?.includes(examF));
    setFiltered(list);
  }, [query, examF, all]);

  const handleCreated = (coaching) => {
    onClose();
    onCoachingCreated(coaching);
  };

  return (
    <Box minH="100vh" bg="#f8fafc" fontFamily="'Sora',sans-serif">
      <Box
        bg="linear-gradient(135deg,#1e3a5f 0%,#2d5fa8 55%,#4a72b8 100%)"
        px={{ base: 4, md: 8 }}
        pt={{ base: 10, md: 14 }}
        pb={{ base: 10, md: 16 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-60px"
          top="-60px"
          w="280px"
          h="280px"
          borderRadius="full"
          bg="rgba(255,255,255,.04)"
        />
        <Box maxW="1100px" mx="auto" position="relative" zIndex={1}>
          <Flex
            justify="space-between"
            align="flex-start"
            gap={4}
            flexWrap="wrap"
            mb={8}
          >
            <Box>
              <Text
                fontSize="11px"
                fontWeight={800}
                color="rgba(255,255,255,.5)"
                textTransform="uppercase"
                letterSpacing="3px"
                mb={2}
              >
                Directory
              </Text>
              <Text
                fontSize={{ base: "28px", md: "40px" }}
                fontWeight={800}
                color="white"
                letterSpacing="-1px"
                lineHeight="1.1"
              >
                Coaching Centres
              </Text>
              <Text fontSize="14px" color="rgba(255,255,255,.6)" mt={2}>
                {all.length} institutes registered
              </Text>
            </Box>
            <Button
              leftIcon={<FaPlus />}
              onClick={onOpen}
              bg="white"
              color="#1e3a5f"
              borderRadius="11px"
              fontWeight={800}
              px={5}
              h="44px"
              _hover={{ bg: "#f0f7ff", transform: "translateY(-1px)" }}
              boxShadow="0 4px 16px rgba(0,0,0,.12)"
              transition="all .2s"
              flexShrink={0}
            >
              Add Coaching
            </Button>
          </Flex>

          <Flex
            gap={3}
            bg="white"
            p={3}
            borderRadius="14px"
            boxShadow="0 8px 32px rgba(0,0,0,.14)"
            direction={{ base: "column", sm: "row" }}
          >
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none" h="full" pl={2}>
                <Icon as={FaSearch} color="gray.400" fontSize="13px" />
              </InputLeftElement>
              <Input
                placeholder="Search by name or city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                bg="#f8fafc"
                borderRadius="9px"
                h="42px"
                border="1px solid #e2e8f0"
                fontSize="14px"
                pl="38px"
                _focus={{
                  borderColor: "#4a72b8",
                  boxShadow: "0 0 0 1px #4a72b8",
                  bg: "white",
                }}
              />
            </InputGroup>
            <Select
              value={examF}
              onChange={(e) => setExamF(e.target.value)}
              bg="#f8fafc"
              borderRadius="9px"
              h="42px"
              minW={{ base: "full", sm: "150px" }}
              maxW={{ base: "full", sm: "150px" }}
              border="1px solid #e2e8f0"
              fontSize="13px"
              fontWeight={600}
              _focus={{
                borderColor: "#4a72b8",
                boxShadow: "0 0 0 1px #4a72b8",
              }}
            >
              <option value="">All Exams</option>
              {EXAM_TYPES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
          </Flex>
        </Box>
      </Box>

      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Text fontSize="12px" color="#94a3b8" fontWeight={600} mb={5}>
          {loading
            ? "Loading…"
            : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
        </Text>

        {loading && (
          <Flex justify="center" py={20}>
            <Spinner size="xl" color="#4a72b8" thickness="4px" />
          </Flex>
        )}

        {!loading && filtered.length === 0 && (
          <Box py={20} textAlign="center">
            <Icon
              as={FaChalkboardTeacher}
              fontSize="52px"
              color="#e2e8f0"
              display="block"
              mx="auto"
              mb={4}
            />
            <Text fontSize="16px" fontWeight={700} color="#475569" mb={2}>
              No coaching centres found
            </Text>
            <Text fontSize="14px" color="#94a3b8" mb={6}>
              {query || examF
                ? "Try different search terms"
                : "Be the first to register!"}
            </Text>
            <Button
              onClick={onOpen}
              leftIcon={<FaPlus />}
              bg="#4a72b8"
              color="white"
              borderRadius="10px"
              fontWeight={700}
              _hover={{ bg: "#3b5fa0" }}
            >
              Add Coaching
            </Button>
          </Box>
        )}

        {!loading && filtered.length > 0 && (
          <Box
            bg="white"
            borderRadius="16px"
            border="1px solid #e2e8f0"
            overflow="hidden"
          >
            <Flex px={6} py={3} bg="#f8fafc" borderBottom="1px solid #e2e8f0">
              {[
                ["Institute", 3],
                ["Exams", 2],
                ["Location", 1],
              ].map(([h, f]) => (
                <Text
                  key={h}
                  flex={f}
                  fontSize="11px"
                  fontWeight={700}
                  color="#94a3b8"
                  textTransform="uppercase"
                  letterSpacing=".8px"
                  display={{
                    base: f === 1 || f === 2 ? "none" : "block",
                    md: "block",
                  }}
                >
                  {h}
                </Text>
              ))}
              <Box w="80px" />
            </Flex>
            {filtered.map((c, idx) => (
              <Flex
                key={c._id}
                px={6}
                py={4}
                align="center"
                gap={4}
                borderBottom={
                  idx < filtered.length - 1 ? "1px solid #f1f5f9" : "none"
                }
                cursor="pointer"
                transition="background .15s"
                _hover={{ bg: "#f8faff" }}
                onClick={() => navigate(`/coaching/${c.slug}`)}
              >
                <Flex
                  w="40px"
                  h="40px"
                  flexShrink={0}
                  bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
                  borderRadius="11px"
                  align="center"
                  justify="center"
                  fontSize="16px"
                  fontWeight={800}
                  color="white"
                >
                  {c.name?.[0]?.toUpperCase()}
                </Flex>
                <Box flex={3} minW={0}>
                  <Text
                    fontSize="14px"
                    fontWeight={700}
                    color="#0f172a"
                    noOfLines={1}
                  >
                    {c.name}
                  </Text>
                  {c.description && (
                    <Text
                      fontSize="12px"
                      color="#94a3b8"
                      noOfLines={1}
                      mt="1px"
                    >
                      {c.description}
                    </Text>
                  )}
                </Box>
                <Flex
                  flex={2}
                  flexWrap="wrap"
                  gap={1}
                  display={{ base: "none", md: "flex" }}
                >
                  {c.examTypes?.slice(0, 3).map((ex) => {
                    const cl = EXAM_COLORS[ex] || EXAM_COLORS.OTHER;
                    return (
                      <Box
                        key={ex}
                        bg={cl.bg}
                        color={cl.color}
                        px={2}
                        py="2px"
                        borderRadius="full"
                        fontSize="10px"
                        fontWeight={700}
                      >
                        {ex}
                      </Box>
                    );
                  })}
                  {(c.examTypes?.length || 0) > 3 && (
                    <Box
                      bg="#f1f5f9"
                      color="#64748b"
                      px={2}
                      py="2px"
                      borderRadius="full"
                      fontSize="10px"
                      fontWeight={700}
                    >
                      +{c.examTypes.length - 3}
                    </Box>
                  )}
                </Flex>
                <Flex
                  flex={1}
                  align="center"
                  gap={1}
                  display={{ base: "none", sm: "flex" }}
                >
                  {c.city && (
                    <>
                      <Icon
                        as={FaMapMarkerAlt}
                        fontSize="11px"
                        color="#94a3b8"
                        flexShrink={0}
                      />
                      <Text fontSize="12px" color="#64748b" noOfLines={1}>
                        {c.city}
                      </Text>
                    </>
                  )}
                </Flex>
                <Flex w="80px" justify="flex-end">
                  <Box
                    px={3}
                    py="5px"
                    borderRadius="8px"
                    bg="#f0f7ff"
                    color="#4a72b8"
                    fontSize="12px"
                    fontWeight={700}
                  >
                    View →
                  </Box>
                </Flex>
              </Flex>
            ))}
          </Box>
        )}
      </Box>

      <AddCoachingDrawer
        isOpen={isOpen}
        onClose={onClose}
        onCreated={handleCreated}
      />
    </Box>
  );
}

// ═══════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════
export default function CoachingPage() {
  const { slug } = useParams();
  const [myCoaching, setMyCoaching] = useState("loading");
  const [slugCoaching, setSlugCoaching] = useState(null);
  const [slugLoading, setSlugLoading] = useState(false);
  const [slugError, setSlugError] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!slug) return;
    setSlugLoading(true);
    setSlugError(false);
    apiFetch(`/coaching/${slug}`)
      .then((r) => setSlugCoaching(r.data))
      .catch(() => setSlugError(true))
      .finally(() => setSlugLoading(false));
  }, [slug]);

  useEffect(() => {
    if (slug) return;
    if (!user?._id) {
      setMyCoaching(null);
      return;
    }
    apiFetch("/coaching")
      .then((r) => {
        const mine = (r.data ?? []).find(
          (c) =>
            String(c.owner) === String(user._id) ||
            String(c.owner?._id) === String(user._id),
        );
        setMyCoaching(mine || null);
      })
      .catch(() => setMyCoaching(null));
  }, [slug, user?._id]);

  if (slug) {
    if (slugLoading)
      return (
        <Flex minH="80vh" align="center" justify="center">
          <Spinner size="xl" color="#4a72b8" thickness="4px" />
        </Flex>
      );
    if (slugError || !slugCoaching)
      return (
        <Box
          maxW="500px"
          mx="auto"
          mt={20}
          textAlign="center"
          px={4}
          fontFamily="'Sora',sans-serif"
        >
          <Icon
            as={FaChalkboardTeacher}
            fontSize="52px"
            color="#e2e8f0"
            display="block"
            mx="auto"
            mb={4}
          />
          <Text fontSize="18px" fontWeight={700} color="#374151" mb={6}>
            Coaching not found
          </Text>
          <Button
            onClick={() => navigate("/coaching")}
            leftIcon={<FaArrowLeft />}
            variant="outline"
          >
            Back to Coaching
          </Button>
        </Box>
      );
    return <CoachingDetail coaching={slugCoaching} />;
  }

  if (myCoaching === "loading")
    return (
      <Flex minH="80vh" align="center" justify="center">
        <Spinner size="xl" color="#4a72b8" thickness="4px" />
      </Flex>
    );

  if (myCoaching)
    return (
      <CoachingDetail
        coaching={myCoaching}
        onDeleted={() => setMyCoaching(null)}
      />
    );

  return (
    <CoachingList onCoachingCreated={(coaching) => setMyCoaching(coaching)} />
  );
}
