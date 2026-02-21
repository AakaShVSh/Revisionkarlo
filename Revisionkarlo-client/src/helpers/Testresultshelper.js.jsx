import { setLocalStorage } from "./localStorage";

/**
 * Save test results after test completion
 * Call this function when user finishes a test
 *
 * @param {number} testIndex - Index of the test from allTypeWiseTests array
 * @param {object} results - Test results object
 * @param {number} results.score - Final score
 * @param {number} results.correctAnswers - Number of correct answers
 * @param {number} results.incorrectAnswers - Number of incorrect answers
 * @param {boolean} results.completed - Whether test was completed
 */
export const saveTestResults = (testIndex, results) => {
  const testResult = {
    score: results.score || 0,
    correctAnswers: results.correctAnswers || 0,
    incorrectAnswers: results.incorrectAnswers || 0,
    completed: true,
    completedAt: new Date().toISOString(),
    ...results, // Include any additional data
  };

  // Save to localStorage with unique key
  setLocalStorage(`testResult_${testIndex}`, testResult);

  // Dispatch custom event to notify components
  window.dispatchEvent(
    new CustomEvent("testCompleted", { detail: testResult }),
  );

  return testResult;
};

/**
 * Get test results for a specific test
 *
 * @param {number} testIndex - Index of the test
 * @returns {object|null} Test results or null if not found
 */
export const getTestResults = (testIndex) => {
  const results = localStorage.getItem(`testResult_${testIndex}`);
  return results ? JSON.parse(results) : null;
};

/**
 * Check if a test has been completed
 *
 * @param {number} testIndex - Index of the test
 * @returns {boolean} True if test is completed
 */
export const isTestCompleted = (testIndex) => {
  const results = getTestResults(testIndex);
  return results?.completed === true;
};

/**
 * Get all completed test results
 *
 * @returns {array} Array of completed test results
 */
export const getAllCompletedTests = () => {
  const completed = [];
  const allTypeWiseTests = JSON.parse(
    localStorage.getItem("allTypeWiseTests") || "[]",
  );

  allTypeWiseTests.forEach((test, index) => {
    const results = getTestResults(index);
    if (results?.completed) {
      completed.push({
        ...test,
        testIndex: index,
        results,
      });
    }
  });

  return completed;
};
