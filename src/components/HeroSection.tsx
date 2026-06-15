import { useEffect, useState } from 'react';
import profilePhoto from '@/assets/profile-photo.jpg';
import { useTypewriterCycle } from '@/hooks/useTypewriterCycle';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Cycling typewriter effect for different professional roles
  const roleText = useTypewriterCycle({
    texts: [
      "AI Developer",
      "Data Analyst",
      "Full-Stack Developer",
      "ML Engineer"
    ],
    speed: 100,
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

  const handlePhotoClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden" id="home">
      {/* Background blob - decorative gradient circle */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           
          {/* Left side - Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Main heading with typewriter effect */}
            <div className="space-y-4">
              <div className="text-xl text-muted-foreground font-mono">
                Hey!&nbsp;
                <span className="font-bold text-primary">I&apos;m</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-mono">
                <span className="text-gradient">
                  {"Rayudu Somisetty".split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block ${letter === ' ' ? 'inline-block w-4' : ''}`}
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
              </h1>
              
              <h2 className="text-lg md:text-xl font-semibold text-primary font-mono">
                Computer Science Engineering Student
              </h2>
              
              <div className="text-base md:text-lg text-accent font-medium font-mono min-h-[2rem] flex items-center">
                <span>{roleText.displayedText}<span className="animate-pulse">|</span></span>
              </div>
              
              <div className="w-24 h-1 bg-gradient-primary rounded-full"></div>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Passionate about creating innovative solutions through 
              <span className="text-primary font-medium"> machine learning</span>, 
              <span className="text-accent font-medium"> web development</span>, 
              and cutting-edge technology.
            </p>

            {/* Skills tags - compact */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python & ML', 'React', 'Flask', 'Data Science'].map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats - compact horizontal */}
            <div className="flex gap-8">
              <div>
                <div className="text-xl font-bold text-primary-gradient">10+</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-gradient">33+</div>
                <div className="text-xs text-muted-foreground">Contributions</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-gradient">1</div>
                <div className="text-xs text-muted-foreground">Internship</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg focus:ring-2 focus:ring-primary"
              >
                View My Projects
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors focus:ring-2 focus:ring-primary"
              >
                Let&apos;s Connect
              </button>
            </div>
          </div>

          {/* Right side - Profile Photo centered, rotates on click */}
          <div className="flex items-center justify-center">
            <div 
              className="relative cursor-pointer transition-transform duration-700"
              onClick={handlePhotoClick}
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={profilePhoto}
                alt="Rayudu Somisetty"
                className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-primary/30"
              />
              <div className="absolute -inset-6 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;