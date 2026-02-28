import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signUpApi } from "../services/testService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ message, setMessage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        duration: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      const success = await signUpApi(
        { Name: form.name, Email: form.email, Password: form.password },
        form.confirmPassword,
        setMessage,
      );
      if (success) {
        toast({ title: "Account created!", status: "success", duration: 2000 });
        navigate(decodeURIComponent(redirectTo), { replace: true });
      } else {
        toast({
          title: message || "Sign up failed",
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
            Create account
          </Text>
          <Text fontSize="14px" color="#64748b">
            Join to take tests and track progress
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
              Full Name
            </FormLabel>
            <Input
              value={form.name}
              onChange={sf("name")}
              placeholder="John Doe"
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

          <FormControl mb={4}>
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

          <FormControl mb={6}>
            <FormLabel
              fontSize="12px"
              fontWeight={700}
              color="#374151"
              textTransform="uppercase"
              letterSpacing=".8px"
            >
              Confirm Password
            </FormLabel>
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={sf("confirmPassword")}
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
            loadingText="Creating account…"
            _hover={{
              opacity: 0.9,
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(74,114,184,.35)",
            }}
            transition="all .2s"
          >
            Create Account
          </Button>
        </form>

        <Flex mt={6} justify="center" gap={1} fontSize="14px">
          <Text color="#64748b">Already have an account?</Text>
          <Link
            to={`/auth/signin${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            style={{ color: "#4a72b8", fontWeight: 700 }}
          >
            Sign in
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Signup;
