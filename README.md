# **JobNest - MERN Stack Job Portal**

**JobNest** is a comprehensive job portal application that connects recruiters and job seekers, providing a streamlined platform for both to interact effectively. Built using the MERN stack, it offers a full-stack solution that is scalable, and feature-rich.

---

## **Key Features**

### **For Recruiters:**
- **Company Management**: Create and manage detailed company profiles to represent your brand.
- **Job Listings**: Post and update job opportunities effortlessly to ensure candidates have access to the latest positions.
- **Applicant Tracking**: Review applications and resumes, track applicants' progress, and manage the recruitment process in real time.

### **For Job Seekers:**
- **Job Search**: Search for jobs tailored to your skills and preferences, with advanced filtering for a personalized experience.
- **Easy Application Process**: Apply directly to jobs through the platform with an intuitive user interface.
- **Profile & Resume Upload**: Enhance your profile with resume uploads and profile pictures to stand out to potential employers.

---

## **Technologies Used**
- **Frontend**: ReactJS, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Other Services**: Twilio (for SMS notifications), Cloudinary (for file uploads)

---

## **Getting Started**

### **Prerequisites**
- **Node.js** (version 14 or higher recommended)
- **MongoDB** (local or remote setup)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/jobnest.git
   cd jobnest
   ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

### **Environment Variables**
Ensure you have the following environment variables configured:
- **MongoDB URI**: For connecting to the MongoDB database.
- **Cloudinary API**: For file uploads.
- **Twilio API**: For SMS service.

---

## **How to Run the Project**

1. **Start Backend**:
   - Run the backend server using:
     ```bash
     npm start
     ```

2. **Start Frontend**:
   - Navigate to the frontend directory and run:
     ```bash
     npm start
     ```

---

## **Folder Structure**

The project has been structured to ensure modularity and scalability:

```
job-nest/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
└── README.md
```

---

## **Contribution**

Feel free to fork this repository and make contributions. For major changes, please open an issue first to discuss what you would like to change.

---

## **Contact**

For any inquiries or issues, please contact the project maintainer:
- **Email**: manojk124.mk@gmail.com
- **GitHub**: https://github.com/i-am-mk
