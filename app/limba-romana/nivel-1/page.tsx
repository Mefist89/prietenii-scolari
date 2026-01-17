'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Данные для задания - слова с буквой "r" и позиция буквы r (индекс)
const words = [
  { id: 1, image: '/images/rom/level1/apple.png', word: 'măr', rIndex: 2 },
  { id: 2, image: '/images/rom/level1/bear.png', word: 'urs', rIndex: 1 },
  { id: 3, image: '/images/rom/level1/book.png', word: 'carte', rIndex: 2 },
  { id: 4, image: '/images/rom/level1/soare.png', word: 'soare', rIndex: 3 },
  { id: 5, image: '/images/rom/level1/robot.png', word: 'robot', rIndex: 0 },
  { id: 6, image: '/images/rom/level1/tigr.png', word: 'tigru', rIndex: 3 },
];

export default function Nivel1Page() {
  // Храним выбранную позицию для каждого слова
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

  // Проверяем, все ли слова имеют выбор
  const allSelected = words.every(word => selections[word.id] !== undefined && selections[word.id] !== null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/rom/bg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 min-h-screen flex flex-col p-4">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-3"
        >
          <h1 className="text-2xl md:text-3xl font-black text-[#F0F4E5] drop-shadow-lg">
            Nivel 1 - Sunetul &quot;R&quot;
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
            📝 Bifează sunetul &quot;r&quot; în cuvintele care denumesc obiectele din imaginile de mai jos.
          </p>
        </motion.div>

        {/* Cards Grid - 3 columns, 2 rows */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto w-full"
          >
            {words.map((item, index) => {
              const selectedIndex = selections[item.id];
              const isCorrectAnswer = showResult && selectedIndex === item.rIndex;
              const isWrongAnswer = showResult && selectedIndex !== null && selectedIndex !== item.rIndex;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`
                    bg-white rounded-2xl p-3 md:p-4 shadow-xl border-4 transition-all
                    ${isCorrectAnswer ? 'border-green-500 ring-4 ring-green-300' : ''}
                    ${isWrongAnswer ? 'border-red-500 ring-4 ring-red-300' : ''}
                    ${!showResult ? 'border-[#E8A33D]' : ''}
                  `}
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

                  {/* Letter Buttons - без показа букв */}
                  <div className="flex justify-center gap-1 md:gap-2">
                    {item.word.split('').map((letter, letterIndex) => {
                      const isSelected = selectedIndex === letterIndex;
                      const isCorrectLetter = letterIndex === item.rIndex;

                      let buttonStyle = 'bg-[#4A6E3C] hover:bg-[#3D5C32]';

                      if (showResult) {
                        if (isCorrectLetter) {
                          buttonStyle = 'bg-green-500 ring-2 ring-green-300';
                        } else if (isSelected && !isCorrectLetter) {
                          buttonStyle = 'bg-red-500';
                        } else {
                          buttonStyle = 'bg-gray-300';
                        }
                      } else if (isSelected) {
                        buttonStyle = 'bg-[#E8A33D] ring-2 ring-[#E8A33D]/50';
                      }

                      return (
                        <motion.button
                          key={letterIndex}
                          whileHover={!showResult ? { scale: 1.1 } : {}}
                          whileTap={!showResult ? { scale: 0.95 } : {}}
                          onClick={() => selectLetter(item.id, letterIndex)}
                          disabled={showResult}
                          className={`
                            w-8 h-8 md:w-10 md:h-10 rounded-lg
                            transition-all duration-200 shadow-md
                            ${buttonStyle}
                          `}
                        >
                          {/* Показываем букву только после проверки */}
                          {showResult && (
                            <span className="text-white font-bold text-sm md:text-base uppercase">
                              {letter}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Result Message */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`
                mx-auto mb-4 px-8 py-4 rounded-2xl text-center font-bold text-xl
                ${score === words.length ? 'bg-green-500 text-white' : 'bg-[#E8A33D] text-white'}
              `}
            >
              {score === words.length
                ? '🎉 Felicitări! Ai găsit toate literele "r"!'
                : `Ai găsit ${score} din ${words.length} litere "r"`
              }
            </motion.div>
          )}
        </AnimatePresence>

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

          {!showResult ? (
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
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-8 py-3 bg-[#E8A33D] hover:bg-[#D4922E] text-white font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30 transition-colors"
            >
              Încearcă din nou 🔄
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
