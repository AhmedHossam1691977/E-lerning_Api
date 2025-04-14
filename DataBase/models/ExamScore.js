// models/ExamScore.js
import mongoose from "mongoose";

const examScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  exam: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  answers: [
    {
      question: {
        type: mongoose.Types.ObjectId,
        ref: "Question"
      },
      selectedAnswer: {
        type:String,
        default: null
      },
      isCorrect: Boolean
    }
  ],
  startedAt: Date,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  percentage: {
    type: Number,
    required: true
  }
});



export const examScoreModel= mongoose.model("ExamScore", examScoreSchema);
