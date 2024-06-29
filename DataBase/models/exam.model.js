// models/examModel.js
import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    required: true
},
  questions: [ 
    {
      qu:{
        type: mongoose.Types.ObjectId,
        ref: "impoetantQuestion" // استخدام اسم الموديل الذي تم إنشاؤه سابقًا
  }
    }
  ],
  durationInMinutes: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  weekId: {
    type:mongoose.Types.ObjectId,
    ref:"week"
},
}, { timestamps: true });








export  const examModel = mongoose.model('Exam', examSchema);
