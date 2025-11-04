import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TimelineItem from "@/components/TimelineItem";
import SectionDivider from "@/components/SectionDivider";
import SkillsOrbit from "@/components/SkillsOrbit";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.png";

const About = () => {
  const timeline = [
    {
      year: "2024",
      title: "Senior Full-Stack Developer",
      description: "Leading MERN stack projects for enterprise clients, mentoring junior developers, and architecting scalable solutions.",
    },
    {
      year: "2022",
      title: "Full-Stack Developer",
      description: "Built and deployed 20+ production applications using React, Node.js, and MongoDB with modern DevOps practices.",
    },
    {
      year: "2020",
      title: "Frontend Developer",
      description: "Specialized in React and modern JavaScript, creating responsive and accessible user interfaces.",
    },
    {
      year: "2019",
      title: "Started Web Development Journey",
      description: "Began learning web development with HTML, CSS, and JavaScript. Quickly fell in love with creating digital experiences.",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-primary" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-accent" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-primary" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email", color: "hover:text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="pt-16 overflow-x-hidden w-full">
        <Hero
          subtitle="About Me"
          title="Passionate Developer, Creative Problem Solver"
          description="Transforming complex challenges into elegant solutions with cutting-edge MERN stack expertise."
          rightContent={<SkillsOrbit />}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <a href="/contact">Get in Touch</a>
          </Button>
        </Hero>

        <SectionDivider />

        {/* Bio Section */}
        <section className="py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden max-w-lg mx-auto"
            >
              <div className="glass-card p-4 relative overflow-hidden group h-[32rem]">
                <img
                  src={profileImage}
                  alt="Profile - Full-Stack Developer"
                  className="w-full h-full object-cover object-top rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-end p-6">
                  <p className="text-primary font-bold text-lg mb-1">5+ Years Experience</p>
                  <p className="text-foreground text-sm">MERN Stack Specialist</p>
                </div>
                <div className="absolute top-4 left-4 glass-card px-3 py-1">
                  <p className="text-primary text-xs font-semibold">Full-Stack Developer</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="px-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Building the Web,</span> One Line at a Time
              </h2>
              <p className="text-muted-foreground mb-4">
                I'm a passionate Full-Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). With over 5 years of experience, I've helped businesses and startups build scalable, performant web applications.
              </p>
              <p className="text-muted-foreground mb-4">
                My approach combines technical excellence with creative problem-solving. I believe in writing clean, maintainable code and creating user experiences that delight.
              </p>
              <p className="text-muted-foreground mb-8">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.
              </p>

              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass-card transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          </div>
        </section>

        <SectionDivider />

        {/* Journey Timeline */}
        <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                My Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The path that led me to become a full-stack developer
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} {...item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Skills Highlight */}
        <section className="py-20 overflow-hidden">
          <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              I'm always excited to work on new projects and collaborate with great people. Let's discuss how I can help bring your ideas to life.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              <a href="/contact">Get in Touch</a>
            </Button>
          </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
