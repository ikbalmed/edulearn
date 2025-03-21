import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, BookMarked, Upload } from 'lucide-react';
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

const formSchema = z.object({
  className: z.string().min(3, { message: "Class name must be at least 3 characters" }),
  year: z.string().min(1, { message: "Please select a year" }),
  level: z.string().min(1, { message: "Please select a level" }),
  banner: z.instanceof(File).optional()
});

type FormValues = z.infer<typeof formSchema>;

const CreateClass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      year: '',
      level: '',
    }
  });

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('banner', file);
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: FormValues) => {
    console.log('Class data:', values);
    
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `${values.className} has been created.`,
      });
      navigate('/classes');
    }, 1000);
  };

  const years = ['2024', '2025', '2026', '2027'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

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
              <BookMarked className="mr-1 h-4 w-4" />
              <span>New Class</span>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-earthy-dark">
              Create a New Class
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to create a new class for your students
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Introduction to React" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="banner">Class Banner Image</Label>
                <div className="mt-1">
                  {bannerPreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={bannerPreview} 
                        alt="Banner preview" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2 bg-white/80"
                        onClick={() => {
                          setBannerPreview(null);
                          form.setValue('banner', undefined);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('banner')?.click()}>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Click to upload a banner image
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <input 
                        id="banner" 
                        name="banner" 
                        type="file" 
                        accept="image/*" 
                        className="sr-only" 
                        onChange={handleBannerChange}
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
                  Create Class
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </motion.div>
  );
};

export default CreateClass;
