import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ClipboardList, Plus, BookOpen, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Assignments = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  const exampleAssignment = {
    id: 'modernist-lit-001',
    title: 'Modernist Literature: Key Authors and Works',
    description: 'Test your knowledge of Modernist literature (1890-1940) including major authors, themes, and influential works.',
    dueDate: '2025-03-22T23:59:00',
    classId: 'class2',
    className: 'Advanced Literary Studies',
    type: 'multiple_choice',
    points: 20,
    questions: 5,
    createdAt: '2025-03-20T14:30:00'
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
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
              <ClipboardList className="mr-1 h-4 w-4" />
              <span>Assignments</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              {isTeacher ? 'Manage Assignments' : 'View Assignments'}
            </h1>
            <p className="text-muted-foreground">
              {isTeacher 
                ? 'Create and organize assignments for your classes'
                : 'Submit and track assignments from your enrolled classes'}
            </p>
          </div>
          {isTeacher && (
            <Button asChild className="bg-earthy text-cream hover:bg-earthy-dark">
              <Link to="/assignments/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Assignment
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
                      <FileQuestion className="mr-1 h-3 w-3" />
                      Multiple Choice
                    </Badge>
                    <Badge variant="outline" className="bg-sage/10 text-earthy">
                      {exampleAssignment.points} points
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-earthy-dark">
                    {exampleAssignment.title}
                  </CardTitle>
                </div>
                <div className="text-sm text-right">
                  <div className="font-medium text-earthy-dark">Due</div>
                  <div className="text-muted-foreground">{formatDate(exampleAssignment.dueDate)}</div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {exampleAssignment.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <BookOpen className="mr-1 h-4 w-4" />
                <span>Class: {exampleAssignment.className}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>Questions: {exampleAssignment.questions}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Created: {formatDate(exampleAssignment.createdAt)}
              </div>
              <Button asChild className="bg-earthy text-cream hover:bg-earthy-dark">
                <Link to={`/assignments/${exampleAssignment.id}`}>
                  View Assignment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </motion.div>
  );
};

export default Assignments;
