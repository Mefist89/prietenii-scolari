'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type AlgorithmData = {
  id: number;
  titleKey: string;
  stepKeys: string[];
  correctOrder: number[];
};

const algorithmsData: AlgorithmData[] = [
  {
    id: 1,
    titleKey: 'algo1title',
    stepKeys: ['algo1step1', 'algo1step2', 'algo1step3', 'algo1step4'],
    correctOrder: [1, 0, 2, 3],
  },
  {
    id: 2,
    titleKey: 'algo2title',
    stepKeys: ['algo2step1', 'algo2step2', 'algo2step3', 'algo2step4'],
    correctOrder: [1, 2, 0, 3],
  },
  {
    id: 3,
    titleKey: 'algo3title',
    stepKeys: ['algo3step1', 'algo3step2', 'algo3step3', 'algo3step4'],
    correctOrder: [1, 2, 3, 0],
  },
];

export default function InformaticaNivel3() {
  const t = useTranslations();
  const router = useRouter();

  const algorithms = algorithmsData.map(algo => ({
    id: algo.id,
    title: t(`Info.level3Game.${algo.titleKey}`),
    description: t('Info.level3Game.arrangeSteps'),
    steps: algo.stepKeys.map(key => t(`Info.level3Game.${key}`)),
    correctOrder: algo.correctOrder,
  }));
  const [currentAlgorithm, setCurrentAlgorithm] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [availableSteps, setAvailableSteps] = useState<number[]>(
    algorithms[0].steps.map((_, i) => i)
  );
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [completedAlgorithms, setCompletedAlgorithms] = useState<number[]>([]);

  const algorithm = algorithms[currentAlgorithm];
  const gameFinished = completedAlgorithms.length === algorithms.length;

  const handleStepClick = (stepIndex: number) => {
    setUserOrder([...userOrder, stepIndex]);
    setAvailableSteps(availableSteps.filter((i) => i !== stepIndex));
  };

  const handleRemoveStep = (index: number) => {
    const stepIndex = userOrder[index];
    setUserOrder(userOrder.filter((_, i) => i !== index));
    setAvailableSteps([...availableSteps, stepIndex].sort((a, b) => a - b));
  };

  const checkOrder = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(algorithm.correctOrder);
    setShowFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setTimeout(() => {
        const newCompleted = [...completedAlgorithms, algorithm.id];
        setCompletedAlgorithms(newCompleted);
        if (currentAlgorithm < algorithms.length - 1) {
          setCurrentAlgorithm(currentAlgorithm + 1);
          setUserOrder([]);
          setAvailableSteps(algorithms[currentAlgorithm + 1].steps.map((_, i) => i));
          setShowFeedback(null);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(null);
      }, 2000);
    }
  };

  const resetCurrent = () => {
    setUserOrder([]);
    setAvailableSteps(algorithm.steps.map((_, i) => i));
    setShowFeedback(null);
  };

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "url('/images/info/bg-frame.jpg')" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-purple-800 mb-4">
            {t('Info.congratulations')}
          </h2>
          <p className="text-2xl text-purple-600 mb-8">
            {t('Info.level3Game.solvedAll')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.menu')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.level2Game.playAgain')}
            </button>
            <button
              onClick={() => router.push('/informatica/nivel-4')}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.nextLevel')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 py-8" style={{ backgroundImage: "url('/images/info/bg-frame.jpg')" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('Info.level3Game.title')}
          </h1>
          <p className="text-xl text-purple-100 mb-4">
            {t('Info.level3Game.subtitle')}
          </p>
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-lg font-bold text-purple-800">
              {t('Info.level3Game.algorithmOf', { current: currentAlgorithm + 1, total: algorithms.length })}
            </span>
          </div>
        </motion.div>

        {/* Algorithm Card */}
        <motion.div
          key={currentAlgorithm}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-purple-800 mb-2 text-center">
            {algorithm.title}
          </h2>
          <p className="text-lg text-purple-600 mb-6 text-center">
            {algorithm.description}
          </p>

          {/* Available Steps */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">
              {t('Info.level3Game.availableSteps')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableSteps.map((stepIndex) => (
                <motion.button
                  key={stepIndex}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStepClick(stepIndex)}
                  className="p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-lg rounded-xl border-3 border-purple-300 cursor-pointer transition-all"
                >
                  {algorithm.steps[stepIndex]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* User Order */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">
              {t('Info.level3Game.yourOrder')}
            </h3>
            <div className="space-y-2">
              {userOrder.length === 0 ? (
                <div className="p-8 bg-gray-100 rounded-xl text-center text-gray-500">
                  {t('Info.level3Game.clickToArrange')}
                </div>
              ) : (
                userOrder.map((stepIndex, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-green-100 text-green-800 font-bold text-lg rounded-xl border-3 border-green-300 flex items-center justify-between"
                  >
                    <span>
                      {index + 1}. {algorithm.steps[stepIndex]}
                    </span>
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetCurrent}
              disabled={userOrder.length === 0}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('Info.level3Game.reset')}
            </button>
            <button
              onClick={checkOrder}
              disabled={userOrder.length !== algorithm.steps.length}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('Info.level3Game.check')}
            </button>
          </div>
        </motion.div>

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-3xl text-white font-bold text-3xl shadow-2xl ${
              showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {showFeedback === 'correct' ? t('Info.correct') : t('Info.incorrect')}
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-purple-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            {t('Info.backToMenu')}
          </button>
        </div>
      </div>
    </div>
  );
}
