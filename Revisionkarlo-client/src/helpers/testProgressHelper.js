
// /**
//  * Save test score after completion
//  * @param {string} category - Main category (e.g., "math", "English")
//  * @param {string} subcategory - Subcategory (e.g., "Number System")
//  * @param {number} testIndex - Index of the test within subcategory
//  * @param {number} scorePercentage - Score percentage (0-100)
//  * @param {boolean} isIndividualTest - Whether this is an individual subcategory test (not custom multi-subcategory)
//  */
// export const saveTestScore = (
//   category,
//   subcategory,
//   testIndex,
//   scorePercentage,
//   isIndividualTest = true,
// ) => {
//   // Only save progress for individual subcategory tests
//   // Do NOT save for custom tests with multiple subcategories selected
//   if (!isIndividualTest) {
//     console.log("⚠️ Skipping progress save - this is a custom multi-subcategory test");
//     return null;
//   }

//   const progressKey = "testProgress";
//   const progress = JSON.parse(localStorage.getItem(progressKey)) || {};

//   // Initialize category if it doesn't exist
//   if (!progress[category]) {
//     progress[category] = {};
//   }

//   // Initialize subcategory if it doesn't exist
//   if (!progress[category][subcategory]) {
//     progress[category][subcategory] = {};
//   }

//   // Get existing score to preserve completion status if already completed
//   const existingTest = progress[category][subcategory][testIndex];
//   const wasCompleted = existingTest?.completed === true;

//   // Save the score - once completed (80% or higher), it stays completed
//   progress[category][subcategory][testIndex] = {
//     score: scorePercentage,
//     completed: wasCompleted || scorePercentage >= 80,
//     timestamp: new Date().toISOString(),
//   };

//   localStorage.setItem(progressKey, JSON.stringify(progress));

//   // Check and update subcategory completion
//   updateSubcategoryCompletion(category, subcategory);

//   return progress;
// };

// /**
//  * Check if a specific test is unlocked
//  * @param {string} category - Main category
//  * @param {string} subcategory - Subcategory
//  * @param {number} testIndex - Index of the test
//  * @returns {boolean} - Whether the test is unlocked
//  */
// export const isTestUnlocked = (category, subcategory, testIndex) => {
//   // First test is always unlocked
//   if (testIndex === 0) return true;

//   const progress = JSON.parse(localStorage.getItem("testProgress")) || {};

//   // Check if previous test exists and is completed (80% or higher)
//   const previousTestIndex = testIndex - 1;
//   const previousTest = progress?.[category]?.[subcategory]?.[previousTestIndex];

//   return previousTest?.completed === true;
// };

// /**
//  * Check if a subcategory is unlocked
//  * @param {string} category - Main category
//  * @param {string} subcategory - Subcategory name
//  * @param {number} subcategoryIndex - Index of subcategory in the list
//  * @returns {boolean} - Whether the subcategory is unlocked
//  */
// export const isSubcategoryUnlocked = (category, subcategoryIndex) => {
//   // First subcategory is always unlocked
//   if (subcategoryIndex === 0) return true;

//   const completion =
//     JSON.parse(localStorage.getItem("subcategoryCompletion")) || {};

//   // Check if previous subcategory is completed (all tests at 80% or higher)
//   const previousSubcategoryIndex = subcategoryIndex - 1;
//   const previousCompleted = completion?.[category]?.[previousSubcategoryIndex];

//   return previousCompleted === true;
// };

// /**
//  * Get test score for a specific test
//  * @param {string} category - Main category
//  * @param {string} subcategory - Subcategory
//  * @param {number} testIndex - Index of the test
//  * @returns {object|null} - Test data with score and completion status
//  */
// export const getTestScore = (category, subcategory, testIndex) => {
//   const progress = JSON.parse(localStorage.getItem("testProgress")) || {};
//   return progress?.[category]?.[subcategory]?.[testIndex] || null;
// };

// /**
//  * Check if all tests in a subcategory are completed with 80% or higher
//  * @param {string} category - Main category
//  * @param {string} subcategory - Subcategory
//  * @param {number} totalTests - Total number of tests in the subcategory
//  * @returns {boolean} - Whether all tests are completed
//  */
// export const isSubcategoryCompleted = (category, subcategory, totalTests) => {
//   const progress = JSON.parse(localStorage.getItem("testProgress")) || {};
//   const subcategoryProgress = progress?.[category]?.[subcategory] || {};

//   // Check if all tests exist and are completed (80% or higher)
//   for (let i = 0; i < totalTests; i++) {
//     const test = subcategoryProgress[i];
//     if (!test || !test.completed) {
//       return false;
//     }
//   }

//   return true;
// };

// /**
//  * Update subcategory completion status
//  * @param {string} category - Main category
//  * @param {string} subcategory - Subcategory name
//  */
// const updateSubcategoryCompletion = (category, subcategory) => {
//   const completionKey = "subcategoryCompletion";
//   const completion = JSON.parse(localStorage.getItem(completionKey)) || {};

//   if (!completion[category]) {
//     completion[category] = {};
//   }

//   // Get all subcategories for this category
//   const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];
//   const subcategoryTests = questionData.filter((q) => q.topic === subcategory);

//   if (subcategoryTests.length > 0) {
//     const allCompleted = isSubcategoryCompleted(
//       category,
//       subcategory,
//       subcategoryTests.length,
//     );

//     // Find the index of this subcategory
//     const allSubcategories = getSubcategoriesForCategory(category);
//     const subcategoryIndex = allSubcategories.indexOf(subcategory);

//     if (subcategoryIndex !== -1) {
//       // Once completed, it stays completed
//       const wasCompleted = completion[category][subcategoryIndex] === true;
//       completion[category][subcategoryIndex] = wasCompleted || allCompleted;
//       localStorage.setItem(completionKey, JSON.stringify(completion));
//     }
//   }
// };

// /**
//  * Get list of all subcategories for a category
//  * @param {string} category - Main category
//  * @returns {array} - Array of subcategory names
//  */
// const getSubcategoriesForCategory = (category) => {
//   // Map category codes to their subcategory lists
//   const subcategoryMap = {
//     math: [
//       "Number System",
//       "L.C.M and H.C.F",
//       "Surds and Indices",
//       "Algebraic Identities",
//       "Percentage",
//       "Profit and Loss",
//       "Simple Interest",
//       "Compound Interest",
//       "Average",
//       "Ratio and Proportion",
//       "Partnership",
//       "Problems with Ages",
//       "Time and Distance",
//       "Pipe and Cistern",
//       "Mixture and Alligation",
//       "Problems based on Train, Boat, and Stream",
//       "Mensuration 2D & 3D",
//       "Coordinate Geometry",
//       "Trigonometry",
//       "Data Interpretation",
//       "General Studies",
//     ],
//     Eng: [
//       "Spot the Error",
//       "Reading Comprehension",
//       "Synonyms",
//       "Antonyms",
//       "Fill in the Blanks",
//       "Sentence Improvement",
//       "Spotting Errors",
//       "Para Jumbles",
//       "Idioms & Phrases",
//       "One Word Substitution",
//       "Active and Passive Voice",
//       "Direct and Indirect Speech",
//       "Cloze Test",
//       "Sentence Completion",
//       "Vocabulary",
//       "Prepositions",
//       "Articles",
//       "Tenses",
//       "Subject-Verb Agreement",
//       "Phrasal Verbs",
//     ],
//     mathtwo: [
//       "Average Wala",
//       "mathtwo",
//       "Police and Thief",
//       "Time and Distance (Meeting Wala)",
//       "Time and distance basic",
//       "Train Wala (Relative Speed)",
//     ],
//     gs: ["Vedic age", "Polity", "Ancient History"],
//     vocabulary: [
//       "One Word Substitution",
//       "Idioms",
//       "Antonyms",
//       "Synonyms",
//       "Phrasal Verbs",
//     ],
//   };

//   return subcategoryMap[category] || [];
// };

// /**
//  * Check if category is fully completed (all subcategories done)
//  * @param {string} category - Main category
//  * @returns {boolean} - Whether category is fully completed
//  */
// export const isCategoryCompleted = (category) => {
//   const subcategories = getSubcategoriesForCategory(category);
//   const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];

//   for (const subcategory of subcategories) {
//     const tests = questionData.filter((q) => q.topic === subcategory);
//     if (tests.length === 0) continue; // Skip if no tests exist

//     if (!isSubcategoryCompleted(category, subcategory, tests.length)) {
//       return false;
//     }
//   }

//   return subcategories.length > 0; // Only return true if there are subcategories
// };

// /**
//  * Get progress statistics for a category
//  * @param {string} category - Main category
//  * @returns {object} - Progress stats
//  */
// export const getCategoryProgress = (category) => {
//   const subcategories = getSubcategoriesForCategory(category);
//   const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];

//   let completedSubcategories = 0;
//   let totalTests = 0;
//   let completedTests = 0;

//   for (const subcategory of subcategories) {
//     const tests = questionData.filter((q) => q.topic === subcategory);
//     totalTests += tests.length;

//     if (
//       tests.length > 0 &&
//       isSubcategoryCompleted(category, subcategory, tests.length)
//     ) {
//       completedSubcategories++;
//       completedTests += tests.length;
//     } else {
//       // Count individual completed tests
//       for (let i = 0; i < tests.length; i++) {
//         const testScore = getTestScore(category, subcategory, i);
//         if (testScore?.completed) {
//           completedTests++;
//         }
//       }
//     }
//   }

//   return {
//     totalSubcategories: subcategories.length,
//     completedSubcategories,
//     totalTests,
//     completedTests,
//     percentComplete:
//       totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0,
//   };
// };

// /**
//  * Get total correct answers for a subcategory across all tests
//  * @param {string} category - Main category
//  * @param {string} subcategory - Subcategory name
//  * @returns {object} - { totalCorrect, totalQuestions, percentage }
//  */
// export const getSubcategoryStats = (category, subcategory) => {
//   const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];
//   const progress = JSON.parse(localStorage.getItem("testProgress")) || {};
  
//   const tests = questionData.filter((q) => q.topic === subcategory);
//   const subcategoryProgress = progress?.[category]?.[subcategory] || {};
  
//   let totalCorrect = 0;
//   let totalQuestions = 0;
  
//   tests.forEach((test, index) => {
//     const testData = subcategoryProgress[index];
//     if (testData && test.question) {
//       const questionsInTest = test.question.length;
//       totalQuestions += questionsInTest;
      
//       // Calculate correct answers: (score% / 100) * totalQuestions
//       const correctAnswers = Math.round((testData.score / 100) * questionsInTest);
//       totalCorrect += correctAnswers;
//     } else if (test.question) {
//       // Test not attempted yet
//       totalQuestions += test.question.length;
//     }
//   });
  
//   const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  
//   return {
//     totalCorrect,
//     totalQuestions,
//     percentage,
//     completed: tests.length > 0 && isSubcategoryCompleted(category, subcategory, tests.length)
//   };
// };

// /**
//  * Reset all progress (useful for testing)
//  */
// export const resetAllProgress = () => {
//   localStorage.removeItem("testProgress");
//   localStorage.removeItem("subcategoryCompletion");
// };



// testProgressHelper.js
// Helper functions to manage test progress, scores, and unlock logic

/**
 * Save test score after completion
 * @param {string} category - Main category (e.g., "math", "English")
 * @param {string} subcategory - Subcategory (e.g., "Number System")
 * @param {number} testIndex - Index of the test within subcategory
 * @param {number} scorePercentage - Score percentage (0-100)
 * @param {boolean} isIndividualTest - Whether this is an individual subcategory test (not custom multi-subcategory)
 */
export const saveTestScore = (
  category,
  subcategory,
  testIndex,
  scorePercentage,
  isIndividualTest = true,
) => {
  // Only save progress for individual subcategory tests
  // Do NOT save for custom tests with multiple subcategories selected
  if (!isIndividualTest) {
    console.log("⚠️ Skipping progress save - this is a custom multi-subcategory test");
    return null;
  }

  const progressKey = "testProgress";
  const progress = JSON.parse(localStorage.getItem(progressKey)) || {};

  // Initialize category if it doesn't exist
  if (!progress[category]) {
    progress[category] = {};
  }

  // Initialize subcategory if it doesn't exist
  if (!progress[category][subcategory]) {
    progress[category][subcategory] = {};
  }

  // Get existing score to preserve completion status if already completed
  const existingTest = progress[category][subcategory][testIndex];
  const wasCompleted = existingTest?.completed === true;

  // Save the score - once completed (80% or higher), it stays completed
  progress[category][subcategory][testIndex] = {
    score: scorePercentage,
    completed: wasCompleted || scorePercentage >= 80,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(progressKey, JSON.stringify(progress));

  // Check and update subcategory completion
  updateSubcategoryCompletion(category, subcategory);

  return progress;
};

/**
 * Check if a specific test is unlocked
 * @param {string} category - Main category
 * @param {string} subcategory - Subcategory
 * @param {number} testIndex - Index of the test
 * @returns {boolean} - Whether the test is unlocked
 */
export const isTestUnlocked = (category, subcategory, testIndex) => {
  // First test is always unlocked
  if (testIndex === 0) return true;

  const progress = JSON.parse(localStorage.getItem("testProgress")) || {};

  // Check if previous test exists and is completed (80% or higher)
  const previousTestIndex = testIndex - 1;
  const previousTest = progress?.[category]?.[subcategory]?.[previousTestIndex];

  return previousTest?.completed === true;
};

/**
 * Check if a subcategory is unlocked
 * @param {string} category - Main category
 * @param {string} subcategory - Subcategory name
 * @param {number} subcategoryIndex - Index of subcategory in the list
 * @returns {boolean} - Whether the subcategory is unlocked
 */
export const isSubcategoryUnlocked = (category, subcategoryIndex) => {
  // First subcategory is always unlocked
  if (subcategoryIndex === 0) return true;

  const completion =
    JSON.parse(localStorage.getItem("subcategoryCompletion")) || {};

  // Check if previous subcategory is completed (all tests at 80% or higher)
  const previousSubcategoryIndex = subcategoryIndex - 1;
  const previousCompleted = completion?.[category]?.[previousSubcategoryIndex];

  return previousCompleted === true;
};

/**
 * Get test score for a specific test
 * @param {string} category - Main category
 * @param {string} subcategory - Subcategory
 * @param {number} testIndex - Index of the test
 * @returns {object|null} - Test data with score and completion status
 */
export const getTestScore = (category, subcategory, testIndex) => {
  const progress = JSON.parse(localStorage.getItem("testProgress")) || {};
  return progress?.[category]?.[subcategory]?.[testIndex] || null;
};

/**
 * Check if all tests in a subcategory are completed with 80% or higher
 * @param {string} category - Main category
 * @param {string} subcategory - Subcategory
 * @param {number} totalTests - Total number of tests in the subcategory
 * @returns {boolean} - Whether all tests are completed
 */
export const isSubcategoryCompleted = (category, subcategory, totalTests) => {
  const progress = JSON.parse(localStorage.getItem("testProgress")) || {};
  const subcategoryProgress = progress?.[category]?.[subcategory] || {};

  // Check if all tests exist and are completed (80% or higher)
  for (let i = 0; i < totalTests; i++) {
    const test = subcategoryProgress[i];
    if (!test || !test.completed) {
      return false;
    }
  }

  return true;
};

/**
 * Update subcategory completion status
 * @param {string} category - Main category
 * @param {string} subcategory - Subcategory name
 */
const updateSubcategoryCompletion = (category, subcategory) => {
  const completionKey = "subcategoryCompletion";
  const completion = JSON.parse(localStorage.getItem(completionKey)) || {};

  if (!completion[category]) {
    completion[category] = {};
  }

  // Get all subcategories for this category
  const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];
  const subcategoryTests = questionData.filter((q) => q.topic === subcategory);

  if (subcategoryTests.length > 0) {
    const allCompleted = isSubcategoryCompleted(
      category,
      subcategory,
      subcategoryTests.length,
    );

    // Find the index of this subcategory
    const allSubcategories = getSubcategoriesForCategory(category);
    const subcategoryIndex = allSubcategories.indexOf(subcategory);

    if (subcategoryIndex !== -1) {
      // Once completed, it stays completed
      const wasCompleted = completion[category][subcategoryIndex] === true;
      completion[category][subcategoryIndex] = wasCompleted || allCompleted;
      localStorage.setItem(completionKey, JSON.stringify(completion));
    }
  }
};

/**
 * Get list of all subcategories for a category
 * @param {string} category - Main category
 * @returns {array} - Array of subcategory names
 */
const getSubcategoriesForCategory = (category) => {
  // Map category codes to their subcategory lists
  const subcategoryMap = {
    math: [
      "Number System",
      "L.C.M and H.C.F",
      "Surds and Indices",
      "Algebraic Identities",
      "Percentage",
      "Profit and Loss",
      "Simple Interest",
      "Compound Interest",
      "Average",
      "Ratio and Proportion",
      "Partnership",
      "Problems with Ages",
      "Time and Distance",
      "Pipe and Cistern",
      "Mixture and Alligation",
      "Problems based on Train, Boat, and Stream",
      "Mensuration 2D & 3D",
      "Coordinate Geometry",
      "Trigonometry",
      "Data Interpretation",
      "General Studies",
    ],
    Eng: [
      "Spot the Error",
      "Reading Comprehension",
      "Synonyms",
      "Antonyms",
      "Fill in the Blanks",
      "Sentence Improvement",
      "Spotting Errors",
      "Para Jumbles",
      "Idioms & Phrases",
      "One Word Substitution",
      "Active and Passive Voice",
      "Direct and Indirect Speech",
      "Cloze Test",
      "Sentence Completion",
      "Vocabulary",
      "Prepositions",
      "Articles",
      "Tenses",
      "Subject-Verb Agreement",
      "Phrasal Verbs",
    ],
    mathtwo: [
      "Average Wala",
      "mathtwo",
      "Police and Thief",
      "Time and Distance (Meeting Wala)",
      "Time and distance basic",
      "Train Wala (Relative Speed)",
    ],
    gs: [
      "Vedic age",
      "Polity",
      "Ancient History",
    ],
    vocabulary: [
      "One Word Substitution",
      "Idioms",
      "Antonyms",
      "Synonyms",
      "Phrasal Verbs",
    ],
    Reasoning: [
      "Logical Reasoning",
      "Analytical Reasoning",
      "Verbal Reasoning",
      "Non-Verbal Reasoning",
      "Blood Relations",
      "Coding-Decoding",
      "Puzzles",
      "Seating Arrangement",
      "Syllogism",
      "Data Sufficiency",
    ],
  };

  return subcategoryMap[category] || [];
};

/**
 * Check if category is fully completed (all subcategories done)
 * @param {string} category - Main category
 * @returns {boolean} - Whether category is fully completed
 */
export const isCategoryCompleted = (category) => {
  const subcategories = getSubcategoriesForCategory(category);
  const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];

  for (const subcategory of subcategories) {
    const tests = questionData.filter((q) => q.topic === subcategory);
    if (tests.length === 0) continue; // Skip if no tests exist

    if (!isSubcategoryCompleted(category, subcategory, tests.length)) {
      return false;
    }
  }

  return subcategories.length > 0; // Only return true if there are subcategories
};

/**
 * Get progress statistics for a category
 * @param {string} category - Main category
 * @returns {object} - Progress stats
 */
export const getCategoryProgress = (category) => {
  const subcategories = getSubcategoriesForCategory(category);
  const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];

  let completedSubcategories = 0;
  let totalTests = 0;
  let completedTests = 0;

  for (const subcategory of subcategories) {
    const tests = questionData.filter((q) => q.topic === subcategory);
    totalTests += tests.length;

    if (
      tests.length > 0 &&
      isSubcategoryCompleted(category, subcategory, tests.length)
    ) {
      completedSubcategories++;
      completedTests += tests.length;
    } else {
      // Count individual completed tests
      for (let i = 0; i < tests.length; i++) {
        const testScore = getTestScore(category, subcategory, i);
        if (testScore?.completed) {
          completedTests++;
        }
      }
    }
  }

  return {
    totalSubcategories: subcategories.length,
    completedSubcategories,
    totalTests,
    completedTests,
    percentComplete:
      totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0,
  };
};

/**
 * Get total correct answers for a subcategory across all tests
 * @param {string} category - Main category
 * @param {string} subcategory - Subcategory name
 * @returns {object} - { totalCorrect, totalQuestions, percentage }
 */
export const getSubcategoryStats = (category, subcategory) => {
  const questionData = JSON.parse(localStorage.getItem("questiondata")) || [];
  const progress = JSON.parse(localStorage.getItem("testProgress")) || {};
  
  const tests = questionData.filter((q) => q.topic === subcategory);
  const subcategoryProgress = progress?.[category]?.[subcategory] || {};
  
  let totalCorrect = 0;
  let totalQuestions = 0;
  
  tests.forEach((test, index) => {
    const testData = subcategoryProgress[index];
    if (testData && test.question) {
      const questionsInTest = test.question.length;
      totalQuestions += questionsInTest;
      
      // Calculate correct answers: (score% / 100) * totalQuestions
      const correctAnswers = Math.round((testData.score / 100) * questionsInTest);
      totalCorrect += correctAnswers;
    } else if (test.question) {
      // Test not attempted yet
      totalQuestions += test.question.length;
    }
  });
  
  const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  
  return {
    totalCorrect,
    totalQuestions,
    percentage,
    completed: tests.length > 0 && isSubcategoryCompleted(category, subcategory, tests.length)
  };
};

/**
 * Reset all progress (useful for testing)
 */
export const resetAllProgress = () => {
  localStorage.removeItem("testProgress");
  localStorage.removeItem("subcategoryCompletion");
};