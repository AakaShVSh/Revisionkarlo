const express = require("express");
const router = express.Router();
const Result = require("../models/Result.model");
const Test = require("../models/Test.model");

/* ─────────────────────────────────────────────
   POST /results/submit
   Called by frontend when a student finishes a test.
   Body: {
     studentId,           required
     testId,              required
     coachingId?,
     totalQuestions, attempted, correct, wrong, skipped,
     score,               raw mark (correct - penalty)
     scorePercentage,     0-100
     timeTakenSec,
     answeredQuestion, notAnswer, markedAndAnswer, markedNotAnswer,
     wrongansqus, correctQus,
     allAnswer,           { "0": "selected option", "1": "selected option", ... }
     questions            snapshot of question items for review page
   }
───────────────────────────────────────────── */
router.post("/submit", async (req, res) => {
  try {
    const { studentId, testId } = req.body;
    if (!studentId)
      return res.status(400).send({ message: "studentId is required" });
    if (!testId) return res.status(400).send({ message: "testId is required" });

    const test = await Test.findById(testId).lean().exec();
    if (!test) return res.status(404).send({ message: "Test not found" });

    const result = await Result.create(req.body);

    // Increment attempt counter without blocking the response
    Test.findByIdAndUpdate(testId, { $inc: { totalAttempts: 1 } })
      .exec()
      .catch(() => {});

    return res.status(201).send({ message: "Result saved", data: result });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /results/student/:studentId
   All results for one student — history / dashboard view.
   Questions and allAnswer omitted for a lighter payload.
   Examples:
     GET /results/student/:id
     GET /results/student/:id?testId=xxx   → filter by one test
───────────────────────────────────────────── */
router.get("/student/:studentId", async (req, res) => {
  try {
    const filter = { studentId: req.params.studentId };
    if (req.query.testId) filter.testId = req.query.testId;

    const results = await Result.find(filter)
      .sort({ createdAt: -1 })
      .populate("testId", "title examType timeLimitMin slug")
      .select("-questions -allAnswer")
      .lean()
      .exec();
    return res.status(200).send({ status: 200, data: results });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /results/test/:testId
   All results for a test — admin / coach leaderboard view.
   Sorted by score desc, time asc.
───────────────────────────────────────────── */
router.get("/test/:testId", async (req, res) => {
  try {
    const results = await Result.find({ testId: req.params.testId })
      .sort({ scorePercentage: -1, timeTakenSec: 1 })
      .populate("studentId", "Name Email Phone")
      .select("-questions -allAnswer")
      .lean()
      .exec();
    return res.status(200).send({ status: 200, data: results });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /results/:id
   Single result with full detail — used by ResultPage and ReviewTest.
   Includes questions snapshot and allAnswer map.
───────────────────────────────────────────── */
router.get("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("testId", "title examType timeLimitMin slug")
      .populate("studentId", "Name Email")
      .lean()
      .exec();
    if (!result) return res.status(404).send({ message: "Result not found" });
    return res.status(200).send({ status: 200, data: result });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   DELETE /results/:id
───────────────────────────────────────────── */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Result.findByIdAndDelete(req.params.id).exec();
    if (!deleted) return res.status(404).send({ message: "Not found" });
    return res.status(200).send({ message: "Result deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
