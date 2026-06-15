import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Heart } from 'lucide-react';
import { Code, Database, Globe, Brain, Zap, Settings } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const techStackItems = [
    { name: 'HTML', icon: Code },
    { name: 'CSS', icon: Code },
    { name: 'JavaScript', icon: Code },
    { name: 'Tailwind CSS', icon: Code },
    { name: 'React', icon: Globe },
    { name: 'Node.js', icon: Database },
    { name: 'Git', icon: Settings },
    { name: 'GitHub', icon: Code },
    { name: 'Figma', icon: Code },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-gradient">
            &lt;/AboutMe&gt;
          </h2>
        </div>

        <div className="space-y-8">
          <div className="portfolio-card p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gradient">
              My Story
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a Computer Science Engineering student at GITAM Deemed University, passionate about creating 
              innovative solutions through machine learning, web development, and cutting-edge technology.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When I'm not coding, you'll find me working on projects like my Diamond Price Predictor 
              or building responsive websites. I believe in leveraging technology to solve real problems 
              and am actively seeking opportunities to contribute to meaningful projects.
            </p>
            <a 
              href="#contact"
              className="inline-block px-5 py-2 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform shadow-lg focus:ring-2 focus:ring-primary"
            >
              Get in Touch
            </a>
          </div>

          {/* Education & Location - compact horizontal cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="portfolio-card p-4">
              <div className="flex items-center mb-2">
                <GraduationCap className="w-5 h-5 text-primary mr-2" />
                <h4 className="font-semibold text-foreground">Education</h4>
              </div>
              <p className="text-sm text-muted-foreground">B.Tech CSE • GITAM 2023-2027</p>
            </div>

            <div className="portfolio-card p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-primary mr-2" />
                <h4 className="font-semibold text-foreground">Location</h4>
              </div>
              <p className="text-sm text-muted-foreground">Visakhapatnam, Andhra Pradesh</p>
            </div>
          </div>

          {/* Interests */}
          <div className="portfolio-card p-4">
            <div className="flex items-center mb-3">
              <Heart className="w-5 h-5 text-primary mr-2" />
              <h4 className="font-semibold text-foreground">Interests</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Machine Learning', 'Web Development', 'Data Science', 'Python'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="portfolio-card p-6" data-aos="fade-up">
            <h3 className="text-lg font-semibold mb-4 text-gradient">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStackItems.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex flex-col items-center p-2 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
                  data-aos="fade-up" 
                  data-aos-delay={100 + index * 50}
                >
                  <item.icon className="w-8 h-8 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;