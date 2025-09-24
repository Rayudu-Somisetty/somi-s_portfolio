import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const CertificationsSection = () => {
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

  const certifications = [
    {
      title: 'AIML Summer Internship Program 2025',
      issuer: 'Bharatversity & Launchpad BITS Pilani Hyderabad',
      date: 'July 2025',
      credentialId: 'BHARATVERSITY-AIML-2025',
      verifyUrl: 'https://www.linkedin.com/in/rayudusomisetty-d4912/details/certifications/1758219291033/single-media-viewer/?profileId=ACoAAEcIwwsBIuvP3rttIWHHajMuPxGh0yhFrOA',
      description: 'Intensive summer internship program in Artificial Intelligence and Machine Learning with 21 days of classroom training and hands-on project execution.',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Data Science', 'Model Training'],
      type: 'Internship Certification',
      featured: true,
    },
    {
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google (Coursera)',
      date: 'Previous',
      credentialId: 'GOOGLE-DA-COURSERA',
      verifyUrl: 'https://coursera.org/verify/professional-cert',
      description: 'Comprehensive program covering data analysis tools and techniques including data cleaning, analysis, and visualization using industry-standard tools.',
      skills: ['Data Analytics', 'SQL', 'Data Visualization', 'Statistical Analysis', 'Excel'],
      type: 'Professional Certificate',
      featured: true,
    },
    {
      title: 'GitHub Pro Account',
      issuer: 'GitHub',
      date: 'Current',
      credentialId: 'GITHUB-PRO-ACTIVE',
      verifyUrl: 'https://github.com/Rayudu-Somisetty',
      description: 'Advanced development tools and features access with GitHub Pro membership for enhanced collaboration and repository management.',
      skills: ['Git', 'Version Control', 'Collaboration', 'Open Source', 'Repository Management'],
      type: 'Platform Membership',
      featured: false,
    },
    {
      title: 'JP Morgan Chase Software Engineering',
      issuer: 'JP Morgan Chase (Forage)',
      date: '2024',
      credentialId: 'JPMC-FORAGE-SE',
      verifyUrl: 'https://github.com/Rayudu-Somisetty/forage-midas',
      description: 'Corporate software engineering training program covering advanced Java development practices and enterprise-level software engineering methodologies.',
      skills: ['Java', 'Software Engineering', 'Enterprise Development', 'Corporate Practices'],
      type: 'Corporate Training',
      featured: false,
    },
  ];

  const achievements = [
    {
      title: 'GitHub Community Contributions',
      description: 'Active GitHub contributor with 33+ contributions in the last year and 3 followers',
      date: '2024 - Present',
      type: 'Open Source',
    },
    {
      title: 'Multi-Platform Deployment Experience',
      description: 'Successfully deployed applications on Render, Netlify, and Hugging Face Spaces with CI/CD',
      date: '2024 - 2025',
      type: 'DevOps',
    },
    {
      title: 'Full Stack Project Portfolio',
      description: 'Developed and deployed 10+ repositories showcasing various technologies and frameworks',
      date: '2023 - Present',
      type: 'Development',
    },
    {
      title: 'Competitive Programming Participation',
      description: 'Participated in Frontend Battle 2025 - IITBBS Hackathon and various coding challenges',
      date: '2025',
      type: 'Competition',
    },
  ];

  const featuredCertifications = certifications.filter(cert => cert.featured);
  const otherCertifications = certifications.filter(cert => !cert.featured);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mb-16`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-gradient">
            Certifications & Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and academic achievements that demonstrate my commitment to continuous learning
          </p>
        </div>

        {/* Featured Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-gradient">
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredCertifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`fade-in-up ${isVisible ? 'animate' : ''} portfolio-card p-6 group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-primary mr-3" />
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                      {cert.type}
                    </span>
                  </div>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground hover:text-primary transition-colors ${cert.verifyUrl === '#' ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h4 className="text-xl font-semibold mb-2 text-gradient group-hover:text-primary transition-colors">
                  {cert.title}
                </h4>
                <p className="text-muted-foreground font-medium mb-2">{cert.issuer}</p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {cert.date}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="mb-4">
                  <h5 className="font-medium text-foreground mb-2">Skills Validated</h5>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-accent/10 text-accent rounded text-xs border border-accent/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Credential ID:</span> {cert.credentialId}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-gradient">
            Additional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherCertifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`fade-in-up ${isVisible ? 'animate' : ''} portfolio-card p-4 group`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground hover:text-primary transition-colors ${cert.verifyUrl === '#' ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {cert.date}
                </div>

                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 text-muted-foreground text-xs">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.8s' }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-gradient">
            Academic & Professional Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="portfolio-card p-6 group"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="flex items-start mb-3">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {achievement.date}
                  </div>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs border border-secondary/20">
                    {achievement.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
