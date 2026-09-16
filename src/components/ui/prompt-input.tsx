import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Mic, Square, Paperclip, X, Sparkles, BookOpen } from "lucide-react";

export interface PromptInputProps {
  onSubmit?: (
    value: string,
    meta: { subject: string; mode: string; attachments: File[] }
  ) => void;
  placeholder?: string;
  className?: string;
  subjects?: string[];
  modes?: string[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      onSubmit,
      placeholder = "Ask your AI tutor anything...",
      className,
      subjects = ["Physics", "Mathematics", "Chemistry", "Biology", "Computer Science"],
      modes = ["Explain", "Simplify", "Exam Answer", "Practice"],
      defaultValue = "",
      value: controlledValue,
      onChange,
      disabled = false,
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(defaultValue);
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
    const [selectedMode, setSelectedMode] = useState(modes[0]);
    const [attachments, setAttachments] = useState<{ id: string; file: File; url: string; name: string }[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : localValue;
    const hasContent = value.trim().length > 0 || attachments.length > 0;

    const handleTextChange = (val: string) => {
      if (!isControlled) setLocalValue(val);
      onChange?.(val);
    };

    // Auto-resize textarea natively
    useEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(Math.max(el.scrollHeight, 44), 160)}px`;
    }, [value]);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      const newItems = files.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setAttachments((prev) => [...prev, ...newItems]);
      e.target.value = "";
    };

    const removeAttachment = (id: string) => {
      setAttachments((prev) => {
        const item = prev.find((a) => a.id === id);
        if (item) URL.revokeObjectURL(item.url);
        return prev.filter((a) => a.id !== id);
      });
    };

    const toggleVoice = () => {
      if (isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
        return;
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        // Fallback simulation for unsupported browsers
        handleTextChange((value ? `${value} ` : "") + "Can you explain this step by step for the board exam?");
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let baseText = value;
        recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          handleTextChange((baseText ? `${baseText} ` : "") + transcript);
        };
        recognition.onend = () => setIsRecording(false);
        recognition.onerror = () => setIsRecording(false);

        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
      } catch {
        setIsRecording(false);
      }
    };

    const handleSubmit = () => {
      if (!hasContent || disabled) return;
      onSubmit?.(value.trim(), {
        subject: selectedSubject,
        mode: selectedMode,
        attachments: attachments.map((a) => a.file),
      });
      handleTextChange("");
      attachments.forEach((a) => URL.revokeObjectURL(a.url));
      setAttachments([]);
      if (isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full rounded-2xl border border-surface-200 bg-surface-0 p-2 shadow-xs transition-colors focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20",
          className
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.txt"
          multiple
          className="hidden"
          onChange={handleFiles}
        />

        {/* Attachments preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-2 pt-1 pb-2 border-b border-surface-200">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="group relative flex items-center gap-1.5 rounded-lg bg-surface-100 border border-surface-200 px-2 py-1 text-xs text-surface-800"
              >
                {att.file.type.startsWith("image/") ? (
                  <img src={att.url} alt={att.name} className="h-4 w-4 rounded object-cover" />
                ) : (
                  <Paperclip className="h-3 w-3 text-surface-500" />
                )}
                <span className="max-w-[120px] truncate">{att.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="rounded p-0.5 text-surface-400 hover:text-danger hover:bg-surface-200 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none bg-transparent px-2.5 py-1.5 text-sm text-surface-900 placeholder:text-surface-400 outline-none leading-relaxed"
        />

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 px-1">
          <div className="flex items-center gap-1.5">
            {/* Subject Selector */}
            <div className="flex items-center gap-1 rounded-lg bg-surface-100 px-2 py-1 border border-surface-200 text-xs">
              <BookOpen className="h-3 w-3 text-brand-600 shrink-0" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-transparent text-surface-800 outline-none cursor-pointer text-xs font-medium"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode / Effort Selector */}
            <div className="flex items-center gap-1 rounded-lg bg-surface-100 px-2 py-1 border border-surface-200 text-xs">
              <Sparkles className="h-3 w-3 text-brand-600 shrink-0" />
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="bg-transparent text-surface-800 outline-none cursor-pointer text-xs font-medium"
              >
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* File attachment button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 hover:text-surface-800 transition-colors"
              title="Attach diagram, notes or image"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {/* Voice input */}
            <button
              type="button"
              onClick={toggleVoice}
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                isRecording
                  ? "bg-danger/10 text-danger animate-pulse"
                  : "text-surface-500 hover:bg-surface-100 hover:text-surface-800"
              )}
              title={isRecording ? "Stop listening" : "Voice input"}
            >
              {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            {/* Send button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!hasContent || disabled}
              className="rounded-xl bg-brand-600 p-2 text-white hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              title="Send prompt"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

PromptInput.displayName = "PromptInput";
