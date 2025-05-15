# React Registration & Authentication App

## 📌 Project Description

This project is a multi-step registration and authentication web app built with React, TypeScript, Chakra UI, `react-hook-form`, and `zod`. It demonstrates:
- A modal-based two-step sign-up form
- Live validation with `zod` and form state persistence using `sessionStorage`
- Avatar preview on upload
- localStorage-based user login/logout logic
- Protected routing using `react-router-dom`
- Clean UI using Chakra UI and SCSS styling

## 🚀 Setup Instructions

1. **Clone the repository:**
   git clone https://github.com/tonidobrinski/form-validation.git
   cd form-validation
   npm install

 2. **Start the project:**
    npm run dev

 3. **Folder structure:**
src/
├── assets/               # Static images and icons
├── auth/                 # Protected route authentication
├── components/           # Reusable components
│   ├── NavBar.tsx
│   ├── RegistrationForm.tsx
│   ├── Step1Form.tsx
│   └── Step2Form.tsx
│   ├── WelcomeMessage.tsx
├── pages/                # Route pages
│   └── FormPage.tsx
│   ├── UserPage.tsx      # Protected route
│   ├── HomePage.tsx
├── schemas/              # Zod form schemas
│   └── FormSchema.ts
├── styles/               # SCSS styling files
│   ├── App.scss
│   ├── FormPage.scss
│   ├── NavBar.scss
│   ├── RegistrationForm.scss
│   ├── Step1Form.scss
│   └── Step2Form.scss
│   ├── WelcomeMessage.scss
├── types/                # TypeScript types
│   └── types.ts
├── utils/                # Utils
│ App.tsx                 # App routes
└── main.tsx              # Entry point
