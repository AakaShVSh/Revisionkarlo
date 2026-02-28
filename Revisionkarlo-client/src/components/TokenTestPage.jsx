import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Spinner,
  Button,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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

export default function TokenTestPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid link");
      setLoading(false);
      return;
    }

    apiFetch(`/tests/token/${token}`)
      .then((r) => {
        const test = r.data;
        if (!test) {
          setError("Test not found or link expired");
          setLoading(false);
          return;
        }
        // Redirect to the full test detail page using the test's _id
        // The TestDetailPage will handle auth check + info page + start
        navigate(`/tests/${test._id}`, { replace: true });
      })
      .catch((e) => {
        setError(e.message || "Test not found or link expired");
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading)
    return (
      <Flex
        minH="80vh"
        align="center"
        justify="center"
        direction="column"
        gap={4}
        fontFamily="'Sora',sans-serif"
      >
        <Spinner size="xl" color="#4a72b8" thickness="4px" />
        <Text color="#64748b" fontSize="14px">
          Loading test...
        </Text>
      </Flex>
    );

  return (
    <Box textAlign="center" py={20} fontFamily="'Sora',sans-serif">
      <Text fontSize="48px" mb={4}>
        🔗
      </Text>
      <Text fontSize="18px" fontWeight={700} color="#374151" mb={2}>
        {error}
      </Text>
      <Text fontSize="14px" color="#94a3b8" mb={6}>
        This test link may have expired or been removed.
      </Text>
      <Button
        leftIcon={<FaArrowLeft />}
        onClick={() => navigate("/")}
        bg="#4a72b8"
        color="white"
        borderRadius="10px"
        fontWeight={700}
        _hover={{ bg: "#3b5fa0" }}
      >
        Go Home
      </Button>
    </Box>
  );
}
