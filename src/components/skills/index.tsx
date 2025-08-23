import { motion } from "framer-motion";
import { skillsData } from "./data";
import { SkillBadge } from "./SkillBadge";
import Image from "next/image";

interface SkillsProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export function Skills({ 
  title = "The Secret Sauce",
  subtitle = "MY SKILLS",
  backgroundImage = process.env.NODE_ENV === 'production' ? '/in/skills.png' : '/skills.png',
  className = ""
}: SkillsProps) {
  return (
    <div className={`min-h-auto bg-transparent flex items-center justify-center pt-20 pb-8 px-8 ${className}`}>
              <div className="max-w-7xl w-full text-center space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative space-y-4"
        >
          {/* Background Image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-32">
            <img
              src={backgroundImage}
              alt=""
              width={500}
              height={500}
              className="w-96 h-96 md:w-[500px] md:h-[500px] object-contain opacity-100 rotate-continuous"
            />
          </div>
          
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase relative z-10">
            {subtitle}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white relative z-10">
            {title.includes("Sauce") ? (
              <>
                The Secret{" "}
                <span className="animated-gradient  bg-clip-text text-transparent" style={{ fontFamily: 'Arno Pro, serif' }}>
                  Sauce
                </span>
              </>
            ) : (
              title
            )}
          </h1>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4"
        >
          {skillsData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {row.map((skill, skillIndex) => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  index={rowIndex * 10 + skillIndex}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Floating elements for visual enhancement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

export default Skills;