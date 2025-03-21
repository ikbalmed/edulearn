import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Clock, 
  BookOpen, 
  ClipboardList, 
  Check 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Class } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const isTeacher = user?.role === 'teacher' && user?.id === classData?.teacherId;
  
  useEffect(() => {
    const fetchClassData = () => {
      setLoading(true);
      setTimeout(() => {
        const classDetails: { [key: string]: Class } = {
          '1': {
            id: '1',
            title: 'Shakespeare\'s Tragedies',
            description: 'An in-depth exploration of Shakespeare\'s major tragedies including Hamlet, Macbeth, and King Lear. This comprehensive course delves into the complex themes, memorable characters, and dramatic techniques that have made these works timeless masterpieces.',
            teacherId: 'teacher1',
            teacherName: 'Dr. Anne Rowe',
            studentCount: 24,
            createdAt: '2025-03-20',
            imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974'
          },
          '2': {
            id: '2',
            title: 'Victorian Literature',
            description: 'Study the major works of Victorian literature, including Charles Dickens, the Brontë sisters, and Thomas Hardy. Explore social, political, and cultural contexts of the Victorian era.',
            teacherId: 'teacher2',
            teacherName: 'Prof. John Davis',
            studentCount: 18,
            createdAt: '2025-03-20',
            imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070'
          },
          '3': {
            id: '3',
            title: 'Modernist Poetry',
            description: 'Examine the works of T.S. Eliot, Ezra Pound, and other modernist poets. Focus on experimental forms and themes of alienation and fragmentation.',
            teacherId: 'teacher3',
            teacherName: 'Sarah Johnson',
            studentCount: 30,
            createdAt: '2025-03-20',
            imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070'
          },
          '4': {
            id: '4',
            title: 'American Literature',
            description: 'Survey of American literary movements from the Colonial period to the present, including works by Edgar Allan Poe, Mark Twain, and Toni Morrison.',
            teacherId: 'teacher1',
            teacherName: 'Dr. Jane Smith',
            studentCount: 22,
            createdAt: '2025-03-20',
            imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070'
          }
        };

        const selectedClass = classDetails[id || '1'];
        setClassData(selectedClass);
        setLoading(false);
      }, 500);
    };

    fetchClassData();
    
    const checkEnrollmentStatus = () => {
      const enrolledClasses = JSON.parse(localStorage.getItem('enrolledClasses') || '[]');
      setIsEnrolled(enrolledClasses.includes(id));
    };
    
    if (user) {
      checkEnrollmentStatus();
    }
  }, [id, user]);

  const handleEnrollment = () => {
    const enrolledClasses = JSON.parse(localStorage.getItem('enrolledClasses') || '[]');
    
    if (!enrolledClasses.includes(id)) {
      enrolledClasses.push(id);
      localStorage.setItem('enrolledClasses', JSON.stringify(enrolledClasses));
      setIsEnrolled(true);
      toast({
        title: "Success!",
        description: `You are now enrolled in ${classData?.title}`,
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <p className="text-earthy">Loading class details...</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="container py-8 text-center">
        <p className="text-red-500">Class not found</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/classes">Back to Classes</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="p-0 h-auto font-normal">
            <Link to="/classes" className="flex items-center text-muted-foreground hover:text-earthy">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Classes
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-earthy-dark">{classData.title}</h1>
              <p className="text-muted-foreground mb-4">Taught by {classData.teacherName}</p>
              
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-6 bg-sage/10">
                {classData.imageUrl ? (
                  <img 
                    src={classData.imageUrl} 
                    alt={classData.title} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-sage/20 to-earthy/10">
                    <BookOpen className="h-16 w-16 text-earthy/60" />
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-earthy-dark">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{classData.description}</p>
              </div>
              
              {(isEnrolled || isTeacher) ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-earthy-dark">Lectures</h2>
                  <Card className="hover:border-earthy/30 cursor-pointer transition-all duration-200">
                    <CardContent className="p-4">
                      <p className="text-center text-muted-foreground py-8">
                        Course lectures will appear here once available.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="p-4 bg-sage/10 rounded-lg border border-sage/20 text-center">
                  <p className="text-muted-foreground">
                    Enroll in this class to access lectures and assignments
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg text-earthy-dark">Class Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5 text-earthy" />
                    <div>
                      <p>{classData.studentCount} Students enrolled</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-earthy" />
                    <div>
                      <p>Created on {new Date(classData.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5 text-earthy" />
                    <div>
                      <p>{(() => {
                        switch(id) {
                          case '1': return '12 weeks';
                          case '2': return '10 weeks';
                          case '3': return '8 weeks';
                          case '4': return '14 weeks';
                          default: return '12 weeks';
                        }
                      })()} course duration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <BookOpen className="h-5 w-5 text-earthy" />
                    <div>
                      <p>{(() => {
                        const count = (() => {
                          switch(id) {
                            case '1': return 15;
                            case '2': return 12;
                            case '3': return 10;
                            case '4': return 16;
                            default: return 12;
                          }
                        })();
                        return `${count} ${count === 1 ? 'lecture' : 'lectures'}`;
                      })()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <ClipboardList className="h-5 w-5 text-earthy" />
                    <div>
                      <p>{(() => {
                        const count = (() => {
                          switch(id) {
                            case '1': return 0;
                            case '2': return 0;
                            case '3': return 1;
                            case '4': return 0;
                            default: return 0;
                          }
                        })();
                        return `${count} ${count === 1 ? 'assignment' : 'assignments'}`;
                      })()}</p>
                    </div>
                  </div>
                </div>
                
                {!isTeacher && (
                  isEnrolled ? (
                    <Button className="w-full mt-4 bg-sage text-white cursor-default" disabled>
                      <Check className="mr-2 h-4 w-4" />
                      Enrolled
                    </Button>
                  ) : (
                    <Button 
                      className="w-full mt-4 bg-earthy text-cream hover:bg-earthy-dark"
                      onClick={handleEnrollment}
                    >
                      Enroll in This Class
                    </Button>
                  )
                )}
              </CardContent>
            </Card>
            
            {(isEnrolled || isTeacher) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-earthy-dark mb-4">Upcoming Assignments</h3>
                  <p className="text-center text-muted-foreground py-4">
                    No upcoming assignments
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ClassDetail;

