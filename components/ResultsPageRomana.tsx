'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface ResultsPageRomanaProps {
  score: number;
  totalQuestions: number;
  levelName: string;
  onRetry: () => void;
  nextLevelPath?: string;
  menuPath?: string;
}

export default function ResultsPageRomana({
  score,
  totalQuestions,
  levelName,
  onRetry,
  nextLevelPath,
  menuPath = '/limba-romana/menu',
}: ResultsPageRomanaProps) {
  const t = useTranslations('Romanian.results');
  const [showLoading, setShowLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showLumi, setShowLumi] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);

  const getLumiEmotion = () => {
    if (percentage === 100) return { emoji: '🏆' };
    if (percentage >= 85) return { emoji: '⭐' };
    if (percentage >= 70) return { emoji: '👍' };
    return { emoji: '💪' };
  };

  const getMessage = () => {
    if (percentage === 100) return t('perfect');
    if (percentage >= 85) return t('veryGood');
    if (percentage >= 70) return t('good');
    return t('tryAgain');
  };

  const lumiData = getLumiEmotion();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowLoading(false);
      setShowResults(true);
    }, 2000);

    const scoreAnimationTimer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedScore(Math.round(increment * currentStep));
        } else {
          setAnimatedScore(score);
          clearInterval(interval);
        }
      }, duration / steps);
    }, 2000);

    const lumiTimer = setTimeout(() => {
      setShowLumi(true);
    }, 3000);

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(scoreAnimationTimer);
      clearTimeout(lumiTimer);
      clearTimeout(buttonsTimer);
    };
  }, [score]);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/rom/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {showLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-[#F0F4E5]/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-[#4A6E3C]">
                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 border-8 border-[#E8A33D] border-t-transparent rounded-full"
                  />
                  <h2 className="text-3xl font-bold text-[#612422]">{t('checking')}</h2>
                </div>
              </div>
            </motion.div>
          )}

          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full max-w-4xl"
            >
              <div className="bg-[#F0F4E5]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-[#4A6E3C]">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#4A6E3C] to-[#3D5C32] p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="text-8xl mb-4"
                  >
                    {lumiData.emoji}
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#F0F4E5] mb-2">
                    {t('yourResult')}
                  </h1>
                  <p className="text-xl text-[#E8A33D]">{levelName}</p>
                </div>

                {/* Score */}
                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <motion.div
                      key={animatedScore}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-8xl md:text-9xl font-bold text-[#612422] mb-4"
                    >
                      {animatedScore}
                      <span className="text-5xl md:text-6xl text-[#4A6E3C]">/{totalQuestions}</span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full rounded-full ${
                          percentage === 100
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : percentage >= 85
                            ? 'bg-gradient-to-r from-[#E8A33D] to-[#D4922E]'
                            : percentage >= 70
                            ? 'bg-gradient-to-r from-[#4A6E3C] to-[#3D5C32]'
                            : 'bg-gradient-to-r from-[#612422] to-[#8B3A38]'
                        }`}
                      />
                    </div>
                    <p className="text-2xl font-semibold text-[#612422] mt-4">{percentage}% {t('correct')}</p>
                  </div>

                  {/* Lumi */}
                  <AnimatePresence>
                    {showLumi && (
                      <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                        className="flex flex-col items-center gap-6 mb-8"
                      >
                        <Image
                          src="/images/characters/lumi-rom/lumi.png"
                          alt="Lumi"
                          width={250}
                          height={350}
                          className="drop-shadow-2xl"
                        />
                        <div className="bg-[#E8A33D]/20 border-4 border-[#E8A33D] rounded-2xl p-6 max-w-lg">
                          <p className="text-2xl font-bold text-[#612422] text-center">
                            {getMessage()}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Buttons */}
                  <AnimatePresence>
                    {showButtons && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-4"
                      >
                        <Link
                          href={menuPath}
                          className="px-8 py-4 bg-[#4A6E3C] hover:bg-[#3D5C32] text-[#F0F4E5] text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                        >
                          {t('backToMenu')}
                        </Link>
                        <button
                          onClick={onRetry}
                          className="px-8 py-4 bg-[#E8A33D] hover:bg-[#D4922E] text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                        >
                          🔄 {t('retry')}
                        </button>
                        {percentage >= 70 && nextLevelPath && (
                          <Link
                            href={nextLevelPath}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                          >
                            {t('nextLevel')}
                          </Link>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confetti - using fixed values to avoid hydration mismatch */}
      {showLumi && percentage >= 85 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[
            { left: 5, rotate: 45, dur: 3.2, delay: 0.1 },
            { left: 12, rotate: 120, dur: 4.1, delay: 0.3 },
            { left: 20, rotate: 200, dur: 3.5, delay: 0.2 },
            { left: 28, rotate: 80, dur: 4.5, delay: 0.4 },
            { left: 35, rotate: 290, dur: 3.8, delay: 0.1 },
            { left: 42, rotate: 150, dur: 4.2, delay: 0.5 },
            { left: 50, rotate: 30, dur: 3.3, delay: 0.2 },
            { left: 58, rotate: 180, dur: 4.8, delay: 0.3 },
            { left: 65, rotate: 260, dur: 3.6, delay: 0.4 },
            { left: 72, rotate: 100, dur: 4.0, delay: 0.1 },
            { left: 80, rotate: 320, dur: 3.9, delay: 0.5 },
            { left: 88, rotate: 60, dur: 4.3, delay: 0.2 },
            { left: 95, rotate: 210, dur: 3.4, delay: 0.3 },
            { left: 8, rotate: 140, dur: 4.6, delay: 0.4 },
            { left: 18, rotate: 270, dur: 3.7, delay: 0.1 },
            { left: 25, rotate: 15, dur: 4.4, delay: 0.5 },
            { left: 33, rotate: 190, dur: 3.1, delay: 0.2 },
            { left: 45, rotate: 85, dur: 4.7, delay: 0.3 },
            { left: 55, rotate: 240, dur: 3.5, delay: 0.4 },
            { left: 62, rotate: 340, dur: 4.1, delay: 0.1 },
            { left: 70, rotate: 55, dur: 3.8, delay: 0.5 },
            { left: 78, rotate: 165, dur: 4.3, delay: 0.2 },
            { left: 85, rotate: 295, dur: 3.2, delay: 0.3 },
            { left: 92, rotate: 110, dur: 4.5, delay: 0.4 },
            { left: 3, rotate: 225, dur: 3.9, delay: 0.1 },
            { left: 15, rotate: 350, dur: 4.0, delay: 0.5 },
            { left: 38, rotate: 70, dur: 3.6, delay: 0.2 },
            { left: 48, rotate: 180, dur: 4.2, delay: 0.3 },
            { left: 68, rotate: 310, dur: 3.4, delay: 0.4 },
            { left: 82, rotate: 25, dur: 4.8, delay: 0.1 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: ['#E8A33D', '#4A6E3C', '#612422', '#F0F4E5'][i % 4],
                left: `${item.left}%`,
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{
                y: '100vh',
                opacity: 0,
                rotate: item.rotate,
              }}
              transition={{
                duration: item.dur,
                delay: item.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
