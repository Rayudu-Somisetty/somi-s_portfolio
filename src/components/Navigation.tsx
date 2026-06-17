import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { Menu, Moon, Music2, Sun, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation = () => {
  // Keeps this component subscribed to theme state
  // (so theme-related UI updates re-render reliably)


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
      className={`fixed top-2 left-3 right-3 z-50 overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 backdrop-blur-xl transition-all duration-300 sm:top-3 sm:left-6 sm:right-6 xl:left-20 xl:right-20 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-background/88' : 'bg-background/68'
      } ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 xl:px-7">
        <div className="flex h-12 items-center justify-between sm:h-14">
          {/* Logo with Hey! */}
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.18em]">Hey!</div>
            <button
              ref={avatarButtonRef}
              type="button"
              className="nav-favicon-button relative flex h-12 w-12 items-end justify-center border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-primary/60 sm:h-14 sm:w-14"
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
                  className="nav-favicon-icon h-10 w-10 object-contain sm:h-12 sm:w-12"
                />
              </span>
            </button>
          </div>

          {/* Right side content */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-open-link"
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-border bg-card/40 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all sm:p-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to night mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            <button
              type="button"
              disabled
              className="p-1.5 rounded-full border border-border bg-card/20 text-muted-foreground opacity-60 sm:p-2"
              aria-label="Music player coming soon"
              title="Music player coming soon"
            >
              <Music2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              className="p-1.5 rounded-full border border-border bg-card/40 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all lg:hidden sm:p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu Button"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <ul className="space-y-1 border-t border-white/10 px-1 pb-3 pt-2 lg:hidden sm:px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="nav-open-link block w-full text-left py-2.5 pl-4 pr-2"
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
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

