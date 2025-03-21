import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Download } from 'lucide-react';

const LectureDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Mock content for Virginia Woolf lecture
  const lectureContent = {
    id: "woolf-001",
    title: "Virginia Woolf: Modernism & Stream of Consciousness",
    description: "Explore Virginia Woolf's contribution to modernist literature and her pioneering use of stream of consciousness narrative technique.",
    className: "Advanced Literary Studies",
    teacherName: "Dr. Jane Smith",
    createdAt: "2025-03-20T14:30:00",
    duration: 45,
    content: [
      {
        type: "text",
        content: "Virginia Woolf's innovative narrative techniques revolutionized modern literature..."
      },
      {
        type: "image",
        url: "https://example.com/woolf-portrait.jpg",
        caption: "Virginia Woolf (1882-1941)"
      }
    ]
  };

  const formatDate = (dateString: string) => {
    const options = { 
      year: "numeric" as const, 
      month: "short" as const, 
      day: "numeric" as const
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to handle PDF download (in a real app, this would fetch/generate a real PDF)
  const handleDownloadPDF = () => {
    // This is a mock function - in a real app, you would fetch the PDF from a server
    // or generate it on the fly
    alert("In a real application, this would download the lecture as a PDF document.");
    
    // For demonstration purposes only:
    // const link = document.createElement('a');
    // link.href = 'path/to/lecture.pdf';
    // link.download = 'lecture.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
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
              <span>Lecture Details</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              {lectureContent.title}
            </h1>
            <p className="text-muted-foreground">
              {lectureContent.description}
            </p>
          </div>
          <Button 
            onClick={handleDownloadPDF}
            className="bg-earthy text-cream hover:bg-earthy-dark"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <Card className="border-sage/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-sage/10 text-earthy">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Literature
                </Badge>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{lectureContent.duration} min</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lectureContent.content.map((section, index) => (
                <div key={index} className="prose prose-earthy max-w-none">
                  {section.type === 'text' && (
                    <p>{section.content}</p>
                  )}
                  {section.type === 'image' && (
                    <figure>
                      <img 
                        src={section.url} 
                        alt={section.caption}
                        className="rounded-lg"
                      />
                      <figcaption className="text-center text-sm text-muted-foreground">
                        {section.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="text-sm text-muted-foreground">
              <span>Instructor: {lectureContent.teacherName}</span>
              <span className="mx-2">•</span>
              <span>Added: {formatDate(lectureContent.createdAt)}</span>
            </div>
          </CardFooter>
        </Card>
      </main>
    </motion.div>
  );
};

export default LectureDetail;