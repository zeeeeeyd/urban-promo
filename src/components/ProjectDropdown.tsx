import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  image: string;
}

const ProjectDropdown = () => {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: ProjectItem[] = t('projects.dropdown.items', { returnObjects: true }) as ProjectItem[];

  return (
    <div className="absolute top-full left-0 w-screen max-w-4xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl transform transition-all duration-300 ease-out opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {t('projects.dropdown.title')}
            </h3>
            <p className="text-zinc-400 text-sm">
              {t('projects.dropdown.subtitle')}
            </p>
          </div>
          <div className="w-12 h-12 bg-yellow-400/10 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400"></div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group/item relative overflow-hidden bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-yellow-400/20 transition-opacity duration-300 ${
                  hoveredProject === index ? 'opacity-100' : 'opacity-0'
                }`}></div>

                {/* External Link Icon */}
                <div className={`absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  hoveredProject === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-medium text-yellow-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-2 group-hover/item:text-yellow-400 transition-colors duration-200">
                  {project.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom Border Animation */}
              <div className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
                hoveredProject === index ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="group/btn flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/25">
            <span>{t('projects.dropdown.viewAll')}</span>
            <ArrowRight 
              size={16} 
              className="transition-transform duration-200 group-hover/btn:translate-x-1" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDropdown;