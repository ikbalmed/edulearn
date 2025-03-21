import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, FileQuestion, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AssignmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Example modernist literature assignment
  const assignment = {
    id: 'modernist-lit-001',
    title: 'Modernist Literature: Key Authors and Works',
    description: 'Test your knowledge of Modernist literature (1890-1940) including major authors, themes, and influential works.',
    dueDate: '2025-03-22T23:59:00',
    classId: 'class2',
    className: 'Advanced Literary Studies',
    type: 'multiple_choice',
    points: 20,
    createdAt: '2025-03-20T14:30:00',
    questions: [
      {
        id: 'q1',
        text: 'Which novel by Virginia Woolf features a stream-of-consciousness narrative following Clarissa Dalloway through a single day in London?',
        options: [
          { id: 'q1-a', text: 'To the Lighthouse' },
          { id: 'q1-b', text: 'Mrs. Dalloway', isCorrect: true },
          { id: 'q1-c', text: 'Orlando' },
          { id: 'q1-d', text: 'The Waves' }
        ]
      },
      {
        id: 'q2',
        text: 'The technique of "stream of consciousness" is most closely associated with which literary movement?',
        options: [
          { id: 'q2-a', text: 'Romanticism' },
          { id: 'q2-b', text: 'Realism' },
          { id: 'q2-c', text: 'Modernism', isCorrect: true },
          { id: 'q2-d', text: 'Naturalism' }
        ]
      },
      {
        id: 'q3',
        text: 'Which of these works by James Joyce depicts a day in the life of Stephen Dedalus and Leopold Bloom in Dublin?',
        options: [
          { id: 'q3-a', text: 'Dubliners' },
          { id: 'q3-b', text: 'A Portrait of the Artist as a Young Man' },
          { id: 'q3-c', text: 'Ulysses', isCorrect: true },
          { id: 'q3-d', text: 'Finnegans Wake' }
        ]
      },
      {
        id: 'q4',
        text: 'Which theme is NOT commonly associated with Modernist literature?',
        options: [
          { id: 'q4-a', text: 'Alienation and isolation' },
          { id: 'q4-b', text: 'Fragmentation and disorder' },
          { id: 'q4-c', text: 'Celebration of technology and progress' },
          { id: 'q4-d', text: 'Faith in traditional social structures', isCorrect: true }
        ]
      },
      {
        id: 'q5',
        text: 'T.S. Eliot\'s "The Waste Land" directly references which major historical event that influenced Modernist writing?',
        options: [
          { id: 'q5-a', text: 'World War I', isCorrect: true },
          { id: 'q5-b', text: 'The Industrial Revolution' },
          { id: 'q5-c', text: 'The French Revolution' },
          { id: 'q5-d', text: 'The Russian Revolution' }
        ]
      }
    ]
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Assignment Submitted",
      description: "Your answers have been recorded.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="p-0 h-auto font-normal">
            <Link to="/assignments" className="flex items-center text-muted-foreground hover:text-earthy">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assignments
            </Link>
          </Button>
        </div>

        <Card className="border-sage/30 mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-sage/10 text-earthy">
                    <FileQuestion className="mr-1 h-3 w-3" />
                    Multiple Choice
                  </Badge>
                  <Badge variant="outline" className="bg-sage/10 text-earthy">
                    {assignment.points} points
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-earthy-dark">
                  {assignment.title}
                </CardTitle>
              </div>
              <div className="text-sm text-right">
                <div className="font-medium text-earthy-dark">Due</div>
                <div className="text-muted-foreground">{formatDate(assignment.dueDate)}</div>
              </div>
            </div>
            <CardDescription className="mt-2">
              {assignment.description}
            </CardDescription>
            <div className="flex items-center text-sm text-muted-foreground mt-4">
              <BookOpen className="mr-1 h-4 w-4" />
              <span>Class: {assignment.className}</span>
            </div>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {assignment.questions.map((question, index) => (
            <Card key={question.id} className="border-sage/30">
              <CardHeader>
                <CardTitle className="text-lg text-earthy-dark">
                  Question {index + 1}
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  {question.text}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup name={`question-${question.id}`} className="space-y-3">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-base">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button type="submit" className="bg-earthy text-cream hover:bg-earthy-dark">
              <Check className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
          </div>
        </form>
      </main>
    </motion.div>
  );
};

export default AssignmentDetail;
