const mongoose = require("mongoose");
const crypto = require("crypto");

/**
 * Test = a set of questions created by a coaching (or admin).
 * Questions are embedded (copied) so the test is immutable
 * even if the source Question document changes later.
 */
const TestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    coachingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coaching",
      default: null,
    },
    examType: {
      type: String,
      enum: [
        "SSC",
        "UPSC",
        "BANK",
        "RAILWAY",
        "STATE",
        "DEFENCE",
        "OTHER",
        "GENERAL",
      ],
      default: "GENERAL",
    },
    subject: { type: String, lowercase: true, trim: true, default: "" },

    // Embedded questions (copy of question items at creation time)
    questions: [
      {
        qus: { type: String, required: true },
        qush: { type: String, default: "" },
        options: { type: [String], required: true },
        optionsh: { type: [String], default: [] },
        answer: { type: Number, required: true }, // 0-based index of correct option
        explanation: { type: String, default: "" },
        explanationh: { type: String, default: "" },
        exam: { type: String, default: "" },
        sourceId: { type: mongoose.Schema.Types.ObjectId, default: null }, // original question _id
      },
    ],

    timeLimit: { type: Number, default: 30 }, // minutes
    totalMarks: { type: Number, default: 0 }, // auto = questions.length

    // public  → anyone with the link can attempt
    // private → needs password OR accessToken link
    accessType: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    password: { type: String, default: "" }, // for private tests
    accessToken: { type: String, default: "" }, // random token for shareable private link

    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

// Auto-set totalMarks and generate accessToken before save
TestSchema.pre("save", function (next) {
  this.totalMarks = this.questions.length;
  if (!this.accessToken) {
    this.accessToken = crypto.randomBytes(16).toString("hex");
  }
  next();
});

TestSchema.index({ coachingId: 1, examType: 1 });
TestSchema.index({ accessToken: 1 });

module.exports = mongoose.model("Test", TestSchema);
