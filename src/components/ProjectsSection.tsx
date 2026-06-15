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
      { threshold: 0.2 }
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
      description: 'ML-powered web app predicting diamond prices using Random Forest with interactive visualizations.',
      technologies: ['Python', 'Flask', 'JavaScript', 'scikit-learn'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/Diamond_price_predictor',
      liveUrl: 'https://rayudu4912-diamond-price-predictor.hf.space/',
      featured: true,
    },
    {
      title: 'NCC Recruitment Website',
      description: 'Responsive army-themed recruitment platform with countdown timer and QR code integration.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/NCC-RECRUITMENT',
      liveUrl: 'https://ncc-enrollment.netlify.app/',
      featured: true,
    },
    {
      title: 'Diabetes Prediction Model',
      description: 'ML classification system for diabetes risk prediction using Python.',
      technologies: ['Python', 'scikit-learn', 'pandas'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/Diabetes_prediction.py',
      liveUrl: '#',
      featured: false,
    },
    {
      title: 'House Price Prediction',
      description: 'Real estate price prediction using regression models and data analysis.',
      technologies: ['Python', 'Machine Learning', 'pandas'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/House_price.py',
      liveUrl: '#',
      featured: false,
    },
    {
      title: 'Frontend Battle 2025',
      description: 'IITBBS hackathon entry showcasing advanced frontend techniques.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      githubUrl: 'https://github.com/Rayudu-Somisetty/Frontend-battle-round-1',
      liveUrl: '#',
      featured: false,
    },
    {
      title: 'JP Morgan Chase - Software Engineering',
      description: 'Corporate-level Java development project through JP Morgan Forage.',
      technologies: ['Java', 'Software Engineering'],
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
      className="py-20 px-6"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary-gradient">
            &lt;/Projects&gt;
          </h2>
          <p className="text-base text-muted-foreground">
            A showcase of my best work and technical achievements
          </p>
        </div>

        {/* Featured Projects - cleaner layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="portfolio-card p-6 group"
            >
              <h3 className="text-xl font-semibold mb-3 text-gradient group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
                >
                  <Github className="w-4 h-4 inline mr-1" />
                  Code
                </a>
                {project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform text-sm"
                  >
                    <Play className="w-4 h-4 inline mr-1" />
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects - compact cards */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center text-gradient">
            Other Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className="portfolio-card p-4 group"
                data-aos="fade-up"
                data-aos-delay={200 + index * 50}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                    {project.title}
                  </h4>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-0.5 text-muted-foreground text-xs">
                      +{project.technologies.length - 2}
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