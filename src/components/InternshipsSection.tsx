import { useEffect, useRef, useState } from 'react';
import { Building, Calendar, MapPin } from 'lucide-react';

const InternshipsSection = () => {
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

  const internships = [
    {
      company: 'Bharatversity',
      role: 'AIML Intern',
      duration: 'June 2025 - July 2025',
      location: 'BITS Pilani Hyderabad Campus',
      type: 'Summer Internship Program 2025',
      description: 'Intensive Artificial Intelligence and Machine Learning summer internship program in partnership with Launchpad BITS Pilani Hyderabad. Participated in comprehensive training covering AI/ML fundamentals, practical model building, and real-world project implementation.',
      achievements: [
        'Completed 21 days of intensive offline classroom training in AI/ML',
        'Executed 9-24 days of hands-on project development and implementation',
        'Applied machine learning techniques to industry-relevant problem solving',
        'Gained practical experience in AI/ML model building and training processes',
        'Successfully completed certification requirements for the program'
      ],
      technologies: ['Python', 'Machine Learning', 'AI', 'Data Science', 'Model Training'],
    },
  ];

  return (
    <section
      id="internships"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mb-16`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-gradient">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through internships and professional development opportunities
          </p>
        </div>

        <div className="space-y-8">
          {internships.map((internship, index) => (
            <div
              key={internship.company}
              className={`fade-in-up ${isVisible ? 'animate' : ''} portfolio-card p-8`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Company info */}
                <div className="md:col-span-1">
                  <div className="flex items-center mb-2">
                    <Building className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold text-gradient">
                      {internship.company}
                    </h3>
                  </div>
                  <h4 className="font-medium text-foreground mb-3">
                    {internship.role}
                  </h4>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {internship.location}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20">
                      {internship.type}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-medium text-foreground mb-2">Technologies</h5>
                    <div className="flex flex-wrap gap-1">
                      {internship.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description and achievements */}
                <div className="md:col-span-2">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {internship.description}
                  </p>

                  <div>
                    <h5 className="font-medium text-foreground mb-3">Key Achievements</h5>
                    <ul className="space-y-2">
                      {internship.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mt-16`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="portfolio-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gradient">
              Open to New Opportunities
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm actively seeking internship and full-time opportunities in AI/ML, web development, 
              and software engineering where I can apply my technical skills and continue learning 
              from experienced professionals in dynamic environments.
            </p>
            <a 
              href="#contact"
              className="inline-block px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipsSection;