'use client';

import { useState, useMemo } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type MatchPair = {
  id: number;
  partKey: string;
  emoji: string;
  descKey: string;
};

const computerPartsData: MatchPair[] = [
  { id: 1, partKey: 'part1', emoji: '🖥️', descKey: 'part1desc' },
  { id: 2, partKey: 'part2', emoji: '⌨️', descKey: 'part2desc' },
  { id: 3, partKey: 'part3', emoji: '🖱️', descKey: 'part3desc' },
  { id: 4, partKey: 'part4', emoji: '🖲️', descKey: 'part4desc' },
  { id: 5, partKey: 'part5', emoji: '🖨️', descKey: 'part5desc' },
  { id: 6, partKey: 'part6', emoji: '🔊', descKey: 'part6desc' },
];

// Fixed shuffle order to avoid hydration mismatch
const shuffledOrder = [3, 6, 1, 5, 2, 4];

export default function InformaticaNivel2() {
  const t = useTranslations();
  const router = useRouter();

  const computerParts = computerPartsData.map(item => ({
    id: item.id,
    part: t(`Info.level2Game.${item.partKey}`),
    emoji: item.emoji,
    description: t(`Info.level2Game.${item.descKey}`),
  }));
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [attempts, setAttempts] = useState(0);

  const shuffledDescriptions = useMemo(() =>
    shuffledOrder.map(id => computerParts.find(p => p.id === id)!),
    [computerParts]
  );

  const handlePartClick = (id: number) => {
    if (matched.includes(id)) return;
    setSelectedPart(id);
    if (selectedDescription !== null) {
      checkMatch(id, selectedDescription);
    }
  };

  const handleDescriptionClick = (id: number) => {
    if (matched.includes(id)) return;
    setSelectedDescription(id);
    if (selectedPart !== null) {
      checkMatch(selectedPart, id);
    }
  };

  const checkMatch = (partId: number, descId: number) => {
    setAttempts(attempts + 1);
    if (partId === descId) {
      setShowFeedback('correct');
      setTimeout(() => {
        setMatched([...matched, partId]);
        setSelectedPart(null);
        setSelectedDescription(null);
        setShowFeedback(null);
      }, 1000);
    } else {
      setShowFeedback('wrong');
      setTimeout(() => {
        setSelectedPart(null);
        setSelectedDescription(null);
        setShowFeedback(null);
      }, 1000);
    }
  };

  const gameFinished = matched.length === computerParts.length;

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "url('/images/info/bg-frame.jpg')" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            {t('Info.level2Game.excellent')}
          </h2>
          <p className="text-2xl text-blue-600 mb-6">
            {t('Info.level2Game.matchedAll')}
          </p>
          <p className="text-xl text-gray-600 mb-8">
            {t('Info.level2Game.attempts')} {attempts}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.menu')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.level2Game.playAgain')}
            </button>
            <button
              onClick={() => router.push('/informatica/nivel-3')}
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('Info.level2Game.title')}
          </h1>
          <p className="text-xl text-blue-100">
            {t('Info.level2Game.subtitle')}
          </p>
          <div className="mt-4 inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-lg font-bold text-blue-800">
              {t('Info.level2Game.matches')} {matched.length}/{computerParts.length}
            </span>
          </div>
        </motion.div>

        {/* Game Board */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Computer Parts */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {t('Info.level2Game.parts')}
            </h3>
            <div className="space-y-3">
              {computerParts.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: matched.includes(item.id) ? 1 : 1.05 }}
                  whileTap={{ scale: matched.includes(item.id) ? 1 : 0.95 }}
                  onClick={() => handlePartClick(item.id)}
                  disabled={matched.includes(item.id)}
                  className={`w-full p-6 rounded-2xl font-bold text-xl transition-all border-4 ${
                    matched.includes(item.id)
                      ? 'bg-green-500 text-white border-green-600 opacity-50'
                      : selectedPart === item.id
                      ? 'bg-yellow-400 text-blue-900 border-yellow-500 scale-105'
                      : 'bg-white hover:bg-blue-50 text-blue-800 border-blue-300 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl">{item.emoji}</span>
                    <span>{item.part}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {t('Info.level2Game.descriptions')}
            </h3>
            <div className="space-y-3">
              {shuffledDescriptions.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: matched.includes(item.id) ? 1 : 1.05 }}
                  whileTap={{ scale: matched.includes(item.id) ? 1 : 0.95 }}
                  onClick={() => handleDescriptionClick(item.id)}
                  disabled={matched.includes(item.id)}
                  className={`w-full p-6 rounded-2xl font-bold text-lg transition-all border-4 ${
                    matched.includes(item.id)
                      ? 'bg-green-500 text-white border-green-600 opacity-50'
                      : selectedDescription === item.id
                      ? 'bg-yellow-400 text-blue-900 border-yellow-500 scale-105'
                      : 'bg-white hover:bg-blue-50 text-blue-800 border-blue-300 cursor-pointer'
                  }`}
                >
                  {item.description}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-3xl text-white font-bold text-3xl shadow-2xl ${
              showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {showFeedback === 'correct' ? t('Info.level2Game.correct') : t('Info.incorrect')}
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-blue-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            {t('Info.backToMenu')}
          </button>
        </div>
      </div>
    </div>
  );
}
