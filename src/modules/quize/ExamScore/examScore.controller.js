import { examModel } from '../../../../DataBase/models/exam.model.js';
import { impoetantQuestionModel } from '../../../../DataBase/models/ImportantQuestions.model.js';
import { userModel } from '../../../../DataBase/models/user.model.js';
import { examScoreModel } from '../../../../DataBase/models/ExamScore.js';
import { catchError } from '../../../middleware/catchError.js';

const submitExam = catchError( async (req, res) => {
  const { examId, answers, startedAt } = req.body;
  
  // أولاً، تحقق إذا كان الطالب قد قدم الامتحان مسبقًا
  const previousScore = await examScoreModel.findOne({ user: req.user._id, exam: examId });
  if (previousScore) {
    return res.status(400).json({ message: "You have already taken this exam and cannot take it again." });
  }

  // answers = [{ questionId, selectedAnswer }]
  const exam = await examModel.findById(examId).populate('questions.qu'); // استرجاع الأسئلة مع إجاباتها الصحيحة
  if (!exam) return res.status(404).json({ message: "Exam not available" });

  // **منع الوصول إلى الامتحان إذا كانت النتيجة موجودة**
  const userHasTakenExam = await examScoreModel.findOne({ user: req.user._id, exam: examId });
  if (userHasTakenExam) {
    return res.status(403).json({ message: "You cannot access this exam again." });
  }

  const now = Date.now();
  const examDurationMs = exam.durationInMinutes * 60 * 1000; // تحويل الدقائق إلى ملي ثانية
  const startedTime = new Date(startedAt).getTime();

  // إذا تجاوز الوقت المحدد
  if (now - startedTime > examDurationMs) {
    return res.status(400).json({ message: "Exam time is over!" });
  }

  let score = 0;
  const answerDetails = [];

  // لاحتساب الإجابات الصحيحة بناءً على الأسئلة المرسلة فقط
  for (const item of answers) {
    const question = exam.questions.find(q => q.qu._id.toString() === item.questionId); // إيجاد السؤال بناءً على المعرف
    if (!question) continue;

    // البحث عن الإجابة الصحيحة
    const correctAnswer = question.qu.answers.find(ans => ans.isCorrect); // إيجاد الإجابة الصحيحة
    let isCorrect = false;

    // إذا كان الطالب قد اختار إجابة

      isCorrect = correctAnswer && correctAnswer.answerText === item.selectedAnswer; // مقارنة الإجابة المختارة مع الإجابة الصحيحة
      if (isCorrect) score++; // زيادة الدرجة في حال الإجابة الصحيحة
   
    answerDetails.push({
      question: question.qu._id,
      selectedAnswer: item.selectedAnswer,
      isCorrect
    });
  }

  // حساب النسبة المئوية
  const total = answers.length; // حساب الإجمالي بناءً على الأسئلة المرسلة فقط
  const percentage = ((score / total) * 100).toFixed(2); // النسبة المئوية بنسبة دقتين

  // إنشاء نتيجة الامتحان
  const newScore = new examScoreModel({
    user: req.user._id,
    exam: examId,
    score, // عدد الإجابات الصحيحة
    total, // الإجمالي
    percentage, // النسبة المئوية
    answers: answerDetails,
    startedAt: new Date(startedAt),
  });

  await newScore.save();

  // تحديث بيانات المستخدم وإضافة النتيجة
  await userModel.findByIdAndUpdate(req.user._id, {
    $push: { ExamScore: newScore._id }
  });

  // إرسال النتيجة للمستخدم
  res.status(200).json({
    message: "The exam was successfully submitted",
    score: `${score} / ${total}`,  // عرض النتيجة بشكل "عدد من الإجمالي"
    percentage: `${percentage}%`,   // عرض النتيجة بالنسب المئوية
    examScoreId: newScore._id
  });

});


const getExamResult =catchError( async (req, res) => {
 console.log(req.user._id,req.params.id);
 
    // استخدام معرف الطالب للحصول على نتيجة الامتحان الخاصة به
    const examResult = await examScoreModel.findOne({ user: req.user._id, exam: req.params.id }).populate('user', 'name email'); // جلب اسم الطالب والبريد الإلكتروني مع النتيجة
    
    if (!examResult) {
      return res.status(404).json({ message: "No result found for this exam" });
    }

    // إذا كانت النتيجة موجودة، إعرضها
    res.status(200).json({
      message: "Exam result fetched successfully",
      user:examResult.user,
      score: `${examResult.score} / ${examResult.total}`,
      percentage: `${examResult.percentage}%`,
      answers: examResult.answers, // عرض تفاصيل الإجابات
      startedAt: examResult.startedAt,
    });
    

})


const getAllExamResults = catchError(async (req, res) => {
  

  // استرجاع الامتحان باستخدام examId
  const exam = await examModel.findById( req.params.id);
  if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
  }

  // استرجاع جميع نتائج الامتحان للطلاب
  const examScores = await examScoreModel.find({ exam:  req.params.id }).populate('user', 'name email'); // جلب اسم الطالب والبريد الإلكتروني مع النتيجة

  if (examScores.length === 0) {
      return res.status(404).json({ message: "No results found for this exam" });
  }

  // تجهيز البيانات للعرض
  const results = examScores.map(score => {
      return {
          studentName: score.user.name, // اسم الطالب
          studentEmail: score.user.email, // البريد الإلكتروني للطالب
          score: `${score.score} / ${score.total}`,  // النتيجة بشكل "عدد من الإجمالي"
          percentage: `${score.percentage}%`,  // النسبة المئوية
      };
  });

  // إرسال البيانات للعميل
  res.status(200).json({
      message: "Exam results retrieved successfully",
      results
  });
});

  

  
export { submitExam,getExamResult,getAllExamResults };