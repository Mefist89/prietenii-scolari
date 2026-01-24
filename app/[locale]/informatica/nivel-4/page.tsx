'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type ScenarioData = {
  id: number;
  situationKey: string;
  emoji: string;
  options: { textKey: string; safe: boolean; explanationKey: string }[];
};

const scenariosData: ScenarioData[] = [
  {
    id: 1, situationKey: 's1q', emoji: '🏠',
    options: [
      { textKey: 's1a1', safe: true, explanationKey: 's1a1exp' },
      { textKey: 's1a2', safe: false, explanationKey: 's1a2exp' },
      { textKey: 's1a3', safe: false, explanationKey: 's1a3exp' },
    ],
  },
  {
    id: 2, situationKey: 's2q', emoji: '📧',
    options: [
      { textKey: 's2a1', safe: true, explanationKey: 's2a1exp' },
      { textKey: 's2a2', safe: false, explanationKey: 's2a2exp' },
      { textKey: 's2a3', safe: true, explanationKey: 's2a3exp' },
    ],
  },
  {
    id: 3, situationKey: 's3q', emoji: '🎁',
    options: [
      { textKey: 's3a1', safe: true, explanationKey: 's3a1exp' },
      { textKey: 's3a2', safe: false, explanationKey: 's3a2exp' },
      { textKey: 's3a3', safe: false, explanationKey: 's3a3exp' },
    ],
  },
  {
    id: 4, situationKey: 's4q', emoji: '😟',
    options: [
      { textKey: 's4a1', safe: true, explanationKey: 's4a1exp' },
      { textKey: 's4a2', safe: false, explanationKey: 's4a2exp' },
      { textKey: 's4a3', safe: false, explanationKey: 's4a3exp' },
    ],
  },
  {
    id: 5, situationKey: 's5q', emoji: '🤝',
    options: [
      { textKey: 's5a1', safe: true, explanationKey: 's5a1exp' },
      { textKey: 's5a2', safe: false, explanationKey: 's5a2exp' },
      { textKey: 's5a3', safe: false, explanationKey: 's5a3exp' },
    ],
  },
  {
    id: 6, situationKey: 's6q', emoji: '🎮',
    options: [
      { textKey: 's6a1', safe: true, explanationKey: 's6a1exp' },
      { textKey: 's6a2', safe: false, explanationKey: 's6a2exp' },
      { textKey: 's6a3', safe: true, explanationKey: 's6a3exp' },
    ],
  },
];

export default function InformaticaNivel4() {
  const t = useTranslations();
  const router = useRouter();

  const scenarios = scenariosData.map(s => ({
    id: s.id,
    situation: t(`Info.level4Game.${s.situationKey}`),
    emoji: s.emoji,
    options: s.options.map(o => ({
      text: t(`Info.level4Game.${o.textKey}`),
      safe: o.safe,
      explanation: t(`Info.level4Game.${o.explanationKey}`),
    })),
  }));
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;

    setSelectedOption(index);
    setShowFeedback(true);

    if (scenario.options[index].safe) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setGameFinished(true);
      }
    }, 4000);
  };

  if (gameFinished) {
    const percentage = (score / scenarios.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
        >
          <div className="text-8xl mb-6">
            {passed ? '🛡️' : '💪'}
          </div>
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            {passed ? t('Info.level4Game.bravo') : t('Info.wellTried')}
          </h2>
          <p className="text-2xl text-green-600 mb-6">
            {t('Info.level4Game.safeChoices', { score: score, total: scenarios.length })}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-8 mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={`h-8 rounded-full ${passed ? 'bg-green-500' : 'bg-orange-500'}`}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="flex items-center justify-center h-full text-white font-bold">
                {percentage.toFixed(0)}%
              </span>
            </motion.div>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              {t('Info.level4Game.rememberAlways')}
            </h3>
            <ul className="text-left text-green-700 space-y-2">
              <li>{t('Info.level4Game.tip1')}</li>
              <li>{t('Info.level4Game.tip2')}</li>
              <li>{t('Info.level4Game.tip3')}</li>
              <li>{t('Info.level4Game.tip4')}</li>
              <li>{t('Info.level4Game.tip5')}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.menu')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.tryAgain')}
            </button>
            {passed && (
              <button
                onClick={() => router.push('/informatica/nivel-5')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all"
              >
                {t('Info.nextLevel')}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('Info.level4Game.title')}
          </h1>
          <p className="text-xl text-green-100 mb-4">
            {t('Info.level4Game.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-lg font-bold text-green-800">
                {t('Info.level4Game.scenarioOf', { current: currentScenario + 1, total: scenarios.length })}
              </span>
            </div>
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-lg font-bold text-blue-800">
                {t('Info.score')} {score}/{scenarios.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scenario Card */}
        <motion.div
          key={currentScenario}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Scenario */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-6">{scenario.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800">
              {scenario.situation}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {scenario.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                onClick={() => handleOptionClick(index)}
                disabled={showFeedback}
                className={`w-full p-6 rounded-2xl font-bold text-lg transition-all border-4 text-left ${
                  showFeedback
                    ? option.safe
                      ? 'bg-green-500 text-white border-green-600'
                      : selectedOption === index
                      ? 'bg-red-500 text-white border-red-600'
                      : 'bg-gray-200 text-gray-500 border-gray-300'
                    : 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300 cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">
                    {showFeedback ? (option.safe ? '✅' : selectedOption === index ? '❌' : '⚪') : '⚪'}
                  </span>
                  <span>{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          {showFeedback && selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-6 rounded-2xl ${
                scenario.options[selectedOption].safe ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <p className={`font-bold text-lg ${
                scenario.options[selectedOption].safe ? 'text-green-800' : 'text-red-800'
              }`}>
                {scenario.options[selectedOption].explanation}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-green-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            {t('Info.backToMenu')}
          </button>
        </div>
      </div>
    </div>
  );
}
