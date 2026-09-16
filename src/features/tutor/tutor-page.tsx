import React, { useState, useRef, useEffect } from 'react';
import { useTutorStore } from '@/stores/tutor-store';
import { subjects } from '@/data/mock-data';
import { PromptInput } from '@/components/ui/prompt-input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  StopCircle,
  RotateCcw,
  Copy,
  Sparkles,
  BookOpen,
  Brain,
  Target,
  HelpCircle,
  RotateCcw as Revise,
  FileText,
  GitBranch,
  Check,
  MoreHorizontal,
  Trash2,
  ChevronDown,
  GraduationCap
} from 'lucide-react';

const SUGGESTED_ACTIONS = [
  { id: 'explain', label: 'Explain', icon: Sparkles, prefix: 'Explain simply:' },
  { id: 'simplify', label: 'Simplify', icon: Brain, prefix: 'Simplify this:' },
  { id: 'teach', label: 'Teach', icon: BookOpen, prefix: 'Teach me about:' },
  { id: 'practice', label: 'Practice', icon: Target, prefix: 'Give me practice questions for:' },
  { id: 'test', label: 'Test', icon: HelpCircle, prefix: 'Test my knowledge on:' },
  { id: 'revise', label: 'Revise', icon: Revise, prefix: 'Help me revise:' },
  { id: 'exam', label: 'Exam Answer', icon: FileText, prefix: 'Write an exam-style answer for:' },
  { id: 'flowchart', label: 'Flowchart', icon: GitBranch, prefix: 'Create a flowchart for:' },
];

export function TutorPage() {
  const {
    messages,
    context,
    isGenerating,
    generationStatus,
    sendMessage,
    stopGeneration,
    regenerateResponse,
    clearMessages,
    setContext,
  } = useTutorStore();

  const [input, setInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(context.subject || 'Physics');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    setContext(newSubject, `${newSubject} Core Concepts`);
  };

  const handleSend = () => {
    if (input.trim() && !isGenerating) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (prefix: string) => {
    if (!isGenerating) {
      setInput((prev) => (prev ? `${prefix} ${prev}` : `${prefix} `));
      inputRef.current?.focus();
    }
  };

  const hasMessages = messages && messages.length > 0;

  return (
    <div className="flex flex-col h-full w-full bg-surface-50 text-surface-900">
      {/* Context & Control Bar */}
      <div className="shrink-0 px-4 py-3 border-b border-surface-200 bg-surface-0 flex flex-wrap items-center justify-between gap-3 shadow-xs z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          
          {/* Subject Dropdown Switcher */}
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="appearance-none bg-surface-100 hover:bg-surface-200 border border-surface-200 rounded-lg text-xs font-semibold py-1.5 pl-2.5 pr-7 text-surface-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 text-surface-500 pointer-events-none" />
          </div>

          <span className="hidden sm:inline-block text-xs text-surface-500 font-medium border-l border-surface-200 pl-3">
            {context.chapter || 'All Chapters'}
          </span>
        </div>

        {/* Clear / Reset Conversation */}
        {hasMessages && (
          <button
            onClick={clearMessages}
            disabled={isGenerating}
            className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-danger px-2.5 py-1.5 rounded-md hover:bg-surface-100 transition-colors disabled:opacity-40"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {!hasMessages ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto py-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-2 shadow-inner">
              <Sparkles className="w-8 h-8 text-brand-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-surface-900">StudyPilot AI Tutor</h2>
              <p className="text-surface-500 text-sm mt-1.5">
                Pakistan curriculum-aligned assistant for Class 9–12. Ask any conceptual question, request step-by-step numerical derivations, or review past paper patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mt-4">
              <button
                onClick={() => {
                  setInput(`Explain ${selectedSubject} core principles with key exam points.`);
                  inputRef.current?.focus();
                }}
                className="p-3 text-xs text-left rounded-xl bg-surface-0 border border-surface-200 hover:border-brand-500 hover:text-brand-600 transition-all shadow-xs"
              >
                <div className="font-semibold text-surface-900">Explain core principles</div>
                <div className="text-surface-500 mt-0.5">Summary formatted for board exams</div>
              </button>
              <button
                onClick={() => {
                  setInput(`Give me a high-frequency past paper question for ${selectedSubject}.`);
                  inputRef.current?.focus();
                }}
                className="p-3 text-xs text-left rounded-xl bg-surface-0 border border-surface-200 hover:border-brand-500 hover:text-brand-600 transition-all shadow-xs"
              >
                <div className="font-semibold text-surface-900">Past paper practice</div>
                <div className="text-surface-500 mt-0.5">Solve frequent board exam questions</div>
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg: any) => (
              <MessageBubble key={msg.id} message={msg} regenerateResponse={regenerateResponse} />
            ))}
          </AnimatePresence>
        )}

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 w-full max-w-3xl"
          >
            <div className="w-8 h-8 rounded-full bg-brand-500/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-brand-600" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-surface-100 rounded-2xl rounded-tl-xs p-3.5 text-sm text-surface-700 flex items-center gap-2 border border-surface-200">
                <MoreHorizontal className="w-4 h-4 animate-pulse text-brand-600" />
                <span>{generationStatus || 'Analyzing curriculum materials...'}</span>
              </div>
              <button
                onClick={stopGeneration}
                className="flex items-center gap-1.5 text-xs text-danger hover:text-danger/80 mt-1 self-start font-medium"
              >
                <StopCircle className="w-3.5 h-3.5" /> Stop generation
              </button>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-3 sm:p-4 bg-surface-0 border-t border-surface-200 shadow-xs z-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
          {/* Action Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {SUGGESTED_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.prefix)}
                disabled={isGenerating}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-100 text-surface-700 hover:bg-brand-500/10 hover:text-brand-600 border border-surface-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <action.icon className="w-3.5 h-3.5 text-brand-500" />
                {action.label}
              </button>
            ))}
          </div>

          {/* Unified AI Tutor Prompt Input */}
          <PromptInput
            value={input}
            onChange={setInput}
            disabled={isGenerating}
            subjects={subjects.map((s) => s.name)}
            placeholder={`Ask anything about ${selectedSubject} (Class 9-12)...`}
            onSubmit={(val, meta) => {
              if (meta.subject !== selectedSubject) {
                handleSubjectChange(meta.subject);
              }
              const formattedContent = meta.attachments.length > 0 
                ? `[${meta.mode}] ${val} (Attached: ${meta.attachments.map(a => a.name).join(', ')})`
                : `[${meta.mode}] ${val}`;
              sendMessage(formattedContent);
              setInput('');
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, regenerateResponse }: { message: any; regenerateResponse: () => void }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      <div className={cn('flex gap-3 max-w-3xl', isUser ? 'flex-row-reverse' : 'flex-row')}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-brand-500/15 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand-600" />
          </div>
        )}
        
        <div className="flex flex-col gap-2 min-w-0">
          <div
            className={cn(
              'p-4 text-sm whitespace-pre-wrap break-words rounded-2xl border',
              isUser
                ? 'bg-brand-600 text-white border-brand-500 rounded-tr-xs shadow-xs'
                : 'bg-surface-0 text-surface-900 border-surface-200 rounded-tl-xs shadow-xs'
            )}
            dir="auto"
          >
            {message.content}
          </div>

          {/* Response Blocks */}
          {!isUser && message.responseBlocks && message.responseBlocks.length > 0 && (
            <div className="flex flex-col gap-3 mt-1">
              {message.responseBlocks.map((block: any, idx: number) => (
                <ResponseBlockCard key={idx} block={block} />
              ))}
            </div>
          )}

          {/* Sources */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {message.sources.map((source: any, idx: number) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-surface-100 border border-surface-200 text-surface-600">
                  <BookOpen className="w-3 h-3 text-brand-500" />
                  {typeof source === 'string' ? source : `${source.title || 'Source'} (p. ${source.page || '1'})`}
                </div>
              ))}
            </div>
          )}

          {/* Actions & Follow-ups */}
          {!isUser && (
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <button
                onClick={handleCopy}
                className="p-1.5 text-surface-500 hover:text-surface-900 rounded-md hover:bg-surface-100 border border-transparent hover:border-surface-200 transition-colors"
                title="Copy message"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={regenerateResponse}
                className="p-1.5 text-surface-500 hover:text-surface-900 rounded-md hover:bg-surface-100 border border-transparent hover:border-surface-200 transition-colors"
                title="Regenerate response"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              {message.suggestedActions && message.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {message.suggestedActions.map((action: any, idx: number) => (
                    <button
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full border border-surface-200 bg-surface-0 text-surface-700 hover:border-brand-500 hover:text-brand-600 transition-colors font-medium"
                      onClick={() => useTutorStore.getState().sendMessage(typeof action === 'string' ? action : action.label)}
                    >
                      {typeof action === 'string' ? action : action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ResponseBlockCard({ block }: { block: any }) {
  let bgColor = 'bg-surface-0';
  let borderColor = 'border-surface-200';
  let iconColor = 'text-brand-500';
  let Icon = Sparkles;
  
  switch (block.type) {
    case 'definition':
      Icon = BookOpen;
      bgColor = 'bg-info/10';
      borderColor = 'border-info/20';
      iconColor = 'text-info';
      break;
    case 'formula':
      Icon = Brain;
      bgColor = 'bg-brand-500/10';
      borderColor = 'border-brand-500/20';
      iconColor = 'text-brand-500';
      break;
    case 'warning':
      Icon = HelpCircle;
      bgColor = 'bg-danger/10';
      borderColor = 'border-danger/20';
      iconColor = 'text-danger';
      break;
    case 'tip':
      Icon = Target;
      bgColor = 'bg-success/10';
      borderColor = 'border-success/20';
      iconColor = 'text-success';
      break;
    case 'example':
      Icon = FileText;
      bgColor = 'bg-surface-100';
      break;
  }

  return (
    <div className={cn('p-3.5 rounded-xl border text-sm', bgColor, borderColor)}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className={cn('w-4 h-4', iconColor)} />
        <span className={cn('font-bold text-xs uppercase tracking-wider', iconColor)}>
          {block.title || block.label || block.type}
        </span>
      </div>
      <div className="text-surface-900 leading-relaxed font-sans" dir="auto">
        {block.content}
      </div>
    </div>
  );
}
