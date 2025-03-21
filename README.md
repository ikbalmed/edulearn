# EduLearn - Modern Educational Platform Frontend

<div align="center">
  <img src="src/assets/logo.png" alt="EduLearn Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-4.3.0-646CFF.svg)](https://vitejs.dev/)
</div>

## 🌟 Overview

EduLearn is a modern, responsive educational platform that connects teachers and students in a seamless learning environment. Built with React, TypeScript, and Tailwind CSS, it offers a beautiful and intuitive interface for managing classes, lectures, and assignments.

  Preview : https://ikbalmed.github.io/edulearn/

## ✨ Features

- **User Authentication**
  - Secure login and registration system
  - Role-based access (Teacher/Student)
  - JWT token authentication

- **Teacher Dashboard**
  - Create and manage classes
  - Upload and organize lectures
  - Create and grade assignments
  - Track student progress
  - Real-time notifications

- **Student Dashboard**
  - Enroll in classes
  - Access course materials
  - Submit assignments
  - Track grades and progress
  - Receive notifications

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark/Light mode support
  - Interactive components
  - Loading states and animations
  - Error handling and feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ikbalmed/edulearn.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 🔧 Backend Integration

This frontend is designed to work with a Django backend. Here's how to set up the connection:

1. **Backend Requirements**
   - Django 4.x
   - Django REST framework
   - Django CORS headers
   - JWT authentication

2. **API Endpoints**
   The frontend expects the following API endpoints:

   ```
   /api/auth/
   ├── login/         # POST - User login
   ├── register/      # POST - User registration
   ├── logout/        # POST - User logout
   └── user/          # GET - Current user info

   /api/classes/
   ├── /              # GET, POST - List/Create classes
   ├── /<id>/         # GET, PUT, DELETE - Class operations
   └── /<id>/enroll/  # POST - Enroll in class

   /api/lectures/
   ├── /              # GET, POST - List/Create lectures
   └── /<id>/         # GET, PUT, DELETE - Lecture operations

   /api/assignments/
   ├── /              # GET, POST - List/Create assignments
   └── /<id>/         # GET, PUT, DELETE - Assignment operations
   ```

3. **CORS Configuration**
   In your Django settings:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:5173",  # Vite default port
   ]
   ```

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://axios-http.com/) - HTTP Client
- [React Icons](https://react-icons.github.io/react-icons/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── contexts/        # React contexts
├── hooks/          # Custom hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Mohamed Ikbal

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) 