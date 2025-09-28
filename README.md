# 🚀 E-Learning API Project using Node.js, Express & MongoDB 🎓

I’m excited to share one of my latest backend projects – a fully functional **E-learning API** built with **Node.js, Express, and MongoDB**.  
This API is designed to power online learning platforms by managing courses, lessons, exams, users, and payments in a clean, scalable way.

---

## 🔹 Key Features

- **Course Management**: Full CRUD operations for courses with fields like title, description, price, duration, etc.  
- **Lesson Management**: Instructors can create and manage lessons with video content and descriptions.  
- **Exam & Score Handling**: Users can take exams, and their scores are automatically calculated and saved for performance tracking.  
- **Important Questions**: Admins can highlight key questions per course for focused learning.  
- **User Authentication & Roles**: Secure login system with password reset, role-based access, and account management.  
- **Payment Gateway Integration**: Users can purchase courses through secure and flexible payment methods.  
- **Structured Models**: Clean database schema for courses, users, exams, lessons, and weeks to ensure scalable data flow.  

---

## 🔧 Technical Overview

- **MongoDB + Mongoose** for smooth database operations.  
- **Express.js** to handle routing, middleware, and error handling.  
- **Controllers & Routes** for each feature to ensure clean and modular code.  
- **Middleware** for input validation and custom error handling.  
- **Additional Services** like email notifications, FTP integration, and media uploads.  
- **Integrated Payment Gateway** for seamless course purchases.  

---

## 💡 How it Works

Each component (**courses, users, lessons, exams**) is modular and organized through **models, controllers, and routes**.  
The API handles everything from **user signup and course enrollment** to **exams and payments** – making it a powerful backend for any e-learning platform.

---

## 📄 API Documentation

You can explore and test the API endpoints using **Postman** here:  
👉 [Postman Documentation]( https://documenter.getpostman.com/view/29857925/2sB2cbZxw2 )

---

## 🔗 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Middleware**: Input validation, error handling  
- **Services**: Email notifications, FTP, Payment Gateway  


## 🛠️ Technology Stack Overview

This project is built with a modern, scalable, and secure technology stack:

| **Category**        | **Technologies**                                                                 |
|----------------------|----------------------------------------------------------------------------------|
| **Framework**        | Node.js, Express.js                                                             |
| **Language**         | JavaScript (ES6+)                                                               |
| **Database**         | MongoDB with Mongoose ODM                                                       |
| **Authentication**   | JWT (JSON Web Token), bcrypt (password hashing)                                 |
| **Payments**         | Stripe / PayPal (integration ready)                                             |
| **File Storage**     | Local Storage / S3-Compatible (AWS S3, Google Cloud Storage – optional)         |
| **Emails**           | Nodemailer (SMTP) / SendGrid / Mailgun (optional)                               |
| **Media Handling**   | Multer (file uploads), Cloud storage integration                                |
| **Validation**       | Express Validator / Custom Middleware                                            |
| **Deployment**       | Docker, Render, Heroku, AWS EC2, or any Node.js-supported cloud service         |
| **Documentation**    | Postman API Docs                                                                |



---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/e-learning-api.git
cd e-learning-api

# Install dependencies
npm install

# Create .env file and configure environment variables
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PAYMENT_GATEWAY_KEY=your_payment_key


# Run the server
nodemon

## 🛠️ Project Structure

```bash
e-learning-api/
│── .env                   # Environment variables
│── package.json
│── package-lock.json
│── server.js              # Application entry point
│── node_modules/
│
├── DataBase/
│   ├── DBconnection.js     # MongoDB connection setup
│   └── models/             # All Mongoose models
│       ├── userModel.js
│       ├── coursModel.js
│       ├── lessonModel.js
│       ├── weekModel.js
│       ├── examModel.js
│       ├── examScoreModel.js
│       └── impoetantQuestionModel.js
│
├── src/
│   ├── middleware/         # Middlewares
│   │   ├── catchError.js
│   │   ├── emailExist.js
│   │   ├── globalError.js
│   │   └── validation.js
│   │
│   ├── modules/            # Features (Modules: user, course, lesson, etc.)
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   └── user.validation.js
│   │   ├── cours/
│   │   │   ├── cours.controller.js
│   │   │   ├── cours.routes.js
│   │   │   └── cours.validation.js
│   │   ├── lesson/
│   │   │   ├── lesson.controller.js
│   │   │   ├── lesson.routes.js
│   │   │   └── lesson.validation.js
│   │   ├── week/
│   │   │   ├── week.controller.js
│   │   │   ├── week.routes.js
│   │   │   └── week.validation.js
│   │   ├── quize/
│   │   │   ├── quize.controller.js
│   │   │   ├── quize.routes.js
│   │   │   └── quize.validation.js
│   │   ├── question/
│   │   │   ├── question.controller.js
│   │   │   ├── question.routes.js
│   │   │   └── question.validation.js
│   │   ├── handlers/
│   │   │   └── globalHandler.js
│   │   └── index.routes.js # Main router entry point
│   │
│   ├── services/           # Services (Email, File Upload, FTP)
│   │   ├── email/
│   │   │   ├── emailTemplate.js
│   │   │   └── sendEmail.js
│   │   ├── fileUpload/
│   │   │   └── fileUpload.js
│   │   └── ftp.js
│   │
│   └── utils/              # Utility functions
│       ├── apiFeatures.js
│       └── appError.js
