import { motion } from "framer-motion";
import { Code2, Layout, Server, Smartphone, Cloud, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "End-to-end MERN stack development for scalable web applications with modern architecture.",
      features: [
        "Custom web application development",
        "RESTful API design & implementation",
        "Database design & optimization",
        "Real-time features with WebSockets",
        "Third-party API integrations",
      ],
      price: "From $5,000",
    },
    {
      icon: Layout,
      title: "UI/UX Design & Development",
      description: "Creating beautiful, responsive interfaces with exceptional user experience.",
      features: [
        "Responsive web design",
        "Modern UI with React & TailwindCSS",
        "Component library development",
        "Accessibility compliance (WCAG)",
        "Performance optimization",
      ],
      price: "From $3,000",
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Robust server-side solutions with Node.js, Express, and database management.",
      features: [
        "RESTful & GraphQL APIs",
        "Authentication & authorization",
        "Database architecture",
        "Server optimization",
        "Security best practices",
      ],
      price: "From $4,000",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications with React Native for iOS and Android.",
      features: [
        "React Native development",
        "Native performance optimization",
        "Push notifications",
        "Offline functionality",
        "App store deployment",
      ],
      price: "From $8,000",
    },
    {
      icon: Cloud,
      title: "Cloud Deployment & DevOps",
      description: "Seamless deployment and management of applications on cloud platforms.",
      features: [
        "AWS, Azure, or GCP deployment",
        "CI/CD pipeline setup",
        "Docker containerization",
        "Monitoring & logging",
        "Automated backups",
      ],
      price: "From $2,500",
    },
    {
      icon: Zap,
      title: "Consultation & Support",
      description: "Technical consultation and ongoing maintenance for your web applications.",
      features: [
        "Architecture review & planning",
        "Code review & optimization",
        "Technical documentation",
        "Bug fixes & maintenance",
        "Performance audits",
      ],
      price: "From $150/hr",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero
          subtitle="Services"
          title="MERN Stack Expertise at Your Service"
          description="Comprehensive full-stack development services to bring your digital vision to life with cutting-edge technology."
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <a href="/contact">Get a Quote</a>
          </Button>
        </Hero>

        <SectionDivider />

        {/* Services Grid */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Why Choose Me */}
        <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Why Choose My Services?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Quality Code",
                  description: "Clean, maintainable, and well-documented code following industry best practices.",
                },
                {
                  title: "On-Time Delivery",
                  description: "Committed to meeting deadlines without compromising on quality.",
                },
                {
                  title: "Clear Communication",
                  description: "Regular updates and transparent communication throughout the project.",
                },
                {
                  title: "Post-Launch Support",
                  description: "Ongoing support and maintenance to ensure your application runs smoothly.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Process */}
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              My Development Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", description: "Understanding your requirements and goals" },
              { step: "02", title: "Planning", description: "Architecture design and project roadmap" },
              { step: "03", title: "Development", description: "Agile development with regular updates" },
              { step: "04", title: "Launch", description: "Testing, deployment, and support" },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="text-4xl font-bold gradient-text mb-4">{phase.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's discuss your project requirements and how I can help bring your ideas to life.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              <a href="/contact">Schedule a Consultation</a>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
