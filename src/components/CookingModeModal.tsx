import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Recipe } from '../types/recipe';
import { formatCountdown } from '../utils/formatters';
import { playTimerChime, speakText, stopSpeaking } from '../utils/audio';

interface CookingModeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export function CookingModeModal({ recipe, onClose }: CookingModeModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSpeaking, setIsSpeaking] = useState(false);

  const step = recipe.steps[stepIndex];
  const initialSeconds = (step?.timerMinutes ?? 0) * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft((recipe.steps[stepIndex]?.timerMinutes ?? 0) * 60);
    setTimerRunning(false);
    stopSpeaking();
    setIsSpeaking(false);
  }, [stepIndex, recipe.steps]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          playTimerChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  if (!step) return null;

  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakText(
        `Step ${step.stepNumber}: ${step.title}. ${step.instruction}. Visual cue: ${step.visualCue}`
      );
      setIsSpeaking(true);
    }
  };

  const toggleDone = () => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) next.delete(stepIndex);
      else next.add(stepIndex);
      return next;
    });
  };

  const progressPct = Math.round(((stepIndex + 1) / recipe.steps.length) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Hands-free cooking mode for ${recipe.titleEnglish}`}
      className="fixed inset-0 z-50 bg-[#faf8f4] dark:bg-[#0d0b0a] text-stone-900 dark:text-stone-50 flex flex-col"
    >
      {/* Top Bar */}
      <div className="border-b border-stone-200 dark:border-stone-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-amber-800 dark:text-amber-400 truncate">
            {recipe.region} · Step {stepIndex + 1} of {recipe.steps.length}
          </p>
          <h2 className="font-display text-lg sm:text-xl font-semibold truncate">
            {recipe.titleEnglish}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleVoice}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700 dark:text-amber-400" /> : <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            aria-label="Exit cooking mode"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-stone-800 text-white text-xs font-medium hover:bg-stone-800 dark:hover:bg-stone-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-1 bg-stone-200 dark:bg-stone-800 w-full">
        <div
          className="h-full bg-amber-700 dark:bg-amber-500 transition-all duration-200"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Focus Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 flex flex-col justify-center max-w-4xl w-full mx-auto">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono-tabular text-sm font-semibold text-amber-800 dark:text-amber-400">
              Step 0{step.stepNumber}
            </span>
            <button
              type="button"
              onClick={toggleDone}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                completedSteps.has(stepIndex)
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSteps.has(stepIndex) ? 'Step Completed' : 'Mark Complete'}</span>
            </button>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
            {step.title}
          </h3>

          <p className="text-lg sm:text-xl text-stone-700 dark:text-stone-200 leading-relaxed max-w-3xl">
            {step.instruction}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                Visual &amp; Tactile Doneness Cue
              </p>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                {step.visualCue}
              </p>
            </div>

            {step.temperatureOrFlame && (
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>Thermal / Flame Target</span>
                </p>
                <p className="text-sm font-mono-tabular font-medium text-stone-900 dark:text-stone-100">
                  {step.temperatureOrFlame}
                </p>
              </div>
            )}
          </div>

          {step.timerMinutes && step.timerMinutes > 0 && (
            <div className="rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/30 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Step Countdown Timer ({step.timerMinutes} min target)
                </p>
                <p className="font-mono-tabular text-4xl sm:text-5xl font-semibold text-stone-900 dark:text-stone-50 mt-1">
                  {formatCountdown(secondsLeft)}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setTimerRunning((r) => !r)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-sm font-medium cursor-pointer"
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{timerRunning ? 'Pause' : secondsLeft === 0 ? 'Done' : 'Start Timer'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerRunning(false);
                    setSecondsLeft(initialSeconds);
                  }}
                  aria-label="Reset timer"
                  className="p-3 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="border-t border-stone-200 dark:border-stone-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 max-w-4xl w-full mx-auto">
        <button
          type="button"
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          disabled={stepIndex === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-medium disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1.5">
          {recipe.steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              type="button"
              onClick={() => setStepIndex(idx)}
              aria-label={`Jump to step ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === stepIndex
                  ? 'w-6 bg-amber-700 dark:bg-amber-400'
                  : completedSteps.has(idx)
                  ? 'w-2 bg-emerald-600'
                  : 'w-2 bg-stone-300 dark:bg-stone-700'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            if (stepIndex < recipe.steps.length - 1) {
              setStepIndex((i) => i + 1);
            } else {
              onClose();
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-600 text-white text-sm font-medium cursor-pointer hover:bg-stone-800 dark:hover:bg-amber-500"
        >
          <span>{stepIndex === recipe.steps.length - 1 ? 'Finish Dish' : 'Next Step'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
