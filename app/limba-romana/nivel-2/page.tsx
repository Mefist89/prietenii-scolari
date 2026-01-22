'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ResultsPageRomana from '@/components/ResultsPageRomana';

const exercises = [
  {
    id: 1,
    image: '/images/rom/level1/apple.png',
    correctWord: 'măr',
    syllables: ['măr', 'mar', 'mer'],
    type: 'single'
  },
  {
    id: 2,
    image: '/images/rom/level1/bear.png',
    correctWord: 'urs',
    syllables: ['urs', 'ors', 'ars'],
    type: 'single'
  },
  {
    id: 3,
    image: '/images/rom/level1/book.png',
    correctWord: 'car-te',
    syllableParts: ['car', 'te'],
    options: [
      ['car', 'te'],
      ['ca', 'rte'],
      ['cart', 'e']
    ],
    type: 'split'
  },
  {
    id: 4,
    image: '/images/rom/level1/soare.png',
    correctWord: 'soa-re',
    syllableParts: ['soa', 're'],
    options: [
      ['so', 'are'],
      ['soa', 're'],
      ['soar', 'e']
    ],
    type: 'split'
  },
  {
    id: 5,
    image: '/images/rom/level1/robot.png',
    correctWord: 'ro-bot',
    syllableParts: ['ro', 'bot'],
    options: [
      ['ro', 'bot'],
      ['rob', 'ot'],
      ['r', 'obot']
    ],
    type: 'split'
  },
  {
    id: 6,
    image: '/images/rom/level1/tigr.png',
    correctWord: 'ti-gru',
    syllableParts: ['ti', 'gru'],
    options: [
      ['tig', 'ru'],
      ['ti', 'gru'],
      ['t', 'igru']
    ],
    type: 'split'
  },
];

export default function Nivel2Page() {
  const [selections, setSelections] = useState<{ [key: number]: number | null }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const selectOption = (exerciseId: number, optionIndex: number) => {
    if (showResult) return;
    setSelections(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId] === optionIndex ? null : optionIndex
    }));
  };

  const checkAllAnswers = () => {
    let correctCount = 0;
    exercises.forEach(exercise => {
      const selected = selections[exercise.id];
      if (exercise.type === 'single') {
        if (selected === 0) correctCount++;
      } else {
        const options = exercise.options!;
        const correctIndex = options.findIndex(
          opt => opt[0] === exercise.syllableParts![0] && opt[1] === exercise.syllableParts![1]
        );
        if (selected === correctIndex) correctCount++;
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

  const allSelected = exercises.every(ex => selections[ex.id] !== undefined && selections[ex.id] !== null);

  const getCorrectIndex = (exercise: typeof exercises[0]) => {
    if (exercise.type === 'single') return 0;
    const options = exercise.options!;
    return options.findIndex(
      opt => opt[0] === exercise.syllableParts![0] && opt[1] === exercise.syllableParts![1]
    );
  };

  // Show results page
  if (showResult) {
    return (
      <ResultsPageRomana
        score={score}
        totalQuestions={exercises.length}
        levelName="Nivel 2 - Silabe și Cuvinte"
        onRetry={resetGame}
        nextLevelPath="/limba-romana/nivel-3"
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
            Nivel 2 - Silabe și Cuvinte
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
            📝 Alege despărțirea corectă în silabe pentru fiecare cuvânt!
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto w-full"
          >
            {exercises.map((item, index) => {
              const selectedIndex = selections[item.id];
              const options = item.type === 'single' ? item.syllables! : item.options!;

              return (
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
                      alt={item.correctWord}
                      width={150}
                      height={150}
                      className="h-[60px] md:h-[80px] w-auto object-contain"
                    />
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-2">
                    {options.map((option, optIndex) => {
                      const isSelected = selectedIndex === optIndex;
                      const displayText = Array.isArray(option) ? option.join('-') : option;

                      let buttonStyle = 'bg-[#4A6E3C] hover:bg-[#3D5C32] text-white';
                      if (isSelected) {
                        buttonStyle = 'bg-[#E8A33D] ring-2 ring-[#E8A33D]/50 text-white';
                      }

                      return (
                        <motion.button
                          key={optIndex}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectOption(item.id, optIndex)}
                          className={`
                            py-2 px-3 rounded-lg font-bold text-sm md:text-base
                            transition-all duration-200 shadow-md
                            ${buttonStyle}
                          `}
                        >
                          {displayText}
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
              ← Înapoi
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
            Verifică ✓
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
