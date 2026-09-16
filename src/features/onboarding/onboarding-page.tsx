import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Target, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { useAppStore } from '@/stores/app-store';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { startOnboarding, skipOnboarding } = useOnboardingStore();
  const { user } = useAppStore();

  const handleStart = () => {
    startOnboarding();
    navigate('/home');
  };

  const handleSkip = () => {
    skipOnboarding();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center p-6 text-surface-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-10 h-10 text-brand-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-surface-0 mb-4">
            Welcome to StudyPilot{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-xl text-surface-400">
            Your personal AI study companion for Classes 9-12. Let's get you set up for success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: BookOpen, title: "Smart Notes", desc: "AI-generated summaries from official syllabus." },
            { icon: Target, title: "Study Planner", desc: "Personalized daily missions to hit your goals." },
            { icon: Users, title: "Study Groups", desc: "Collaborate with classmates and your teacher." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="bg-surface-900 border border-surface-800 rounded-xl p-6 text-center"
            >
              <feature.icon className="w-8 h-8 text-brand-400 mx-auto mb-3" />
              <h3 className="font-semibold text-surface-0 mb-2">{feature.title}</h3>
              <p className="text-sm text-surface-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20"
          >
            Start Guided Tour
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleSkip}
            className="w-full sm:w-auto px-8 py-4 bg-surface-900 hover:bg-surface-800 text-surface-300 rounded-xl font-medium transition-colors"
          >
            Skip for now
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
