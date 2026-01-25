'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ResultsPageRomana from '@/components/ResultsPageRomana';

const words = [
  { id: 1, image: '/images/rom/level1/apple.png', word: 'măr', rIndex: 2 },
  { id: 2, image: '/images/rom/level1/bear.png', word: 'urs', rIndex: 1 },
  { id: 3, image: '/images/rom/level1/book.png', word: 'carte', rIndex: 2 },
  { id: 4, image: '/images/rom/level1/soare.png', word: 'soare', rIndex: 3 },
  { id: 5, image: '/images/rom/level1/robot.png', word: 'robot', rIndex: 0 },
  { id: 6, image: '/images/rom/level1/tigr.png', word: 'tigru', rIndex: 3 },
];

export default function Nivel1Page() {
  const t = useTranslations();
  const [selections, setSelections] = useState<{ [key: number]: number | null }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const selectLetter = (wordId: number, letterIndex: number) => {
    if (showResult) return;
    setSelections(prev => ({
      ...prev,
      [wordId]: prev[wordId] === letterIndex ? null : letterIndex
    }));
  };

  const checkAllAnswers = () => {
    let correctCount = 0;
    words.forEach(word => {
      if (selections[word.id] === word.rIndex) {
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

  const allSelected = words.every(word => selections[word.id] !== undefined && selections[word.id] !== null);

  // Show results page
  if (showResult) {
    return (
      <ResultsPageRomana
        score={score}
        totalQuestions={words.length}
        levelName="Nivel 1 - Sunetul R"
        onRetry={resetGame}
        nextLevelPath="/limba-romana/nivel-2"
        menuPath="/limba-romana/menu"
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/rom/bg-frame.jpg')" }}
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
            {t('Romanian.level1.fullTitle')}
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
            📝 {t('Romanian.level1.task')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto w-full"
          >
            {words.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-3 md:p-4 shadow-xl border-4 border-[#E8A33D]"
              >
                {/* Image */}
                <div className="flex justify-center mb-3">
                  <Image
                    src={item.image}
                    alt={item.word}
                    width={150}
                    height={150}
                    className="h-[80px] md:h-[120px] w-auto object-contain"
                  />
                </div>

                {/* Letter Buttons - буквы скрыты */}
                <div className="flex justify-center gap-1 md:gap-2">
                  {item.word.split('').map((letter, letterIndex) => {
                    const isSelected = selections[item.id] === letterIndex;
                    let buttonStyle = 'bg-[#4A6E3C] hover:bg-[#3D5C32]';
                    if (isSelected) {
                      buttonStyle = 'bg-[#E8A33D] ring-2 ring-[#E8A33D]/50';
                    }

                    return (
                      <motion.button
                        key={letterIndex}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectLetter(item.id, letterIndex)}
                        className={`
                          w-8 h-8 md:w-10 md:h-10 rounded-lg
                          transition-all duration-200 shadow-md
                          ${buttonStyle}
                        `}
                      >
                        {/* Буквы не показываются */}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
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
