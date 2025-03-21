import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { UserRole } from '@/types';

const Login = () => {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerRole, setRegisterRole] = useState<UserRole>('student');
  const [passwordError, setPasswordError] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      toast({
        title: "Login successful",
        description: "Welcome back to EduLearn!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (registerPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(registerName, registerEmail, registerPassword, registerRole);
      toast({
        title: "Registration successful",
        description: "Welcome to EduLearn!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream to-sage-light/30">
      {/* basic header */}
      <header className="bg-cream shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-earthy rounded-lg flex items-center justify-center">
              <GraduationCap className="text-cream" size={20} />
            </div>
            <span className="font-semibold text-2xl text-earthy-dark">EduLearn</span>
          </Link>
        </div>
      </header>
      
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">Welcome to EduLearn</h1>
            <p className="text-muted-foreground">Your virtual learning platform</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-cream">
                <TabsTrigger value="login" className="data-[state=active]:bg-earthy data-[state=active]:text-cream">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-earthy data-[state=active]:text-cream">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card className="border-sage/20 bg-cream/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-earthy-dark">Login to your account</CardTitle>
                    <CardDescription>
                      Enter your email and password to access your account
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="med@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          className="border-sage/30 focus-visible:ring-earthy"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link to="#" className="text-xs text-earthy hover:underline">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="border-sage/30 focus-visible:ring-earthy pr-10"
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-earthy"
                            onClick={toggleLoginPasswordVisibility}
                          >
                            {showLoginPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-earthy text-cream hover:bg-earthy-dark" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>For demo purposes, use:</p>
                  <p>Teacher: teacher@demo.com (any password)</p>
                  <p>Student: student@demo.com (any password)</p>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <Card className="border-sage/20 bg-cream/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-earthy-dark">Create an account</CardTitle>
                    <CardDescription>
                      Enter your information to create your account
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Med Ikbal"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          required
                          className="border-sage/30 focus-visible:ring-earthy"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="med@example.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                          className="border-sage/30 focus-visible:ring-earthy"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="register-password"
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                            className="border-sage/30 focus-visible:ring-earthy pr-10"
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-earthy"
                            onClick={toggleRegisterPasswordVisibility}
                          >
                            {showRegisterPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={`border-sage/30 focus-visible:ring-earthy pr-10 ${
                              passwordError ? 'border-red-500' : ''
                            }`}
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-earthy"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {passwordError && (
                          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <RadioGroup 
                          value={registerRole} 
                          onValueChange={(value) => setRegisterRole(value as UserRole)}
                          className="flex"
                        >
                          <div className="flex items-center space-x-2 mr-6">
                            <RadioGroupItem value="student" id="student" className="text-sage border-sage/50 focus:ring-earthy" />
                            <Label htmlFor="student">Student</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="teacher" id="teacher" className="text-sage border-sage/50 focus:ring-earthy" />
                            <Label htmlFor="teacher">Teacher</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-earthy text-cream hover:bg-earthy-dark" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
