import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookies } from "../helpers/cookies";
import { getLocalStorage } from "../helpers/localStorage";
import { Box, Spinner, Center, Text, VStack } from "@chakra-ui/react";

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 *
 * @param {ReactNode} children - The component to render if authenticated
 * @param {string} requiredRole - Optional role required to access the route (e.g., 'admin', 'premium')
 * @param {string} redirectTo - Optional custom redirect path (defaults to /auth/signin)
 */
const ProtectedRoute = ({
  children,
  requiredRole = null,
  redirectTo = "/auth/signin",
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsLoading(true);

        // Check if user cookie exists
        const userCookie = await getCookies("_user");
        const authToken = await getCookies("AuthToken");

        console.log("🔐 Auth Check:", {
          userCookie: userCookie ? "✅ Present" : "❌ Missing",
          authToken: authToken ? "✅ Present" : "❌ Missing",
          currentPath: location.pathname,
        });

        if (userCookie && userCookie !== null) {
          setIsAuthenticated(true);

          // Check role-based access if required
          if (requiredRole) {
            const userRole = getLocalStorage("userRole");
            if (userRole === requiredRole) {
              setIsAuthorized(true);
            } else {
              console.warn(
                "⚠️ Access Denied: User role does not match required role",
              );
              setIsAuthorized(false);
            }
          }
        } else {
          setIsAuthenticated(false);
          console.warn("⚠️ User not authenticated - redirecting to signin");
        }
      } catch (error) {
        console.error("❌ Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [location.pathname, requiredRole]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Center h="100vh" bg="gray.50">
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            w="60px"
            h="60px"
          />
          <Text color="gray.600" fontSize="md" fontWeight="500">
            Verifying access...
          </Text>
        </VStack>
      </Center>
    );
  }

  // If not authenticated, redirect to signin page
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location, message: "Please sign in to continue" }}
        replace
      />
    );
  }

  // If authenticated but not authorized (wrong role), redirect to unauthorized page
  if (!isAuthorized) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location, requiredRole: requiredRole }}
        replace
      />
    );
  }

  // If authenticated and authorized, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
