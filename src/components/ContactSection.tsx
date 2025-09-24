import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Primary Email',
      value: 'srayudu3@gitam.in',
      href: 'mailto:srayudu3@gitam.in',
    },
    {
      icon: Mail,
      label: 'Personal Email',
      value: 'somisetty2005@gmail.com',
      href: 'mailto:somisetty2005@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9494588144',
      href: 'tel:+919494588144',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Visakhapatnam, Andhra Pradesh, India',
      href: 'https://maps.google.com/?q=Visakhapatnam,+Andhra+Pradesh,+India',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Rayudu-Somisetty',
      username: '@Rayudu-Somisetty',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rayudu-somisetty-b23149293/',
      username: 'Rayudu Somisetty',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mb-16`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-gradient">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className={`fade-in-up ${isVisible ? 'animate' : ''} space-y-8`}
            style={{ animationDelay: '0.2s' }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gradient">
                Get In Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're interested in collaborating on projects, discussing opportunities 
                in AI/ML or web development, or just want to connect and share ideas about technology, 
                I'd love to hear from you. Feel free to reach out through any of the channels below 
                or use the contact form.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="portfolio-card p-4 flex items-center group hover:scale-105 transition-transform duration-300"
                >
                  <info.icon className="w-5 h-5 text-primary mr-4" />
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {info.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">
                Connect on Social Media
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-card p-4 flex items-center space-x-3 group hover:scale-105 transition-transform duration-300 flex-1"
                  >
                    <social.icon className="w-5 h-5 text-primary" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {social.label}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {social.username}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`fade-in-up ${isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="portfolio-card p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gradient">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-foreground placeholder-muted-foreground resize-vertical"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mt-16 pt-8 border-t border-border`}
          style={{ animationDelay: '0.6s' }}
        >
          <p className="text-muted-foreground">
            © 2024 Rayudu Somisetty. Built with React, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Computer Science Engineering Student at GITAM University - Passionate about AI/ML and Web Development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;