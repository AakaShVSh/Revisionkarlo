const express = require("express");
const router = express.Router();
const Test = require("../models/Test.model");
const Result = require("../models/Result.model");
const Question = require("../models/Question.model");

const toSlug = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

/* ─────────────────────────────────────────────
   POST /tests/create
   Body: {
     title,                        required
     createdBy,                    required (userId)
     coachingId?,                  link to a Coaching doc
     examType?,                    "SSC"|"UPSC"|"BANKING"|"RAILWAY"|"STATE_PSC"|"OTHER"
     subject?,                     "math"|"english"|"gs"|"vocabulary"|"reasoning"
     difficultyLevel?,             "easy"|"medium"|"hard"
     timeLimitMin?,                default 30
     visibility?,                  "public" (default) | "private"
     password?,                    only used when visibility=private
     slug?,                        auto-generated from title+timestamp if not passed
     questionDocIds?: [ObjectId],  pull all question items from these Question docs
     inlineQuestions?: [{...}]     OR pass question items directly in the body
   }
   Both questionDocIds and inlineQuestions can be combined.
───────────────────────────────────────────── */
router.post("/create", async (req, res) => {
  try {
    const { title, questionDocIds, inlineQuestions, ...rest } = req.body;
    if (!title) return res.status(400).send({ message: "title is required" });
    if (!rest.createdBy)
      return res
        .status(400)
        .send({ message: "createdBy (userId) is required" });

    rest.slug = rest.slug || `${toSlug(title)}-${Date.now()}`;

    let questions = [];

    if (Array.isArray(questionDocIds) && questionDocIds.length > 0) {
      const docs = await Question.find({ _id: { $in: questionDocIds } })
        .lean()
        .exec();
      docs.forEach((doc) => {
        doc.question.forEach((item) => {
          questions.push({ questionDocId: doc._id, ...item });
        });
      });
    }

    if (Array.isArray(inlineQuestions) && inlineQuestions.length > 0) {
      questions = [...questions, ...inlineQuestions];
    }

    const test = await Test.create({ title, questions, ...rest });
    return res.status(201).send({ message: "Test created", data: test });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .send({
          message: "Slug conflict. Change title or pass a custom slug.",
        });
    return res.status(400).send({ message: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /tests
   Returns test metadata only (no questions, no password).
   Examples:
     GET /tests
     GET /tests?coachingId=xxx
     GET /tests?examType=SSC
     GET /tests?subject=math&visibility=public
───────────────────────────────────────────── */
router.get("/", async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.coachingId) filter.coachingId = req.query.coachingId;
    if (req.query.examType) filter.examType = req.query.examType;
    if (req.query.subject) filter.subject = req.query.subject.toLowerCase();
    if (req.query.visibility) filter.visibility = req.query.visibility;

    const tests = await Test.find(filter)
      .select("-questions -password")
      .lean()
      .exec();
    return res.status(200).send({ status: 200, data: tests });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /tests/id/:id
   Get full test by mongo _id (admin / coach use).
   Returns questions but strips the password field.
───────────────────────────────────────────── */
router.get("/id/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).lean().exec();
    if (!test) return res.status(404).send({ message: "Not found" });
    const { password: _p, ...safeTest } = test;
    return res.status(200).send({ status: 200, data: safeTest });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /tests/:id/leaderboard
   Top 20 results for a test sorted by score desc, time asc.
   NOTE: declared before /:slug so "leaderboard" is not treated as a slug.
───────────────────────────────────────────── */
router.get("/:id/leaderboard", async (req, res) => {
  try {
    const results = await Result.find({ testId: req.params.id })
      .sort({ scorePercentage: -1, timeTakenSec: 1 })
      .limit(20)
      .populate("studentId", "Name Email")
      .select("-questions -allAnswer")
      .lean()
      .exec();
    return res.status(200).send({ status: 200, data: results });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   GET /tests/:slug
   Public test page by URL slug.
   Private tests require ?password=xxx in query.
   Password field is always stripped from the response.
───────────────────────────────────────────── */
router.get("/:slug", async (req, res) => {
  try {
    const test = await Test.findOne({ slug: req.params.slug, isActive: true })
      .lean()
      .exec();
    if (!test) return res.status(404).send({ message: "Test not found" });

    if (test.visibility === "private") {
      if (!req.query.password || req.query.password !== test.password) {
        return res
          .status(403)
          .send({
            message: "Invalid or missing password for this private test",
          });
      }
    }

    const { password: _p, ...safeTest } = test;
    return res.status(200).send({ status: 200, data: safeTest });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   PATCH /tests/:id
   Update any field: title, examType, timeLimitMin,
   visibility, password, isActive, questions array …
───────────────────────────────────────────── */
router.patch("/:id", async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
    if (!test) return res.status(404).send({ message: "Not found" });
    return res
      .status(200)
      .send({ message: "Test updated successfully", data: test });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

/* ─────────────────────────────────────────────
   DELETE /tests/:id  (soft delete)
───────────────────────────────────────────── */
router.delete("/:id", async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    )
      .lean()
      .exec();
    if (!test) return res.status(404).send({ message: "Not found" });
    return res.status(200).send({ message: "Test deactivated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
