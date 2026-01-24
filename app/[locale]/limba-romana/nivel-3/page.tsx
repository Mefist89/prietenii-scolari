'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ResultsPageRomana from '@/components/ResultsPageRomana';

const antonymPairs = [
  { id: 1, word: 'mare', antonym: 'mic', options: ['mic', 'înalt', 'lung', 'larg'] },
  { id: 2, word: 'frumos', antonym: 'urât', options: ['dulce', 'urât', 'cald', 'verde'] },
  { id: 3, word: 'cald', antonym: 'rece', options: ['mare', 'rece', 'nou', 'greu'] },
  { id: 4, word: 'vechi', antonym: 'nou', options: ['nou', 'mic', 'rău', 'trist'] },
  { id: 5, word: 'sus', antonym: 'jos', options: ['aici', 'acolo', 'jos', 'afară'] },
  { id: 6, word: 'alb', antonym: 'negru', options: ['roșu', 'negru', 'albastru', 'verde'] },
  { id: 7, word: 'bun', antonym: 'rău', options: ['rău', 'mare', 'mic', 'lung'] },
  { id: 8, word: 'tare', antonym: 'moale', options: ['greu', 'ușor', 'moale', 'mare'] },
];

export default function Nivel3Page() {
  const t = useTranslations();
  const [selections, setSelections] = useState<{ [key: number]: string | null }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const selectOption = (pairId: number, option: string) => {
    if (showResult) return;
    setSelections(prev => ({
      ...prev,
      [pairId]: prev[pairId] === option ? null : option
    }));
  };

  const checkAllAnswers = () => {
    let correctCount = 0;
    antonymPairs.forEach(pair => {
      if (selections[pair.id] === pair.antonym) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResult(true);
  };

  const resetGame = () => {
    setSelections({});
    setShowResult(false);
    setScore(0);
  };

  const allSelected = antonymPairs.every(pair => selections[pair.id] !== undefined && selections[pair.id] !== null);

  // Show results page
  if (showResult) {
    return (
      <ResultsPageRomana
        score={score}
        totalQuestions={antonymPairs.length}
        levelName="Nivel 3 - Antonime"
        onRetry={resetGame}
        nextLevelPath="/limba-romana/nivel-4"
        menuPath="/limba-romana/menu"
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/rom/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 min-h-screen flex flex-col p-4">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-3"
        >
          <h1 className="text-2xl md:text-3xl font-black text-[#F0F4E5] drop-shadow-lg">
            {t('Romanian.level3.fullTitle')}
          </h1>
        </motion.div>

        {/* Task Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#F0F4E5] rounded-2xl p-3 max-w-2xl mx-auto mb-4 border-4 border-[#4A6E3C]"
        >
          <p className="text-[#612422] text-center font-bold text-base md:text-lg">
            📝 {t('Romanian.level3.task')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto w-full"
          >
            {antonymPairs.map((pair, index) => {
              const selectedOption = selections[pair.id];

              return (
                <motion.div
                  key={pair.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-white rounded-2xl p-3 md:p-4 shadow-xl border-4 border-[#E8A33D]"
                >
                  {/* Word */}
                  <div className="text-center mb-3">
                    <span className="text-2xl md:text-3xl font-black text-[#612422]">
                      {pair.word}
                    </span>
                    <p className="text-sm text-[#4A6E3C] font-medium mt-1">
                      {t('Romanian.level3.antonymIs')}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2">
                    {pair.options.map((option) => {
                      const isSelected = selectedOption === option;

                      let buttonStyle = 'bg-[#4A6E3C] hover:bg-[#3D5C32] text-white';
                      if (isSelected) {
                        buttonStyle = 'bg-[#E8A33D] ring-2 ring-[#E8A33D]/50 text-white';
                      }

                      return (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => selectOption(pair.id, option)}
                          className={`
                            py-2 px-2 rounded-lg font-bold text-xs md:text-sm
                            transition-all duration-200 shadow-md
                            ${buttonStyle}
                          `}
                        >
                          {option}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 pb-4"
        >
          <Link href="/limba-romana/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#4A6E3C] hover:bg-[#3D5C32] text-[#F0F4E5] font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30 transition-colors"
            >
              {t('Romanian.back')}
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAllAnswers}
            disabled={!allSelected}
            className={`
              px-8 py-3 font-bold text-lg rounded-full shadow-lg border-2 transition-all
              ${allSelected
                ? 'bg-[#E8A33D] hover:bg-[#D4922E] text-white border-[#F0F4E5]/30'
                : 'bg-gray-400 text-gray-200 border-gray-300 cursor-not-allowed'
              }
            `}
          >
            {t('Romanian.check')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
