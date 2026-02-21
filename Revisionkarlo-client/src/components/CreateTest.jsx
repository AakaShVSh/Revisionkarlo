// import {
//   Box,
//   Button,
//   Collapse,
//   Grid,
//   GridItem,
//   Input,
//   Select,
//   Spacer,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { MdAddBox } from "react-icons/md";
// import { AiOutlineSelect } from "react-icons/ai";
// import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

// function CollapseEx({
//   setlist,
//   setselectallstate,
//   selectallstate,
//   totalques,
//   check,
//   setcheck,
//   MathSubject,
//   findtotal,
//   maketest,
//   settotaltestno,
//   seth,
//   h,
//   category,
//   settotalques,
//   directTest,
//   setdirecttest,
//   setnoOfQus,
//   setq,
//   setname,
//   sum,
//   currentSub, // Added prop for category
// }) {
//   const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
//   const [totalqus, setTotalQus] = useState(0);
//   const [res, resdev] = useState([]);
//   const [isstate, setState] = useState(false);
//   const [arr, setarr] = useState([]);
//   const [totalquslength, settotalquslength] = useState(0);
//   const [noqustogive, setnoqustogive] = useState(null);
//   const [testName, setTestName] = useState("Test 1"); // State for test name

//   const [TestSubject, setTestSubject] = useState("");

//   useEffect(() => {
//     setlist(arr);
//     setTestSubject(getLocalStorage("Subject"));
//     setnoOfQus(totalqus);
//   }, [arr, setlist, setnoOfQus, totalqus]);

//   const getdata = () => {
//     if (!category?.length) return;
//     if (!MathSubject) {
//       console.warn("MathSubject is not defined.");
//       return;
//     }
//     if (directTest.length < 0) {
//       console.log(directTest.length, directTest);
//       alert("should be smaller");
//       return;
//     }
//     console.log(MathSubject, directTest);

//     const res = directTest?.filter((e) => e.topic === MathSubject);
//     if (!res.length) {
//       console.warn("No matching category found.");
//       return;
//     }
//     console.log(res);

//     resdev(res);
//     resdevi(res);

//     console.log(
//       "Filtered Questions:",
//       res,
//       "Selected Subject:",
//       MathSubject,
//       "First Category Topic:",
//       category?.[0]?.topic,
//     );
//   };

//   const resdevi = (res) => {
//     if (!res?.length) {
//       console.warn("No questions found for this subject.");
//       return;
//     }

//     let j = noqustogive;
//     console.log(j, noqustogive);

//     let totalCategories = res.length;
//     let baseCount = Math.floor(j / totalCategories);
//     let extra = j % totalCategories;

//     let dividedQuestions = new Set();
//     let storedIndexes = JSON.parse(localStorage.getItem("lastIndexes")) || {};
//     let newIndexes = {};

//     for (let i = 0; i < totalCategories; i++) {
//       if (!Array.isArray(res[i].question)) {
//         console.warn(`Skipping invalid question data at index ${i}`);
//         continue;
//       }

//       let prevIndex = storedIndexes[res[i].topic] || 0;
//       let count = baseCount + (i < extra ? 1 : 0);

//       let slicedQuestions = res[i].question.slice(prevIndex, prevIndex + count);
//       newIndexes[res[i].topic] = prevIndex + count;

//       slicedQuestions.forEach((q) => dividedQuestions.add(q));
//     }

//     dividedQuestions = [...dividedQuestions];

//     let index = 0;
//     while (dividedQuestions.length < j) {
//       let categoryIndex = index % totalCategories;
//       let extraQuestions = res[categoryIndex].question;

//       for (let q of extraQuestions) {
//         if (dividedQuestions.length >= j) break;
//         if (!dividedQuestions.includes(q)) {
//           dividedQuestions.push(q);
//         }
//       }
//       index++;
//     }

//     localStorage.setItem("lastIndexes", JSON.stringify(newIndexes));

//     settotalquslength(dividedQuestions.length);

//     if (dividedQuestions.length > 0) {
//       // Save test metadata before starting the test
//       saveTestMetadata(dividedQuestions);
//       maketest(dividedQuestions, true, testName);
//     }
//   };

//   const directTestdatacollect = () => {
//     console.log(category);
//     if (!category?.length) return;
//     if (!MathSubject) {
//       console.warn("MathSubject is not defined.");
//       return;
//     }
//     console.log(MathSubject);

//     const res = category?.filter((e) => e.topic === MathSubject);
//     if (!res.length) {
//       console.warn("No matching category found.");
//       return;
//     }
//     console.log("============================", res);

//     resdev(res);
//     directTestallSelectData(res);
//   };

//   const directTestallSelectData = (res) => {
//     if (!res?.length) {
//       console.warn("No questions found for this subject.");
//       return;
//     }

//     let j = noqustogive;
//     console.log("+++++++++++++++++++++++++++++++++++++++++++", j, noqustogive);

//     let dividedQuestions = new Set();

//     res.forEach((category) => {
//       if (!Array.isArray(category.question)) {
//         console.warn(`Skipping invalid question data:`, category);
//         return;
//       }

//       category.question.forEach((q) => dividedQuestions.add(q));
//     });

//     let uniqueQuestions = [...dividedQuestions];

//     let finalQuestions = [];
//     let usedIndexes = new Set();

//     while (finalQuestions.length < j && uniqueQuestions.length > 0) {
//       let randomIndex = Math.floor(Math.random() * uniqueQuestions.length);

//       if (!usedIndexes.has(randomIndex)) {
//         usedIndexes.add(randomIndex);
//         finalQuestions.push(uniqueQuestions[randomIndex]);
//       }

//       if (usedIndexes.size === uniqueQuestions.length) {
//         usedIndexes.clear();
//       }
//     }

//     settotalquslength(finalQuestions.length);
//     console.log(
//       "Final Questions:",
//       finalQuestions,
//       "Total Given:",
//       finalQuestions.length,
//     );

//     if (finalQuestions.length > 0) {
//       // Save test metadata before starting the test
//       saveTestMetadata(finalQuestions);
//       setcheck(true);
//       maketest(finalQuestions, true, testName);
//     }
//   };

//   // NEW FUNCTION: Save test metadata to localStorage
//   const saveTestMetadata = (questions) => {
//     const testobj = {
//       testName: testName,
//       noOfQus: questions.length,
//       questions: questions,
//       createdAt: new Date().toISOString(),
//       category: currentSub,
//       subcategory: MathSubject,
//       quslist: [], // Can be populated if you track topic distribution
//     };

//     const existingTests = getLocalStorage("allTypeWiseTests") || [];
//     const updatedTests = [...existingTests, testobj];

//     setLocalStorage("allTypeWiseTests", updatedTests);
//     console.log("✅ Test metadata saved:", testobj);
//   };

//   return (
//     <>
//       <Box display="flex" gap={3} mt={2}>
//         <Button
//           gap={1}
//           onClick={() => {
//             onToggle1();
//             findtotal();
//             setselectallstate(false);
//             settotalques(!totalques);
//             setState(!isstate);
//             setcheck(!check);
//           }}
//         >
//           Create Direct Test <MdAddBox />
//         </Button>
//         <Button
//           gap={1}
//           onClick={() => {
//             if (!category?.length || !MathSubject) return;

//             const selectedCategory = category.filter(
//               (e) => e.topic === MathSubject,
//             );

//             const totalQuestions = selectedCategory.reduce(
//               (acc, curr) => acc + (curr.question?.length || 0),
//               0,
//             );

//             setnoqustogive(totalQuestions);
//             setselectallstate(!selectallstate);
//           }}
//         >
//           Select All <AiOutlineSelect />
//         </Button>
//       </Box>

//       {/* Direct Test Section */}
//       <Collapse in={isOpen1} animateOpacity>
//         <Box p={4} mt={3} bg="white" rounded="md" shadow="md">
//           <Grid templateColumns="repeat(1, 1fr)" gap={4}>
//             <GridItem>
//               <Text mb={1}>Test Name</Text>
//               <Input
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 placeholder="Enter test name"
//                 size="sm"
//               />
//             </GridItem>
//             <Input
//               type="number"
//               onChange={(e) => setnoqustogive(Number(e.target.value))}
//               value={noqustogive || category[0]?.question?.length}
//               placeholder={`Should be a multiple of ${res?.length || null}`}
//               size="sm"
//             />

//             <GridItem display="flex" gap={4}>
//               <Button
//                 colorScheme="red"
//                 variant="outline"
//                 onClick={(e) => {
//                   setcheck(false);
//                   onToggle1();
//                   settotaltestno(e.target.value);
//                   settotalques(false);
//                   setState(false);
//                 }}
//               >
//                 Discard
//               </Button>
//               <Button
//                 colorScheme="green"
//                 variant="outline"
//                 onClick={() => {
//                   if (directTest.length > 0 && totalquslength >= noqustogive) {
//                     onToggle1();
//                   }

//                   settotalques(false);
//                   setState(false);
//                   if (selectallstate) {
//                     directTestdatacollect();
//                   } else {
//                     getdata();
//                   }
//                 }}
//               >
//                 Create
//               </Button>
//             </GridItem>
//           </Grid>
//         </Box>
//       </Collapse>
//     </>
//   );
// }

// export default CollapseEx;

import {
  Box,
  Button,
  Collapse,
  Grid,
  GridItem,
  Input,
  Select,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { AiOutlineSelect } from "react-icons/ai";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

function CollapseEx({
  setlist,
  setselectallstate,
  selectallstate,
  totalques,
  check,
  setcheck,
  MathSubject,
  findtotal,
  maketest,
  settotaltestno,
  seth,
  h,
  category,
  settotalques,
  directTest,
  setdirecttest,
  setnoOfQus,
  setq,
  setname,
  sum,
  currentSub,
}) {
  const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
  const [totalqus, setTotalQus] = useState(0);
  const [res, resdev] = useState([]);
  const [isstate, setState] = useState(false);
  const [arr, setarr] = useState([]);
  const [totalquslength, settotalquslength] = useState(0);
  const [noqustogive, setnoqustogive] = useState(null);
  const [testName, setTestName] = useState("Test 1");

  const [TestSubject, setTestSubject] = useState("");

  useEffect(() => {
    setlist(arr);
    setTestSubject(getLocalStorage("Subject"));
    setnoOfQus(totalqus);
  }, [arr, setlist, setnoOfQus, totalqus]);

  const getdata = () => {
    if (!category?.length) return;
    if (!MathSubject) {
      console.warn("MathSubject is not defined.");
      return;
    }
    if (directTest.length < 0) {
      console.log(directTest.length, directTest);
      alert("should be smaller");
      return;
    }
    console.log(MathSubject, directTest);

    const res = directTest?.filter((e) => e.topic === MathSubject);
    if (!res.length) {
      console.warn("No matching category found.");
      return;
    }
    console.log(res);

    resdev(res);
    resdevi(res);

    console.log(
      "Filtered Questions:",
      res,
      "Selected Subject:",
      MathSubject,
      "First Category Topic:",
      category?.[0]?.topic,
    );
  };

  const resdevi = (res) => {
    if (!res?.length) {
      console.warn("No questions found for this subject.");
      return;
    }

    let j = noqustogive;
    console.log(j, noqustogive);

    let totalCategories = res.length;
    let baseCount = Math.floor(j / totalCategories);
    let extra = j % totalCategories;

    let dividedQuestions = new Set();
    let storedIndexes = JSON.parse(localStorage.getItem("lastIndexes")) || {};
    let newIndexes = {};

    for (let i = 0; i < totalCategories; i++) {
      if (!Array.isArray(res[i].question)) {
        console.warn(`Skipping invalid question data at index ${i}`);
        continue;
      }

      let prevIndex = storedIndexes[res[i].topic] || 0;
      let count = baseCount + (i < extra ? 1 : 0);

      let slicedQuestions = res[i].question.slice(prevIndex, prevIndex + count);
      newIndexes[res[i].topic] = prevIndex + count;

      slicedQuestions.forEach((q) => dividedQuestions.add(q));
    }

    dividedQuestions = [...dividedQuestions];

    let index = 0;
    while (dividedQuestions.length < j) {
      let categoryIndex = index % totalCategories;
      let extraQuestions = res[categoryIndex].question;

      for (let q of extraQuestions) {
        if (dividedQuestions.length >= j) break;
        if (!dividedQuestions.includes(q)) {
          dividedQuestions.push(q);
        }
      }
      index++;
    }

    localStorage.setItem("lastIndexes", JSON.stringify(newIndexes));

    settotalquslength(dividedQuestions.length);

    if (dividedQuestions.length > 0) {
      // Save the list of selected topics for timer calculation
      const selectedTopics = res.map((r) => r.topic);
      setLocalStorage("selectedTopicsList", selectedTopics);

      console.log("✅ Saved selectedTopicsList for timer:", selectedTopics);

      // Save test metadata before starting the test
      saveTestMetadata(dividedQuestions, selectedTopics);
      maketest(dividedQuestions, true, testName);
    }
  };

  const directTestdatacollect = () => {
    console.log(category);
    if (!category?.length) return;
    if (!MathSubject) {
      console.warn("MathSubject is not defined.");
      return;
    }
    console.log(MathSubject);

    const res = category?.filter((e) => e.topic === MathSubject);
    if (!res.length) {
      console.warn("No matching category found.");
      return;
    }
    console.log("============================", res);

    resdev(res);
    directTestallSelectData(res);
  };

  const directTestallSelectData = (res) => {
    if (!res?.length) {
      console.warn("No questions found for this subject.");
      return;
    }

    let j = noqustogive;
    console.log("+++++++++++++++++++++++++++++++++++++++++++", j, noqustogive);

    let dividedQuestions = new Set();

    res.forEach((category) => {
      if (!Array.isArray(category.question)) {
        console.warn(`Skipping invalid question data:`, category);
        return;
      }

      category.question.forEach((q) => dividedQuestions.add(q));
    });

    let uniqueQuestions = [...dividedQuestions];

    let finalQuestions = [];
    let usedIndexes = new Set();

    while (finalQuestions.length < j && uniqueQuestions.length > 0) {
      let randomIndex = Math.floor(Math.random() * uniqueQuestions.length);

      if (!usedIndexes.has(randomIndex)) {
        usedIndexes.add(randomIndex);
        finalQuestions.push(uniqueQuestions[randomIndex]);
      }

      if (usedIndexes.size === uniqueQuestions.length) {
        usedIndexes.clear();
      }
    }

    settotalquslength(finalQuestions.length);
    console.log(
      "Final Questions:",
      finalQuestions,
      "Total Given:",
      finalQuestions.length,
    );

    if (finalQuestions.length > 0) {
      // Save single topic for select all
      const selectedTopics = [MathSubject];
      setLocalStorage("selectedTopicsList", selectedTopics);

      console.log("✅ Saved selectedTopicsList (Select All):", selectedTopics);

      // Save test metadata before starting the test
      saveTestMetadata(finalQuestions, selectedTopics);
      setcheck(true);
      maketest(finalQuestions, true, testName);
    }
  };

  // Save test metadata to localStorage
  const saveTestMetadata = (questions, selectedTopics = []) => {
    const testobj = {
      testName: testName,
      noOfQus: questions.length,
      questions: questions,
      createdAt: new Date().toISOString(),
      category: currentSub,
      subcategory: MathSubject,
      quslist: [],
      selectedTopics: selectedTopics, // Save selected topics
    };

    const existingTests = getLocalStorage("allTypeWiseTests") || [];
    const updatedTests = [...existingTests, testobj];

    setLocalStorage("allTypeWiseTests", updatedTests);
    console.log("✅ Test metadata saved:", testobj);
  };

  return (
    <>
      <Box display="flex" gap={3} mt={2} flexWrap="wrap">
        <Button
          gap={1}
          onClick={() => {
            onToggle1();
            findtotal();
            setselectallstate(false);
            settotalques(!totalques);
            setState(!isstate);
            setcheck(!check);
          }}
          size={{ base: "sm", md: "md" }}
        >
          Create Direct Test <MdAddBox />
        </Button>
        <Button
          gap={1}
          onClick={() => {
            if (!category?.length || !MathSubject) return;

            const selectedCategory = category.filter(
              (e) => e.topic === MathSubject,
            );

            const totalQuestions = selectedCategory.reduce(
              (acc, curr) => acc + (curr.question?.length || 0),
              0,
            );

            setnoqustogive(totalQuestions);
            setselectallstate(!selectallstate);
          }}
          size={{ base: "sm", md: "md" }}
        >
          Select All <AiOutlineSelect />
        </Button>
      </Box>

      {/* Direct Test Section */}
      <Collapse in={isOpen1} animateOpacity>
        <Box p={4} mt={3} bg="white" rounded="md" shadow="md">
          <Grid templateColumns="repeat(1, 1fr)" gap={4}>
            <GridItem>
              <Text mb={1} fontSize="sm" fontWeight="500">
                Test Name
              </Text>
              <Input
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Enter test name"
                size="sm"
              />
            </GridItem>
            <GridItem>
              <Text mb={1} fontSize="sm" fontWeight="500">
                Number of Questions
              </Text>
              <Input
                type="number"
                onChange={(e) => setnoqustogive(Number(e.target.value))}
                value={noqustogive || ""}
                placeholder={`Should be a multiple of ${res?.length || "N"}`}
                size="sm"
              />
            </GridItem>

            <GridItem display="flex" gap={4}>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={(e) => {
                  setcheck(false);
                  onToggle1();
                  settotaltestno(e.target.value);
                  settotalques(false);
                  setState(false);
                }}
                size="sm"
              >
                Discard
              </Button>
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => {
                  if (directTest.length > 0 && totalquslength >= noqustogive) {
                    onToggle1();
                  }

                  settotalques(false);
                  setState(false);
                  if (selectallstate) {
                    directTestdatacollect();
                  } else {
                    getdata();
                  }
                }}
                size="sm"
              >
                Create
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Collapse>
    </>
  );
}

export default CollapseEx;