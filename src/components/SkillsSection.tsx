import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Settings, Brain, Zap } from 'lucide-react';

const skillsData = {
  "Frontend": [
    { name: "React", proficiency: 90 },
    { name: "TypeScript", proficiency: 85 },
    { name: "JavaScript", proficiency: 92 },
    { name: "Tailwind CSS", proficiency: 88 },
  ],
  "Backend": [
    { name: "Python", proficiency: 95 },
    { name: "Flask", proficiency: 85 },
    { name: "Node.js", proficiency: 75 },
  ],
  "Data Science": [
    { name: "Pandas", proficiency: 90 },
    { name: "NumPy", proficiency: 88 },
    { name: "Scikit-learn", proficiency: 80 },
  ],
  "AI/ML": [
    { name: "Machine Learning", proficiency: 82 },
    { name: "Data Visualization", proficiency: 85 },
  ],
  "Tools": [
    { name: "Git", proficiency: 90 },
    { name: "VS Code", proficiency: 95 },
    { name: "Docker", proficiency: 75 },
  ],
};

const getProficiencyLevel = (proficiency: number) => {
  if (proficiency >= 90) return { text: "Expert", color: "text-green-400" };
  if (proficiency >= 80) return { text: "Advanced", color: "text-blue-400" };
  return { text: "Intermediate", color: "text-yellow-400" };
};

const SkillsSection = () => {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Globe className="w-5 h-5" />;
      case 'Backend': return <Database className="w-5 h-5" />;
      case 'Data Science': return <Brain className="w-5 h-5" />;
      case 'AI/ML': return <Zap className="w-5 h-5" />;
      case 'Tools': return <Settings className="w-5 h-5" />;
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
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-6"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-gradient">
            &lt;/Skills&gt;
          </h2>
        </div>

        {/* Tech Stack Icons Row */}
        <div className="mb-12" data-aos="fade-up">
          <h3 className="text-xl font-semibold mb-6 text-center text-gradient">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "HTML", icon: Code },
              { name: "CSS", icon: Code },
              { name: "JavaScript", icon: Code },
              { name: "Tailwind", icon: Code },
              { name: "React", icon: Globe },
              { name: "Node.js", icon: Database },
              { name: "Git", icon: Settings },
              { name: "Python", icon: Brain },
              { name: "Flask", icon: Code },
            ].map((item, index) => (
              <div 
                key={item.name} 
                className="flex flex-col items-center p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
                data-aos="fade-up" 
                data-aos-delay={100 + index * 50}
              >
                <item.icon className="w-8 h-8 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid - compact 2-column */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
              data-aos="fade-up"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category}</h3>
              </div>

              <div className="space-y-1.5">
                {skills.slice(0, 3).map((skill) => {
                  const proficiencyLevel = getProficiencyLevel(skill.proficiency);
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between py-0.5"
                    >
                      <span className="text-xs text-muted-foreground font-medium">{skill.name}</span>
                      <span className={`text-xs font-bold ${proficiencyLevel.color}`}>
                        {skill.proficiency}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;