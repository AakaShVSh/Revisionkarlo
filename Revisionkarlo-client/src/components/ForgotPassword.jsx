import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordApi } from "../redux/forgotPassword/forgotPassword.ActionType";
import { useNavigate } from "react-router-dom";
import { changePasswordApi } from "../redux/changePassword/changePassword.ActionType";

const ForgotPassword = ({ setMessage, message }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [otp, setOtp] = useState(0);
  const { forgotPasswordSuccess, forgotPasswordUser, forgotPasswordOtp } =
    useSelector((state) => state.forgotPasswordReducer);

  const { changePasswordSuccess, changePasswordData, changePasswordError } =
    useSelector((state) => state.changePasswordReducer);
  const [password, setpassword] = useState({
    Password: null,
  });
  const [UserEmail, setEmail] = useState({
    Email: null,
  });

  console.log(UserEmail);
  const handleSubmit = () => {
    if (
      UserEmail.Email.includes("@gmail.com") &&
      UserEmail.Email !== "@gmail.com"
    ) {
      if (forgotPasswordOtp === 0) {
        dispatch(forgotPasswordApi(UserEmail, forgotPasswordUser));
      }
      if (
        forgotPasswordSuccess &&
        forgotPasswordOtp !== 0 &&
        otp == forgotPasswordOtp
      ) {
        setChangePassword(true);
        if (password.Password !== null) {
          dispatch(changePasswordApi(password, forgotPasswordUser));
       
        }
      }
    }
  };
  console.log(changePasswordSuccess, changePasswordData, changePasswordError);
  useEffect(() => {
       if (changePasswordSuccess) {
         navigate("/auth/signin");
       }
  },[changePasswordSuccess, navigate])
  return (
    <>
      <Box
        maxW={{ base: "90%", md: "65%", lg: "40%" }}
        margin={"10% auto"}
        // border={"1px solid red"}
        p={"12px"}
      >
        <Box>
          <Heading>Revision Karle</Heading>
          <Box mt={"15px"}>
            {" "}
            <Text fontSize={"large"}>
              <b>Forgot your password?</b>
            </Text>
            <Text>
              Don't worry change your Password in just 2 simple steps.
            </Text>
          </Box>{" "}
          <Box mt={"40px"}>
            <FormControl
            // bg={"whitesmoke"}
            >
              <Box
              // bg={"whitesmoke"}
              >
                {changePassword ? (
                  <>
                    {" "}
                    <FormLabel
                    // bg={"whitesmoke"}
                    >
                      New Password Here
                    </FormLabel>
                    <Input
                      type={"text"}
                      required={true}
                      // bg={"whitesmoke"}
                      placeholder={"Enter New Password"}
                      onChange={(e) =>
                        setpassword({ ...password, Password: e.target.value })
                      }
                      // onKeyDown={handleKeyDown}
                      // onChange={(e) =>
                      //   setSigninData({ ...signinData, Email: e.target.value })
                      // }
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    {forgotPasswordOtp !== 0 ? (
                      <>
                        {" "}
                        <FormLabel
                        // bg={"whitesmoke"}
                        >
                          OTP Here
                        </FormLabel>
                        <Input
                          type={"number"}
                          required={true}
                          // bg={"whitesmoke"}
                          placeholder={"Enter OTP Here"}
                          onChange={(e) => setOtp(e.target.value)}
                          // onKeyDown={handleKeyDown}
                          // onChange={(e) =>
                          //   setSigninData({ ...signinData, Email: e.target.value })
                          // }
                        />
                      </>
                    ) : (
                      <>
                        <FormLabel
                        // bg={"whitesmoke"}
                        >
                          Email
                        </FormLabel>
                        <Input
                          type={"email"}
                          required={true}
                          // bg={"whitesmoke"}
                          placeholder={"Enter your Email"}
                          onChange={(e) =>
                            setEmail({ ...UserEmail, Email: e.target.value })
                          }
                          // onKeyDown={handleKeyDown}
                          // onChange={(e) =>
                          //   setSigninData({ ...signinData, Email: e.target.value })
                          // }
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
              <Button
                w={"100%"}
                mt={"3%"}
                colorScheme={"teal"}
                bg={"#4285f4"}
                // spinner={<BeatLoader size={8} color='white' />}
                onClick={() => handleSubmit()}
                // onKeyDown={handleKeyDown}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
