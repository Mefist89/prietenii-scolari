'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ResultsPageRomana from '@/components/ResultsPageRomana';

const exercises = [
  { id: 1, singular: 'carte', plural: 'cărți', type: 'toPlural', options: ['cărți', 'carte', 'cartea', 'cărti'] },
  { id: 2, singular: 'copil', plural: 'copii', type: 'toPlural', options: ['copiii', 'copii', 'copile', 'copila'] },
  { id: 3, singular: 'floare', plural: 'flori', type: 'toPlural', options: ['floare', 'florii', 'flori', 'florile'] },
  { id: 4, singular: 'casă', plural: 'case', type: 'toPlural', options: ['casele', 'căși', 'case', 'casa'] },
  { id: 5, singular: 'om', plural: 'oameni', type: 'toPlural', options: ['omi', 'oameni', 'omeni', 'omii'] },
  { id: 6, singular: 'pisică', plural: 'pisici', type: 'toPlural', options: ['pisici', 'pisice', 'pisicăi', 'pisica'] },
  { id: 7, singular: 'măr', plural: 'mere', type: 'toPlural', options: ['mări', 'măre', 'mere', 'marul'] },
  { id: 8, singular: 'câine', plural: 'câini', type: 'toPlural', options: ['câinele', 'câini', 'câine', 'câinii'] },
  { id: 9, plural: 'stele', singular: 'stea', type: 'toSingular', options: ['stel', 'stea', 'steluță', 'stele'] },
  { id: 10, plural: 'păsări', singular: 'pasăre', type: 'toSingular', options: ['păsar', 'pasăre', 'pasări', 'pasara'] },
];

export default function Nivel4Page() {
  const [selections, setSelections] = useState<{ [key: number]: string | null }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const selectOption = (exerciseId: number, option: string) => {
    if (showResult) return;
    setSelections(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId] === option ? null : option
    }));
  };

  const checkAllAnswers = () => {
    let correctCount = 0;
    exercises.forEach(ex => {
      const correct = ex.type === 'toPlural' ? ex.plural : ex.singular;
      if (selections[ex.id] === correct) {
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

  const allSelected = exercises.every(ex => selections[ex.id] !== undefined && selections[ex.id] !== null);

  // Show results page
  if (showResult) {
    return (
      <ResultsPageRomana
        score={score}
        totalQuestions={exercises.length}
        levelName="Nivel 4 - Singular și Plural"
        onRetry={resetGame}
        nextLevelPath="/limba-romana/nivel-5"
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
            Nivel 4 - Singular și Plural
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
            📝 Transformă cuvintele din singular în plural sau invers!
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto w-full"
          >
            {exercises.map((ex, index) => {
              const selectedOption = selections[ex.id];
              const correctAnswer = ex.type === 'toPlural' ? ex.plural : ex.singular;
              const givenWord = ex.type === 'toPlural' ? ex.singular : ex.plural;
              const taskLabel = ex.type === 'toPlural' ? 'Plural:' : 'Singular:';

              return (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-white rounded-2xl p-3 shadow-xl border-4 border-[#E8A33D]"
                >
                  {/* Given Word */}
                  <div className="text-center mb-2">
                    <span className="text-xs text-[#4A6E3C] font-medium">
                      {ex.type === 'toPlural' ? 'Singular:' : 'Plural:'}
                    </span>
                    <p className="text-xl md:text-2xl font-black text-[#612422]">
                      {givenWord}
                    </p>
                  </div>

                  {/* Task Label */}
                  <p className="text-xs text-center text-[#4A6E3C] font-semibold mb-2">
                    {taskLabel}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-1">
                    {ex.options.map((option) => {
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
                          onClick={() => selectOption(ex.id, option)}
                          className={`
                            py-1.5 px-1 rounded-lg font-bold text-xs
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
