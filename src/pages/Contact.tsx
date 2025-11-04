import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "San Francisco, CA",
      link: "#",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@example.com",
      link: "mailto:contact@example.com",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      content: "Chat with me",
      link: "https://wa.me/15551234567",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero
          subtitle="Get in Touch"
          title="Let's Build Something Great Together"
          description="Have a project in mind? I'd love to hear about it. Reach out and let's start the conversation."
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <a href="#contact-form">Send a Message</a>
          </Button>
        </Hero>

        <SectionDivider />

        {/* Contact Cards */}
        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:bg-primary/10 transition-colors"
              >
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                <p className="text-muted-foreground text-sm">{info.content}</p>
              </motion.a>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Contact Form and Map */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                  Send Me a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </motion.div>
              <ContactForm />
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-2 h-[600px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098536!2d-122.507640345!3d37.75767032252137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* Quick Links */}
        <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Other Ways to Connect
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Schedule a Call",
                  description: "Book a free 30-minute consultation to discuss your project.",
                  action: "Book Now",
                  link: "#",
                },
                {
                  title: "View My Work",
                  description: "Explore my portfolio to see examples of my recent projects.",
                  action: "View Portfolio",
                  link: "/projects",
                },
                {
                  title: "Read My Blog",
                  description: "Check out my latest articles on web development and tech.",
                  action: "Read Blog",
                  link: "/blog",
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
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <a
                    href={item.link}
                    className="text-primary hover:text-primary/80 font-semibold"
                  >
                    {item.action} →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
