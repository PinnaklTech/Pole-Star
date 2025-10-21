/**
 * AuthLayout - Slider-style authentication UI
 * Animated card that slides between login and signup
 */
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  mode: 'login' | 'signup';
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, mode, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-light/30 rounded-full mix-blend-multiply filter blur-xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/40 rounded-full mix-blend-multiply filter blur-xl opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Auth card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with animated gradient */}
          <div className="relative bg-gradient-to-r from-primary via-primary-dark to-primary-light px-8 py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                Pole Wizard Forge
              </h1>
              <AnimatePresence mode="wait">
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-primary-foreground/80"
                >
                  {subtitle}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Content area with slide animation */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 50 : -50 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30 
                }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {title}
                </h2>
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-primary-foreground/90 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Steel Transmission Pole Design Software
        </motion.p>
      </motion.div>
    </div>
  );
}

