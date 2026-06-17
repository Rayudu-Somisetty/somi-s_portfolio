import { useEffect, useState, type CSSProperties } from 'react';
import profilePhoto from '@/assets/profile-photo.jpg';
import { useTypewriterCycle } from '@/hooks/useTypewriterCycle';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const roleText = useTypewriterCycle({
    texts: [
      'AI Developer',
      'Data Analyst',
      'Full-Stack Developer',
      'ML Engineer',
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
    <section
      className="hero-premium relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      id="home"
      style={{ '--hero-scroll': `${scrollY * 0.05}px` } as CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="hero-ambient-field" />
        <div className="hero-grid-field" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="hero-content space-y-6 lg:pr-8">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-mono jitter-name">
                <span className="text-gradient">
                  {'Rayudu Somi Setty'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block ${letter === ' ' ? 'inline-block w-4' : 'jitter-name-letter'}`}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
              </h1>
              <div className="text-base md:text-lg text-accent font-medium font-mono min-h-[2rem] flex items-center">
                <span>{roleText.displayedText}<span className="animate-pulse">|</span></span>
              </div>

              <div className="w-24 h-1 bg-gradient-primary rounded-full" />
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Passionate about creating innovative solutions through
              <span className="text-primary font-medium"> machine learning</span>,
              <span className="text-accent font-medium"> web development</span>,
              and cutting-edge technology.
            </p>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python & ML', 'React', 'Flask', 'Data Science'].map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20 backdrop-blur"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="hero-stat">
                <div className="text-xl font-bold text-primary-gradient">10+</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="hero-stat">
                <div className="text-xl font-bold text-primary-gradient">33+</div>
                <div className="text-xs text-muted-foreground">Contributions</div>
              </div>
              <div className="hero-stat">
                <div className="text-xl font-bold text-primary-gradient">1</div>
                <div className="text-xs text-muted-foreground">Internship</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover:-translate-y-0.5 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20 focus:ring-2 focus:ring-primary"
              >
                View My Projects
              </button>

              <a
                href="/somi-s_portfolio/resume.pdf"
                download="Rayudu_Somisetty_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-primary/60 bg-white/[0.03] text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-primary inline-block backdrop-blur"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="hero-profile-frame relative cursor-pointer transition-transform duration-700"
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
              <div className="hero-profile-glow absolute -inset-6 rounded-full opacity-70 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
