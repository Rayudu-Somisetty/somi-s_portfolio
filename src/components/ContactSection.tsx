import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'somisetty2005@gmail.com', href: 'mailto:somisetty2005@gmail.com' },
    { icon: Mail, label: 'College Email', value: 'srayudu3@gitam.in', href: 'mailto:srayudu3@gitam.in' },
    { icon: MapPin, label: 'Location', value: 'Visakhapatnam, AP, India', href: 'https://maps.google.com/?q=Visakhapatnam' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-gradient">
            Let&apos;s Connect
          </h2>
          <p className="text-base text-muted-foreground">
            Available for opportunities and collaborations
          </p>
        </div>

        {/* Contact info - compact horizontal */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              target={info.href.startsWith('http') ? '_blank' : undefined}
              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="portfolio-card p-4 flex items-center justify-center gap-3 hover:scale-105 transition-transform"
            >
              <info.icon className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">{info.label}</p>
                <p className="text-xs text-muted-foreground">{info.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="https://github.com/Rayudu-Somisetty" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/rayudu-somisetty-b23149293/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-8 h-8" />
          </a>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="portfolio-card p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-5 text-gradient">
              Open to New Opportunities
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm actively seeking internship and full-time opportunities in AI/ML, web development,
              and software engineering where I can apply my technical skills and continue learning
              from experienced professionals in dynamic environments.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-primary text-primary-foreground rounded-xl font-bold text-base hover:scale-105 transition-transform shadow-2xl hover:shadow-primary/25 focus:ring-2 focus:ring-primary min-w-[200px]"
            >
              Let's Connect
            </a>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-lg font-medium text-gradient mb-4">
            "Learning, Living, and Leveling Up."
          </p>
          <p className="text-muted-foreground text-sm">
            Design & Built by Rayudu Somisetty &copy; 2024-{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;