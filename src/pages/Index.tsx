import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import Newsletter from "@/components/Newsletter";
import SectionDivider from "@/components/SectionDivider";
import CodeEditor from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-rotate skills
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkillIndex((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    { icon: Code2, name: "React & Next.js", level: 95 },
    { icon: Sparkles, name: "Node.js & Express", level: 90 },
    { icon: Zap, name: "MongoDB & PostgreSQL", level: 88 },
    { icon: Code2, name: "TypeScript", level: 92 },
    { icon: Sparkles, name: "TailwindCSS", level: 95 },
    { icon: Zap, name: "API Development", level: 90 },
    { icon: Code2, name: "Docker & DevOps", level: 85 },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack MERN e-commerce with payment integration, admin dashboard, and real-time inventory.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "SaaS Dashboard",
      description: "Modern analytics dashboard with real-time data visualization and user management.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media App",
      description: "Real-time social platform with live chat, notifications, and content sharing.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format",
      tags: ["React", "Socket.io", "Express", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart",
      content: "Outstanding work! The MERN stack application delivered exceeded all expectations. Professional, fast, and scalable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      content: "Exceptional developer with deep knowledge of modern web technologies. Delivered a complex project on time and within budget.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder",
      company: "StartupHub",
      content: "Best decision we made was hiring this developer. The attention to detail and technical expertise is remarkable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format",
    },
    {
      name: "David Park",
      role: "CTO",
      company: "DevSolutions",
      content: "Incredible technical skills and problem-solving abilities. The solution delivered was beyond our expectations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format",
    },
    {
      name: "Lisa Thompson",
      role: "Director",
      company: "TechVentures",
      content: "A true professional who understands both the technical and business aspects. Highly recommended for any web project.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&auto=format",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero
          subtitle="Full-Stack Developer"
          title="Building the Future with MERN Stack"
          description="Transforming ideas into powerful, scalable web applications with cutting-edge technology and innovative design."
          rightContent={<CodeEditor />}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <Link to="/projects">
              View My Work <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </Hero>

        <SectionDivider />

        {/* Skills Section */}
        <section className="py-6 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Technical Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mastery in modern web technologies to build exceptional digital experiences
            </p>
          </motion.div>

          <div className="flex justify-center items-end min-h-[400px] pt-0 pb-4 -mt-10 overflow-hidden">
            <div className="relative flex justify-center items-center overflow-visible" style={{ width: '100%', maxWidth: '1200px', height: '360px' }}>
              {skills.map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  {...skill} 
                  index={index} 
                  totalCards={skills.length}
                  activeIndex={activeSkillIndex}
                  onActivate={() => setActiveSkillIndex(index)}
                />
              ))}
            </div>
          </div>
      </section>

      <SectionDivider />

      {/* Featured Projects */}
        <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Showcasing some of my best work in full-stack development
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                <Link to="/projects">
                  View All Projects <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials */}
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Client Testimonials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto px-20 py-16 overflow-visible overflow-x-hidden">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full overflow-visible"
            >
              <CarouselContent className="items-center overflow-visible">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.name} className="md:basis-1/3 lg:basis-1/3">
                    <div className={`px-4 transition-all duration-500 ${
                      current === index 
                        ? "scale-125 blur-0 opacity-100" 
                        : "scale-75 blur-[3px] opacity-50"
                    }`}>
                      <TestimonialCard {...testimonial} index={index} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
      </section>

      <SectionDivider />

      {/* Newsletter */}
        <section className="py-20 container mx-auto px-4">
          <Newsletter />
        </section>

        <SectionDivider />

        {/* CTA */}
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's collaborate to bring your vision to life with modern, scalable web solutions.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              <Link to="/services">
                Explore Services <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
