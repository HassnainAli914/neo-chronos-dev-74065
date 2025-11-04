import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="py-8 px-4 md:px-8">
      <div className="relative container mx-auto glass-card rounded-3xl border-2 border-primary/20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold gradient-text mb-4">MERN.dev</h3>
              <p className="text-muted-foreground">
                Full-stack developer crafting innovative web solutions with cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Connect</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass-card hover:bg-primary/20 transition-all group rounded-lg"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-primary group-hover:animate-glow-pulse" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary/20 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-destructive animate-glow-pulse" /> by MERN Developer
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
