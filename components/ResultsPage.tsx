'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface ResultsPageProps {
  score: number;
  totalQuestions: number;
  levelName: string;
  onRetry: () => void;
  nextLevelPath?: string;
  menuPath?: string;
}

export default function ResultsPage({
  score,
  totalQuestions,
  levelName,
  onRetry,
  nextLevelPath = '/matematica/nivel-3',
  menuPath = '/matematica/menu',
}: ResultsPageProps) {
  const t = useTranslations('Results');
  const [showLoading, setShowLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showMaya, setShowMaya] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);

  const getMayaEmotion = () => {
    if (percentage === 100) return { image: 'hero-maya-happy.png', emoji: '🏆' };
    if (percentage >= 85) return { image: 'hero-maya-happy.png', emoji: '⭐' };
    if (percentage >= 70) return { image: 'hero-maya2.png', emoji: '👍' };
    return { image: 'hero-maya2.png', emoji: '💪' };
  };

  const getMessage = () => {
    if (percentage === 100) return t('perfect');
    if (percentage >= 85) return t('veryGood');
    if (percentage >= 70) return t('good');
    return t('tryHarder');
  };

  const mayaData = getMayaEmotion();

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

    const mayaTimer = setTimeout(() => {
      setShowMaya(true);
    }, 3000);

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(scoreAnimationTimer);
      clearTimeout(mayaTimer);
      clearTimeout(buttonsTimer);
    };
  }, [score]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/math/bg-frame.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

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
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 border-8 border-yellow-400 border-t-transparent rounded-full"
                  />
                  <h2 className="text-3xl font-bold text-[#E67E3B]">{t('checking')}</h2>
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
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#F4D35E] to-[#E67E3B] p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="text-8xl mb-4"
                  >
                    {mayaData.emoji}
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {t('yourResult')}
                  </h1>
                  <p className="text-xl text-white/90">{levelName}</p>
                </div>

                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <motion.div
                      key={animatedScore}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-8xl md:text-9xl font-bold text-[#E67E3B] mb-4"
                    >
                      {animatedScore}
                      <span className="text-5xl md:text-6xl text-gray-500">/{totalQuestions}</span>
                    </motion.div>

                    <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full rounded-full ${
                          percentage === 100
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : percentage >= 85
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                            : percentage >= 70
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                            : 'bg-gradient-to-r from-orange-400 to-orange-600'
                        }`}
                      />
                    </div>
                    <p className="text-2xl font-semibold text-gray-700 mt-4">{percentage}% {t('correctPercent')}</p>
                  </div>

                  <AnimatePresence>
                    {showMaya && (
                      <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                        className="flex flex-col items-center gap-6 mb-8"
                      >
                        <Image
                          src={`/images/characters/maya-math/${mayaData.image}`}
                          alt="Maya"
                          width={250}
                          height={350}
                          className="drop-shadow-2xl"
                        />
                        <div className="bg-yellow-50 border-4 border-yellow-400 rounded-2xl p-6 max-w-lg">
                          <p className="text-2xl font-bold text-gray-800 text-center">
                            {getMessage()}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showButtons && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-4"
                      >
                        <Link
                          href={menuPath as '/matematica/menu'}
                          className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                        >
                          ← {t('backToMenu')}
                        </Link>
                        <button
                          onClick={onRetry}
                          className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                        >
                          🔄 {t('tryAgain')}
                        </button>
                        {percentage >= 70 && nextLevelPath && (
                          <Link
                            href={nextLevelPath as '/matematica/nivel-3'}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                          >
                            {t('nextLevel')} →
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

      {showMaya && percentage >= 85 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                rotate: 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear',
              }}
              className="absolute text-4xl"
            >
              {['🌟', '⭐', '✨', '🎉', '🎊'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
