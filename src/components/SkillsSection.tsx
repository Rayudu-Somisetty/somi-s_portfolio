import { useEffect, useRef, useState, useCallback } from 'react';
import { Crown, Star, Award, Zap, Code, Database, Globe, Settings, Users, Brain, Terminal, Play, FolderOpen, File, Minimize2, Maximize2, X } from 'lucide-react';

// Skills data structure
const skillsData = {
  "Frontend": [
    { name: "React", proficiency: 90, experience: "3+ years", projects: 15 },
    { name: "TypeScript", proficiency: 85, experience: "2+ years", projects: 12 },
    { name: "JavaScript", proficiency: 92, experience: "4+ years", projects: 25 },
    { name: "Tailwind CSS", proficiency: 88, experience: "2+ years", projects: 18 },
    { name: "HTML5", proficiency: 95, experience: "5+ years", projects: 30 },
    { name: "CSS3", proficiency: 85, experience: "5+ years", projects: 30 }
  ],
  "Backend": [
    { name: "Python", proficiency: 95, experience: "4+ years", projects: 20 },
    { name: "Flask", proficiency: 85, experience: "2+ years", projects: 8 },
    { name: "FastAPI", proficiency: 80, experience: "1+ years", projects: 5 },
    { name: "Node.js", proficiency: 75, experience: "1+ years", projects: 6 },
    { name: "PostgreSQL", proficiency: 80, experience: "2+ years", projects: 10 }
  ],
  "Data Science": [
    { name: "Pandas", proficiency: 90, experience: "3+ years", projects: 15 },
    { name: "NumPy", proficiency: 88, experience: "3+ years", projects: 15 },
    { name: "Scikit-learn", proficiency: 80, experience: "2+ years", projects: 8 },
    { name: "SQL", proficiency: 85, experience: "3+ years", projects: 12 }
  ],
  "AI/ML": [
    { name: "Machine Learning", proficiency: 82, experience: "2+ years", projects: 6 },
    { name: "Data Visualization", proficiency: 85, experience: "2+ years", projects: 10 },
    { name: "Statistical Analysis", proficiency: 78, experience: "2+ years", projects: 8 }
  ],
  "Tools": [
    { name: "Git", proficiency: 90, experience: "4+ years", projects: 50 },
    { name: "VS Code", proficiency: 95, experience: "5+ years", projects: 50 },
    { name: "Docker", proficiency: 75, experience: "1+ years", projects: 5 },
    { name: "Linux", proficiency: 80, experience: "3+ years", projects: 15 }
  ],
  "Soft Skills": [
    { name: "Problem Solving", proficiency: 92, experience: "5+ years", projects: 40 },
    { name: "Team Collaboration", proficiency: 88, experience: "4+ years", projects: 25 },
    { name: "Communication", proficiency: 85, experience: "5+ years", projects: 30 },
    { name: "Project Management", proficiency: 80, experience: "2+ years", projects: 15 }
  ]
};

// Get proficiency level text and color
const getProficiencyLevel = (proficiency: number) => {
  if (proficiency >= 90) return { text: "Expert", color: "text-green-400" };
  if (proficiency >= 80) return { text: "Advanced", color: "text-blue-400" };
  if (proficiency >= 70) return { text: "Intermediate", color: "text-yellow-400" };
  return { text: "Beginner", color: "text-orange-400" };
};

// Terminal Modal Component
const TerminalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal');
  const terminalRef = useRef<HTMLDivElement>(null);

  const skillCommands = {
    'ls': [
      'frontend/',
      'backend/',
      'data-science/',
      'ai-ml/',
      'tools/',
      'soft-skills/'
    ],
    'ls skills': [
      'frontend/',
      'backend/',
      'data-science/',
      'ai-ml/',
      'tools/',
      'soft-skills/'
    ],
    'ls frontend': [
      'react.js - 90% proficiency',
      'typescript.ts - 85% proficiency',
      'javascript.js - 92% proficiency',
      'tailwindcss.css - 88% proficiency',
      'html5.html - 95% proficiency',
      'css3.css - 85% proficiency'
    ],
    'ls backend': [
      'python.py - 95% proficiency',
      'flask.py - 85% proficiency',
      'fastapi.py - 80% proficiency',
      'nodejs.js - 75% proficiency',
      'postgresql.sql - 80% proficiency'
    ],
    'ls data-science': [
      'pandas.py - 90% proficiency',
      'numpy.py - 88% proficiency',
      'scikit-learn.py - 80% proficiency',
      'sql.sql - 85% proficiency'
    ],
    'ls ai-ml': [
      'machine-learning.py - 82% proficiency',
      'data-visualization.py - 85% proficiency',
      'statistical-analysis.py - 78% proficiency'
    ],
    'ls tools': [
      'git.sh - 90% proficiency',
      'vscode.exe - 95% proficiency',
      'docker.yml - 75% proficiency',
      'linux.sh - 80% proficiency'
    ],
    'ls soft-skills': [
      'problem-solving - 92% proficiency',
      'team-collaboration - 88% proficiency',
      'communication - 85% proficiency',
      'project-management - 80% proficiency'
    ]
  };

  const executeCommand = useCallback((command: string) => {
    // Handle clear command
    if (command.trim() === 'clear') {
      setTerminalOutput([]);
      setIsTyping(false);
      return;
    }

    // Handle exit command
    if (command.trim() === 'exit') {
      setTerminalOutput(prev => [...prev, 'Terminal session ended. Goodbye! 👋']);
      setTimeout(() => {
        onClose();
      }, 1000);
      return;
    }

    setIsTyping(true);
    const output = skillCommands[command as keyof typeof skillCommands] || [`Command not found: ${command}. Try 'ls', 'ls skills', 'ls frontend', 'ls backend', 'clear', or 'exit'.`];
    
    let lineIndex = 0;
    const typeInterval = setInterval(() => {
      if (lineIndex < output.length) {
        setTerminalOutput(prev => [...prev, output[lineIndex]]);
        lineIndex++;
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 100);
  }, [onClose]);

  const handleTerminalCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      // Handle clear command specially
      if (currentCommand.trim() === 'clear') {
        executeCommand(currentCommand.trim());
        setCurrentCommand('');
        return;
      }
      
      // Handle exit command specially
      if (currentCommand.trim() === 'exit') {
        setTerminalOutput(prev => [...prev, `$ ${currentCommand}`]);
        executeCommand(currentCommand.trim());
        setCurrentCommand('');
        return;
      }
      
      setTerminalOutput(prev => [...prev, `$ ${currentCommand}`]);
      executeCommand(currentCommand.trim());
      setCurrentCommand('');
    }
  };

  const tabs = [
    { id: 'terminal', name: 'Terminal', icon: Terminal, language: 'bash' },
    { id: 'skills.js', name: 'skills.js', icon: File, language: 'javascript' },
    { id: 'backend.py', name: 'backend.py', icon: File, language: 'python' },
    { id: 'package.json', name: 'package.json', icon: File, language: 'json' }
  ];

  const codeContent = {
    'skills.js': `// My Technical Skills Portfolio
import { useState, useEffect } from 'react';

const MySkills = () => {
  const [skills] = useState({
    frontend: {
      react: { level: 90, experience: '3+ years', projects: 15 },
      typescript: { level: 85, experience: '2+ years', projects: 12 },
      javascript: { level: 92, experience: '4+ years', projects: 25 },
      tailwindcss: { level: 88, experience: '2+ years', projects: 18 },
      html5: { level: 95, experience: '5+ years', projects: 30 },
      css3: { level: 85, experience: '5+ years', projects: 30 }
    },
    backend: {
      python: { level: 95, experience: '4+ years', projects: 20 },
      flask: { level: 85, experience: '2+ years', projects: 8 },
      nodejs: { level: 75, experience: '1+ years', projects: 6 },
      fastapi: { level: 80, experience: '1+ years', projects: 5 }
    }
  });

  return (
    <div className="skills-portfolio">
      {Object.entries(skills).map(([category, skillSet]) => (
        <SkillCategory 
          key={category} 
          name={category} 
          skills={skillSet} 
        />
      ))}
    </div>
  );
};

export default MySkills;`,
    'backend.py': `#!/usr/bin/env python3
"""
Backend & Data Analysis Skills
Author: Your Name
Last Updated: September 2025
"""

class SkillsAnalyzer:
    def __init__(self):
        self.backend_skills = {
            'python': {'proficiency': 95, 'years': 4},
            'flask': {'proficiency': 85, 'years': 2},
            'fastapi': {'proficiency': 80, 'years': 1},
            'django': {'proficiency': 70, 'years': 1},
            'postgresql': {'proficiency': 80, 'years': 2}
        }
        
        self.data_skills = {
            'pandas': {'proficiency': 90, 'years': 3},
            'numpy': {'proficiency': 88, 'years': 3},
            'scikit_learn': {'proficiency': 80, 'years': 2},
            'matplotlib': {'proficiency': 82, 'years': 2},
            'sql': {'proficiency': 85, 'years': 3}
        }
    
    def analyze_proficiency(self, category):
        """Analyze skill proficiency in a category"""
        if category == 'backend':
            skills = self.backend_skills
        elif category == 'data':
            skills = self.data_skills
        else:
            return None
            
        total_proficiency = sum(skill['proficiency'] for skill in skills.values())
        avg_proficiency = total_proficiency / len(skills)
        
        return {
            'average': round(avg_proficiency, 1),
            'count': len(skills),
            'top_skill': max(skills.items(), key=lambda x: x[1]['proficiency'])
        }
    
    def get_skill_summary(self):
        """Generate comprehensive skill summary"""
        return {
            'backend': self.analyze_proficiency('backend'),
            'data_science': self.analyze_proficiency('data'),
            'total_skills': len(self.backend_skills) + len(self.data_skills)
        }

if __name__ == "__main__":
    analyzer = SkillsAnalyzer()
    summary = analyzer.get_skill_summary()
    print(f"Skill Analysis Complete: {summary}")`,
    'package.json': `{
  "name": "portfolio-skills",
  "version": "1.0.0",
  "description": "Technical skills showcase",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "skills": "node scripts/analyze-skills.js",
    "deploy": "npm run build && gh-pages -d build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^4.9.0",
    "tailwindcss": "^3.3.0",
    "@types/react": "^18.2.0"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "gh-pages": "^3.2.3"
  },
  "skills": {
    "frontend": ["React", "TypeScript", "Tailwind CSS"],
    "backend": ["Python", "Flask", "FastAPI", "Node.js"],
    "data": ["Pandas", "NumPy", "SQL", "Data Visualization"],
    "tools": ["Git", "VS Code", "Docker", "Linux"]
  },
  "author": "Your Name",
  "license": "MIT"
}`
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="terminal-editor w-full max-w-4xl h-[75vh] bg-card rounded-xl overflow-hidden border border-border shadow-2xl animate-in zoom-in-95 duration-300 ease-out" 
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Window Header */}
        <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-muted-foreground text-sm ml-4">VS Code - Skills Portfolio</span>
          </div>
          <div className="flex items-center space-x-2">
            <Minimize2 className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" onClick={onClose} />
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex bg-muted border-b border-border">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm border-r border-border transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex h-full">
          {/* Command Reference Panel */}
          <div className="w-64 bg-muted/50 border-r border-border p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-muted-foreground text-sm font-semibold">COMMAND REFERENCE</span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-green-400 font-mono text-xs mb-1">💻 Basic Commands</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-green-300">ls</code> - List all categories
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-green-300">clear</code> - Clear terminal
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-green-300">exit</code> - Close terminal
                </div>
              </div>
              
              <div>
                <div className="text-blue-400 font-mono text-xs mb-1">🛠️ Skill Categories</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-blue-300">ls frontend</code> - Web technologies
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-blue-300">ls backend</code> - Server technologies
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-blue-300">ls data-science</code> - Data analysis
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-blue-300">ls ai-ml</code> - AI & Machine Learning
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-blue-300">ls tools</code> - Development tools
                </div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pl-2">
                  <code className="text-blue-300">ls soft-skills</code> - Professional skills
                </div>
              </div>
              
              <div>
                <div className="text-yellow-400 font-mono text-xs mb-1">💡 Tips</div>
                <div className="text-muted-foreground text-xs pl-2">
                  Type any command and press Enter to execute
                </div>
                <div className="text-muted-foreground text-xs pl-2">
                  Commands are case-sensitive
                </div>
                <div className="text-muted-foreground text-xs pl-2">
                  Use 'clear' to clean up output
                </div>
              </div>
            </div>
          </div>

          {/* Main Terminal Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'terminal' ? (
              <div className="h-full bg-black text-green-400 font-mono">
                <div 
                  ref={terminalRef}
                  className="h-5/6 overflow-y-auto p-4 space-y-1"
                >
                  <div className="text-blue-400">Welcome to Skills Terminal v1.0.0</div>
                  <div>Type commands to explore my technical skills:</div>
                  <div className="text-yellow-400">Available commands: ls, ls skills, ls frontend, ls backend, ls data-science, ls ai-ml, ls tools, ls soft-skills, clear, exit</div>
                  <div>─────────────────────────────────────────────</div>
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                      {line}
                    </div>
                  ))}
                  {isTyping && <div className="animate-pulse">...</div>}
                </div>
                <div className="h-1/6 border-t border-border p-4 flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleTerminalCommand}
                    className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                    placeholder="Enter command..."
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                <pre className="text-sm text-foreground p-4 font-mono leading-relaxed h-full overflow-auto">
                  <code className="language-javascript">
                    {codeContent[activeTab as keyof typeof codeContent]}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

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

  // Test render first
  console.log('SkillsSection rendering...', { isVisible, skillsData });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Globe className="w-5 h-5" />;
      case 'Backend': return <Database className="w-5 h-5" />;
      case 'Data Science': return <Brain className="w-5 h-5" />;
      case 'AI/ML': return <Zap className="w-5 h-5" />;
      case 'Tools': return <Settings className="w-5 h-5" />;
      case 'Soft Skills': return <Users className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'from-blue-400 to-blue-600';
      case 'Backend': return 'from-green-400 to-green-600';
      case 'Data Science': return 'from-purple-400 to-purple-600';
      case 'AI/ML': return 'from-cyan-400 to-cyan-600';
      case 'Tools': return 'from-orange-400 to-orange-600';
      case 'Soft Skills': return 'from-pink-400 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 px-4 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              🛠️ Skills & Technologies
            </h2>
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="bg-card hover:bg-muted text-foreground p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 border border-border hover:border-primary/50"
              title="Open Terminal Simulator"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-xs">Terminal</span>
            </button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My technical expertise across various domains and technologies
          </p>
        </div>

        {/* Compact Skills Grid - 3x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div
              key={category}
              className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category}</h3>
              </div>

              <div className="space-y-2">
                {skills.slice(0, 4).map((skill) => { // Show only top 4 skills per category
                  const proficiencyLevel = getProficiencyLevel(skill.proficiency);
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between py-1"
                    >
                      <span className="text-sm text-muted-foreground font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold ${proficiencyLevel.color}`}>
                          {skill.proficiency}%
                        </span>
                        {skill.proficiency >= 90 && <Crown className="w-3 h-3 text-yellow-400" />}
                        {skill.proficiency >= 80 && skill.proficiency < 90 && <Award className="w-3 h-3 text-blue-400" />}
                        {skill.proficiency >= 70 && skill.proficiency < 80 && <Star className="w-3 h-3 text-green-400" />}
                      </div>
                    </div>
                  );
                })}
                {skills.length > 4 && (
                  <div className="text-xs text-muted-foreground pt-1">
                    +{skills.length - 4} more skills
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Modal */}
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </section>
  );
};

export default SkillsSection;