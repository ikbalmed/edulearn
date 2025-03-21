import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, Plus, Clock, Download } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Lectures = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  // Sample lecture
  const sampleLecture = {
    id: "woolf-001",
    title: "Virginia Woolf: Modernism & Stream of Consciousness",
    description: "Explore Virginia Woolf's contribution to modernist literature and her pioneering use of stream of consciousness narrative technique.",
    classId: "2",
    className: "Advanced Literary Studies",
    teacherId: "teacher1",
    teacherName: "Dr. Jane Smith",
    createdAt: "2025-03-20T14:30:00",
    duration: 45
  };

  const formatDate = (dateString) => {
    const options = { 
      year: "numeric" as const, 
      month: "short" as const, 
      day: "numeric" as const
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
              <BookOpen className="mr-1 h-4 w-4" />
              <span>Lectures</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              {isTeacher ? 'Manage Lectures' : 'View Lectures'}
            </h1>
            <p className="text-muted-foreground">
              {isTeacher 
                ? 'Create and organize lectures for your classes'
                : 'Access and watch lectures from your enrolled classes'}
            </p>
          </div>
          {isTeacher && (
            <Button asChild className="bg-earthy text-cream hover:bg-earthy-dark">
              <Link to="/lectures/new">
                <Plus className="mr-2 h-4 w-4" />
                Upload New Lecture
              </Link>
            </Button>
          )}
        </div>

        <section className="grid gap-6">
          <Card className="border-sage/30 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-sage/10 text-earthy">
                      <BookOpen className="mr-1 h-3 w-3" />
                      Literature
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-earthy-dark">
                    {sampleLecture.title}
                  </h3>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{sampleLecture.duration} min</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {sampleLecture.description}
              </p>
              <div className="text-sm text-muted-foreground">
                <span>Class: {sampleLecture.className}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>Instructor: {sampleLecture.teacherName}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Added: {formatDate(sampleLecture.createdAt)}
              </div>
              <Button asChild className="bg-earthy text-cream hover:bg-earthy-dark">
                <Link to={`/lectures/${sampleLecture.id}`}>
                  View Lecture
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </motion.div>
  );
};

export default Lectures;
