import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { ProjectItem, ProjectStatus } from '../types/profile';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  title?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  title = 'Selected Projects',
}) => {
  if (!projects || projects.length === 0) return null;

  const statusStyle = (status: ProjectStatus) => {
    switch (status) {
      case 'Active':
        return 'text-[#23a55a]';
      case 'Experiment':
        return 'text-[#f0b232]';
      case 'Finished':
        return 'text-[#5865F2]';
      case 'Paused':
        return 'text-[#717684]';
      default:
        return 'text-[#8e95a5]';
    }
  };

  return (
    <section className="space-y-3 pt-2" aria-labelledby="section-projects">
      <h2
        id="section-projects"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>

      <div className="space-y-1">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group -mx-3 p-3 rounded-xl hover:bg-[#12151e] transition-colors border border-transparent hover:border-[rgba(255,255,255,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-[#f0f2f5] tracking-tight group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-xs text-[#3c4150]">•</span>
                  <span
                    className={`text-[10px] font-mono font-medium ${statusStyle(
                      project.status
                    )}`}
                  >
                    {project.status.toLowerCase()}
                  </span>
                </div>

                <p className="text-xs text-[#8e95a5] leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#5e6678]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action links */}
              <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} on GitHub`}
                    className="p-1.5 rounded-md text-[#8e95a5] hover:text-[#f0f2f5] hover:bg-[#181b26] transition-colors"
                  >
                    <GithubIcon size={14} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name}`}
                    className="p-1.5 rounded-md text-[#8e95a5] hover:text-[#f0f2f5] hover:bg-[#181b26] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
