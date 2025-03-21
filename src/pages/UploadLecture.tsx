import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, BookOpen, Upload, File as FileIcon } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Class } from '@/types';

const formSchema = z.object({
  title: z.string().min(3, { message: "Lecture title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  classId: z.string().min(1, { message: "Please select a class" }),
  lectureFile: z.any().optional()  // Changed from z.instanceof(File) to z.any()
});

type FormValues = z.infer<typeof formSchema>;

const UploadLecture = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);
  
  const mockClasses: Class[] = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React including components, state, and props.',
      teacherId: 'teacher1',
      teacherName: 'Dr. Jane Smith',
      studentCount: 24,
      createdAt: '2023-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Deep dive into advanced JavaScript concepts including closures, promises, and async/await.',
      teacherId: 'teacher2',
      teacherName: 'Prof. John Davis',
      studentCount: 18,
      createdAt: '2023-02-10',
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2274'
    },
    {
      id: '3',
      title: 'UX/UI Design Principles',
      description: 'Explore user experience and interface design principles for creating effective digital products.',
      teacherId: 'teacher3',
      teacherName: 'Sarah Johnson',
      studentCount: 30,
      createdAt: '2023-03-05',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071'
    },
    {
      id: '4',
      title: 'Data Structures & Algorithms',
      description: 'Master essential data structures and algorithms for efficient problem-solving.',
      teacherId: 'teacher1',
      teacherName: 'Dr. Jane Smith',
      studentCount: 22,
      createdAt: '2023-04-20',
      imageUrl: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=2070'
    }
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      classId: '',
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('lectureFile', file);
      setFileName(file.name);
    }
  };

  const onSubmit = (values: FormValues) => {
    console.log('Lecture data:', values);
    
    const selectedClass = mockClasses.find(c => c.id === values.classId);
    
    // in a real app, this would be an API call to upload the lecture
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Lecture "${values.title}" has been uploaded to class "${selectedClass?.title}".`,
      });
      navigate('/lectures');
    }, 1000);
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
            <div onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-earthy cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </div>
          </Button>
        </div>

        <div className="flex flex-col max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-lg bg-sage/20 px-3 py-1 text-sm mb-2 text-earthy">
              <BookOpen className="mr-1 h-4 w-4" />
              <span>New Lecture</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              Upload New Lecture
            </h1>
            <p className="text-muted-foreground">
              Share educational content with your students
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockClasses.map(classItem => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lecture Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Introduction to React Hooks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Provide a brief description of this lecture"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label htmlFor="lectureFile">Lecture Document</Label>
                <div className="mt-1">
                  {fileName ? (
                    <div className="flex items-center gap-2 p-4 border rounded-md">
                      <File className="h-5 w-5 text-earthy" />
                      <span className="text-sm truncate">{fileName}</span>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        className="ml-auto"
                        onClick={() => {
                          setFileName(null);
                          form.setValue('lectureFile', undefined);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('lectureFile')?.click()}>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Click to upload lecture document
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOCX, PPTX up to 50MB
                        </p>
                      </div>
                      <input 
                        id="lectureFile" 
                        name="lectureFile" 
                        type="file" 
                        accept=".pdf,.doc,.docx,.ppt,.pptx" 
                        className="sr-only" 
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-earthy text-cream hover:bg-earthy-dark"
                >
                  Upload Lecture
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </motion.div>
  );
};

export default UploadLecture;
