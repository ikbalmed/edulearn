import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ClipboardList, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Structured Classes',
    description: 'Join or create well-organized classes with clear curriculum and learning paths.'
  },
  {
    icon: BookOpen,
    title: 'Engaging Lectures',
    description: 'Access high-quality video lectures and supplementary materials anytime, anywhere.'
  },
  {
    icon: ClipboardList,
    title: 'Interactive Assignments',
    description: 'Solve challenging assignments and receive instant feedback on your performance.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* hero */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-block rounded-lg bg-sage/20 px-3 py-1 text-sm text-earthy">
                Better learning experience
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-earthy-dark">
                Elevate your learning experience
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Connect with teachers, access quality lectures, and complete assignments in one beautiful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild size="lg" className="rounded-xl bg-earthy text-cream hover:bg-earthy-dark">
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-xl border-earthy text-earthy hover:bg-earthy hover:text-cream">
                  <a href="#features">
                    Learn More <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:ml-auto"
            >
              <div className="absolute inset-0 scale-[0.80] translate-x-10 translate-y-10 bg-sage rounded-3xl -z-10"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-earthy/30 to-sage-light/30 opacity-20 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000"
                  alt="Students studying"
                  className="w-full object-cover aspect-[4/3] md:aspect-[16/9] z-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* features sect */}
      <section id="features" className="py-16 md:py-24 bg-sage-light/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-earthy-dark">Why Choose EduLearn?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to make learning and teaching seamless, engaging, and effective.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream border border-sage/20 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="w-12 h-12 bg-sage/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-earthy" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-earthy-dark">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/*cta */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-earthy to-earthy-dark p-8 md:p-12 shadow-xl">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">Ready to transform your learning journey?</h2>
                <p className="text-cream/90 mb-6 text-lg">
                  Join our platform today and experience a new way of teaching and learning.
                </p>
                <Button asChild size="lg" variant="secondary" className="rounded-xl bg-cream text-earthy hover:bg-cream-dark">
                  <Link to="/login">Get Started Now</Link>
                </Button>
              </div>
              <div className="lg:ml-auto">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070"
                  alt="Education"
                  className="rounded-xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sage/30 py-8 md:py-12 bg-cream-light">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-earthy rounded-lg flex items-center justify-center">
                <GraduationCap className="text-cream" size={16} />
              </div>
              <span className="font-semibold text-lg text-earthy-dark">EduLearn</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduLearn. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm text-earthy hover:text-earthy-dark">Login</Link>
              <Link to="/login" className="text-sm text-earthy hover:text-earthy-dark">Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
