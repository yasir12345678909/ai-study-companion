import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function OnboardingOverlay() {
  const { 
    isActive, 
    currentStepId, 
    steps, 
    completeStep, 
    skipOnboarding,
    getCurrentStep
  } = useOnboardingStore();
  
  const navigate = useNavigate();
  const location = useLocation();
  const step = getCurrentStep();

  // Handle route matching for auto-completion (simplified)
  useEffect(() => {
    if (isActive && step && step.targetRoute) {
      if (location.pathname === step.targetRoute) {
        // Just for visual feedback, wait a sec before auto-completing
        const t = setTimeout(() => {
          completeStep(step.id);
        }, 1500);
        return () => clearTimeout(t);
      }
    }
  }, [isActive, step, location.pathname, completeStep]);

  if (!isActive || !step) return null;

  const stepIndex = steps.findIndex(s => s.id === currentStepId);
  const totalSteps = steps.length;
  const isCompleted = step.isCompleted;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50 pointer-events-auto"
      >
        <div className="bg-surface-800 border border-brand-500/30 shadow-2xl shadow-brand-500/10 rounded-2xl overflow-hidden relative">
          
          {/* Progress bar */}
          <div className="h-1 w-full bg-surface-700">
            <motion.div 
              className="h-full bg-brand-500"
              initial={{ width: `${(stepIndex / totalSteps) * 100}%` }}
              animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                    Step {stepIndex + 1} of {totalSteps}
                  </span>
                  <h3 className="text-surface-0 font-medium leading-tight mt-0.5">
                    {step.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={skipOnboarding}
                className="text-surface-400 hover:text-surface-200 transition-colors"
                title="Skip tutorial"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-surface-300 text-sm mb-4">
              {step.description}
            </p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                {steps.map((s, i) => (
                  <div 
                    key={s.id} 
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      i === stepIndex ? "bg-brand-500" : 
                      s.isCompleted ? "bg-brand-500/30" : "bg-surface-700"
                    )} 
                  />
                ))}
              </div>

              {isCompleted ? (
                <div className="flex items-center gap-2 text-success font-medium text-sm">
                  <Check className="w-4 h-4" />
                  Great job!
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (step.targetRoute) {
                      navigate(step.targetRoute);
                    } else {
                      completeStep(step.id);
                    }
                  }}
                  className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  {step.targetRoute ? 'Go there' : 'Got it'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
