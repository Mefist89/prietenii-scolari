'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ResultsPageRomana from '@/components/ResultsPageRomana';

const sentences = [
  {
    id: 1,
    before: 'Pisica',
    after: 'pe canapea.',
    blank: 'doarme',
    options: ['doarme', 'mănâncă', 'aleargă', 'cântă']
  },
  {
    id: 2,
    before: 'Copiii',
    after: 'în parc.',
    blank: 'se joacă',
    options: ['citesc', 'se joacă', 'dorm', 'gătesc']
  },
  {
    id: 3,
    before: 'Soarele',
    after: 'dimineața.',
    blank: 'răsare',
    options: ['apune', 'răsare', 'plouă', 'ninge']
  },
  {
    id: 4,
    before: 'Mama',
    after: 'o prăjitură.',
    blank: 'coace',
    options: ['scrie', 'citește', 'coace', 'cumpără']
  },
  {
    id: 5,
    before: 'Câinele',
    after: 'la ușă.',
    blank: 'latră',
    options: ['miaună', 'latră', 'cântă', 'doarme']
  },
  {
    id: 6,
    before: 'Elevii',
    after: 'la școală.',
    blank: 'învață',
    options: ['gătesc', 'dansează', 'învață', 'conduc']
  },
  {
    id: 7,
    before: 'Pasărea',
    after: 'pe cer.',
    blank: 'zboară',
    options: ['înoată', 'zboară', 'aleargă', 'sare']
  },
  {
    id: 8,
    before: 'Bunica',
    after: 'o poveste.',
    blank: 'povestește',
    options: ['desenează', 'povestește', 'construiește', 'repară']
  },
];

export default function Nivel5Page() {
  const t = useTranslations();
  const [selections, setSelections] = useState<{ [key: number]: string | null }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const selectOption = (sentenceId: number, option: string) => {
    if (showResult) return;
    setSelections(prev => ({
      ...prev,
      [sentenceId]: prev[sentenceId] === option ? null : option
    }));
  };

  const checkAllAnswers = () => {
    let correctCount = 0;
    sentences.forEach(sentence => {
      if (selections[sentence.id] === sentence.blank) {
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

  const allSelected = sentences.every(s => selections[s.id] !== undefined && selections[s.id] !== null);

  // Show results page
  if (showResult) {
    return (
      <ResultsPageRomana
        score={score}
        totalQuestions={sentences.length}
        levelName="Nivel 5 - Completează Textul"
        onRetry={resetGame}
        nextLevelPath="/limba-romana/sef-final"
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
            {t('Romanian.level5.fullTitle')}
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
            📝 {t('Romanian.level5.task')}
          </p>
        </motion.div>

        {/* Sentences Grid */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full"
          >
            {sentences.map((sentence, index) => {
              const selectedOption = selections[sentence.id];

              return (
                <motion.div
                  key={sentence.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-xl border-4 border-[#E8A33D]"
                >
                  {/* Sentence with blank */}
                  <div className="text-center mb-4">
                    <p className="text-lg md:text-xl font-bold text-[#612422]">
                      {sentence.before}{' '}
                      <span className={`
                        inline-block min-w-[100px] px-2 py-1 rounded-lg border-2 border-dashed
                        ${selectedOption
                          ? 'bg-[#E8A33D]/20 border-[#E8A33D] text-[#612422]'
                          : 'bg-gray-100 border-gray-400 text-gray-400'
                        }
                      `}>
                        {selectedOption || '___'}
                      </span>{' '}
                      {sentence.after}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2">
                    {sentence.options.map((option) => {
                      const isSelected = selectedOption === option;

                      let buttonStyle = 'bg-[#4A6E3C] hover:bg-[#3D5C32] text-white';
                      if (isSelected) {
                        buttonStyle = 'bg-[#E8A33D] ring-2 ring-[#E8A33D]/50 text-white';
                      }

                      return (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => selectOption(sentence.id, option)}
                          className={`
                            py-2 px-3 rounded-lg font-bold text-sm md:text-base
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
