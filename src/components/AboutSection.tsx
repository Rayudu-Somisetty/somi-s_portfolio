import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Heart } from 'lucide-react';

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mb-16`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-gradient">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover my journey as a computer science student passionate about technology and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio section */}
          <div
            className={`fade-in-up ${isVisible ? 'animate' : ''} space-y-6`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="portfolio-card p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gradient">
                My Story
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a passionate Computer Science Engineering student currently pursuing my B.Tech at GITAM Deemed University. 
                My journey in technology began with curiosity about how things work digitally, leading me to explore 
                machine learning, web development, and data science through hands-on projects and internships.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me working on innovative projects like my Diamond Price Predictor 
                or building responsive websites. I believe in leveraging technology to solve real-world problems 
                and am actively seeking opportunities to contribute to meaningful projects in AI/ML and software development.
              </p>
            </div>
          </div>

          {/* Education & interests */}
          <div
            className={`fade-in-up ${isVisible ? 'animate' : ''} space-y-6`}
            style={{ animationDelay: '0.4s' }}
          >
            {/* Education */}
            <div className="portfolio-card p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold">Education</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-foreground">B.Tech in Computer Science and Engineering</h5>
                  <p className="text-sm text-muted-foreground">GITAM Deemed University • 2023-2027</p>
                  <p className="text-sm text-muted-foreground">Current Status: Ongoing • Focus: AI/ML, Web Development, Data Analytics</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="portfolio-card p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold">Location</h4>
              </div>
              <p className="text-muted-foreground">Visakhapatnam, Andhra Pradesh, India</p>
            </div>

            {/* Interests */}
            <div className="portfolio-card p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold">Interests</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Machine Learning', 'Web Development', 'Data Science', 'Python Programming', 'React Development', 'AI Applications'].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;