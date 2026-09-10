import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface Project {
  num: string;
  name: string;
  category: string;
  col1: [string, string];
  col2: string;
}

const PROXY = (path: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(
    `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${path}`
  )}&w=1280&q=85`;

const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1: [
      PROXY('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png'),
      PROXY('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png'),
    ],
    col2: PROXY('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png'),
  },
  {
    num: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1: [
      PROXY('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png'),
      PROXY('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png'),
    ],
    col2: PROXY('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png'),
  },
  {
    num: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1: [
      PROXY('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png'),
      PROXY('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png'),
    ],
    col2: PROXY('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png'),
  },
];

interface ProjectCardProps {
  project: Project;
  i: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: number[];
  targetScale: number;
}

function ProjectCard({ project, i, progress, range, targetScale }: ProjectCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${i * 28}px` }}
        className="relative flex flex-col w-full h-[75vh] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading font-black leading-[0.85] shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.num}
            </span>
            <div className="pt-2">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton className="hidden sm:inline-flex" />
        </div>

        <div className="flex gap-2 sm:gap-4 mt-3 sm:mt-4 flex-1 min-h-0">
          <div className="w-[40%] flex flex-col gap-2 sm:gap-4">
            <img
              src={project.col1[0]}
              alt={project.name}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1[1]}
              alt={project.name}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.col2}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-16 sm:pt-24 md:pt-32 pb-8"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={container} className="mt-10 sm:mt-14">
        {PROJECTS.map((project, i) => {
          const targetScale = 1 - (PROJECTS.length - 1 - i) * 0.03;
          return (
            <ProjectCard
              key={project.num}
              project={project}
              i={i}
              progress={scrollYProgress}
              range={[i / PROJECTS.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}