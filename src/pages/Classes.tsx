import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Plus, Users, CalendarClock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Class } from '@/types';

const Classes = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  // Mock data for classes
  const mockClasses: Class[] = [
    {
      id: '1',
      title: 'Shakespeare\'s Tragedies',
      description: 'An in-depth exploration of Shakespeare\'s major tragedies including Hamlet, Macbeth, and King Lear. Analyze themes, characters, and dramatic techniques.',
      teacherId: 'teacher1',
      teacherName: 'Dr. Anne Rowe',
      studentCount: 24,
      createdAt: '2025-03-20',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974'
    },
    {
      id: '2',
      title: 'Victorian Literature',
      description: 'Study the major works of Victorian literature, including Charles Dickens, the Brontë sisters, and Thomas Hardy. Explore social, political, and cultural contexts.',
      teacherId: 'teacher2',
      teacherName: 'Prof. John Davis',
      studentCount: 18,
      createdAt: '2025-03-20',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070'
    },
    {
      id: '3',
      title: 'Modernist Poetry',
      description: 'Examine the works of T.S. Eliot, Ezra Pound, and other modernist poets. Focus on experimental forms and themes of alienation and fragmentation.',
      teacherId: 'teacher3',
      teacherName: 'Sarah Johnson',
      studentCount: 30,
      createdAt: '2025-03-20',
      imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070'
    },
    {
      id: '4',
      title: 'American Literature',
      description: 'Survey of American literary movements from the Colonial period to the present, including works by Edgar Allan Poe, Mark Twain, and Toni Morrison.',
      teacherId: 'teacher1',
      teacherName: 'Dr. Jane Smith',
      studentCount: 22,
      createdAt: '2025-03-20',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="container py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center rounded-lg bg-sage/20 px-3 py-1 text-sm mb-2 text-earthy">
              <GraduationCap className="mr-1 h-4 w-4" />
              <span>Classes</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              {isTeacher ? 'Manage Your Classes' : 'Explore Classes'}
            </h1>
            <p className="text-muted-foreground">
              {isTeacher 
                ? 'Create, manage, and organize your classes'
                : 'Discover and enroll in new learning opportunities'}
            </p>
          </div>
          {isTeacher && (
            <Button asChild className="bg-earthy text-cream hover:bg-earthy-dark">
              <Link to="/classes/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Class
              </Link>
            </Button>
          )}
        </div>

        <section>
          {mockClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClasses.map((classItem) => (
                <Link to={`/classes/${classItem.id}`} key={classItem.id} className="group">
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:border-earthy/30">
                    <div className="aspect-video w-full overflow-hidden bg-sage/10">
                      {classItem.imageUrl ? (
                        <img 
                          src={classItem.imageUrl} 
                          alt={classItem.title} 
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-sage/20 to-earthy/10">
                          <GraduationCap className="h-10 w-10 text-earthy/60" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-earthy-dark group-hover:text-earthy transition-colors">
                        {classItem.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Taught by {classItem.teacherName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {classItem.description}
                      </p>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      <div className="flex justify-between w-full">
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>{classItem.studentCount} Students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-3.5 w-3.5" />
                          <span>Created {new Date(classItem.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-earthy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-earthy-dark">No Classes Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {isTeacher 
                  ? "You haven't created any classes yet. Click the button above to create your first class."
                  : "There are no classes available at the moment. Please check back soon."}
              </p>
            </div>
          )}
        </section>
      </main>
    </motion.div>
  );
};

export default Classes;
