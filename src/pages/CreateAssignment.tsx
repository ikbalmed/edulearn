
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ClipboardList, Plus, Trash2, FileQuestion, MessageSquareText } from 'lucide-react';
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
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ASSIGNMENT_TYPES = [
  { id: 'essay', label: 'Essay/Text Response', icon: MessageSquareText },
  { id: 'multiple_choice', label: 'Multiple Choice', icon: FileQuestion },
];

// Schema for multiple choice options
const optionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean().default(false),
});

const formSchema = z.object({
  title: z.string().min(3, { message: "Assignment title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Please provide a detailed description" }),
  classId: z.string().min(1, { message: "Please select a class" }),
  dueDate: z.string().min(1, { message: "Please set a due date" }),
  points: z.coerce.number().min(1, { message: "Points must be at least 1" }),
  type: z.string().min(1, { message: "Please select an assignment type" }),
  // validatating options separately
  options: z.array(optionSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateAssignment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [options, setOptions] = useState<Array<{ id: string; text: string; isCorrect: boolean }>>([
    { id: '1', text: '', isCorrect: false },
    { id: '2', text: '', isCorrect: false },
  ]);

  // classes exs without api calls
  const classes = [
    { id: 'class1', name: 'Victorian Literature' },
    { id: 'class2', name: 'Modernist Poetry' },
    { id: 'class3', name: 'American Literature' },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      classId: '',
      dueDate: '',
      points: 10,
      type: '',
    }
  });

  const assignmentType = form.watch('type');

  const handleOptionChange = (id: string, value: string) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, text: value } : opt
    ));
  };

  const handleCorrectOptionChange = (id: string, checked: boolean) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, isCorrect: checked } : 
      (checked ? { ...opt, isCorrect: false } : opt)
    ));
  };

  const addOption = () => {
    setOptions(prev => [...prev, { 
      id: String(prev.length + 1), 
      text: '', 
      isCorrect: false 
    }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      toast({
        title: "Error",
        description: "You must have at least two options",
        variant: "destructive",
      });
      return;
    }
    setOptions(prev => prev.filter(opt => opt.id !== id));
  };

  const onSubmit = (values: FormValues) => {
    if (values.type === 'multiple_choice') {
      const optionTexts = options.map(o => o.text);
      const hasEmptyOption = optionTexts.some(text => !text.trim());
      
      if (hasEmptyOption) {
        toast({
          title: "Error",
          description: "All options must have text",
          variant: "destructive",
        });
        return;
      }

      const hasCorrectOption = options.some(o => o.isCorrect);
      if (!hasCorrectOption) {
        toast({
          title: "Error",
          description: "You must select at least one correct answer",
          variant: "destructive",
        });
        return;
      }

      values.options = options;
    }

    console.log('Assignment data:', values);
    

    setTimeout(() => {
      toast({
        title: "Success!",
        description: `${values.title} has been created.`,
      });
      navigate('/assignments');
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
              <ClipboardList className="mr-1 h-4 w-4" />
              <span>New Assignment</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              Create a New Assignment
            </h1>
            <p className="text-muted-foreground">
              Create an assignment for your students to complete
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Week 3 Lectures Assignment" {...field} />
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
                      <Textarea 
                        placeholder="Provide details about the assignment..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ASSIGNMENT_TYPES.map(type => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center">
                                <type.icon className="mr-2 h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {assignmentType === 'multiple_choice' && (
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Multiple Choice Options</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addOption}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-start gap-3">
                        <div className="pt-2">
                          <Checkbox 
                            checked={option.isCorrect} 
                            onCheckedChange={(checked) => {
                              handleCorrectOptionChange(option.id, checked === true);
                            }}
                            id={`option-${option.id}`}
                          />
                        </div>
                        <div className="flex-1">
                          <Input 
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            placeholder={`Option ${option.id}`}
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeOption(option.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormDescription>
                    Check the box next to the correct answer(s).
                  </FormDescription>
                </div>
              )}

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-earthy text-cream hover:bg-earthy-dark"
                >
                  Create Assignment
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </motion.div>
  );
};

export default CreateAssignment;
