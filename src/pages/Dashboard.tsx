import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  BookOpen, 
  ClipboardList, 
  GraduationCap,
  BookMarked, 
  Clock, 
  Users,
  CalendarDays,
  School
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  // Stats for dashboard
  const stats = [
    {
      title: isTeacher ? 'Classes' : 'Enrolled Classes',
      value: isTeacher ? '4' : '3',
      icon: BookMarked,
      color: 'bg-sage-light text-earthy-dark',
    },
    {
      title: isTeacher ? 'Students' : 'Completed Lectures',
      value: isTeacher ? '93' : '1',
      icon: isTeacher ? Users : BookOpen,
      color: 'bg-earthy-light text-earthy-dark',
    },
    {
      title: isTeacher ? 'Lectures' : 'Pending Assignments',
      value: isTeacher ? '1' : '1',
      icon: isTeacher ? BookOpen : ClipboardList,
      color: 'bg-sage-light text-earthy-dark',
    },
    {
      title: isTeacher ? 'Assignments' : 'Assignment Grade',
      value: isTeacher ? '1' : '92%',
      icon: isTeacher ? ClipboardList : Clock,
      color: 'bg-cream-light text-earthy-dark',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-earthy-dark">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {isTeacher
              ? "Manage your classes, lectures, and assignments"
              : "Continue your learning journey"}
          </p>
        </div>

        {/* stats sect */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="flex items-center p-6">
                    <div className={`${stat.color} p-3 rounded-full mr-4`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* content sect */}
        {isTeacher && (
          <section className="mb-12">
            <div className="flex flex-wrap gap-2">
              <Button asChild className="bg-earthy text-cream hover:bg-earthy-dark">
                <Link to="/classes/new">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Create Class
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-earthy text-earthy hover:bg-earthy hover:text-cream">
                <Link to="/lectures/new">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Upload Lecture
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-earthy text-earthy hover:bg-earthy hover:text-cream">
                <Link to="/assignments/new">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Create Assignment
                </Link>
              </Button>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-earthy-dark">Academic Information</h2>
          <Card className="border-sage/30">
            <CardContent className="p-6">
              {isTeacher ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-earthy-light p-3 rounded-full mr-4">
                      <School className="h-5 w-5 text-earthy-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Department</h3>
                      <p className="text-muted-foreground">English & Comparative Literature</p>
                      <p className="text-muted-foreground">Faculty ID: ENG-FAC-203</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sage-light p-3 rounded-full mr-4">
                      <Users className="h-5 w-5 text-earthy-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Colleague</h3>
                      <p className="text-muted-foreground">Dr. Emily Chen, Modernist Literature</p>
                      <p className="text-muted-foreground">Office: Humanities Building, Room 308</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-cream-light p-3 rounded-full mr-4">
                      <CalendarDays className="h-5 w-5 text-earthy-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Academic Year</h3>
                      <p className="text-muted-foreground">2025/2026</p>
                      <p className="text-muted-foreground">Office Hours: Mon & Wed, 2-4pm</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-sage-light p-3 rounded-full mr-4">
                      <School className="h-5 w-5 text-earthy-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Program</h3>
                      <p className="text-muted-foreground">Bachelor of Arts in English Literature</p>
                      <p className="text-muted-foreground">Student ID: LIT-23-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-earthy-light p-3 rounded-full mr-4">
                      <GraduationCap className="h-5 w-5 text-earthy-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Class</h3>
                      <p className="text-muted-foreground">Junior Year, Group B</p>
                      <p className="text-muted-foreground">Advisor: Dr. Michael Thompson</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-cream-light p-3 rounded-full mr-4">
                      <CalendarDays className="h-5 w-5 text-earthy-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Academic Year</h3>
                      <p className="text-muted-foreground">2025/2026</p>
                      <p className="text-muted-foreground">Fall Semester</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
<<<<<<< HEAD
=======
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-earthy-dark">Coming Soon</h2>
          <p className="text-muted-foreground">
            We're working on adding more dashboard features. Please check back soon for updates.
          </p>
>>>>>>> 58fa0d8a662e0a9b1e524a6479fdf45c272f2faf
        </section>

        
      </main>
    </motion.div>
  );
};

export default Dashboard;