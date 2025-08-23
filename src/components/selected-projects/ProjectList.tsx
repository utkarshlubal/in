'use client';
import SectionTitle from './SectionTitle';
import { PROJECTS } from './data';
import type { IProject } from './types';
import { cn } from './utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef, useState, MouseEvent } from 'react';
import Project from './Project';
import ProjectModal from './ProjectModal';
import ProjectTypeBadge from './ProjectTypeBadge';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ListProps {
  onSelect?: (slug: string) => void;
  isDetailsOpen?: boolean;
}

const ProjectList = ({ onSelect, isDetailsOpen }: ListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(PROJECTS[0].slug);
  const [modalOpen, setModalOpen] = useState(false);

  useGSAP(
    (context, contextSafe) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setSelectedProject(null);
        return;
      }

      const handleMouseMove = contextSafe?.((e: MouseEvent) => {
        if (!containerRef.current || !imageContainer.current) return;
        if (window.innerWidth < 768) {
          setSelectedProject(null);
          return;
        }

        const containerRect = containerRef.current?.getBoundingClientRect();
        const imageRect = imageContainer.current.getBoundingClientRect();
        const offsetTop = (e as any).clientY - containerRect.y;

        if (
          containerRect.y > (e as any).clientY ||
          containerRect.bottom < (e as any).clientY ||
          containerRect.x > (e as any).clientX ||
          containerRect.right < (e as any).clientX
        ) {
          return gsap.to(imageContainer.current, { duration: 0.3, opacity: 0 });
        }

        gsap.to(imageContainer.current, {
          y: offsetTop - imageRect.height / 2,
          duration: 1,
          opacity: 1,
        });
      }) as any;

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    },
    { scope: containerRef, dependencies: [containerRef.current] }
  );

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top 80%',
        toggleActions: 'restart none none reverse',
        scrub: 1,
      },
    });

    tl.from(containerRef.current, { y: 150, opacity: 0 });
  }, { scope: containerRef });

  const handleMouseEnter = (slug: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSelectedProject(null);
      return;
    }
    setSelectedProject(slug);
  };

  const handleProjectClick = (slug: string) => {
    setSelectedProject(slug);
    if (onSelect) onSelect(slug);
    else setModalOpen(true);
  };

  return (
    <section className="relative z-20 pb-[250px]" id="selected-projects">
      <div className="w-full pl-[10px] pr-0">
        <div className="group/projects flex flex-col justify-left" ref={containerRef}>
          {/* Floating preview at section level */}
          {selectedProject !== null && (
            <div
              className="max-md:hidden absolute right-0 top-0 z-10 pointer-events-none w-[820px] xl:w-[320px] aspect-[3/4] overflow-hidden opacity-0 bg-neutral-100 dark:bg-neutral-900"
              ref={imageContainer}
            >
              {PROJECTS.map((project: IProject) => (
                <Image
                  src={project.thumbnail}
                  alt="Project"
                  width={400}
                  height={500}
                  className={cn(
                    'absolute inset-0 transition-all duration-500 w-full h-full object-contain',
                    { 'opacity-0': project.slug !== selectedProject }
                  )}
                  key={project.slug}
                />
              ))}
            </div>
          )}

          {/* First container for first 7 projects */}
          <div className="w-full rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 bg-white/30 dark:bg-black/25 backdrop-blur-md p-4 md:p-6 shadow-lg overflow-hidden ml-0 mr-auto mb-8" style={{ minHeight: '500px' }}>
            <div className="flex flex-col max-md:gap-6" ref={projectListRef}>
              {PROJECTS.slice(0, 7).map((project: IProject, index: number) => (
                <Project
                  index={index}
                  project={project}
                  selectedProject={selectedProject}
                  onMouseEnter={handleMouseEnter}
                  onClick={() => handleProjectClick(project.slug)}
                  isDetailsOpen={isDetailsOpen}
                  key={project.slug}
                />
              ))}
            </div>
          </div>

        </div>

                 {/* Second container for Skills project - Independent from group hover */}
         <div className="w-full rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 bg-white/30 dark:bg-black/25 backdrop-blur-md p-6 md:p-8 shadow-lg overflow-hidden ml-0 mr-auto">
           <div className="flex flex-col max-md:gap-10">
             {PROJECTS.slice(7).map((project: IProject, index: number) => (
               <div 
                 key={project.slug} 
                 className="py-5 md:border-b first:!pt-0 last:pb-0 last:border-none cursor-pointer hover:opacity-80 transition-opacity"
                 onClick={() => handleProjectClick(project.slug)}
               >
                 <div className="flex gap-2 md:gap-5">
                   <div>
                     <h4 className={cn(
                       isDetailsOpen ? "text-base xs:text-xl" : "text-2xl xs:text-4xl",
                       "flex gap-4 font-anton font-extrabold text-foreground transition-[color,background-position] duration-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:bg-[length:200%_100%] hover:bg-[left_center]"
                     )}>
                       {project.title}
                     </h4>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>

        {!onSelect && (
          <ProjectModal
            open={modalOpen}
            project={PROJECTS.find((p) => p.slug === selectedProject) ?? null}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectList;


