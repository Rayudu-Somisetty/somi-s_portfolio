import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { Menu, Moon, Music2, Sun, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.ico?v=3`;
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarMotion, setAvatarMotion] = useState({ x: 0, y: 0 });
  const avatarTarget = useRef({ x: 0, y: 0 });
  const avatarVelocity = useRef({ x: 0, y: 0 });
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const lastScrollY = useRef(0);
  const avatarFrame = useRef<number | null>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const startAvatarSpring = useCallback(() => {
    if (avatarFrame.current) return;

    const stiffness = 0.14;
    const damping = 0.72;

    const tick = () => {
      setAvatarMotion((current) => {
        const velocityX = (avatarVelocity.current.x + (avatarTarget.current.x - current.x) * stiffness) * damping;
        const velocityY = (avatarVelocity.current.y + (avatarTarget.current.y - current.y) * stiffness) * damping;
        const nextX = current.x + velocityX;
        const nextY = current.y + velocityY;

        avatarVelocity.current = { x: velocityX, y: velocityY };

        if (
          Math.abs(nextX - avatarTarget.current.x) < 0.03 &&
          Math.abs(nextY - avatarTarget.current.y) < 0.03 &&
          Math.abs(velocityX) < 0.03 &&
          Math.abs(velocityY) < 0.03
        ) {
          avatarFrame.current = null;
          avatarVelocity.current = { x: 0, y: 0 };
          return avatarTarget.current;
        }

        avatarFrame.current = requestAnimationFrame(tick);
        return { x: nextX, y: nextY };
      });
    };

    avatarFrame.current = requestAnimationFrame(tick);
  }, []);

  const updateAvatarMotion = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    const button = avatarButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

    avatarTarget.current = {
      x: x * 8,
      y: y * 8,
    };
    setIsAvatarHovered(true);
    startAvatarSpring();
  }, [startAvatarSpring]);

  const resetAvatarMotion = useCallback(() => {
    avatarTarget.current = { x: 0, y: 0 };
    setIsAvatarHovered(false);
    startAvatarSpring();
  }, [startAvatarSpring]);

  useEffect(() => {
    return () => {
      if (avatarFrame.current) {
        cancelAnimationFrame(avatarFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Internships', href: '#internships' },
    { name: 'Certifications', href: '#certifications' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const avatarStyle = {
    '--avatar-x': `${avatarMotion.x}px`,
    '--avatar-y': `${avatarMotion.y}px`,
    '--avatar-rotate-x': `${-avatarMotion.y * 1.8}deg`,
    '--avatar-rotate-y': `${avatarMotion.x * 1.8}deg`,
    '--avatar-rotate-z': `${avatarMotion.x * 0.8}deg`,
    '--avatar-glow': isAvatarHovered ? 1 : 0.65,
  } as CSSProperties;

  return (
    <nav
      className={`fixed top-3 left-4 right-4 z-50 overflow-hidden rounded-full border border-white/10 shadow-2xl shadow-primary/10 backdrop-blur-xl transition-all duration-300 sm:left-8 sm:right-8 lg:left-20 lg:right-20 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-background/88'
          : 'bg-background/68'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between h-14">
          {/* Logo with Hey! */}
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Hey!</div>
            <button
              ref={avatarButtonRef}
              type="button"
              className="nav-favicon-button relative flex h-14 w-14 items-end justify-center border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-primary/60"
              style={avatarStyle}
              onPointerMove={updateAvatarMotion}
              onPointerLeave={resetAvatarMotion}
              aria-label="Interactive avatar button"
              title="Interactive avatar"
            >
              <span className="nav-favicon-orbit" aria-hidden="true">
                <img
                  src={faviconUrl}
                  alt=""
                  className="nav-favicon-icon h-12 w-12 object-contain"
                />
              </span>
            </button>
          </div>

          {/* Right side content */}
          <div className="flex items-center space-x-3">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-open-link"
                  aria-label={`${item.name} menu button`}
                >
                  &lt;/{item.name}&gt;
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border bg-card/40 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to night mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              disabled
              className="p-2 rounded-full border border-border bg-card/20 text-muted-foreground opacity-60"
              aria-label="Music player coming soon"
              title="Music player coming soon"
            >
              <Music2 className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu Button"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <ul className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg rounded-lg mt-2 border border-border">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="nav-open-link block w-full text-left px-2 py-2 my-1"
                  aria-label={`${item.name} menu button`}
                >
                  &lt;/{item.name}&gt;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
