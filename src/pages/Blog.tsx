import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "React", "Node.js", "MongoDB", "Web Development", "Tutorial"];

  const blogPosts = [
    {
      title: "Building Scalable MERN Stack Applications",
      excerpt: "Learn the best practices for architecting and building production-ready MERN stack applications that scale.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format",
      category: "Web Development",
      date: "2024-03-15",
      readTime: "8 min read",
      author: "MERN Developer",
    },
    {
      title: "Advanced React Patterns You Should Know",
      excerpt: "Explore advanced React patterns including compound components, render props, and custom hooks.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format",
      category: "React",
      date: "2024-03-10",
      readTime: "6 min read",
      author: "MERN Developer",
    },
    {
      title: "Mastering Node.js Performance Optimization",
      excerpt: "Deep dive into Node.js performance optimization techniques for high-traffic applications.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format",
      category: "Node.js",
      date: "2024-03-05",
      readTime: "10 min read",
      author: "MERN Developer",
    },
    {
      title: "MongoDB Indexing Best Practices",
      excerpt: "Learn how to optimize your MongoDB queries with proper indexing strategies and techniques.",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format",
      category: "MongoDB",
      date: "2024-02-28",
      readTime: "7 min read",
      author: "MERN Developer",
    },
    {
      title: "Complete Guide to React Hooks",
      excerpt: "A comprehensive tutorial covering all React hooks with practical examples and use cases.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format",
      category: "Tutorial",
      date: "2024-02-20",
      readTime: "12 min read",
      author: "MERN Developer",
    },
    {
      title: "RESTful API Design Principles",
      excerpt: "Best practices for designing clean, maintainable, and scalable RESTful APIs.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format",
      category: "Node.js",
      date: "2024-02-15",
      readTime: "9 min read",
      author: "MERN Developer",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero
          subtitle="Blog"
          title="Thoughts on Web Development"
          description="Articles, tutorials, and insights about MERN stack development and modern web technologies."
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <a href="/contact">Work With Me</a>
          </Button>
        </Hero>

        <SectionDivider />

        {/* Search and Filter */}
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-primary/30 focus:border-primary"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border-primary/30 hover:bg-primary/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* Blog Posts Grid */}
        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center text-primary font-semibold">
                    Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
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
              Want to Collaborate?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              <a href="/services">Explore Services</a>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
