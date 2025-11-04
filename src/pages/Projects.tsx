import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SectionDivider from "@/components/SectionDivider";
import LaserBeamTransition from "@/components/LaserBeamTransition";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web Apps", "E-Commerce", "SaaS", "Mobile"];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack MERN e-commerce with payment integration, admin dashboard, and real-time inventory management.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "E-Commerce",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "SaaS Dashboard",
      description: "Modern analytics dashboard with real-time data visualization, user management, and comprehensive reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Recharts"],
      category: "SaaS",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media App",
      description: "Real-time social platform with live chat, notifications, content sharing, and user engagement features.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format",
      tags: ["React", "Socket.io", "Express", "Redis"],
      category: "Web Apps",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with kanban boards, team collaboration, and deadline tracking.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "SaaS",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Real Estate Portal",
      description: "Property listing platform with advanced search, virtual tours, and real-time availability updates.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format",
      tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      category: "Web Apps",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Food Delivery App",
      description: "Multi-vendor food ordering system with real-time tracking, payment integration, and rating system.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format",
      tags: ["React Native", "Node.js", "MongoDB", "Google Maps"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Learning Management System",
      description: "Educational platform with course management, video streaming, quizzes, and progress tracking.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format",
      tags: ["React", "Express", "MongoDB", "AWS S3"],
      category: "Web Apps",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Fitness Tracking App",
      description: "Health and fitness application with workout plans, nutrition tracking, and progress analytics.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format",
      tags: ["React Native", "Firebase", "Redux", "Chart.js"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Booking Management System",
      description: "Appointment scheduling platform with calendar integration, reminders, and payment processing.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      category: "SaaS",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero
          subtitle="Portfolio"
          title="My Latest Projects"
          description="Explore a collection of my recent work showcasing full-stack development expertise and creative solutions."
          rightContent={<LaserBeamTransition />}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <a href="/contact">Start Your Project</a>
          </Button>
        </Hero>

        <SectionDivider />

        {/* Filter Categories */}
        <section className="py-12 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                className={
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/30 hover:bg-primary/10"
                }
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </section>

        <SectionDivider />

        {/* Projects Grid */}
        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
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
              Have a Project in Mind?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's collaborate to build something extraordinary together.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              <a href="/contact">Start a Conversation</a>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
