import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';

const ProjectsSection = () => {
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

  const projects = [
    {
      title: 'Diamond Price Predictor',
      description: 'Full Stack Web Application with Machine Learning using Random Forest Regressor model for accurate diamond price prediction. Features interactive data visualizations, 3D diamond viewer, categorical encoding with LabelEncoder, and comprehensive model evaluation. Deployed with CI/CD pipelines.',
      technologies: ['Python', 'Flask', 'JavaScript', 'scikit-learn', 'pandas', 'numpy'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/Diamond_price_predictor',
      liveUrl: 'https://rayudu4912-diamond-price-predictor.hf.space/',
      secondaryUrl: 'https://diamond-9f69.onrender.com',
      featured: true,
    },
    {
      title: 'NCC Recruitment Website',
      description: 'Professional recruitment platform with responsive army-themed design, mobile hamburger menu, live countdown timer, image gallery slideshow, QR code integration for registration, smooth scroll animations, and typewriter effects.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/NCC-RECRUITMENT',
      liveUrl: 'https://ncc-enrollment.netlify.app/',
      featured: true,
    },
    {
      title: 'Frontend Battle 2025 - IITBBS Hackathon',
      description: 'Competitive frontend development challenge showcasing advanced web development skills. Built for the IITBBS hackathon demonstrating modern frontend techniques and responsive design principles.',
      technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/Frontend-battle-round-1',
      liveUrl: '#',
      featured: false,
    },
    {
      title: 'Diabetes Prediction Model',
      description: 'Python-based classification system using machine learning algorithms to predict diabetes risk. Implements data preprocessing, feature engineering, and model evaluation techniques.',
      technologies: ['Python', 'scikit-learn', 'pandas', 'Machine Learning'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/Diabetes_prediction.py',
      liveUrl: '#',
      featured: false,
    },
    {
      title: 'House Price Prediction',
      description: 'Real estate price prediction algorithm using regression models. Features data analysis, visualization, and predictive modeling for housing market analysis.',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'pandas'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/House_price.py',
      liveUrl: '#',
      featured: false,
    },
    {
      title: 'JP Morgan Chase - Software Engineering',
      description: 'Advanced software engineering practices project through JP Morgan\'s Forage program. Demonstrates corporate-level Java development and software engineering methodologies.',
      technologies: ['Java', 'Software Engineering', 'Corporate Training'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/forage-midas',
      liveUrl: '#',
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''} text-center mb-16`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my best work and technical achievements
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`fade-in-up ${isVisible ? 'animate' : ''} portfolio-card p-6 group`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-gradient group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
                {project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform text-sm font-medium"
                  >
                    <Play className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.secondaryUrl && (
                  <a
                    href={project.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Alt Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div
          className={`fade-in-up ${isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-gradient">
            Other Notable Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className="portfolio-card p-6 group"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-muted-foreground text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
