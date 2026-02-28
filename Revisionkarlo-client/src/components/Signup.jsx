// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Heading,
//   Box,
//   FormLabel,
//   FormControl,
//   Input,
//   Button,
//   Text,
//   Checkbox,
//   Spacer,
//   AlertIcon,
//   Alert,
// } from "@chakra-ui/react";

// import { Link, useNavigate } from "react-router-dom";
// // import { signUpApi } from "../apis/auth";
// import { getCookies } from "../helpers/cookies";
// // import { useDispatch, useSelector } from "react-redux";
// // import { signupApi } from "../redux/signUp/signup_ActionType";
// const Signup = ({message,setMessage,checkNavigation,setCheckNavigation}) => {
//   const [cmpPassword, setScmpPassword] = useState(null);
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
// //  const { signupMessage, signupSuccess, data } = useSelector(
// //    (state) => state.signupReducer
// //  );
//   const [signUpData, setSignUpData] = useState({
//     Email: null,
//     Password: null,
//   });
// const handleKeyDown = (event) => {
//   console.log("hghfdss");
//   if (event.key === "Enter") {
//     console.log("hghghhfh");
//     handleSignup();
//   }
// };
//   const handleSignup = async () => {
//     // if (data.Email.includes("@gmail.com") && data.Email !== "") {
//     //   if (data.Password === cmpPassword && data.Password !== "") {
//     //
//     //   } else {
//     //     alert("Password and Confirm Password should be same");
//     //   }
//     // } else {
//     //   alert("It should be Email only");
//     // }

//     // if (
//     //   signUpData.Email !== null &&
//     //   signUpData.Password !== null &&
//     //   cmpPassword !== null
//     // ) {
//     //   if (signUpData.Email.includes("@gmail.com")) {
//     //     if (signUpData.Password === cmpPassword) {
//           const checkSignup = await signUpApi(signUpData, cmpPassword, setMessage);
//     //       const checkCookie = await getCookies("_user");
//     //       console.log(checkSignup, checkCookie);
//     //       if (checkCookie !== null && checkSignup !== false) {

//     //         setCheckNavigation(true);
//     //       }
//     //     } else {
//     //       setMessage("Password and Confirm Password should be same");
//     //     }
//     //   } else {
//     //     setMessage("Email is Required");
//     //   }
//     // } else {
//     //   setMessage("All fields are Required");
//     // }

//     if (
//       signUpData.Email !== null &&
//       signUpData.Password !== null &&
//       cmpPassword !== null
//     ) {
//       if (signUpData.Email.includes("@gmail.com")) {
//         if (signUpData.Password === cmpPassword) {

//     // dispatch(signupApi(signUpData,setMessage));
//           const checkCookie = await getCookies("_user");
//           console.log( checkCookie);
//           if (checkCookie !== null && signupSuccess !== false) {

//             setCheckNavigation(true);
//           }
//         } else {
//           setMessage("Password and Confirm Password should be same");
//         }
//       } else {
//         setMessage("Email is Required");
//       }
//     } else {
//       setMessage("All fields are Required");
//     }
//   };
//   useEffect(() => {
//     if (signupSuccess && message !== null) {
//       const navigateTimeOut = setTimeout(() => {
//         setMessage(null);
//         setCheckNavigation(false);
//         navigate("/auth/signin");
//       }, 3000);
//       if (checkNavigation === false && message === null) {
//         clearTimeout(navigateTimeOut);
//       }
//     } else {
//       const messageTimeOut = setTimeout(() => {
//         console.log("h");
//         setMessage(null);
//       }, 5000);
//       if (message === null) {
//         clearTimeout(messageTimeOut);
//       }
//     }console.log(signupSuccess);
//   }, [checkNavigation, navigate, message,signupSuccess, data]);
//   console.log(message);
//   return (
//     <>
//       {signupSuccess && message !== null ? (
//         <Alert over status="success">
//           <AlertIcon />
//           {message}
//         </Alert>
//       ) : message !== null ? (
//         <Alert status="error">
//           <AlertIcon />
//           {message}
//         </Alert>
//       ) : null}

//       <Container
//         mt={"3%"}
//         // position={"sticky"}
//         //  w={{ base: "94%", md: "55%", lg: "60%" }}
//         maxW={{ base: "90%", md: "65%", lg: "40%" }}
//         borderRadius={"20px"}
//         p={"2% 4% 4% 4%"}
//         // bg={"whitesmoke"}
//       >
//         <Heading
//           textAlign={"center"}
//           mb={"11%"}
//           //  bg={"whitesmoke"}
//         >
//           SignUp
//         </Heading>
//         <FormControl
//         // bg={"whitesmoke"}
//         >
//           <Box
//           //  bg={"whitesmoke"}
//           >
//             <FormLabel
//             // bg={"whitesmoke"}
//             >
//               Email
//             </FormLabel>
//             <Input
//               type={"email"}
//               required={true}
//               // bg={"whitesmoke"}
//               placeholder={"Enter your Email"}
//               onKeyDown={handleKeyDown}
//               onChange={(e) =>
//                 setSignUpData({ ...signUpData, Email: e.target.value })
//               }
//             />
//           </Box>
//           <Box
//             // bg={"whitesmoke"}
//             mt={"3%"}
//           >
//             <FormLabel
//             //  bg={"whitesmoke"}
//             >
//               Password
//             </FormLabel>
//             <Input
//               type={"password"}
//               required={true}
//               // bg={"whitesmoke"}
//               placeholder={"Enter your Password"}
//               onKeyDown={handleKeyDown}
//               onChange={(e) =>
//                 setSignUpData({ ...signUpData, Password: e.target.value })
//               }
//             />
//           </Box>
//           <Box
//             // bg={"whitesmoke"}
//             mt={"3%"}
//           >
//             <FormLabel
//             // bg={"whitesmoke"}
//             >
//               Confirm Password
//             </FormLabel>
//             <Input
//               type={"password"}
//               required={true}
//               // bg={"whitesmoke"}
//               placeholder={"Confirm your Password"}
//               onKeyDown={handleKeyDown}
//               onChange={(e) => setScmpPassword(e.target.value)}
//             />
//           </Box>
//           <Box
//             //  bg={"whitesmoke"}
//             mt={"7%"}
//           >
//             <Checkbox border={"1px  gray"} fontSize={"sm"}>
//               You agree to our Terms of service & Privacy Policy
//             </Checkbox>
//             {/* <Spacer/> */}
//             <Box>
//               <Text
//                 // bg={"whitesmoke"}
//                 mt={"1%"}
//                 fontSize={"md"}
//               >
//                 Already have Account?{" "}
//                 <Link to="/auth/signin">
//                   <Text
//                     as={"span"}
//                     cursor={"pointer"}
//                     textDecoration={"underline"}
//                     color="#1f4985"
//                   >
//                     Click Here for SignIn
//                   </Text>
//                 </Link>
//               </Text>
//             </Box>
//           </Box>{" "}
//           <Button
//             w={"100%"}
//             mt={"3%"}
//             color={"white"}
//             // colorScheme={"#01bfbd"}
//             bg={"#4285f4"}
//             onClick={handleSignup}
//           >
//             Submit
//           </Button>
//         </FormControl>
//       </Container>
//     </>
//   );
// };

// export default Signup;

import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { signUpApi } from "../apis/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({
  message,
  setMessage,
  checkNavigation,
  setCheckNavigation,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signupData, setSignupData] = useState({
    Name: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleSubmit = async () => {
    if (
      !signupData.Name ||
      !signupData.Email ||
      !signupData.Password ||
      !signupData.confirmPassword
    ) {
      setMessage("All fields are Required");
      return;
    }
    if (!signupData.Email.includes("@")) {
      setMessage("Enter a valid email");
      return;
    }
    if (signupData.Password !== signupData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (signupData.Password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { confirmPassword, ...payload } = signupData;
    const success = await signUpApi(payload, confirmPassword, setMessage);
    setLoading(false);

    if (success) {
      setSignUpSuccess(true);
      setCheckNavigation(true);
    }
  };

  useEffect(() => {
    if (!signUpSuccess || !checkNavigation) return;
    const timer = setTimeout(() => {
      setMessage(null);
      setCheckNavigation(false);
      navigate("/");
    }, 1500);
    return () => clearTimeout(timer);
  }, [
    signUpSuccess,
    checkNavigation,
    navigate,
    setMessage,
    setCheckNavigation,
  ]);

  useEffect(() => {
    if (!message || signUpSuccess) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message, signUpSuccess, setMessage]);

  return (
    <>
      {message && (
        <Alert status={signUpSuccess ? "success" : "error"} mb={0}>
          <AlertIcon />
          {message}
        </Alert>
      )}

      <Container
        mt="3%"
        borderRadius="20px"
        maxW={{ base: "90%", md: "65%", lg: "40%" }}
        p="2% 4% 4% 4%"
      >
        <Heading textAlign="center" mb="8%">
          Create Account
        </Heading>

        <FormControl>
          <Box>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your Name"
              value={signupData.Name}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setSignupData({ ...signupData, Name: e.target.value })
              }
            />
          </Box>

          <Box mt="3%">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your Email"
              value={signupData.Email}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setSignupData({ ...signupData, Email: e.target.value })
              }
            />
          </Box>

          <Box mt="3%">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password"
                value={signupData.Password}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setSignupData({ ...signupData, Password: e.target.value })
                }
              />
              <InputRightElement>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Toggle password"
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={() => setShowPassword((p) => !p)}
                />
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box mt="3%">
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your Password"
                value={signupData.confirmPassword}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <InputRightElement>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Toggle confirm password"
                  icon={showConfirm ? <FaEyeSlash /> : <FaEye />}
                  onClick={() => setShowConfirm((p) => !p)}
                />
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box mt="7%">
            <Text fontSize="md">
              Already have an account?{" "}
              <Link to="/auth/signin">
                <Text
                  as="span"
                  cursor="pointer"
                  textDecoration="underline"
                  color="#1f4985"
                >
                  Sign In
                </Text>
              </Link>
            </Text>
          </Box>

          <Button
            w="100%"
            mt="3%"
            colorScheme="teal"
            bg="#4285f4"
            isLoading={loading}
            loadingText="Creating account..."
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default Signup;