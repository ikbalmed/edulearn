import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, BookOpen, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const LectureDetail = () => {
  const { id } = useParams<{ id: string }>();

<<<<<<< HEAD
  // using virgina woolf as example cuz shes cool
=======
  // Mock content for Virginia Woolf lecture
>>>>>>> 58fa0d8a662e0a9b1e524a6479fdf45c272f2faf
  const lectureContent = {
    id: "woolf-001",
    title: "Virginia Woolf: Modernism & Stream of Consciousness",
    description: "Explore Virginia Woolf's contribution to modernist literature and her pioneering use of stream of consciousness narrative technique.",
    className: "Advanced Literary Studies",
    teacherName: "Dr. Jane Smith",
<<<<<<< HEAD
    createdAt: "2025-03-20T14:30:00",
=======
    createdAt: "2023-05-10T14:30:00",
>>>>>>> 58fa0d8a662e0a9b1e524a6479fdf45c272f2faf
    duration: 45,
    content: [
      {
        type: "section",
        title: "Introduction to Virginia Woolf",
        text: "Virginia Woolf (1882-1941) was an English writer and one of the foremost modernist literary figures of the twentieth century. Born into an affluent household in South Kensington, London, Woolf was educated by her parents in their literate and well-connected household. Her notable works include the novels 'Mrs Dalloway' (1925), 'To the Lighthouse' (1927), and 'Orlando' (1928), as well as the book-length essay 'A Room of One's Own' (1929)."
      },
      {
        type: "section",
        title: "Stream of Consciousness Technique",
        text: "Woolf is renowned for her pioneering use of stream of consciousness as a narrative device. This technique attempts to depict the multitudinous thoughts and feelings that pass through the mind. In her hands, this technique transforms interior thinking into a vivid, immediate reality. Her narrative method allows readers to enter directly into characters' minds and experience their psychological reality, making her a revolutionary figure in the modernist movement."
      },
      {
        type: "section",
        title: "Key Works and Themes",
        text: "In 'Mrs Dalloway,' Woolf follows the character Clarissa Dalloway through a single day in post-World War I London. The novel interweaves Clarissa's narrative with that of Septimus Warren Smith, a veteran suffering from shell shock. 'To the Lighthouse' revolves around the Ramsay family and their visits to the Isle of Skye in Scotland. The novel explores themes of loss, subjectivity, and the passage of time. Throughout her work, Woolf addressed feminist themes, notably in 'A Room of One's Own,' which argues for both a literal and figurative space for women writers."
      },
      {
        type: "section",
        title: "Literary Legacy",
        text: "Virginia Woolf's experimental prose style and innovative narrative techniques have had a profound influence on the development of the modern novel. Her exploration of gender, mental illness, and the complexity of human consciousness continues to resonate with contemporary readers and writers. Despite her tragic suicide in 1941, Woolf's literary legacy endures, and she remains one of the most important voices in twentieth-century literature."
      }
    ]
  };

  const formatDate = (dateString) => {
    const options = { 
      year: "numeric" as const, 
      month: "short" as const, 
      day: "numeric" as const
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

<<<<<<< HEAD
  // pdf download (non-functional)
  const handleDownloadPDF = () => {

    alert("In a real application, this would download the lecture as a PDF document.");
=======
  // Function to handle PDF download (in a real app, this would fetch/generate a real PDF)
  const handleDownloadPDF = () => {
    // This is a mock function - in a real app, you would fetch the PDF from a server
    // or generate it on the fly
    alert("In a real application, this would download the lecture as a PDF document.");
    
    // For demonstration purposes only:
    // const pdfData = "data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYxNi44OTYwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTkyLjk5MjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU0NS4xODQwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTIxLjI4MDAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA0OTcuMzc2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NjQuNzA0MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY0MC44MDAwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYxNi44OTYwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1OTIuOTkyMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";
    // const link = document.createElement("a");
    // link.href = pdfData;
    // link.download = "virginia_woolf_lecture.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
>>>>>>> 58fa0d8a662e0a9b1e524a6479fdf45c272f2faf
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
            <Link to="/lectures" className="flex items-center text-muted-foreground hover:text-earthy">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lectures
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-sage/10 text-earthy">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Literature
                </Badge>
                <Badge variant="outline" className="bg-sage/10 text-earthy">
                  <Clock className="mr-1 h-3 w-3" />
                  {lectureContent.duration} min
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-earthy-dark">{lectureContent.title}</h1>
              <p className="text-muted-foreground mb-2">{lectureContent.description}</p>
              <div className="text-sm text-muted-foreground">
                Class: {lectureContent.className} | Instructor: {lectureContent.teacherName} | 
                Added: {formatDate(lectureContent.createdAt)}
              </div>
            </div>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-earthy text-cream hover:bg-earthy-dark mt-2 sm:mt-0"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {lectureContent.content.map((section, index) => (
            <Card key={index} className="border-sage/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-earthy-dark">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default LectureDetail;