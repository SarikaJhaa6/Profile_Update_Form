# Multi-Step User Profile Update Form

A full-stack MERN project to build a multi-step user profile update form with real-time validations, dynamic fields, and secure file uploads. This project is a part of a job interview task for the **Junior Developer (MERN)** role.

## 📌 Project Overview

This form allows users to update their profile details across multiple steps, with a focus on validation, conditional logic, and dynamic behavior.

### 🔹 Key Features

• Multi-step form with sections:  
  – Step 1: Personal Info (Profile Photo, Username, Password)  
  – Step 2: Professional Details (Profession, Company Name, Address)  
  – Step 3: Preferences (Country, State, City, Subscription, Newsletter)  
  – Final: Summary page before submission

• Real-time form validations:  
  – Username availability check via API  
  – Password strength meter (min 8 chars, 1 special char, 1 number)  
  – Current password required for password update

• Dynamic fields based on user inputs:  
  – Show additional textbox if "Other" is selected for Gender  
  – Show/Hide company details based on selected Profession  
  – Dependent dropdowns: Country → State → City (data fetched from backend)

• Profile photo upload (JPG/PNG, max 2MB) with live preview

• Conditional logic:  
  – Reset address fields when Country changes  
  – Disable future dates in Date of Birth

• Data saved to MongoDB on final submission

## 🚀 Tech Stack

• **Frontend**: React, Axios  
• **Backend**: Node.js, Express, Multer  
• **Database**: MongoDB Atlas  
• **Deployment**:  
  – Frontend on Vercel  
  – Backend on Render  

## 📡 API Endpoints

• `GET /api/user/check-username/:username` – Check username availability  
• `GET /api/meta/countries` – Fetch countries  
• `GET /api/meta/states/:country` – Fetch states based on country  
• `GET /api/meta/cities/:state` – Fetch cities based on state  
• `POST /api/users/profile` – Submit form data

## 🌐 Live Demo

• Frontend (Vercel): [https://profile-update-form.vercel.app/]
• Backend (Render)

## 🛠️ Setup Instructions

1. **Clone the repository**:  
   `git clone https://github.com/SarikaJhaa6/Profile_Update_Form.git`

2. **Install dependencies**:  
   – Frontend:  
     `cd client`  
     `npm install`  
   – Backend:  
     `cd server`  
     `npm install`

3. **Run the project locally**:  
   – Frontend:  
     `cd client`  
     `npm start`  
   – Backend:  
     `cd server`  
     `npm start`

4. **MongoDB**: Use your MongoDB Atlas URI in the backend `.env` file.

## 📁 Folder Structure

• `/client` – React frontend  
• `/server` – Node.js backend  
• `README.md` – Project documentation

## 📦 Deployment Notes

• Frontend deployed on Vercel  
• Backend deployed on Render  
• Both connected via APIs

---

This project showcases **React, Node.js, MongoDB integration** with a focus on **real-world form handling**: dynamic fields, conditional logic, and secure data submission.

