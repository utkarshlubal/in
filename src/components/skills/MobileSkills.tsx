'use client';
import { motion } from "framer-motion";
import { skillsData } from "./data";
import { SkillBadge } from "./SkillBadge";

interface MobileSkillsProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function MobileSkills({ 
  title = "The Secret Sauce",
  subtitle = "MY SKILLS",
  className = ""
}: MobileSkillsProps) {
  return (
    <div className={`min-h-auto bg-transparent flex items-center justify-center pt-8 pb-4 px-4 ${className}`}>
      <div className="max-w-7xl w-full text-center space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative space-y-4"
        >
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase relative z-10">
            {subtitle}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white relative z-10">
            {title.includes("Sauce") ? (
              <>
                The Secret{" "}
                <span className="animated-gradient bg-clip-text text-transparent" style={{ fontFamily: 'Arno Pro, serif' }}>
                  Sauce
                </span>
              </>
            ) : (
              title
            )}
          </h1>
        </motion.div>

        {/* Mobile Skills - Show only 5 rows with back-and-forth marquee effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4"
        >
          {skillsData.slice(0, 5).map((row, rowIndex) => (
            <div key={rowIndex} className="overflow-hidden">
              <motion.div
                className="flex gap-3 whitespace-nowrap will-change-transform"
                animate={{
                  x: rowIndex % 2 === 1 
                    ? [-100 * row.length, 0, -100 * row.length] // 2nd and 4th rows: left to right to left
                    : [0, -100 * row.length, 0] // 1st, 3rd, 5th rows: right to left to right
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0
                }}
                style={{
                  transform: "translateZ(0)"
                }}
              >
                {/* Single row for back-and-forth */}
                {row.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex-shrink-0">
                    <SkillBadge
                      skill={skill}
                      index={rowIndex * 10 + skillIndex}
                    />
                  </div>
                ))}
              </motion.div>
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

export default MobileSkills;
