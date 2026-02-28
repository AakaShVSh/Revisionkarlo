import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInApi } from "../services/testService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = ({
  message,
  setMessage,
  checkNavigation,
  setCheckNavigation,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Get redirect URL from query param or state
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await signInApi(form, setMessage);
      if (success) {
        toast({
          title: "Signed in successfully!",
          status: "success",
          duration: 2000,
        });
        // Redirect back to where user came from
        navigate(decodeURIComponent(redirectTo), { replace: true });
      } else {
        toast({
          title: message || "Sign in failed",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({ title: "Something went wrong", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const sf = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="#f8fafc"
      fontFamily="'Sora', sans-serif"
    >
      <Box
        w={{ base: "full", sm: "440px" }}
        mx={4}
        bg="white"
        borderRadius="20px"
        boxShadow="0 20px 60px rgba(0,0,0,.1)"
        p={{ base: 6, md: 10 }}
      >
        <Box textAlign="center" mb={8}>
          <Box
            w="52px"
            h="52px"
            bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
            borderRadius="14px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb={4}
            fontSize="22px"
          >
            📋
          </Box>
          <Text fontSize="24px" fontWeight={800} color="#0f172a" mb={1}>
            Welcome back
          </Text>
          <Text fontSize="14px" color="#64748b">
            Sign in to continue
            {redirectTo && redirectTo !== "/" && (
              <Text as="span" color="#4a72b8" fontWeight={600}>
                {" "}
                to your test
              </Text>
            )}
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel
              fontSize="12px"
              fontWeight={700}
              color="#374151"
              textTransform="uppercase"
              letterSpacing=".8px"
            >
              Email
            </FormLabel>
            <Input
              type="email"
              value={form.email}
              onChange={sf("email")}
              placeholder="you@example.com"
              h="46px"
              borderRadius="10px"
              borderColor="#e2e8f0"
              fontSize="14px"
              required
              _focus={{
                borderColor: "#4a72b8",
                boxShadow: "0 0 0 1px #4a72b8",
              }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel
              fontSize="12px"
              fontWeight={700}
              color="#374151"
              textTransform="uppercase"
              letterSpacing=".8px"
            >
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={sf("password")}
                placeholder="••••••••"
                h="46px"
                borderRadius="10px"
                borderColor="#e2e8f0"
                fontSize="14px"
                required
                _focus={{
                  borderColor: "#4a72b8",
                  boxShadow: "0 0 0 1px #4a72b8",
                }}
              />
              <InputRightElement h="46px">
                <IconButton
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            w="full"
            h="50px"
            borderRadius="12px"
            bg="linear-gradient(135deg,#4a72b8,#1e3a5f)"
            color="white"
            fontWeight={800}
            fontSize="15px"
            isLoading={loading}
            loadingText="Signing in…"
            _hover={{
              opacity: 0.9,
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(74,114,184,.35)",
            }}
            transition="all .2s"
          >
            Sign In
          </Button>
        </form>

        <Flex mt={6} justify="center" gap={1} fontSize="14px">
          <Text color="#64748b">Don't have an account?</Text>
          <Link
            to={`/auth/signup${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            style={{ color: "#4a72b8", fontWeight: 700 }}
          >
            Sign up
          </Link>
        </Flex>

        <Flex mt={2} justify="center">
          <Link
            to="/auth/forgotPassword"
            style={{ color: "#94a3b8", fontSize: "13px" }}
          >
            Forgot password?
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Signin;
