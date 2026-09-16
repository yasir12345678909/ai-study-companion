import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Send, 
  Compass,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { useTutorStore } from '@/stores/tutor-store';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function AICompanion() {
  const { 
    isActive: isTourActive, 
    currentStepId, 
    steps, 
    completeStep, 
    skipOnboarding,
    startOnboarding,
    getCurrentStep
  } = useOnboardingStore();

  const { sendMessage } = useTutorStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');

  const step = getCurrentStep();
  const stepIndex = steps.findIndex(s => s.id === currentStepId);
  const totalSteps = steps.length;

  const handleQuickAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    sendMessage(quickInput.trim());
    setQuickInput('');
    setIsOpen(false);
    navigate('/tutor');
  };

  const handleTourAction = () => {
    if (!step) return;
    if (step.targetRoute && location.pathname !== step.targetRoute) {
      navigate(step.targetRoute);
    } else {
      completeStep(step.id);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-3 w-[330px] sm:w-[370px] rounded-2xl bg-surface-0 border border-surface-200 shadow-2xl overflow-hidden"
          >
            {/* Companion Card Header */}
            <div className="bg-brand-600 px-4 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">StudyPilot Guide</h3>
                  <p className="text-[11px] text-brand-100">Your Pakistan Curriculum Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/10 transition-colors"
                title="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Tutorial or Guided Tour Mode */}
            <div className="p-4 space-y-3.5 text-surface-900">
              {isTourActive && step ? (
                <div className="rounded-xl bg-brand-500/10 border border-brand-500/20 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-500/15 px-2 py-0.5 rounded-md">
                      Tour Step {stepIndex + 1} of {totalSteps}
                    </span>
                    <button
                      onClick={skipOnboarding}
                      className="text-xs text-surface-400 hover:text-surface-700"
                    >
                      Dismiss tour
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-surface-900">{step.title}</h4>
                    <p className="text-xs text-surface-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1">
                      {steps.slice(0, 8).map((s, idx) => (
                        <div
                          key={s.id}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all",
                            idx === stepIndex ? "bg-brand-600 w-3" : s.isCompleted ? "bg-brand-400" : "bg-surface-300"
                          )}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleTourAction}
                      className="text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                    >
                      {step.targetRoute && location.pathname !== step.targetRoute ? 'Go there' : 'Next step'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-surface-100 border border-surface-200 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-surface-800 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-brand-600" />
                      Interactive Walkthrough
                    </span>
                  </div>
                  <p className="text-xs text-surface-500">
                    Need help navigating boards, teachers, exams, or quick revision notes?
                  </p>
                  <button
                    onClick={() => {
                      startOnboarding();
                      if (step?.targetRoute) navigate(step.targetRoute);
                    }}
                    className="w-full text-xs font-semibold py-2 px-3 rounded-lg bg-surface-0 border border-surface-300 hover:border-brand-500 text-brand-600 hover:bg-brand-50/50 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Start Guided App Tour
                  </button>
                </div>
              )}

              {/* Quick AI Question Bar */}
              <form onSubmit={handleQuickAsk} className="space-y-2 pt-1">
                <label className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block">
                  Quick Study Question
                </label>
                <div className="flex items-center gap-1.5 bg-surface-100 rounded-xl border border-surface-200 p-1 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/20">
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Ask any topic or formula..."
                    className="flex-1 bg-transparent px-2.5 py-1 text-xs text-surface-900 placeholder:text-surface-400 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!quickInput.trim()}
                    className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>

              {/* Quick Jump Shortcuts */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs">
                <button
                  onClick={() => {
                    navigate('/tutor');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-200 text-left transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span className="truncate font-medium">Full AI Tutor</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/revision');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-200 text-left transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span className="truncate font-medium">Quick Revision</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Floating Bot Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "pointer-events-auto relative size-13 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          isOpen
            ? "bg-surface-900 text-surface-0 ring-4 ring-brand-500/20"
            : "bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/25 ring-2 ring-brand-400/40"
        )}
        aria-label="Open AI Tutorial Assistant"
        title="StudyPilot AI Guide"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
            {isTourActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-brand-600 rounded-full animate-ping" />
            )}
          </div>
        )}
      </motion.button>
    </div>
  );
}
