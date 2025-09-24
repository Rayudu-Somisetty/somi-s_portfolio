import { useEffect, useState } from 'react';
import profilePhoto from '@/assets/profile-photo.jpg';
import profileFullBody from '@/assets/profile-full-body.jpg';
import { useTypewriterCycle } from '@/hooks/useTypewriterCycle';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Cycling typewriter effect for different professional roles
  const roleText = useTypewriterCycle({
    texts: [
      "Passionate AI Developer",
      "Data Analyst & Problem Solver", 
      "Full-Stack Web Developer",
      "Machine Learning Engineer",
      "Prompt Engineer"
    ],
    speed: 120,
    delay: 1000,
    deleteSpeed: 60,
    pauseDuration: 3000,
    cursor: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transforms based on scroll
  const contentOpacity = Math.max(0, 1 - scrollY * 0.002);
  const contentTranslateY = Math.min(50, scrollY * 0.3);

  const handlePhotoClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-screen">
        <div className="grid lg:grid-cols-2 gap-6 h-full items-center pt-20 pb-32">
          
          {/* Left side - Content */}
          <div 
            className="space-y-6 hero-content lg:pr-8"
            style={{
              transform: `translateY(${contentTranslateY}px)`,
              opacity: contentOpacity,
            }}
          >
            {/* Main heading with typewriter effect */}
            <div className="space-y-4">
              {/* Greeting */}
              <div className="text-lg lg:text-xl text-muted-foreground font-mono">
                Hey! I'm
              </div>
              
              {/* Name with gradient and interactive letters */}
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-mono">
                <span className="text-gradient typewriter-text">
                  {"Rayudu Somisetty".split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`interactive-letter ${letter === ' ' ? 'inline-block w-4' : ''}`}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        transitionDelay: `${index * 0.02}s`
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
              </h1>
              
              {/* Title */}
              <h2 className="text-xl lg:text-2xl font-semibold text-primary font-mono">
                Computer Science Engineering Student
              </h2>
              
              {/* Professional descriptor with cycling typewriter effect */}
              <div className="text-base lg:text-lg text-accent font-medium font-mono min-h-[1.5rem] lg:min-h-[1.75rem] flex items-center">
                <span className="typewriter-text">
                  {roleText.displayedText}
                  <span className="typewriter-cursor">{roleText.cursor}</span>
                </span>
              </div>
              
              <div className="w-20 h-1 bg-gradient-primary rounded-full"></div>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Passionate about creating innovative solutions through 
              <span className="text-primary font-medium"> machine learning</span>, 
              <span className="text-accent font-medium"> web development</span>, 
              and cutting-edge technology.
            </p>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python & ML', 'React & JavaScript', 'Flask & APIs', 'Data Science'].map((skill, index) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary-gradient">10+</div>
                <div className="text-xs text-muted-foreground">Projects Built</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary-gradient">33+</div>
                <div className="text-xs text-muted-foreground">GitHub Contributions</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary-gradient">1</div>
                <div className="text-xs text-muted-foreground">AI/ML Internship</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                Explore My Work
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
              >
                Let's Connect
              </button>
            </div>
          </div>

          {/* Right side - Simple Photo */}
          <div className="relative h-full flex items-center justify-center lg:justify-end">
            <div className="profile-photo-container">
              <div className={`profile-photo-wrapper ${isFlipped ? 'flipped' : ''}`} onClick={handlePhotoClick}>
                <img
                  src={profilePhoto}
                  alt="Rayudu Somisetty - Computer Science Engineering Student"
                  className="profile-photo"
                />
                <img
                  src={profileFullBody}
                  alt="Rayudu Somisetty - Full Body Photo"
                  className="profile-photo back"
                />
                <div className="photo-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{ opacity: contentOpacity }}
      >
        <div className="animate-float">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center backdrop-blur-sm bg-background/20">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;