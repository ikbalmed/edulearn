import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import CreateClass from "./pages/CreateClass";
import Lectures from "./pages/Lectures";
import LectureDetail from "./pages/LectureDetail";
import UploadLecture from "./pages/UploadLecture";
import Assignments from "./pages/Assignments";
import AssignmentDetail from "./pages/AssignmentDetail";
import CreateAssignment from "./pages/CreateAssignment";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/ui-custom/NavigationBar";
import AuthProvider, { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-cream text-earthy">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public only route component (for login, register pages)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-cream text-earthy">Loading...</div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/login" 
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/classes" 
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/classes/new" 
          element={
            <ProtectedRoute>
              <CreateClass />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/classes/:id" 
          element={
            <ProtectedRoute>
              <ClassDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lectures" 
          element={
            <ProtectedRoute>
              <Lectures />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lectures/new" 
          element={
            <ProtectedRoute>
              <UploadLecture />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lectures/:id" 
          element={
            <ProtectedRoute>
              <LectureDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/assignments" 
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/assignments/new" 
          element={
            <ProtectedRoute>
              <CreateAssignment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/assignments/:id" 
          element={
            <ProtectedRoute>
              <AssignmentDetail />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <NavigationBar />
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
