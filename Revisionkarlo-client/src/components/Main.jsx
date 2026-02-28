// import React, { useEffect, useState } from "react";
// import TakeTest from "./TakeTest";
// // import Router, { Route } from 'router'
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import SubmitTest from "./SubmitTest";
// import Signin from "./Signin";
// import Signup from "./Signup";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { fetchData } from "../apis/question";
// import { setLocalStorage } from "../helpers/localStorage";
// import ReviewTest from "./ReviewTest";
// import { m } from "framer-motion";
// // import Questionlist from "./Questionlist";
// import ForgotPassword from "./ForgotPassword";
// import MathQuestionlist from "./MathQuestionlist";
// import Footer from "./Footer";
// import { useDispatch, useSelector } from "react-redux";
// // import { QuestionApi } from "../redux/questions/questions.ActionType";
// import Feedback from "./Feedback";
// import ResultPage from "./ResultPage";
// // import Analysis from "./Analysis";
// import SaveQuestion from "./SaveQuestion";
// import ReportAdminPage from "./ReportAdminPage";
// import SavedPage from "./SavedData";
// import Home from "./Home";
// import ScrollToTop from "../helpers/ScrollToTop";
// import ProtectedRoute from "../helpers/ProtectedRoute";

// const Main = () => {
//    const location = useLocation();
//   const [mark, setMark] = useState(0);
//   // const [TotalQuestion, SetTotalQuestion] = useState(0);
//   const [quest, setQuestions] = useState([]);
//   const [questionCategory, setQuestionsCategory] = useState([]);
//   const [testTitle, settestTitle] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [checkNavigation, setCheckNavigation] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [chooseSub, setchoosesub] = useState("");
//   const [currentSub, setCurrentSub] = useState("");
//   const { questionLoading, questionSuccess, questionData } = useSelector(
//     (state) => state.QuestionReducer,
//   );
//   const dispatch = useDispatch();

//   const handleFullScreen = (isFull) => {
//     if (isFull) {
//       setIsFullScreen(true);
//       document.documentElement.requestFullscreen();
//        setIsFullScreen(true);
//     } else {
//       setIsFullScreen(false);
//       document.exitFullscreen();
//     }
//   };

//   // DevTools Detection and Blocking
//   useEffect(() => {
//     let devtoolsOpen = false;

//     // Handle when DevTools are detected
//     const handleDevToolsOpen = () => {
//       document.body.innerHTML = `
//         <div style="
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           font-family: Arial, sans-serif;
//           margin: 0;
//         ">
//           <div style="
//             text-align: center;
//             color: white;
//             padding: 40px;
//             background: rgba(0, 0, 0, 0.3);
//             border-radius: 10px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
//           ">
//             <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️ Access Denied</h1>
//             <p style="font-size: 20px; margin-bottom: 20px;">
//               Developer Tools are not allowed on this website.
//             </p>
//             <p style="font-size: 16px; opacity: 0.9;">
//               Please close the Developer Tools and refresh the page.
//             </p>
//           </div>
//         </div>
//       `;

//       setTimeout(() => {
//         window.location.reload();
//       }, 3000);
//     };

//     // Method 1: Detect DevTools by window size
//     const detectDevTools = () => {
//       const threshold = 160;
//       const widthThreshold = window.outerWidth - window.innerWidth > threshold;
//       const heightThreshold =
//         window.outerHeight - window.innerHeight > threshold;

//       if (widthThreshold || heightThreshold) {
//         if (!devtoolsOpen) {
//           devtoolsOpen = true;
//           handleDevToolsOpen();
//         }
//       } else {
//         devtoolsOpen = false;
//       }
//     };

//     // Method 2: Detect using debugger statement
//     const detectWithDebugger = () => {
//       const before = new Date().getTime();
//       debugger;
//       const after = new Date().getTime();

//       if (after - before > 100) {
//         handleDevToolsOpen();
//       }
//     };

//     // Method 3: Detect for Firebug
//     const detectFirebug = () => {
//       if (
//         window.Firebug &&
//         window.Firebug.chrome &&
//         window.Firebug.chrome.isInitialized
//       ) {
//         handleDevToolsOpen();
//       }
//     };

//     // Method 4: Monitor window resize
//     const checkWindowSize = () => {
//       const widthDiff = window.outerWidth - window.innerWidth;
//       const heightDiff = window.outerHeight - window.innerHeight;

//       if (widthDiff > 200 || heightDiff > 200) {
//         handleDevToolsOpen();
//       }
//     };

//     // Disable right-click
//     const disableRightClick = (e) => {
//       e.preventDefault();
//       return false;
//     };

//     // Disable keyboard shortcuts
//     const disableShortcuts = (e) => {
//       // F12
//       if (e.keyCode === 123) {
//         e.preventDefault();
//         return false;
//       }
//       // Ctrl+Shift+I or Cmd+Option+I
//       if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
//         e.preventDefault();
//         return false;
//       }
//       // Ctrl+Shift+J or Cmd+Option+J
//       if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 74) {
//         e.preventDefault();
//         return false;
//       }
//       // Ctrl+Shift+C or Cmd+Option+C
//       if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) {
//         e.preventDefault();
//         return false;
//       }
//       // Ctrl+U or Cmd+U (View Source)
//       if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
//         e.preventDefault();
//         return false;
//       }
//       // Ctrl+S or Cmd+S (Save)
//       if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
//         e.preventDefault();
//         return false;
//       }
//     };

//     // Disable text selection
//     const disableSelection = (e) => {
//       e.preventDefault();
//       return false;
//     };

//     // Disable copy
//     const disableCopy = (e) => {
//       e.preventDefault();
//       return false;
//     };

//     // Add event listeners
//     document.addEventListener("contextmenu", disableRightClick);
//     document.addEventListener("keydown", disableShortcuts);
//     document.addEventListener("selectstart", disableSelection);
//     document.addEventListener("copy", disableCopy);

//     // Run detection methods at intervals
//     const detectionInterval = setInterval(() => {
//       detectDevTools();
//       checkWindowSize();
//       detectFirebug();
//     }, 1000);

//     // Run debugger detection less frequently
//     const debuggerInterval = setInterval(() => {
//       detectWithDebugger();
//     }, 3000);

//     // Initial check
//     detectDevTools();
//     checkWindowSize();

//     // Cleanup
//     return () => {
//       clearInterval(detectionInterval);
//       clearInterval(debuggerInterval);
//       document.removeEventListener("contextmenu", disableRightClick);
//       document.removeEventListener("keydown", disableShortcuts);
//       document.removeEventListener("selectstart", disableSelection);
//       document.removeEventListener("copy", disableCopy);
//     };
//   }, []);

//   // Original useEffect
//   useEffect(() => {
//     if (testTitle !== null) {
//       setLocalStorage("category", testTitle);
//       console.log(testTitle);
//       setLocalStorage("Testdata", quest);
//       console.log("l");
//     }

//     // SetTotalQuestion(quest.length);
//     // fetchData(setQuestionsCategory);
//     // if(!questionSuccess){
//     console.log("cho", chooseSub);

//     if (chooseSub !== "") {
//       console.log("i", chooseSub);
//       setCurrentSub(chooseSub);
//       // dispatch(QuestionApi(chooseSub));
//       setLocalStorage("Subject", chooseSub);

//       setchoosesub("");
//     }
//     if (questionData != []) {
//       setQuestionsCategory(questionData);
//       setQuestions(questionData);
//     }
//   }, [questionSuccess, chooseSub, testTitle, dispatch, questionData, quest]);

//   // console.log("qqqq", questionLoading, "sss", questionSuccess,"dddd",questionData);
//   return (
//     <>
//       {isFullScreen === true ||
//       location.pathname == "/auth/signin" ||
//       location.pathname == "/auth/signup" ||
//       location.pathname == "/auth/forgotPassword" ||
//       location.pathname == "/test" ? null : (
//         <Navbar />
//       )}
//       {/* <Sidebar/> */}
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<Home setchoosesub={setchoosesub} />} />
//         <Route
//           path="/auth/signin"
//           element={
//             <Signin
//               message={message}
//               setMessage={setMessage}
//               checkNavigation={checkNavigation}
//               setCheckNavigation={setCheckNavigation}
//             />
//           }
//         />
//         <Route
//           path="/auth/signup"
//           element={
//             <Signup
//               message={message}
//               setMessage={setMessage}
//               checkNavigation={checkNavigation}
//               setCheckNavigation={setCheckNavigation}
//             />
//           }
//         />
//         <Route
//           path="/auth/forgotPassword"
//           element={<ForgotPassword message={message} setMessage={setMessage} />}
//         />
//         <Route
//           path="/test"
//           element={
//             // <ProtectedRoute>
//               <TakeTest
//                 handleFullScreen={handleFullScreen}
//                 // setIsFullScreen={}
//                 // chooseSub={chooseSub}
//                 quest={quest}
//               />
//             // </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/test-result"
//           element={
//             // <ProtectedRoute>
//               <ResultPage />
//             // </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/Review-Test"
//           element={
//             <ProtectedRoute>
//               <ReviewTest />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/questionList"
//           element={
//             // <ProtectedRoute>

//               <MathQuestionlist
//                 currentSub={currentSub}
//                 chooseSub={chooseSub}
//                 category={questionCategory}
//                 handleFullScreen={handleFullScreen}
//                 setQuestions={setQuestions}
//                 settestTitle={settestTitle}
//               />
//             // </ProtectedRoute>
//           }
//         />
//         <Route path="/GiveFeedback" element={<Feedback />} />
//         {/* <Route
//           path="/Analysis"
//           element={
//             <ProtectedRoute>
//               <Analysis />
//             </ProtectedRoute>
//           }
//         /> */}
//         <Route
//           path="/Saved-Question"
//           element={
//             <ProtectedRoute>
//               <SaveQuestion />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/ReportAdmin"
//           element={
//             <ProtectedRoute>
//               <ReportAdminPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/savedData"
//           element={
//             <ProtectedRoute>
//               <SavedPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       {isFullScreen === true ||
//       location.pathname == "/auth/signin" ||
//       location.pathname == "/auth/signup" ||
//       location.pathname == "/auth/forgotPassword" ||
//       location.pathname == "/test" ? null : (
//         <Footer />
//       )}
//     </>

//     // <>
//     // {/* attendance */}
//     //     <Home/>
//     // </>
//   );
// };

// export default Main;








import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { setLocalStorage } from "../helpers/localStorage";
import ScrollToTop from "../helpers/ScrollToTop";
import ProtectedRoute from "../helpers/ProtectedRoute";

// ── Layout ─────────────────────────────────────────────────────────────────
import Navbar from "./Navbar";
import Footer from "./Footer";

// ── Auth ───────────────────────────────────────────────────────────────────
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

// ── Home ───────────────────────────────────────────────────────────────────
import Home from "./Home";

// ── Test flow ──────────────────────────────────────────────────────────────
import MathQuestionlist from "./MathQuestionlist";
import TakeTest from "./TakeTest";
import ResultPage from "./ResultPage";
// import ResultPriview from "./ResultPriview";
import ReviewTest from "./ReviewTest";
import SubmitTest from "./SubmitTest";

// ── Other existing pages ───────────────────────────────────────────────────
import Feedback from "./Feedback";
import ReportAdminPage from "./ReportAdminPage";
import SaveQuestion from "./SaveQuestion";
import SavedPage from "./SavedData";
import UserTestDataList from "./UserTestDataList";
import CreateTest from "./CreateTest";

// ── Coaching & Tests ────────────────────────────────────────────────────────
import CoachingPage from "./CoachingPage";
import TestDetailPage from "./TestDetailPage"; // NEW
import TokenTestPage from "./TokenTestPage"; // NEW

const BASE_URL = "http://localhost:80";

const Main = () => {
  const location = useLocation();
  const toast = useToast();

  const [quest, setQuestions] = useState([]);
  const [questionCategory, setQuestionsCategory] = useState([]);
  const [testTitle, settestTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [checkNavigation, setCheckNavigation] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chooseSub, setchoosesub] = useState("");
  const [currentSub, setCurrentSub] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFullScreen = (isFull) => {
    setIsFullScreen(isFull);
    if (isFull) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  useEffect(() => {
    if (!chooseSub) return;
    setCurrentSub(chooseSub);
    setLocalStorage("Subject", chooseSub);
    setchoosesub("");

    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/questions?subject=${chooseSub}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const docs = data?.data ?? data ?? [];
        setQuestionsCategory(docs);
        setQuestions(docs);
        toast({
          title: "Questions Loaded",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } catch (err) {
        toast({
          title: "Failed to Load Questions",
          description: err.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        setQuestionsCategory([]);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [chooseSub, toast]);

  useEffect(() => {
    if (testTitle !== null) {
      setLocalStorage("category", testTitle);
      setLocalStorage("Testdata", quest);
    }
  }, [testTitle, quest]);

  const hideLayout =
    isFullScreen ||
    location.pathname === "/auth/signin" ||
    location.pathname === "/auth/signup" ||
    location.pathname === "/auth/forgotPassword" ||
    location.pathname === "/test";

  const authProps = {
    message,
    setMessage,
    checkNavigation,
    setCheckNavigation,
  };

  return (
    <>
      {!hideLayout && <Navbar />}
      <ScrollToTop />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home setchoosesub={setchoosesub} />} />

        {/* Auth */}
        <Route path="/auth/signin" element={<Signin {...authProps} />} />
        <Route path="/auth/signup" element={<Signup {...authProps} />} />
        <Route
          path="/auth/forgotPassword"
          element={<ForgotPassword message={message} setMessage={setMessage} />}
        />

        {/* Test flow */}
        <Route
          path="/test"
          element={
            <TakeTest handleFullScreen={handleFullScreen} quest={quest} />
          }
        />
        <Route path="/test-result" element={<ResultPage />} />
        {/* <Route path="/result-preview" element={<ResultPriview />} /> */}
        <Route
          path="/Review-Test"
          element={
            <ProtectedRoute>
              <ReviewTest />
            </ProtectedRoute>
          }
        />
        <Route path="/SubmitTest" element={<SubmitTest />} />

        {/* Subject question bank */}
        <Route
          path="/questionList"
          element={
            <MathQuestionlist
              currentSub={currentSub}
              chooseSub={chooseSub}
              category={questionCategory}
              handleFullScreen={handleFullScreen}
              setQuestions={setQuestions}
              settestTitle={settestTitle}
              isLoading={isLoading}
            />
          }
        />

        {/* ── Tests ────────────────────────────────────────────────────── */}
        {/* Token link MUST be before :id so "token" isn't treated as an id */}
        <Route path="/tests/token/:token" element={<TokenTestPage />} />
        <Route path="/tests/:id" element={<TestDetailPage />} />

        {/* ── Coaching ─────────────────────────────────────────────────── */}
        <Route path="/coaching/:slug" element={<CoachingPage />} />
        <Route path="/coaching" element={<CoachingPage />} />

        {/* Public */}
        <Route path="/GiveFeedback" element={<Feedback />} />

        {/* Protected */}
        <Route
          path="/Saved-Question"
          element={
            <ProtectedRoute>
              <SaveQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ReportAdmin"
          element={
            <ProtectedRoute>
              <ReportAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savedData"
          element={
            <ProtectedRoute>
              <SavedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserTestData"
          element={
            <ProtectedRoute>
              <UserTestDataList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateTest"
          element={
            <ProtectedRoute>
              <CreateTest />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default Main;




// import React, { useEffect, useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import TakeTest from "./TakeTest";
// import SubmitTest from "./SubmitTest";
// import Signin from "./Signin";
// import Signup from "./Signup";
// import Navbar from "./Navbar";
// import ReviewTest from "./ReviewTest";
// import MathQuestionlist from "./MathQuestionlist";
// import ResultPage from "./ResultPage";
// import SaveQuestion from "./SaveQuestion";
// import SavedPage from "./SavedData";
// import Home from "./Home";
// import ScrollToTop from "../helpers/ScrollToTop";
// import ProtectedRoute from "../helpers/ProtectedRoute";
// import Footer from "./Footer";
// import ForgotPassword from "./ForgotPassword";
// import Feedback from "./Feedback";
// import ReportAdminPage from "./ReportAdminPage";
// import { setLocalStorage } from "../helpers/localStorage";

// const BASE_URL =  "http://localhost:800/api";

// const Main = () => {
//   const location = useLocation();
//   const [quest, setQuestions] = useState([]);
//   const [questionCategory, setQuestionsCategory] = useState([]);
//   const [testTitle, settestTitle] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [checkNavigation, setCheckNavigation] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [chooseSub, setchoosesub] = useState("");
//   const [currentSub, setCurrentSub] = useState("");

//   const handleFullScreen = (isFull) => {
//     setIsFullScreen(isFull);
//     if (isFull) {
//       document.documentElement.requestFullscreen?.();
//     } else {
//       document.exitFullscreen?.();
//     }
//   };

//   // Fetch questions when subject changes
//   useEffect(() => {
//     if (!chooseSub) return;

//     setCurrentSub(chooseSub);
//     setLocalStorage("Subject", chooseSub);
//     setchoosesub("");

//     const fetchQuestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/questions?subject=${chooseSub}`);
//         if (!res.ok) throw new Error("Failed to fetch questions");
//         const data = await res.json();
//         setQuestionsCategory(data);
//         setQuestions(data);
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//       }
//     };

//     fetchQuestions();
//   }, [chooseSub]);

//   // Persist test title + questions to localStorage
//   useEffect(() => {
//     if (testTitle !== null) {
//       setLocalStorage("category", testTitle);
//       setLocalStorage("Testdata", quest);
//     }
//   }, [testTitle, quest]);

//   const hideLayout =
//     isFullScreen ||
//     location.pathname === "/auth/signin" ||
//     location.pathname === "/auth/signup" ||
//     location.pathname === "/auth/forgotPassword" ||
//     location.pathname === "/test";

//   return (
//     <>
//       {!hideLayout && <Navbar />}
//       <ScrollToTop />

//       <Routes>
//         <Route path="/" element={<Home setchoosesub={setchoosesub} />} />

//         <Route
//           path="/auth/signin"
//           element={
//             <Signin
//               message={message}
//               setMessage={setMessage}
//               checkNavigation={checkNavigation}
//               setCheckNavigation={setCheckNavigation}
//             />
//           }
//         />

//         <Route
//           path="/auth/signup"
//           element={
//             <Signup
//               message={message}
//               setMessage={setMessage}
//               checkNavigation={checkNavigation}
//               setCheckNavigation={setCheckNavigation}
//             />
//           }
//         />

//         <Route
//           path="/auth/forgotPassword"
//           element={<ForgotPassword message={message} setMessage={setMessage} />}
//         />

//         <Route
//           path="/test"
//           element={
//             <TakeTest handleFullScreen={handleFullScreen} quest={quest} />
//           }
//         />

//         <Route path="/test-result" element={<ResultPage />} />

//         <Route
//           path="/Review-Test"
//           element={
//             <ProtectedRoute>
//               <ReviewTest />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/questionList"
//           element={
//             <MathQuestionlist
//               currentSub={currentSub}
//               chooseSub={chooseSub}
//               category={questionCategory}
//               handleFullScreen={handleFullScreen}
//               setQuestions={setQuestions}
//               settestTitle={settestTitle}
//             />
//           }
//         />

//         <Route path="/GiveFeedback" element={<Feedback />} />

//         <Route
//           path="/Saved-Question"
//           element={
//             <ProtectedRoute>
//               <SaveQuestion />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/ReportAdmin"
//           element={
//             <ProtectedRoute>
//               <ReportAdminPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/savedData"
//           element={
//             <ProtectedRoute>
//               <SavedPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {!hideLayout && <Footer />}
//     </>
//   );
// };

// export default Main;